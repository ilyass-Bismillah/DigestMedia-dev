"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = [
  "create",
  "develop",
  "design",
  "scale",
  "optimize",
  "launch"
];

export default function Rotating() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2600);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full py-20 flex flex-col items-center justify-center select-none">     
      {/* Main Statement */}
      <div className="flex flex-wrap text-3xl md:text-5xl lg:text-7xl items-baseline justify-center font-medium tracking-tight text-neutral-900 leading-none">
        {/* We */}
        <span className="font-semibold tracking-tight">We</span>

        {/* Dynamic Editorial Word */}
        <div className="relative inline-flex items-baseline justify-center min-w-40 md:min-w-60 lg:min-w-80 h-[1.15em] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={words[index]}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1], 
              }}
              className="absolute font-serif italic font-normal text-[#E72D87]"
            >
              {words[index]}
            </motion.span>
          </AnimatePresence>
        </div>
        <span className="font-semibold tracking-tight">websites.</span>
      </div>
       {/* Editorial Counter (01 — 06) */}
      <div className="flex items-center gap-2 mt-4 text-[11px] uppercase tracking-widest text-neutral-400">
        <span>0{index + 1}</span>
        <span className="w-6 h-px bg-neutral-300" />
        <span>0{words.length}</span>
      </div>
    </section>
  );
}