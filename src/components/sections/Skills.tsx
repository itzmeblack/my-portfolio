"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";

interface SkillsProps {
  data: any;
}

export function Skills({ data }: SkillsProps) {
  return (
    <section id="skills" className="py-[var(--section-gap)] bg-bg-secondary">
      <div className="mx-auto max-w-[var(--container)] px-6">
        <Reveal>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
            Skills & Expertise
          </h2>
        </Reveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.skills.map((skill: any, i: number) => (
            <Reveal key={skill.name} delay={i * 0.05}>
              <div className="group relative rounded-[var(--radius)] border border-border bg-bg-primary p-6 transition-colors hover:border-accent/30">
                <div className="text-sm text-text-tertiary uppercase tracking-wider">
                  {skill.category}
                </div>
                <div className="mt-2 font-display text-lg font-semibold">
                  {skill.name}
                </div>
                <div className="mt-4 h-1 rounded-full bg-bg-tertiary overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-accent"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
                <div className="mt-2 text-xs text-text-tertiary text-right">
                  {skill.level}%
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
