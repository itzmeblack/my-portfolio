"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";

interface AboutProps {
  data: any;
}

export function About({ data }: AboutProps) {
  return (
    <section id="about" className="py-[var(--section-gap)]">
      <div className="mx-auto max-w-[var(--container)] px-6">
        <Reveal>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
            {data.about.title}
          </h2>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-2 gap-12 md:gap-16">
          <div className="space-y-6">
            {data.about.paragraphs.map((p: string, i: number) => (
              <Reveal key={i} delay={i * 0.1}>
                <p className="text-lg text-text-secondary leading-relaxed">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>

          <div className="space-y-4">
            {data.about.details.map((detail: any, i: number) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="flex items-center justify-between py-4 border-b border-border">
                  <span className="text-sm text-text-tertiary uppercase tracking-wider">
                    {detail.label}
                  </span>
                  <span className="font-display font-medium">{detail.value}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
