"use client";

import Link from "next/link";

interface FooterProps {
  shared: any;
}

export function Footer({ shared }: FooterProps) {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-[var(--container)] px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-sm text-text-tertiary">
            &copy; {new Date().getFullYear()} {shared.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            {shared.socials.map((social: any) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-secondary hover:text-accent transition-colors"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
