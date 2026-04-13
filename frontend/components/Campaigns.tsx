"use client";
import { useState } from "react";
import { Lightbox, CampaignImageCard } from "./Lightbox";

const campaigns = [
  {
    id: "sephora",
    name: "Soirée by Sephora",
    brand: "Sephora",
    year: 2024,
    category: "Brand Launch",
    tagline: "An evening to remember",
    summary:
      "Premium campaign concept for Sephora's nightwear collection launch. Positioned around luxury self-care rituals with a 'Soirée' evening party narrative, KOL activation, and premium event concept.",
    channels: ["Instagram", "TikTok", "KOL/Influencer", "Event Activation"],
    image: "/assets/Sephora_project.png",
  },
  {
    id: "abinbev",
    name: "AB InBev Market Expansion",
    brand: "AB InBev",
    year: 2024,
    category: "Market Penetration",
    tagline: "Brewing connection, building share",
    summary:
      "Strategic market penetration campaign for AB InBev's beer portfolio targeting the Vietnamese market. Data-driven consumer segmentation, on-trade activation, and retail partnership strategy.",
    channels: ["On-trade", "Retail", "Digital Advertising", "PR"],
    image: "/assets/Abinbev's new product.png",
  },
  {
    id: "momo",
    name: "MoMo Super App Growth",
    brand: "MoMo",
    year: 2024,
    category: "Product & Growth",
    tagline: "New features, new possibilities",
    summary:
      "Growth marketing campaign for MoMo's new feature set — gifting, digital card creation, and payments. Gamified onboarding, referral programs, and in-app notification strategy for Vietnam's largest e-wallet.",
    channels: ["In-App", "Social Media", "Referral Programs", "Push Notifications"],
    image: "/assets/Momo's increasing users campaign.png",
  },
  {
    id: "dyson",
    name: "Dyson Love Edition 2026",
    brand: "Dyson",
    year: 2026,
    category: "Brand Campaign",
    tagline: "The Love Edition",
    summary:
      "Campaign concept for Dyson's 'Love Edition' 2026 launch. Vanity hub strategy, ritual design language, and gifting season activation positioning Dyson as emotional gift items for affluent Vietnamese consumers.",
    channels: ["Digital Advertising", "Luxury Retail", "Social Media", "KOL/Influencer"],
    image: "/assets/2026 launch campaign dyson love edition vanity hub.png",
  },
  {
    id: "pnj-tiktok",
    name: "PNJ × TikTok — Discover My Character",
    brand: "PNJ",
    year: 2023,
    category: "Social Campaign",
    tagline: "Discover My Character",
    summary:
      "Multi-channel brand campaign for PNJ jewellery in partnership with TikTok. Centered on a self-expression TikTok challenge, KOL activation, and offline event to modernize PNJ for Gen Z.",
    channels: ["TikTok", "Instagram", "KOL/Influencer", "Offline Event"],
    image: "/assets/campaign for launching DNA collection of style by PNJ.png",
  },
  {
    id: "nft-market",
    name: "NFT Market Development — Vietnam",
    brand: "Self / Research",
    year: 2023,
    category: "New Market Strategy",
    tagline: null,
    summary:
      "Strategic campaign for developing NFT market presence in Vietnam. Market research, Web3 community building via Discord/Telegram, and education strategy to drive adoption among Vietnamese early adopters.",
    channels: ["Discord", "Telegram", "Content Marketing", "Community Events"],
    image: "/assets/list_campaign.png",
  },
  {
    id: "glaze-launch",
    name: "Glaze New Product Launch",
    brand: "Glaze",
    year: 2023,
    category: "Growth & Launch",
    tagline: "From launch to scale",
    summary:
      "Multi-product launch framework combining TikTok teaser, Instagram launch, B2B partnership seeding, and event amplification. Scalable campaign structure for consumer product launches across categories.",
    channels: ["TikTok", "Instagram", "B2B Partnerships", "Events"],
    image: "/assets/Glaze's new product launching campaign.png",
  },
  {
    id: "airport-food",
    name: "Last Bite Best Bite",
    brand: "Airport Food MVP",
    year: 2023,
    category: "Brand MVP",
    tagline: "Last Bite Best Bite",
    summary:
      "MVP concept and launch campaign for an airport food brand focused on authentic local cuisine. Brand identity, pop-up activation strategy, and traveller engagement framework for transit travellers.",
    channels: ["Pop-up Store", "Airport Retail", "Social Media"],
    image: "/assets/lauinching airport's food pop up store.png",
  },
  {
    id: "violent-comm",
    name: "Violent vs. Compassionate Communication",
    brand: "Self / CSR",
    year: 2024,
    category: "Strategy Framework",
    tagline: "Communication that connects",
    summary:
      "Comprehensive communication strategy framework contrasting violent vs. compassionate communication styles. Trigger identification, empathy-based response frameworks, and scenario guides for professional application.",
    channels: ["Training Materials", "Internal Comms", "CSR"],
    image: "/assets/violent communication protest strategy.png",
  },
];

export default function Campaigns() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [lightboxAlt, setLightboxAlt] = useState("");

  return (
    <>
      {lightboxSrc && (
        <Lightbox
          src={lightboxSrc}
          alt={lightboxAlt}
          onClose={() => setLightboxSrc(null)}
        />
      )}

      <section id="campaigns" className="py-24 bg-brand-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-12">
            <span className="text-brand-red text-xs font-semibold tracking-widest uppercase">Campaigns</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-black mt-2">
              Selected Work
            </h2>
            <p className="text-brand-grey mt-4 max-w-2xl">
              A curated selection of brand, social, and growth marketing campaigns spanning luxury, fintech, F&amp;B, retail, and emerging categories.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((c) => (
              <div
                key={c.id}
                className="bg-white border border-brand-lightgrey hover:border-brand-red hover:shadow-lg transition-all flex flex-col overflow-hidden"
              >
                {/* Image — click to enlarge */}
                <CampaignImageCard
                  src={c.image}
                  alt={c.name}
                  onImageClick={() => {
                    setLightboxSrc(c.image);
                    setLightboxAlt(c.name);
                  }}
                />

                {/* Card body */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="text-xs text-brand-grey uppercase tracking-widest font-semibold">{c.category}</span>
                    <span className="text-xs text-brand-red font-semibold shrink-0">{c.year}</span>
                  </div>

                  <h3 className="text-base font-serif font-bold text-brand-black mb-0.5 leading-tight">{c.name}</h3>
                  <div className="text-xs text-brand-grey font-medium mb-3">{c.brand}</div>

                  {c.tagline && (
                    <p className="text-xs italic text-brand-red mb-3">"{c.tagline}"</p>
                  )}

                  <p className="text-xs text-brand-grey leading-relaxed mb-4 flex-1">{c.summary}</p>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-brand-lightgrey">
                    {c.channels.map((ch) => (
                      <span key={ch} className="text-xs border border-brand-lightgrey text-brand-grey px-2 py-0.5">
                        {ch}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
