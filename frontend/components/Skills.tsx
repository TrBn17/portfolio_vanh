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

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-brand-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-12">
          <span className="text-brand-red text-xs font-semibold tracking-widest uppercase">Skills</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-black mt-2">
            Capabilities
          </h2>
        </div>

        <div className="space-y-10">
          {skillGroups.map((group) => (
            <div key={group.label}>
              <div className={`inline-block ${group.color} text-xs font-semibold px-3 py-1.5 mb-4 uppercase tracking-wide`}>
                {group.label}
              </div>
              <div className="flex flex-wrap gap-3">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-sm border border-brand-lightgrey px-4 py-2 text-brand-black hover:border-brand-red hover:text-brand-red transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}