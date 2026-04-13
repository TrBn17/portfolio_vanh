const education = [
  {
    id: "essec",
    institution: "ESSEC Business School",
    degree: "MSc in Marketing Management & Digital",
    year: "2025 – 2026",
    note: "Admitted with scholarship · QS Business Master's Ranking #2 (2023–2025) · GPA: 17.22/20",
    highlight: true,
    courses: ["Consumer Behavior", "Digital Marketing", "Brand Strategy", "Market Research", "Data & Prep Insight", "Luxury Retail Management"],
  },
  {
    id: "dav-bachelor",
    institution: "Diplomatic Academy of Vietnam",
    degree: "Bachelor of International Communication & Culture",
    year: "2020 – 2023",
    note: "GPA: 3.62/4.0 — Top 5% of cohort",
    highlight: false,
    courses: ["Integrated Marketing Communications", "PR Strategy", "Event Management", "Brand Management"],
  },
  {
    id: "tm-case",
    institution: "Tomorrow Marketers",
    degree: "Marketing Course — Case Master",
    year: "2023 – 2024",
    note: null,
    highlight: false,
    courses: [],
  },
  {
    id: "upenn",
    institution: "University of Pennsylvania",
    degree: "Business & Marketing Certification",
    year: "2023",
    note: null,
    highlight: false,
    courses: [],
  },
];

export default function Education() {
  return (
    <section id="education" className="py-24 bg-brand-offwhite">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-12">
          <span className="text-brand-red text-xs font-semibold tracking-widest uppercase">Education</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-black mt-2">
            Academic Foundation
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {education.map((edu) => (
            <div
              key={edu.id}
              className={`p-8 border ${edu.highlight ? "border-brand-red bg-white" : "border-brand-lightgrey bg-white"}`}
            >
              {edu.highlight && (
                <div className="inline-block bg-brand-red text-white text-xs font-semibold px-3 py-1 mb-4">
                  Featured
                </div>
              )}
              <div className="text-xs text-brand-red font-semibold tracking-widest uppercase mb-2">{edu.year}</div>
              <h3 className="text-xl font-serif font-bold text-brand-black mb-1">{edu.institution}</h3>
              <p className="text-sm text-brand-grey mb-3">{edu.degree}</p>
              {edu.note && <p className="text-xs text-brand-grey italic mb-4">{edu.note}</p>}
              {edu.courses.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {edu.courses.map((course) => (
                    <span key={course} className="text-xs bg-brand-lightgrey text-brand-grey px-2 py-1">
                      {course}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}