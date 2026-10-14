"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { MoveRight } from "lucide-react";

interface Step {
  id: number;
  title: string;
  description: string;
  icon: string;
  image: string;
}

const steps: Step[] = [
  {
    id: 1,
    title: "1. Discovery",
    description:
      "We meet with your team to know more about your project idea and goals. After that, our team will work together to create an action plan and proposal for your project.",
    icon: "/process/idea-phase.png",
    image: "/process/project-idea-phase.png",
  },
  {
    id: 2,
    title: "2. Research",
    description:
      "We will share with you a detailed questionnaire to do an in-depth analysis of your business. Once with that information, we will able to create a design that is tailor-made to reach your business goals.",
    icon: "/process/research-phase.png",
    image: "/process/project-research-phase.png",
  },
  {
    id: 3,
    title: "3. Design",
    description:
      "We are going to design a mockup or prototype of your website, and present it to you. Once with the initial mockup, we will start the revision process to perfect it.",
    icon: "/process/design-phase.png",
    image: "/process/project-design-phase.png",
  },
  {
    id: 4,
    title: "4. Development",
    description:
      "We are going to develop your website using the best web development standards, so you have a perfectly responsive, lightning-fast, SEO-friendly, and highly conversion-oriented website.",
    icon: "/process/development-phase.png",
    image: "/process/project-development-phase.png",
  },
  {
    id: 5,
    title: "5. Launch",
    description:
      "When the project is completed, we will schedule a 2hr session to train your team on how to use, edit and take advantage of your new website. After that, we will help you with the launch process to ensure everything goes perfectly smoothly.",
    icon: "/process/launch-phase.png",
    image: "/process/project-launch-phase.png",
  },
  {
    id: 6,
    title: "6. Support",
    description:
      "We don't complete the project and leave. Instead, we keep a close relationship and communication with your team so we can help you with any design or development needs in the long term.",
    icon: "/process/support-phase.png",
    image: "/process/project-support-phase.png",
  },
];

function ProcessCard({
  step,
  index,
  total,
  progress,
  targetScale,
}: {
  step: Step;
  index: number;
  total: number;
  progress: MotionValue<number>;
  targetScale: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rangeStart = index * (1 / total);
  const rangeEnd = 1;

  const scale = useTransform(progress, [rangeStart, rangeEnd], [1, targetScale]);

  return (
    <div
      style={{ top: `calc(100px + ${index * 24}px)` }}
      ref={containerRef}
      className="sticky flex items-center justify-center mb-10"
    >
      <motion.div
        style={{scale}}
        className="w-full bg-white border border-gray-150 rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.06)] overflow-hidden will-change-transform transform-gpu origin-top"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-120 lg:min-h-130 items-stretch">
          <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 relative mb-6 shrink-0">
              <Image
                src={step.icon}
                alt={`${step.title} Icon`}
                fill
                sizes="80px"
                className="object-contain"
              />
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111827] mb-4">
              {step.title}
            </h3>
            <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
              {step.description}
            </p>
          </div>

          <div className="lg:col-span-7 bg-[#f3f7fc] relative min-h-65 lg:min-h-full flex items-center justify-center overflow-hidden">
            <Image
              src={step.image}
              alt={step.title}
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative w-full bg-[#fbfcfd] py-20"
    >
      <div className="2xl:max-w-7xl lg:max-w-6xl md:max-w-3xl px-5 mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div className="max-w-lg lg:max-w-xl">
            <span className="text-xs md:text-sm font-bold tracking-wider text-[#E72D87] uppercase block mb-3">
              Why Work With Us
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-[#111827] leading-[1.15] tracking-tight mb-4">
              We take you by hand on each step of the process
            </h2>
            <p className="text-base text-gray-500 leading-relaxed">
              With hundreds of successful projects, we have defined a simple
              (but effective) process to take you from idea to launch!
            </p>
          </div>

          <Link
            href="#contact"
            className="inline-flex items-center gap-3 bg-[#E72D87] hover:bg-[#be246f] text-white font-semibold text-sm md:text-base px-7 py-3.5 rounded-full transition-colors duration-200 shadow-md"
          >
            <span>Get in touch</span>
            <MoveRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="relative">
          {steps.map((step, index) => {
            const targetScale = 1 - (steps.length - index) * 0.060;
            return (
              <ProcessCard
                key={step.id}
                step={step}
                index={index}
                total={steps.length}
                progress={scrollYProgress}
                targetScale={targetScale}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}