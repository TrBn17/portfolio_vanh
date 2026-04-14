"use client";

import Image from "next/image";
import { useState } from "react";
import { Lightbox } from "./Lightbox";

const EXPERIENCES = [
  {
    id: "ferrero",
    company: "Ferrero",
    role: "Project Management Consultant",
    period: "Jan 2026 – Apr 2026",
    location: "Singapore",
    type: "Contract",
    highlight: true,
    description:
      "Consumer and sales data analysis for Singapore FMCG confectionery market.",
    bullets: [
      "Conducted consumer and sales data analysis for Singapore markets",
      "Benchmarked 6 FMCG confectionery brands with SWOT analysis",
      "Identified key functional and emotional brand insights",
      "Developed marketing activation strategy integrating digital engagement and experiential campaigns",
    ],
    metrics: [
      { value: "6", label: "Brands Benchmarked" },
      { value: "3", label: "Months" },
    ],
    image: null,
  },
  {
    id: "darkhorse",
    company: "DarkHorseStocks",
    role: "Digital Marketing Project Manager",
    period: "Jul 2024 – Jul 2025",
    location: "Singapore / India",
    type: "Full-time",
    highlight: false,
    description:
      "Led digital marketing strategy for an international fintech startup focused on data-driven investment analytics.",
    bullets: [
      "Managed multi-channel campaigns to 15k+ Telegram, 7.6k Instagram, 5.2k Twitter",
      "Built email marketing automation system using AWS SES and CI/CD infrastructure",
      "Scaled LinkedIn to 46,000+ subscribers and WhatsApp network to 35,000+",
      "Built automated reporting dashboards tracking engagement and conversion KPIs",
    ],
    metrics: [
      { value: "46k+", label: "LinkedIn" },
      { value: "35k+", label: "WhatsApp" },
      { value: "15k+", label: "Telegram" },
    ],
    image: "/assets/Darkhorsestocks_1.png",
  },
  {
    id: "uniqlo",
    company: "UNIQLO Vietnam",
    role: "UNIQLO Manager Candidate / Assistant Store Manager",
    period: "Jun 2023 – Jun 2024",
    location: "Japan / Vietnam",
    type: "Program",
    highlight: false,
    description:
      "Retail management and customer experience leadership across Japan and Vietnam markets.",
    bullets: [
      "Managed daily store operations generating 75,000+ items with high inventory accuracy",
      "Led and trained a team of 54 staff, improving customer service efficiency",
      "Implemented weekly sales and merchandising strategies contributing to 112% sales growth",
      "Maintained 92–98% monthly target achievement through operational improvements",
    ],
    metrics: [
      { value: "112%", label: "Sales Growth" },
      { value: "54", label: "Staff Led" },
      { value: "92–98%", label: "Target Achievement" },
    ],
    image: null,
  },
  {
    id: "dell",
    company: "Dell Technologies",
    role: "Digital Marketing Assistant",
    period: "Apr 2022 – Apr 2023",
    location: "Singapore / Vietnam",
    type: "Full-time",
    highlight: false,
    description:
      "Global OEM solutions marketing for the Vietnam market within Dell's Asia-Pacific division.",
    bullets: [
      "Produced website content, email campaigns, PR content and social media assets",
      "Organised monthly webinars increasing engagement by 40% and conversion by 25%",
      "Tracked campaign performance from 1,000+ calls per week; analysed ~100 VIP customer records",
      "Supported international Dell events with 450+ global participants in Vietnam and Singapore",
    ],
    metrics: [
      { value: "40%", label: "Engagement ↑" },
      { value: "25%", label: "Conversion ↑" },
      { value: "450+", label: "Event Attendees" },
    ],
    image: "/assets/Work_exp_Dell_tech.png",
  },
  {
    id: "us-asean",
    company: "US-ASEAN Business Council",
    role: "PR & Communications Coordinator",
    period: "Jan 2022 – Apr 2022",
    location: "Vietnam",
    type: "Contract",
    highlight: false,
    description:
      "Coordinated public relations and communications for a US government-affiliated trade association.",
    bullets: [
      "Managed communications strategy for regional trade initiatives",
      "Coordinated event logistics for cross-border business forums",
      "Produced communications materials for member companies and media",
      "Liaised with diplomatic contacts and international business stakeholders",
    ],
    metrics: [],
    image: null,
  },
];

