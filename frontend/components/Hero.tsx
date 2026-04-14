"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";

interface Particle {
  id: number;
  size: number;
  x: number;
  y: number;
  tx: number;
  ty: number;
  duration: number;
  delay: number;
  opacity: number;
  color: string;
}

function generateParticles(count: number): Particle[] {
  const colors = ["#c8102e", "#ffffff", "#ff6b85"];
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 1.5,
    x: Math.random() * 100,
    y: Math.random() * 100,
    tx: (Math.random() - 0.5) * 160,
    ty: -(Math.random() * 100 + 60),
    duration: Math.random() * 6 + 6,
    delay: Math.random() * 8,
    opacity: Math.random() * 0.6 + 0.2,
    color: colors[i % 3],
  }));
}

function MagneticButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline" | "icon";
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    el.style.transform = `translate3d(${dx * 0.25}px, ${dy * 0.25}px, 0)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = "translate3d(0,0,0)";
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMouseMove as EventListener);
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove as EventListener);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  const base =
    "inline-flex items-center justify-center px-8 py-3 text-sm font-semibold transition-all duration-300";
  const variants = {
    primary:
      "bg-brand-red text-white hover:-translate-y-1 hover:bg-white hover:text-brand-black magnetic",
    outline:
      "border border-neutral-600 text-white hover:-translate-y-1 hover:border-white magnetic",
    icon: "border border-neutral-600 text-white hover:-translate-y-1 hover:border-white magnetic",
  };

  return (
    <a ref={ref} href={href} className={`${base} ${variants[variant]}`}>
      {children}
    </a>
  );
}

export default function Hero() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const portraitRef = useRef<HTMLDivElement>(null);

  // Generate particles only on client to avoid SSR hydration mismatch
  useEffect(() => {
    setParticles(generateParticles(28));
  }, []);

  // Subtle mouse-parallax on the portrait
  useEffect(() => {
    const el = portraitRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      el.style.transform = `translate3d(${dx * 12}px, ${dy * 8}px, 0)`;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-brand-black">
      {/* Background image with drift */}
      <Image
        src="/assets/background.png"
        alt=""
        fill
        className="object-cover opacity-20 hero-image-drift"
        priority
        unoptimized
      />

      {/* Rich overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-black via-neutral-900/85 to-neutral-800/65" />

      {/* Animated gradient mesh */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, #c8102e 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, #ff4d6a 0%, transparent 40%), radial-gradient(ellipse at 60% 80%, #0d0d0d 0%, transparent 50%)",
          backgroundSize: "100% 100%",
        }}
      />

      {/* Dot grid texture */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Floating particles — empty on server, filled client-side */}
      {particles.map((p: Particle) => (
        <span
          key={p.id}
          className="particle pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            opacity: p.opacity,
            "--tx": `${p.tx}px`,
            "--ty": `${p.ty}px`,
            "--duration": `${p.duration}s`,
            "--delay": `${p.delay}s`,
          } as React.CSSProperties}
        />
      ))}

      {/* Left accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-red hero-accent-rise" />

      {/* Top fade */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/8 to-transparent" />

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-brand-black/60 to-transparent" />

      {/* Main content */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-32 grid lg:grid-cols-2 gap-12 items-center w-full">
        {/* Left: Text */}
        <div>
          <div className="hero-enter hero-enter-delay-1">
            <div className="inline-flex items-center gap-2 border border-brand-red/80 bg-white/5 px-3 py-1 mb-6 backdrop-blur-sm rounded-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-bounce-root" />
              <span className="text-brand-red text-xs font-semibold tracking-[0.3em] uppercase">
                Portfolio 2026
              </span>
            </div>
          </div>

          <h1 className="hero-enter hero-enter-delay-1 text-5xl md:text-7xl lg:text-8xl font-serif font-black text-white leading-none mb-4">
            Pham Thi
            <br />
            <span className="text-shimmer">Van Anh</span>
          </h1>

          <div className="hero-enter hero-enter-delay-2 w-16 h-1 bg-brand-red mb-6 glow-pulse rounded-full" />

          <p className="hero-enter hero-enter-delay-2 text-lg md:text-xl text-neutral-300 font-light leading-relaxed max-w-md mb-4">
            Digital Marketing Leader
            <br />
            & Campaign Strategist
          </p>

          <p className="hero-enter hero-enter-delay-3 text-sm text-neutral-500 italic mb-10">
            Creative · Data-Driven · Results-Focused
          </p>

          <div className="hero-enter hero-enter-delay-4 flex flex-wrap gap-4">
            <MagneticButton href="#experience" variant="primary">
              View Experience
            </MagneticButton>
            <MagneticButton href="#campaigns" variant="outline">
              See Campaigns
            </MagneticButton>
            <MagneticButton
              href="https://www.linkedin.com/in/pham-thi-van-anh-072265232/"
              variant="icon"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </MagneticButton>
          </div>
        </div>

        {/* Right: Portrait */}
        <div className="relative flex justify-center lg:justify-end hero-enter hero-enter-delay-3">
          <div ref={portraitRef} className="relative w-72 h-72 md:w-96 md:h-96">
            {/* Orbiting rings */}
            <div className="absolute -inset-4 rounded-full border border-brand-red/40 hero-ring-spin" />
            <div className="absolute -inset-8 rounded-full border border-neutral-600/70 hero-ring-spin-reverse" />
            {/* Third subtle ring */}
            <div className="absolute -inset-12 rounded-full border border-brand-red/10 spin-slow opacity-40" />

            {/* Portrait */}
            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-brand-red shadow-[0_40px_120px_rgba(200,16,46,0.22)] float-subtle">
              <Image
                src="/assets/Van_Anh.png"
                alt="Pham Thi Van Anh"
                fill
                className="object-cover"
                priority
                unoptimized
              />
              {/* Subtle red overlay on portrait edge */}
              <div className="absolute inset-0 rounded-full shadow-[inset_0_0_60px_rgba(200,16,46,0.15)]" />
            </div>

            {/* Availability badge */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-brand-red text-white text-xs font-semibold px-4 py-1.5 whitespace-nowrap shadow-lg hero-enter hero-enter-delay-5 glow-pulse">
              Available Apr - Dec 2026
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-500 pointer-events-none hero-enter hero-enter-delay-5">
        <span className="text-xs tracking-[0.35em] uppercase">Scroll</span>
        <div className="h-12 w-[1px] overflow-hidden bg-white/10">
          <div className="scroll-indicator-line h-1/2 w-full bg-brand-red" />
        </div>
      </div>
    </section>
  );
}
