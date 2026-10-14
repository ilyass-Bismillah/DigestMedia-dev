"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { MoveRight } from "lucide-react";

interface ServiceCard {
  id: number;
  title: string;
  description: string;
  link: string;
  image: string;
}

const services: ServiceCard[] = [
  {
    id: 1,
    title: "Web Design",
    description:
      "We design websites that look amazing, convey the right brand message and are highly oriented for conversion.",
    link: "#",
    image: "/services/web-design.png",
  },
  {
    id: 2,
    title: "Web Development",
    description:
      "We develop fast, perfectly responsive, and SEO-optimized websites built with the best development practices.",
    link: "#",
    image: "/services/web-dev.png",
  },
  {
    id: 3,
    title: "UI/UX Design",
    description:
      "We design intuitive web focused on driving user engagement and increasing users retention.",
    link: "#",
    image: "/services/ui-ux.png",
  },
  {
    id: 4,
    title: "Brand Design",
    description:
      "We transform businesses into world-class brands by going through a well thought brand identity design process.",
    link: "#",
    image: "/services/brand-design.png",
  },
  {
    id: 5,
    title: "Conversion Optimization",
    description:
      "We help you A/B test your website core landing pages to boost your conversion rates and get more leads.",
    link: "#",
    image: "/services/conversion.png",
  },
  {
    id: 6,
    title: "Automation",
    description:
      "We help your business gain leverage and efficiency through automation using simple, yet powerful NoCode tools.",
    link: "#",
    image: "/services/automation.png",
  },
];

export default function Services() {
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 25,
    restDelta: 0.001,
  });

  const x = useTransform(smoothProgress, [0, 1], ["3%", "-85%"]);

  return (
    <section
      id="services"
      ref={targetRef}
      className="relative h-[500vh] bg-[#E72D87]"
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden px-6">
        <div className="2xl:max-w-7xl lg:max-w-6xl md:max-w-3xl w-full mx-auto flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs sm:text-sm font-bold tracking-wider text-white/80 uppercase block mb-3">
              Our Services
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight max-w-xl tracking-tight">
              High-impact design &amp; development services
            </h2>
          </div>

          <Link
            href="#contact"
            className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-[#111827] font-semibold text-sm sm:text-base px-6 py-3.5 rounded-full transition-all duration-200 shadow-md"
          >
            <span>Get in touch</span>
            <MoveRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="w-full">
          <motion.div
            style={{ x }}
            className="flex gap-8 w-max will-change-transform transform-gpu"
          >
            {services.map((item) => (
              <div
                key={item.id}
                className="w-[85vw] max-w-170 bg-white rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shrink-0 p-6 md:p-8"
              >
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111827] mb-4">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="w-full md:w-1/2 h-56 sm:h-80 bg-[#f4f7fb] rounded-2xl relative flex items-center justify-center border border-gray-100 overflow-hidden shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 80vw, 340px"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
