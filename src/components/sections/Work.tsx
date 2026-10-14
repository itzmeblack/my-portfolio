"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ChannelShowcase } from "@/components/ui/ChannelShowcase";

interface WorkProps {
  data: any;
}

export function Work({ data }: WorkProps) {
  // Editor mode: categorized work
  if (data.workCategories) {
    return (
      <section id="work" className="py-[var(--section-gap)]">
        <div className="mx-auto max-w-[var(--container)] px-6">
          <Reveal>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
              Selected Work
            </h2>
          </Reveal>

          <div className="mt-16 space-y-20">
            {data.workCategories.map((category: any, ci: number) => (
              <div key={category.title}>
                <Reveal>
                  <div className="flex items-baseline gap-4 mb-8">
                    <h3 className="font-display text-2xl font-semibold">
                      {category.title}
                    </h3>
                    <span className="text-sm text-text-tertiary">
                      {category.description}
                    </span>
                  </div>
                </Reveal>

                {category.type === "channel-showcase" ? (
                  <ChannelShowcase channels={category.channels} />
                ) : (
                  <div className={`grid gap-4 ${
                    category.title === "Short Format"
                      ? "grid-cols-2 sm:grid-cols-4"
                      : "grid-cols-1 md:grid-cols-2"
                  }`}>
                    {category.projects.map((project: any, pi: number) => (
                      <Reveal key={project.title} delay={pi * 0.1}>
                        <ProjectCard project={project} />
                      </Reveal>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Dev mode: flat project list
  return (
    <section id="work" className="py-[var(--section-gap)]">
      <div className="mx-auto max-w-[var(--container)] px-6">
        <Reveal>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
            Selected Work
          </h2>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {data.projects.map((project: any, i: number) => (
            <Reveal key={project.title} delay={i * 0.1}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
