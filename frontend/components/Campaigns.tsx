"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import projectData from "@/data/project.json";
import AnimateIn from "./AnimateIn";

const PdfProjectCarousel = dynamic(() => import("./PdfProjectCarousel"), { ssr: false });
type ProjectRecord = (typeof projectData)[number];
type ProjectView = ProjectRecord & { pdfSrc: string | null };

const parseYear = (value: string) => Number.parseInt(value, 10) || 0;

const toPdfSrc = (fileName: string) => `/projects/${encodeURIComponent(fileName)}`;

function CampaignCard({
  project,
  index,
}: {
  project: ProjectView;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`bg-white border border-brand-lightgrey card-lift overflow-hidden flex flex-col transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${(index % 3) * 100}ms` }}
    >
      <PdfProjectCarousel
        pdfSrc={project.pdfSrc}
        driveUrl={project.driveUrl}
        title={project.name}
      />

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-2">
          <span className="text-xs text-brand-red font-semibold shrink-0">{project.year}</span>
        </div>

        <h3 className="text-base font-serif font-bold text-brand-black mb-1 leading-tight">
          {project.name}
        </h3>
        <p className="text-xs text-brand-grey leading-relaxed mb-3">
          {project.description}
        </p>
        <div className="flex-1" />
      </div>
    </div>
  );
}

export default function Campaigns() {
  const projects = useMemo(
    () =>
      [...projectData]
        .map((project) => ({
          ...project,
          pdfSrc: project.fileName ? toPdfSrc(project.fileName) : null,
        }))
        .sort((a, b) => {
          const yearDiff = parseYear(b.year) - parseYear(a.year);
          if (yearDiff !== 0) return yearDiff;
          return a.name.localeCompare(b.name);
        }),
    []
  );

  return (
    <section id="campaigns" className="py-24 bg-brand-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <AnimateIn from="opacity-0 translate-y-5" to="opacity-100 translate-y-0">
          <div className="mb-12">
            <span className="text-brand-red text-xs font-semibold tracking-widest uppercase">Campaigns</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-black mt-2">
              Selected Work
            </h2>
            <p className="text-brand-grey mt-4 max-w-2xl">
              Lighter decks are previewed directly on site. Larger files open from Drive so the portfolio stays deployable and fast.
            </p>
          </div>
        </AnimateIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <CampaignCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
