"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import portfolioData from "@/data/portfolio.json";
import { Lightbox } from "./Lightbox";
import AnimateIn from "./AnimateIn";

type ExperienceGalleryItem = {
  src: string;
  label: string;
};

const EXPERIENCE_IMAGE_MAP: Record<string, ExperienceGalleryItem[]> = {
  ferrero: [{ src: "/logo/ferrero.png", label: "Ferrero logo" }],
  darkhorse: [
    { src: "/logo/DarkHorseStocks.png", label: "DarkHorseStocks logo" },
  ],
  uniqlo: [
    { src: "/logo/uniqlo.png", label: "UNIQLO logo" },
  ],
  dell: [
    { src: "/logo/Dell_technologies.png", label: "Dell Technologies logo" },
  ],
};

type ExperienceRecord = (typeof portfolioData.experience)[number];

const cleanText = (value: string | null | undefined) =>
  (value ?? "")
    .replace(/Ã¢â‚¬"|Ã¢â‚¬"/g, '"')
    .replace(/Ã¢â‚¬â„¢/g, "'")
    .replace(/Ã¢"/g, '"')
    .replace(/Ã¢â‚¬"/g, '"')
    .replace(/Ã¢"/g, "â€”")
    .replace(/ÃƒÂ©/g, "Ã©")
    .trim();

const parseStartDate = (period: string) => {
  const [start = ""] = period.split("â€”").map((part) => part.trim());
  const [month = "", year = "0"] = start.split(" ");
  const monthMap: Record<string, number> = {
    Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6,
    Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12,
  };
  return (Number.parseInt(year, 10) || 0) * 100 + (monthMap[month] || 0);
};

function ExpImageReveal({
  image,
  company,
  role,
  onLightbox,
}: {
  image: ExperienceGalleryItem;
  company: string;
  role: string;
  onLightbox: (src: string, alt: string) => void;
}) {
  return (
    <div
      onClick={() => onLightbox(image.src, `${company} — ${role}`)}
      className="relative block w-full cursor-zoom-in group overflow-hidden bg-white text-left exp-image-wrap border-b border-brand-lightgrey"
      style={{ height: "clamp(180px, 24vw, 240px)" }}
    >
      <div className="absolute inset-0 flex items-center justify-center p-6 md:p-8">
        <Image
          src={image.src}
          alt={`${company} logo`}
          fill
          className="object-contain transition-transform duration-500 scale-100 group-hover:scale-[1.02]"
          sizes="(max-width: 1024px) 100vw, 1200px"
          unoptimized
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-brand-black/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-12 h-12 bg-brand-red/90 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
          </svg>
        </div>
      </div>
      <div className="absolute right-4 bottom-3">
        <div className="hidden md:block text-[11px] uppercase tracking-[0.2em] text-brand-grey">
          Click to expand
        </div>
      </div>
    </div>
  );
}

function buildExp(exp: ExperienceRecord) {
  const images = EXPERIENCE_IMAGE_MAP[exp.id] ?? [];

  return {
    ...exp,
    images,
    company: cleanText(exp.company),
    role: cleanText(exp.role),
    period: cleanText(exp.period),
    location: cleanText(exp.location),
    type: cleanText(exp.type),
    description: cleanText(exp.description),
    highlights: exp.highlights.map(cleanText),
    metrics: exp.metrics.map((m) => ({ ...m, value: cleanText(m.value), label: cleanText(m.label) })),
  };
}

export default function Experience() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [lightboxAlt, setLightboxAlt] = useState("");
  const [selectedVisuals, setSelectedVisuals] = useState<Record<string, number>>({});

  const experiences = useMemo(
    () =>
      [...portfolioData.experience]
        .map(buildExp)
        .sort((a, b) => parseStartDate(b.period) - parseStartDate(a.period)),
    []
  );

  return (
    <section id="experience" className="py-24 bg-brand-offwhite overflow-hidden">
      {lightboxSrc && (
        <Lightbox src={lightboxSrc} alt={lightboxAlt} onClose={() => setLightboxSrc(null)} />
      )}

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <AnimateIn from="opacity-0 translate-y-5" to="opacity-100 translate-y-0">
          <div className="mb-12">
            <span className="text-brand-red text-xs font-semibold tracking-widest uppercase">
              Experience
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-black mt-2">
              Career History
            </h2>
            <p className="text-brand-grey mt-4 max-w-2xl">
              Sorted from latest to earliest, with visuals shown only where they directly match the role.
            </p>
          </div>
        </AnimateIn>

        <div className="space-y-8">
          {experiences.map((exp, index) => {
            const selectedIndex = selectedVisuals[exp.id] ?? 0;
            const activeImage = exp.images[selectedIndex] ?? null;

            return (
              <AnimateIn
                key={exp.id}
                from="opacity-0 translate-y-5"
                to="opacity-100 translate-y-0"
                delay={index * 80}
              >
                <article className="bg-white border border-brand-lightgrey hover:border-brand-red card-lift overflow-hidden transition-colors duration-400">
                  {activeImage && (
                    <>
                      <ExpImageReveal
                        image={activeImage}
                        company={exp.company}
                        role={exp.role}
                        onLightbox={(src, alt) => {
                          setLightboxSrc(src);
                          setLightboxAlt(alt);
                        }}
                      />
                      {exp.images.length > 1 && (
                        <div className="flex flex-wrap gap-2 px-6 lg:px-8 py-4 border-b border-brand-lightgrey bg-[#f7f5f1]">
                          {exp.images.map((image, imageIndex) => (
                            <button
                              key={image.src}
                              type="button"
                              onClick={() =>
                                setSelectedVisuals((current) => ({ ...current, [exp.id]: imageIndex }))
                              }
                              className={`px-3 py-2 text-[11px] uppercase tracking-[0.18em] border transition-colors duration-300 ${
                                imageIndex === selectedIndex
                                  ? "border-brand-red bg-brand-red text-white"
                                  : "border-brand-lightgrey bg-white text-brand-grey hover:border-brand-red hover:text-brand-red"
                              }`}
                            >
                              {image.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  )}

                  <div className="p-6 lg:p-8">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-xl font-serif font-bold text-brand-black">
                            {exp.company}
                          </h3>
                          {index === 0 && (
                            <span className="bg-brand-red text-white text-xs font-semibold px-2 py-0.5 animate-bounce-root">
                              Latest
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-brand-red font-medium">{exp.role}</p>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-xs text-brand-red font-semibold tracking-widest uppercase">
                          {exp.period}
                        </div>
                        <div className="text-xs text-brand-grey mt-1">{exp.location}</div>
                        <div className="inline-block text-xs font-semibold px-2 py-1 mt-2 bg-neutral-100 text-brand-grey">
                          {exp.type}
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-brand-grey mb-4 leading-relaxed">{exp.description}</p>

                    <ul className="space-y-2 mb-6">
                      {exp.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-start gap-3 text-sm text-brand-black">
                          <span className="text-brand-red mt-1.5 shrink-0">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 8 8">
                              <path d="M0 4l4 4 4-4H0z" />
                            </svg>
                          </span>
                          {highlight}
                        </li>
                      ))}
                    </ul>

                    {exp.metrics.length > 0 && (
                      <div className="flex flex-wrap gap-6 pt-4 border-t border-brand-lightgrey">
                        {exp.metrics.map((metric) => (
                          <div key={metric.label} className="text-center group/metric">
                            <div className="text-2xl font-serif font-bold text-brand-red counter-pop">
                              {metric.value}
                            </div>
                            <div className="text-xs text-brand-grey mt-0.5 uppercase tracking-wide">
                              {metric.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              </AnimateIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
