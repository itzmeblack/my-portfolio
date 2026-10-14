"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

interface ContactProps {
  data: any;
  shared: any;
}

export function Contact({ data, shared }: ContactProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${shared.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
          _subject: "New message from your portfolio",
        }),
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-[var(--section-gap)]">
      <div className="mx-auto max-w-[var(--container)] px-6">
        <div className="max-w-2xl">
          <Reveal>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
              {data.contact.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-lg text-text-secondary">
              {data.contact.subtitle}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap gap-4">
              <MagneticButton>
                <a
                  href={`mailto:${shared.email}`}
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-bg-primary hover:opacity-90 transition-opacity"
                >
                  {shared.email}
                </a>
              </MagneticButton>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <form onSubmit={handleSubmit} className="mt-12 space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm text-text-tertiary mb-2">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full rounded-[var(--radius)] border border-border bg-bg-secondary px-4 py-3 text-text placeholder:text-text-tertiary focus:border-accent/50 focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm text-text-tertiary mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-[var(--radius)] border border-border bg-bg-secondary px-4 py-3 text-text placeholder:text-text-tertiary focus:border-accent/50 focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm text-text-tertiary mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full rounded-[var(--radius)] border border-border bg-bg-secondary px-4 py-3 text-text placeholder:text-text-tertiary focus:border-accent/50 focus:outline-none transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <div>
                <MagneticButton>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3 text-sm font-semibold text-bg-primary hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {status === "sending" ? "Sending..." : "Send Message"}
                  </button>
                </MagneticButton>
                {status === "sent" && (
                  <p className="mt-4 text-sm text-accent">Message sent. I&apos;ll get back to you soon.</p>
                )}
                {status === "error" && (
                  <p className="mt-4 text-sm text-red-500">Something went wrong. Try again.</p>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
