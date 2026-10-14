import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const {
      name,
      email,
      company,
      website,
      service,
      projectType,
      message,
      turnstileToken,
    } = await req.json();

    // 1. Validation de base
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    // 2. Vérification Turnstile Token & Secret Key
    if (!turnstileToken) {
      return NextResponse.json(
        { error: "Security check is missing. Please try again." },
        { status: 400 }
      );
    }

    const secretKey = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json(
        { error: "Server configuration error: missing Turnstile key." },
        { status: 500 }
      );
    }

    const formData = new FormData();
    formData.append("secret", secretKey);
    formData.append("response", String(turnstileToken));

    const verifyResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: formData,
      }
    );

    const verifyData = await verifyResponse.json();

    if (!verifyData.success) {
      return NextResponse.json(
        { error: "Security verification failed. Please try again." },
        { status: 400 }
      );
    }

    // 3. Envoi d'email via Resend
    const { data, error } = await resend.emails.send({
      from: "Digest Media <onboarding@resend.dev>",
      to: ["ilyassbis@gmail.com"],
      replyTo: email,
      subject: `New Project Inquiry from ${name} (${service || "General"})`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; padding: 24px; border: 1px solid #eaeaea; border-radius: 12px;">
          <h2 style="color: #111827; margin-bottom: 20px;">New Inquiry Received</h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr><td style="padding: 6px 0; color: #6b7280;">Name:</td><td style="padding: 6px 0; font-weight: bold;">${name}</td></tr>
            <tr><td style="padding: 6px 0; color: #6b7280;">Email:</td><td style="padding: 6px 0; font-weight: bold;">${email}</td></tr>
            <tr><td style="padding: 6px 0; color: #6b7280;">Company:</td><td style="padding: 6px 0;">${company || "N/A"}</td></tr>
            <tr><td style="padding: 6px 0; color: #6b7280;">Website:</td><td style="padding: 6px 0;">${website || "N/A"}</td></tr>
            <tr><td style="padding: 6px 0; color: #6b7280;">Service:</td><td style="padding: 6px 0; color: #E72D87; font-weight: bold;">${service || "Not specified"}</td></tr>
            <tr><td style="padding: 6px 0; color: #6b7280;">Project Type:</td><td style="padding: 6px 0;">${projectType || "Not specified"}</td></tr>
          </table>
          ${
            message
              ? `<div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid #eee;">
                  <strong style="color: #6b7280; font-size: 12px; text-transform: uppercase;">Message:</strong>
                  <p style="margin-top: 6px; color: #111827; line-height: 1.5;">${message}</p>
                </div>`
              : ""
          }
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}