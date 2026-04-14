"use client";

import { useEffect, useRef, useState } from "react";
import AnimateIn from "./AnimateIn";

const awards = [
  {
    name: "Best Delegate",
    event: "Japan Youth Summit — Sustainable Business Idea Summit",
    year: "2024",
    rank: "Best Delegate",
  },
  {
    name: "Bronze Medal",
    event: "Kaohsiung International Invention & Design Expo",
    year: "2023",
    rank: "3rd Place",
  },
  {
    name: "Top 3 / 1,200",
    event: "Vietnam Young Lion — Student Leagues (Most Prestigious Marketing Competition)",
    year: "2022",
    rank: "3rd Place",
  },
  {
    name: "Top 3 / 1,400",
    event: "Hanh Trinh Kinh Doanh — Business Case Study Competition",
    year: "2022",
    rank: "3rd Place",
  },
  {
    name: "Top 2 / 200",
    event: "International Communications MA — Diplomatic Academy of Vietnam",
    year: "2021",
    rank: "2nd Place",
  },
];

const HIGHLIGHTS = [
  { value: "3rd", label: "Vietnam Young Lion", sub: "Top 3 / 1,200" },
  { value: "Best", label: "Japan Youth Summit", sub: "Best Delegate" },
  { value: "2nd", label: "MA Cohort", sub: "Top 2 / 200" },
];

function AwardRow({ award, index }: { award: typeof awards[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`flex items-start gap-6 py-6 border-b border-neutral-800 group cursor-default transition-all duration-500 ${
        visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = "rgba(200,16,46,0.5)";
        el.style.paddingLeft = "12px";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = "";
        el.style.paddingLeft = "0px";
      }}
    >
      {/* Year badge */}
      <div className="shrink-0 w-12 h-12 border border-brand-red flex items-center justify-center text-brand-red font-serif font-bold text-lg group-hover:bg-brand-red group-hover:text-white transition-colors duration-300">
        {award.year.slice(-2)}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="text-xs text-brand-red font-semibold tracking-widest uppercase mb-1">
          {award.event}
        </div>
        <h3 className={`text-lg font-serif font-bold text-white award-shimmer ${visible ? "is-visible" : ""}`}>
          {award.name}
        </h3>
      </div>

      {/* Rank badge */}
      <div className="shrink-0">
        <div className="text-sm text-neutral-400 border border-neutral-700 px-3 py-1 font-semibold group-hover:border-brand-red group-hover:text-brand-red transition-colors duration-300">
          {award.rank}
        </div>
      </div>
    </div>
  );
}

export default function Awards() {
  return (
    <section id="awards" className="py-24 bg-brand-black overflow-hidden relative">
      {/* Subtle radial gradient accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-red/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        <AnimateIn from="opacity-0 translate-y-5" to="opacity-100 translate-y-0">
          <div className="mb-12">
            <span className="text-brand-red text-xs font-semibold tracking-widest uppercase">Recognition</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mt-2">
              Awards & Honours
            </h2>
          </div>
        </AnimateIn>

        {/* Award list */}
        <div className="space-y-0">
          {awards.map((award, i) => (
            <AwardRow key={i} award={award} index={i} />
          ))}
        </div>

        {/* Highlight cards */}
        <div className="mt-16 grid grid-cols-3 gap-6">
          {HIGHLIGHTS.map((h, i) => (
            <AnimateIn
              key={h.label}
              from="opacity-0 translate-y-5 scale-[0.95]"
              to="opacity-100 translate-y-0 scale-100"
              delay={i * 120}
            >
              <div className="card-lift p-8 border border-neutral-800 text-center hover:border-brand-red transition-colors relative overflow-hidden group">
                {/* Decorative glow */}
                <div className="absolute inset-0 bg-brand-red/0 group-hover:bg-brand-red/5 transition-colors duration-500" />
                <div className="relative">
                  <div className="text-4xl font-serif font-bold text-brand-red mb-3">{h.value}</div>
                  <div className="text-xs text-white font-semibold uppercase tracking-wide mb-1">{h.label}</div>
                  <div className="text-xs text-neutral-500">{h.sub}</div>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
