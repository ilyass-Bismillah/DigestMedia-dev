"use client";

import Link from "next/link";
import { MoveRight, Sparkles } from "lucide-react";
import CrystalizedBall from "./CrystalizedBall";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full flex flex-col justify-between overflow-hidden pt-12"
    >
      {/* Content Container */}
      <div className="relative z-10 2xl:max-w-7xl lg:max-w-6xl md:max-w-3xl mx-auto px-5 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text & Call to Action */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Top Pill / Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm mb-6 hover:border-[#E72D87]/40 transition-colors">
              <span className="flex h-2 w-2 rounded-full bg-[#E72D87] animate-ping" />
              <span className="text-xs font-semibold tracking-wide text-gray-800">
                Available for New Projects
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#E72D87]" />
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-[68px] font-black text-[#111827] leading-[1.08] tracking-tight mb-6">
              We create{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#111827] via-[#E72D87] to-[#b6236a]">
                amazing websites
              </span>{" "}
              for tech brands
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl mb-10">
              Our team of designers &amp; developers crafts bespoke, ultra-fast
              web experiences tailored for scale and conversion.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <Link
                href="#contact"
                className="inline-flex items-center justify-center gap-3 bg-[#E72D87] hover:bg-[#c91f70] text-white font-semibold text-base px-8 py-4 rounded-full transition-all duration-200"
              >
                <span>Get in touch</span>
                <MoveRight className="w-4 h-4" />
              </Link>

              <Link
                href="#services"
                className="inline-flex items-center justify-center gap-3 bg-white hover:bg-gray-50 border border-gray-200/90 text-gray-900 font-semibold text-base px-8 py-4 rounded-full transition-all duration-200 shadow-sm hover:shadow"
              >
                <span>Browse services</span>
                <MoveRight className="w-4 h-4 text-gray-400" />
              </Link>
            </div>
          </div>

          <div className="relative lg:col-span-5 w-full aspect-square max-w-120 flex items-center justify-center select-none">
            <div className="absolute inset-0 w-full h-full">
              <CrystalizedBall
                preset="plasma"
                color="#E72D87"
                theme="light"
                size={0.78}
                crackle={0.8}
                fill={0.5}
                interactive={true}
                hoverStrength={0.75}
              />
            </div>

            {/* 2. Central Logo Core (Integrated with the Crystalized Ball) */}
            <div className="relative z-10 pointer-events-none flex items-center justify-center">
              <div className="absolute w-28 h-28 rounded-full bg-[#E72D87]/15 blur-xl animate-pulse" />
              <motion.div
                animate={{
                  scale: [1, 1.03, 1],
                  boxShadow: [
                    "0 0 20px rgba(231,45,135,0.2)",
                    "0 0 35px rgba(231,45,135,0.4)",
                    "0 0 20px rgba(231,45,135,0.2)",
                  ],
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative"
              >
                <Image
                  src="/2.webp"
                  alt="Brand logo"
                  width={50}
                  height={50}
                  className="relative z-10 w-auto h-15 object-contain drop-shadow-[0_2px_8px_rgba(231,45,135,0.3)]"
                  priority={false}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
