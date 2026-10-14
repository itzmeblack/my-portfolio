"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";

interface ExperienceProps {
  data: any;
}

export function Experience({ data }: ExperienceProps) {
  return (
    <section id="experience" className="py-[var(--section-gap)] bg-bg-secondary">
      <div className="mx-auto max-w-[var(--container)] px-6">
        <Reveal>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
            Experience
          </h2>
        </Reveal>

        <div className="mt-12 space-y-0">
          {data.experience.map((exp: any, i: number) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="relative pl-8 pb-12 last:pb-0">
                {/* Timeline line */}
                {i < data.experience.length - 1 && (
                  <div className="absolute left-[7px] top-6 bottom-0 w-px bg-border" />
                )}
                {/* Timeline dot */}
                <div className="absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 border-accent bg-bg-primary" />

                <div className="text-sm text-text-tertiary">{exp.period}</div>
                <div className="mt-1 font-display text-xl font-semibold">
                  {exp.role}
                </div>
                <div className="text-sm text-accent">{exp.company}</div>
                <p className="mt-3 text-text-secondary leading-relaxed max-w-2xl">
                  {exp.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
