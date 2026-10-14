"use client";

import React, { useState, useEffect, useRef } from "react";
import { MoveRight, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import Image from "next/image";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        params: {
          sitekey: string;
          callback: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
        }
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

interface ServiceOption {
  id: string;
  title: string;
  icon: string;
  bgColor: string;
}

const servicesList: ServiceOption[] = [
  {
    id: "web-design",
    title: "Web Design",
    icon: "/services/web-design.png",
    bgColor: "bg-rose-50",
  },
  {
    id: "ui-ux",
    title: "UI/UX Design",
    icon: "/services/ui-ux.png",
    bgColor: "bg-emerald-50",
  },
  {
    id: "development",
    title: "Development",
    icon: "/services/web-dev.png",
    bgColor: "bg-blue-50",
  },
  {
    id: "branding",
    title: "Branding",
    icon: "/services/brand-design.png",
    bgColor: "bg-amber-50",
  },
];

const projectTypes = [
  { id: "one-time", label: "One-time project" },
  { id: "ongoing", label: "Ongoing maintenance" },
  { id: "both", label: "Both" },
];

export default function Contact() {
const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    service: "Web Design",
    projectType: "One-time project",
    message: "",
    website_hp: "", 
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const turnstileContainerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY || "";

    if (!siteKey) {
      console.warn("Missing NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY");
      return;
    }

    const initTurnstile = () => {
      if (
        window.turnstile &&
        turnstileContainerRef.current &&
        !widgetIdRef.current
      ) {
        widgetIdRef.current = window.turnstile.render(
          turnstileContainerRef.current,
          {
            sitekey: siteKey,
            theme: "light",
            callback: (token: string) => {
              setTurnstileToken(token);
              setErrors((prev) => ({ ...prev, turnstile: "" }));
            },
            "expired-callback": () => setTurnstileToken(""),
            "error-callback": () => setTurnstileToken(""),
          }
        );
      }
    };

    const existingScript = document.querySelector(
      'script[src*="turnstile/v0/api.js"]'
    );

    if (!window.turnstile && !existingScript) {
      const script = document.createElement("script");
      script.src =
        "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.onload = initTurnstile;
      document.body.appendChild(script);
    } else if (window.turnstile) {
      initTurnstile();
    }

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [submitted]);

  const validateForm = () => {
    const err: Record<string, string> = {};
    if (!formData.name.trim()) err.name = "Full name is required";
    if (!formData.email.trim()) {
      err.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      err.email = "Please enter a valid email address";
    }
    if (!formData.service) err.service = "Please select a service";
    if (!turnstileToken) {
      err.turnstile = "Please complete the Cloudflare security verification";
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (formData.website_hp) {
      setSubmitted(true); 
      return;
    }

    // 2. Form validation
    if (!validateForm()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, turnstileToken }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send message.");

      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        company: "",
        website: "",
        service: "Web Design",
        projectType: "One-time project",
        message: "",
        website_hp: "",
      });
      setTurnstileToken("");
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current);
        setTurnstileToken("");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="w-full py-20 bg-white">
      <div className="md:max-w-3xl lg:max-w-5xl px-5 mx-auto">
        {/* Header */}
        <div className="mb-14">
          <span className="text-xs sm:text-sm font-bold tracking-wider text-[#E72D87] uppercase block mb-3 font-mono">
            Contact Us
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold text-[#111827] tracking-tight flex items-center gap-3 mb-4">
            <span>Send us a message</span>
            <Image src="/wave.gif" alt="wave" width={50} height={50} className="w-10 h-10 object-contain" />
          </h2>
          <p className="text-base sm:text-lg text-slate-500 max-w-2xl leading-relaxed">
            Fill the form below and one of our team members will get back to you within 24 business hours to schedule a project discovery call.
          </p>
        </div>

        {submitted ? (
          <div className="min-h-100 flex flex-col items-center justify-center text-center p-8 border border-slate-100 rounded-3xl bg-[#fafafa]">
            <div className="w-16 h-16 rounded-full bg-[#E72D87]/10 flex items-center justify-center text-[#E72D87] mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Dispatched!</h3>
            <p className="text-slate-500 max-w-md mb-6 text-sm sm:text-base">
              Thank you for reaching out. We will review your project details and get back to you within 24 hours.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setTurnstileToken("");
              }}
              className="px-6 py-2.5 rounded-full border border-slate-200 text-sm font-semibold hover:border-[#E72D87] transition-colors"
            >
              Send another inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-12">
            {/* 1. Four Text Fields with underline style */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {/* Name */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-700 block">
                  What&apos;s your name? <span className="text-[#E72D87]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: "" });
                  }}
                  className={`w-full pb-3 border-b text-slate-900 placeholder:text-slate-400 text-base focus:outline-none transition-colors bg-transparent ${
                    errors.name ? "border-red-500 focus:border-red-500" : "border-slate-200 focus:border-[#E72D87]"
                  }`}
                />
                {errors.name && (
                  <p className="text-xs text-red-500 flex items-center gap-1 pt-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-700 block">
                  What&apos;s your email? <span className="text-[#E72D87]">*</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: "" });
                  }}
                  className={`w-full pb-3 border-b text-slate-900 placeholder:text-slate-400 text-base focus:outline-none transition-colors bg-transparent ${
                    errors.email ? "border-red-500 focus:border-red-500" : "border-slate-200 focus:border-[#E72D87]"
                  }`}
                />
                {errors.email && (
                  <p className="text-xs text-red-500 flex items-center gap-1 pt-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                  </p>
                )}
              </div>

              {/* Company */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-700 block">
                  What&apos;s your company?
                </label>
                <input
                  type="text"
                  placeholder="Enter your company name"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full pb-3 border-b border-slate-200 text-slate-900 placeholder:text-slate-400 text-base focus:outline-none focus:border-[#E72D87] transition-colors bg-transparent"
                />
              </div>

              {/* Current Website */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-700 block">
                  What&apos;s your current website?
                </label>
                <input
                  type="text"
                  placeholder="https://example.com"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full pb-3 border-b border-slate-200 text-slate-900 placeholder:text-slate-400 text-base focus:outline-none focus:border-[#E72D87] transition-colors bg-transparent"
                />
              </div>
            </div>

            {/* 2. Services Selection Cards */}
            <div className="space-y-4">
              <label className="text-sm font-medium text-slate-700 block">
                What services are you looking for? <span className="text-[#E72D87]">*</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {servicesList.map((srv) => {
                  const isSelected = formData.service === srv.title;
                  return (
                    <button
                      key={srv.id}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, service: srv.title });
                        if (errors.service) setErrors({ ...errors, service: "" });
                      }}
                      className={`p-6 rounded-2xl border text-center flex flex-col items-center justify-center gap-4 transition-all cursor-pointer ${
                        isSelected
                          ? "border-[#E72D87] ring-1 ring-[#E72D87] shadow-sm bg-white"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <div className={`w-30 h-30 rounded-2xl ${srv.bgColor} flex items-center justify-center relative overflow-hidden`}>
                        <Image
                          src={srv.icon}
                          alt={srv.title}
                          width={150}
                          height={70}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <span className="text-sm font-bold text-slate-900">
                        {srv.title}
                      </span>
                    </button>
                  );
                })}
              </div>
              {errors.service && (
                <p className="text-xs text-red-500 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.service}
                </p>
              )}
            </div>

            {/* 3. Project Type Pills */}
            <div className="space-y-4">
              <label className="font-medium text-slate-700 block">
                What kind of project are you looking for?
              </label>

              <div className="flex flex-wrap gap-4">
                {projectTypes.map((type) => {
                  const isSelected = formData.projectType === type.label;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, projectType: type.label })}
                      className={`flex items-center gap-3 px-6 py-3.5 rounded-full border text-sm font-bold transition-all cursor-pointer ${
                        isSelected
                          ? "border-[#E72D87] text-slate-900 bg-pink-50/30"
                          : "border-slate-200 text-slate-700 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <span
                        className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                          isSelected
                            ? "border-[#E72D87] bg-[#E72D87]"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </span>
                      <span>{type.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Optional Project Note */}
            <div className="space-y-5">
              <label className="font-medium text-slate-700 block">
                Tell us a little more about your project
              </label>
              <textarea
                rows={3}
                placeholder="Please tell us about your project"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full pb-3 border-b border-slate-200 text-slate-900 placeholder:text-slate-400 text-base focus:outline-none focus:border-[#E72D87] transition-colors bg-transparent resize-none"
              />
            </div>

            {/* Cloudflare Turnstile Section */}
            <div className="space-y-2">
              <div ref={turnstileContainerRef} />
              {errors.turnstile && (
                <p className="text-xs text-red-500 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.turnstile}
                </p>
              )}
            </div>

            {errorMsg && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-3 bg-[#E72D87] hover:bg-[#c91f70] text-white font-semibold text-base px-9 py-4 rounded-full transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sending message...</span>
                </>
              ) : (
                <>
                  <span>Submit message</span>
                  <MoveRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}