"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    id: "item-1",
    question: "How long does a project take?",
    answer:
      "Most projects take between 2 to 4 weeks depending on the number of pages and custom requirements.",
  },
  {
    id: "item-2",
    question: "What technologies do you use?",
    answer:
      "We build modern websites using Wordpress, Next.js, React, TypeScript, and Tailwind CSS to deliver fast speeds and clean responsive layouts.",
  },
  {
    id: "item-3",
    question: "Can you redesign my existing website?",
    answer:
      "Yes. We can redesign your existing site from the ground up or optimize specific sections to look better and convert more visitors.",
  },
  {
    id: "item-4",
    question: "Do you offer support after launch?",
    answer:
      "Yes. Every project includes 30 days of free support after launch. We also offer monthly maintenance plans if you need ongoing updates.",
  },
  {
    id: "item-5",
    question: "How do we get started?",
    answer:
      "Just fill out our contact form below. We will get back to you within 24 hours to review your requirements and share an estimate.",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="w-full py-20 bg-white">
      <div className="md:max-w-3xl lg:max-w-5xl px-5 mx-auto">
        {/* Section Header - Digest Media Layout */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-xl">
            <span className="text-xs sm:text-sm font-bold tracking-wider text-[#E72D87] uppercase block mb-3">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-[#111827] leading-[1.08] tracking-tight">
              Everything you need to know before getting started
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-500 max-w-sm leading-relaxed shrink-0">
            Can&apos;t find what you&apos;re looking for? Reach out directly to
            our team via our contact form below.
          </p>
        </div>

        <Accordion
          defaultValue={["item-1"]}
          className="w-full divide-y divide-gray-100 border-y border-gray-100"
        >
          {faqs.map((faq, index) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="border-none py-2"
            >
              <AccordionTrigger className="hover:no-underline cursor-pointer py-5 text-left group">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-gray-400 group-hover:text-[#E72D87] transition-colors">
                    0{index + 1}
                  </span>
                  <span className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#E72D87] transition-colors">
                    {faq.question}
                  </span>
                </div>
              </AccordionTrigger>

              <AccordionContent className="text-sm sm:text-base text-gray-600 leading-relaxed pl-9 pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
