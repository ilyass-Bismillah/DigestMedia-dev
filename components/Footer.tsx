"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Footer() { 
  return (
    <footer className="w-full text-neutral-900 py-15 border-t border-neutral-100 overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="2xl:max-w-7xl lg:max-w-6xl md:max-w-3xl px-5 mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 py-12">
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 flex flex-col space-y-5"
          >
            <Link href="/" className="inline-block w-fit">
              <Image
                src="/logo.webp"
                alt="Digest Media logo"
                width={180}
                height={50}
                className="w-auto h-9 object-contain"
              />
            </Link>
            <p className="text-neutral-500 text-sm sm:text-base leading-relaxed max-w-sm">
              Crafting bespoke, high-performance web experiences and interfaces
              for forward-thinking digital brands.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-4">
            <p className="text-sm uppercase tracking-widest text-neutral-400 font-semibold">
              Navigation
            </p>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Home", href: "#hero" },
                { label: "About", href: "#about" },
                { label: "Services", href: "#services" },
                { label: "FAQ", href: "#faq" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                <motion.li whileHover={{ x: 8 }} key={link.label}>
                  <Link
                    href={link.href}
                    className="text-neutral-600 hover:text-[#E72D87] transition-colors duration-200 block"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="lg:col-span-3 space-y-4">
            <p className="text-sm uppercase tracking-widest text-neutral-400 font-semibold">
              Capabilities
            </p>
            <ul className="space-y-3 text-sm text-neutral-600">
              <li>Web Design</li>
              <li>Web Development</li>
              <li>UI/UX Design</li>
              <li>Conversion Optimization</li>
              <li>Performance &amp; SEO Auditing</li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-4">
            <p className="text-sm uppercase tracking-widest text-neutral-400 font-semibold">
              Connect
            </p>
            <ul className="space-y-3 text-sm">
              {[
                { label: "X (Twitter)", href: "https://twitter.com" },
                { label: "LinkedIn", href: "https://linkedin.com" },
                { label: "GitHub", href: "https://github.com" },
                { label: "Email", href: "mailto:contact@digestmedia.com" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                    className="group text-neutral-600 hover:text-[#E72D87] transition-colors duration-200 inline-flex items-center gap-1.5"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[#E72D87] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="pt-8 mt-4 border-t border-neutral-100 text-xs text-neutral-500 text-center"
        >
          <p>
            &copy; 2026 Digest Media. All rights reserved.
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}