export default function Experience() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [lightboxAlt, setLightboxAlt] = useState("");

  return (
    <>
      {lightboxSrc && (
        <Lightbox src={lightboxSrc} alt={lightboxAlt} onClose={() => setLightboxSrc(null)} />
      )}

      <section id="experience" className="py-24 bg-brand-offwhite">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-12">
          <span className="text-brand-red text-xs font-semibold tracking-widest uppercase">
            Experience
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-black mt-2">
            Career History
          </h2>
        </div>

        <div className="space-y-8">
          {EXPERIENCES.map((exp) => (
            <div
              key={exp.id}
              className="bg-white border border-brand-lightgrey hover:border-brand-red transition-colors overflow-hidden"
            >
              {/* Full-width image banner at top — click to enlarge */}
              {exp.image && (
                <div
                  className="relative w-full cursor-zoom-in group"
                  style={{ height: "220px" }}
                  onClick={() => {
                    setLightboxSrc(exp.image!);
                    setLightboxAlt(`${exp.company} — ${exp.role}`);
                  }}
                >
                  <Image
                    src={exp.image}
                    alt={`${exp.company} work`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 800px"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-6">
                    <div className="text-white text-xl font-serif font-bold">{exp.company}</div>
                    <div className="text-white/80 text-sm">{exp.role}</div>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <span className="text-white/0 group-hover:text-white/80 text-xs font-semibold flex items-center gap-1 transition-all">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                      </svg>
                      Click to enlarge
                    </span>
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="p-6 lg:p-8">
                {!exp.image && (
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-xl font-serif font-bold text-brand-black">
                          {exp.company}
                        </h3>
                        {exp.highlight && (
                          <span className="bg-brand-red text-white text-xs font-semibold px-2 py-0.5">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-brand-red font-medium">{exp.role}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xs text-brand-red font-semibold tracking-widest uppercase">
                        {exp.period}
                      </div>
                      <div className="text-xs text-brand-grey mt-1 flex items-center justify-end gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {exp.location}
                      </div>
                      <div
                        className={`inline-block text-xs font-semibold px-2 py-1 mt-2 ${
                          exp.highlight
                            ? "bg-brand-red text-white"
                            : "bg-neutral-100 text-brand-grey"
                        }`}
                      >
                        {exp.type}
                      </div>
                    </div>
                  </div>
                )}

                {/* Meta row for image cards */}
                {exp.image && (
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <div className="text-xs text-brand-grey flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {exp.location}
                      </span>
                      <span
                        className={`font-semibold px-2 py-0.5 ${
                          exp.highlight ? "bg-brand-red text-white" : "bg-neutral-100 text-brand-grey"
                        }`}
                      >
                        {exp.type}
                      </span>
                      <span className="text-brand-red font-semibold">{exp.period}</span>
                    </div>
                    {exp.highlight && (
                      <span className="bg-brand-red text-white text-xs font-semibold px-2 py-0.5">
                        Current Role
                      </span>
                    )}
                  </div>
                )}

                <p className="text-sm text-brand-grey mb-4 leading-relaxed">{exp.description}</p>

                <ul className="space-y-2 mb-6">
                  {exp.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-brand-black">
                      <span className="text-brand-red mt-1.5 shrink-0">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 8 8">
                          <path d="M0 4l4 4 4-4H0z" />
                        </svg>
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>

                {exp.metrics.length > 0 && (
                  <div className="flex flex-wrap gap-6 pt-4 border-t border-brand-lightgrey">
                    {exp.metrics.map((m) => (
                      <div key={m.label} className="text-center">
                        <div className="text-2xl font-serif font-bold text-brand-red">{m.value}</div>
                        <div className="text-xs text-brand-grey mt-0.5 uppercase tracking-wide">{m.label}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
