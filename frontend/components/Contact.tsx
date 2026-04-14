"use client";

import { useEffect, useRef, useState } from "react";
import AnimateIn from "./AnimateIn";

interface WaveParticle {
  id: number;
  size: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
}

function generateParticles(): WaveParticle[] {
  return Array.from({ length: 14 }, (_, i) => ({
    id: i,
    size: Math.random() * 8 + 4,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 4 + 3,
    delay: Math.random() * 5,
  }));
}

const CHECK_ITEMS = [
  "Full-time roles",
  "Consulting projects",
  "Campaign collaborations",
  "Singapore-based preferred",
];

export default function Contact() {
  // Generate particles only on the client to avoid SSR hydration mismatch
  const [particles, setParticles] = useState<WaveParticle[]>([]);

  useEffect(() => {
    setParticles(generateParticles());
  }, []);

  return (
    <section id="contact" className="py-24 bg-brand-red overflow-hidden relative">
      {/* Wave particles background — empty on server, filled on client */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <span
            key={p.id}
            className="wave-particle absolute rounded-full bg-white/10"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              "--duration": `${p.duration}s`,
              "--delay": `${p.delay}s`,
            } as React.CSSProperties}
          />
        ))}
        {/* Radial glow */}
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(0,0,0,0.15) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: CTA */}
          <div>
            <AnimateIn from="opacity-0 translate-y-5" to="opacity-100 translate-y-0" delay={0}>
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight mb-6">
                Let&apos;s build something<br />
                <span className="text-black/20">worth remembering.</span>
              </h2>
            </AnimateIn>

            <AnimateIn from="opacity-0 translate-y-5" to="opacity-100 translate-y-0" delay={100}>
              <p className="text-white/80 text-lg leading-relaxed mb-10 max-w-md">
                Available for full-time roles, consulting projects, and campaign collaborations from April – December 2026.
              </p>
            </AnimateIn>

            <div className="space-y-4">
              {[
                {
                  label: "vananhcindy02@gmail.com",
                  href: "mailto:vananhcindy02@gmail.com",
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                },
                {
                  label: "+65 81586466",
                  href: "tel:+6581586466",
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  ),
                },
                {
                  label: "linkedin.com/in/pham-thi-van-anh-072265232",
                  href: "https://www.linkedin.com/in/pham-thi-van-anh-072265232/",
                  icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  ),
                },
              ].map((item, i) => (
                <AnimateIn
                  key={item.label}
                  from="opacity-0 translate-x-8"
                  to="opacity-100 translate-x-0"
                  delay={200 + i * 80}
                >
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-4 text-white hover:text-black/70 transition-colors group"
                  >
                    <div className="w-10 h-10 border border-white/40 flex items-center justify-center shrink-0 group-hover:border-white group-hover:bg-white group-hover:text-brand-red transition-all">
                      {item.icon}
                    </div>
                    <span className="text-sm font-medium">{item.label}</span>
                  </a>
                </AnimateIn>
              ))}
            </div>
          </div>

          {/* Right: Availability card */}
          <div className="flex flex-col justify-center">
            <AnimateIn from="opacity-0 translate-y-5 scale-[0.97]" to="opacity-100 translate-y-0 scale-100" delay={150}>
              <div className="bg-white p-10 shadow-[0_32px_64px_rgba(0,0,0,0.2)]">
                <div className="text-xs text-brand-red font-semibold tracking-widest uppercase mb-4">
                  Availability
                </div>
                <h3 className="text-2xl font-serif font-bold text-brand-black mb-4">
                  April – December 2026
                </h3>
                <p className="text-sm text-brand-grey leading-relaxed mb-6">
                  Singapore Student Pass valid until January 2027. Open to full-time roles, consulting, and campaign collaborations.
                </p>

                <div className="space-y-3 mb-8">
                  {CHECK_ITEMS.map((item, i) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-brand-red flex items-center justify-center shrink-0">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm text-brand-black font-medium">{item}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="mailto:vananhcindy02@gmail.com?subject=Opportunity%20from%20Portfolio"
                  className="block w-full bg-brand-red text-white text-center py-3 text-sm font-semibold hover:bg-brand-black transition-colors card-lift"
                >
                  Send a Message
                </a>
              </div>
            </AnimateIn>
          </div>
        </div>
      </div>
    </section>
  );
}
