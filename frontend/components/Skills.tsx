"use client";

import AnimateIn from "./AnimateIn";

const skillGroups = [
  {
    label: "Marketing",
    color: "bg-brand-red text-white",
    skills: [
      "Brand Strategy", "Campaign Planning & Execution", "Content Marketing",
      "Social Media Marketing", "SEO & SEM", "Marketing Analytics",
      "Market Research", "B2B & B2C Marketing", "Influencer & KOL Marketing",
      "Email Marketing", "PR & Event Management",
    ],
  },
  {
    label: "Product",
    color: "bg-neutral-800 text-white",
    skills: [
      "Product Development", "UI/UX Fundamentals",
      "User Journey Mapping", "Feature Prioritisation",
    ],
  },
  {
    label: "Data",
    color: "bg-neutral-700 text-white",
    skills: ["Python", "Data Analysis"],
  },
  {
    label: "Business",
    color: "bg-neutral-800 text-white",
    skills: [
      "Negotiation", "Stakeholder Management", "Business Development",
      "CSR Strategy", "Team Co-Management",
    ],
  },
  {
    label: "Tools",
    color: "bg-brand-red text-white",
    skills: [
      "Google Analytics", "Google Ads", "Meta Business Suite",
      "LinkedIn Campaign Manager", "AWS SES", "HubSpot", "Mailchimp",
      "Canva", "Notion", "Zoom", "Hootsuite",
    ],
  },
  {
    label: "Soft Skills",
    color: "bg-neutral-600 text-white",
    skills: ["Communication", "Coordination", "Teamwork", "Problem Solving", "Organization"],
  },
];

// Marquee skills for continuous scroll strip
const marqueeSkills = skillGroups
  .flatMap((g) => g.skills)
  .concat(skillGroups.flatMap((g) => g.skills));

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-brand-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <AnimateIn from="opacity-0 translate-y-5" to="opacity-100 translate-y-0">
          <div className="mb-12">
            <span className="text-brand-red text-xs font-semibold tracking-widest uppercase">Skills</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-black mt-2">
              Capabilities
            </h2>
          </div>
        </AnimateIn>

        {/* Skill groups */}
        <div className="space-y-10">
          {skillGroups.map((group, gi) => (
            <AnimateIn
              key={group.label}
              from="opacity-0 translate-y-5"
              to="opacity-100 translate-y-0"
              delay={gi * 80}
            >
              <div>
                <div className={`inline-flex items-center gap-2 ${group.color} text-xs font-semibold px-3 py-1.5 mb-4 uppercase tracking-wide`}>
                  {group.label}
                </div>
                <div className="flex flex-wrap gap-3">
                  {group.skills.map((skill, si) => (
                    <span
                      key={skill}
                      className="text-sm border border-brand-lightgrey px-4 py-2 text-brand-black card-lift red-glow-border hover:border-brand-red hover:text-brand-red cursor-default transition-colors"
                      style={{ transitionDelay: `${si * 30}ms` }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>

        {/* Continuous marquee strip */}
        <div className="mt-20">
          <AnimateIn from="opacity-0" to="opacity-100" delay={200}>
            <div className="text-xs text-brand-grey font-semibold tracking-widest uppercase mb-6 text-center">
              Keywords
            </div>
          </AnimateIn>
          <div className="marquee-wrapper border-y border-brand-lightgrey py-4">
            <div className="marquee-track">
              {[...marqueeSkills, ...marqueeSkills].map((skill, i) => (
                <span
                  key={i}
                  className={`flex items-center gap-3 px-6 text-sm whitespace-nowrap ${
                    i % 5 === 0 ? "text-brand-red font-semibold" : "text-brand-grey"
                  }`}
                >
                  <span className="w-1 h-1 rounded-full bg-brand-red shrink-0" />
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
