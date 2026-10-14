"use client";

import Image from "next/image";
import { ShieldCheck, Zap, Smartphone, Sparkles } from "lucide-react";
import { motion, type Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const pillars = [
  {
    icon: Zap,
    title: "Ultra fast loading",
    description:
      "No slow plugins or heavy templates. Your site opens instantly on any phone or connection.",
  },
  {
    icon: Smartphone,
    title: "100% mobile ready",
    description:
      "Most visitors come from phones. We design the mobile experience first, not as an afterthought.",
  },
  {
    icon: ShieldCheck,
    title: "Clean & secure code",
    description:
      "Built with Next.js and React so your site stays fast, secure, and headache-free without breaking.",
  },
  {
    icon: Sparkles,
    title: "Built to convert",
    description:
      "Every button, title, and section is placed intentionally to guide visitors toward contacting you.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative w-full py-20 px-6 lg:px-12 border-b border-slate-200/60 overflow-hidden"
    >
      <div className="absolute inset-0 -z-20">
        <Image
          src="/bg-about.webp"
          alt="About background"
          fill
          priority={false}
          sizes="100vw"
          className="object-cover object-center scale-105"
        />
      </div>

      <div className="absolute inset-0 -z-10 bg-linear-to-b from-white/80 via-white/70 to-white/60" />

      <div className="relative z-10 2xl:max-w-7xl lg:max-w-6xl md:max-w-3xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10 pb-10 border-b border-slate-200/80"
        >
          <div className="max-w-2xl">
            <div className="mb-3">
              <span className="text-xs sm:text-sm font-bold tracking-wider text-[#E72D87] uppercase">
                Who we are
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-[1.08]">
              We don&apos;t just make websites look good.{" "}
              <span className="font-serif italic font-normal text-[#E72D87]">
                We make them work.
              </span>
            </h2>
          </div>

          <p className="text-base text-slate-600 max-w-md leading-relaxed shrink-0">
            We design and build clean, fast websites that make your business
            look credible and convert visitors into real clients.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {pillars.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="group relative bg-white/80 hover:bg-white backdrop-blur-md p-8 rounded-3xl border border-slate-200/80 hover:border-[#E72D87]/40 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(231,45,135,0.08)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div className="absolute inset-x-8 top-0 h-0.5 bg-linear-to-r from-transparent via-[#E72D87] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-13 h-13 rounded-2xl bg-pink-50/80 border border-pink-100/60 text-[#E72D87] flex items-center justify-center group-hover:scale-105 group-hover:bg-[#E72D87] group-hover:text-white transition-all duration-300">
                      <Icon className="w-5 h-5 transition-transform duration-300" />
                    </div>
                    <span className="text-xs font-bold text-slate-300 group-hover:text-[#E72D87] transition-colors">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2.5 tracking-tight group-hover:text-[#E72D87] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
