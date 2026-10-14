"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, MoveRight, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Faq", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md border-b border-white/10 py-3 shadow-md"
          : "bg-linear-to-b from-dark-bg/90 to-transparent py-5"
      }`}
    >
      <div className="2xl:max-w-7xl lg:max-w-6xl md:max-w-3xl mx-auto px-5 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/">
          <Image src="/logo.webp" alt="logo" width={200} height={100} />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-9 relative">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[#555d6e] hover:text-[#E72D87] text-base font-medium transition-colors group relative"
            >
              {link.label}
              <span className="absolute bg-[#E72D87] bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden lg:block">
          <Link
            href="#contact"
            className="inline-flex items-center gap-3 bg-[#E72D87] hover:bg-[#a41f60] text-white font-semibold text-base px-7 py-3.5 rounded-full transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <span>Get in touch</span>
            <MoveRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
          className="lg:hidden p-2 text-gray-700 hover:text-black focus:outline-none"
        >
          {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-gray-100 px-6 py-6 space-y-4 shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-gray-700 hover:text-[#E72D87] text-lg font-medium"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-3 bg-[#E72D87] text-white font-semibold py-3.5 rounded-full"
            >
              <span>Get in touch</span>
              <MoveRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
