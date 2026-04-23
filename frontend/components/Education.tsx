"use client";

import { useEffect, useRef, useState } from "react";
import AnimateIn from "./AnimateIn";
import portfolioData from "@/data/portfolio.json";

type EduRecord = (typeof portfolioData.education)[number];

function EducationCard({ edu, index }: { edu: EduRecord; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <AnimateIn
      from="opacity-0 translate-y-5"
      to="opacity-100 translate-y-0"
      delay={index * 90}
    >
      <div
        className={`relative flex flex-col h-full p-8 card-lift transition-all duration-300 group border ${
          edu.highlight
            ? "border-brand-red bg-white shadow-[0_8px_32px_rgba(200,16,46,0.1)]"
            : "border-brand-lightgrey bg-white"
        }`}
      >
        {/* Top accent line */}
        <div
          className={`absolute top-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 ${
            edu.highlight ? "bg-brand-red" : "bg-brand-lightgrey"
          }`}
        />

        {/* Year badge */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="text-xs text-brand-red font-semibold tracking-widest uppercase leading-tight">
            {edu.year}
          </div>
          {edu.highlight && (
            <span className="shrink-0 inline-flex items-center gap-1 bg-brand-red text-white text-xs font-semibold px-3 py-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Featured
            </span>
          )}
        </div>

        {/* Institution */}
        <h3 className="text-xl font-serif font-bold text-brand-black mb-1 group-hover:text-brand-red transition-colors leading-snug">
          {edu.institution}
        </h3>

        {/* Degree */}
        <p className="text-sm text-brand-grey mb-3 leading-relaxed">{edu.degree}</p>

        {/* Note */}
        {edu.note && (
          <p className="text-xs text-brand-grey italic mb-4 leading-relaxed border-l-2 border-brand-lightgrey pl-3">
            {edu.note}
          </p>
        )}

        {/* Courses */}
        {edu.courses && edu.courses.length > 0 && (
          <div className="mt-auto pt-4">
            <button
              onClick={() => setExpanded((v) => !v)}
              className="text-xs text-brand-red font-semibold uppercase tracking-widest mb-3 hover:underline transition-all flex items-center gap-1"
            >
              {edu.courses.length} Courses
              <svg
                className={`w-3 h-3 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-400 ${
                expanded ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="flex flex-wrap gap-2">
                {edu.courses.map((course) => (
                  <span
                    key={course}
                    className="text-xs border border-brand-lightgrey text-brand-grey px-2.5 py-1 group-hover:border-brand-red group-hover:text-brand-red transition-colors"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </AnimateIn>
  );
}

export default function Education() {
  // Filter out Udemy entries — they're not main education entries
  const education = portfolioData.education.filter(
    (e) => !e.institution.toLowerCase().includes("udemy") && e.id !== "ma-ic"
  );

  return (
    <section id="education" className="py-24 bg-brand-offwhite overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <AnimateIn from="opacity-0 translate-y-5" to="opacity-100 translate-y-0">
          <div className="mb-12">
            <span className="text-brand-red text-xs font-semibold tracking-widest uppercase">Education</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-black mt-2">
              Academic Foundation
            </h2>
          </div>
        </AnimateIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {education.map((edu, i) => (
            <EducationCard key={edu.id} edu={edu} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
