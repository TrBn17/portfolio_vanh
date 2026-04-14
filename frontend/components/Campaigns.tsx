"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import portfolioData from "@/data/portfolio.json";
import { CampaignImageCard, Lightbox } from "./Lightbox";
import AnimateIn from "./AnimateIn";

const CAMPAIGN_IMAGE_MAP: Record<string, string | null> = {
  dyson: "/assets/2026 launch campaign dyson love edition vanity hub.png",
  sephora: "/assets/Sephora_project.png",
  abinbev: "/assets/Abinbev's new product.png",
  momo: "/assets/Momo's increasing users campaign.png",
  "violent-comm": "/assets/violent communication protest strategy.png",
  "pnj-tiktok": "/assets/campaign for launching DNA collection of style by PNJ.png",
  "new-product-launch": "/assets/Glaze's new product launching campaign.png",
  "airport-food": "/assets/lauinching airport's food pop up store.png",
  "antique-auth": "/assets/campaign for developing nft's new market in Vietnam.png",
};

type CampaignRecord = (typeof portfolioData.campaigns)[number];

const parseYear = (value: string) => Number.parseInt(value, 10) || 0;

const cleanText = (value: string | null | undefined) =>
  (value ?? "")
    .replace(/â€"/g, '"')
    .replace(/â€™/g, "'")
    .replace(/Ã©/g, "é")
    .replace(/Ã—/g, "×")
    .replace(/â"/g, "—")
    .trim();

function CampaignCard({
  campaign,
  index,
  onLightbox,
}: {
  campaign: ReturnType<typeof buildCampaign>;
  index: number;
  onLightbox: (src: string, alt: string) => void;
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
      <CampaignImageCard
        src={campaign.image!}
        alt={campaign.name}
        onImageClick={() => onLightbox(campaign.image!, campaign.name)}
      />

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-2">
          <span className="text-xs text-brand-grey uppercase tracking-widest font-semibold">
            {campaign.category}
          </span>
          <span className="text-xs text-brand-red font-semibold shrink-0">{campaign.year}</span>
        </div>

        <h3 className="text-base font-serif font-bold text-brand-black mb-1 leading-tight">
          {campaign.name}
        </h3>
        <div className="text-xs text-brand-grey font-medium mb-3">{campaign.brand}</div>

        {campaign.tagline && (
          <p className="text-xs italic text-brand-red mb-3">"{campaign.tagline}"</p>
        )}

        <p className="text-xs text-brand-grey leading-relaxed mb-3">
          {campaign.description}
        </p>
        <p className="text-xs text-brand-black leading-relaxed mb-4 flex-1">
          {campaign.strategy}
        </p>

        <div className="pt-3 border-t border-brand-lightgrey flex items-center justify-end gap-3 text-xs">
          {campaign.featured && (
            <span className="bg-brand-red text-white px-2.5 py-1 font-semibold uppercase tracking-wide">
              Featured
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function buildCampaign(c: CampaignRecord) {
  return {
    ...c,
    image: CAMPAIGN_IMAGE_MAP[c.id] ?? null,
    name: cleanText(c.name),
    brand: cleanText(c.brand),
    category: cleanText(c.category),
    tagline: cleanText(c.tagline),
    description: cleanText(c.description),
    strategy: cleanText(c.strategy),
  };
}

export default function Campaigns() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [lightboxAlt, setLightboxAlt] = useState("");

  const campaigns = useMemo(
    () =>
      [...portfolioData.campaigns]
        .sort((a: CampaignRecord, b: CampaignRecord) => {
          const yearDiff = parseYear(b.year) - parseYear(a.year);
          if (yearDiff !== 0) return yearDiff;
          if (a.featured !== b.featured) return Number(b.featured) - Number(a.featured);
          return cleanText(a.name).localeCompare(cleanText(b.name));
        })
        .map(buildCampaign),
    []
  );

  return (
    <section id="campaigns" className="py-24 bg-brand-white overflow-hidden">
      {lightboxSrc && (
        <Lightbox src={lightboxSrc} alt={lightboxAlt} onClose={() => setLightboxSrc(null)} />
      )}
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <AnimateIn from="opacity-0 translate-y-5" to="opacity-100 translate-y-0">
          <div className="mb-12">
            <span className="text-brand-red text-xs font-semibold tracking-widest uppercase">Campaigns</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-black mt-2">
              Selected Work
            </h2>
            <p className="text-brand-grey mt-4 max-w-2xl">
              Ordered from newest to oldest, with each visual matched only to the campaign it actually represents.
            </p>
          </div>
        </AnimateIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign, index) => (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              index={index}
              onLightbox={(src, alt) => { setLightboxSrc(src); setLightboxAlt(alt); }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
