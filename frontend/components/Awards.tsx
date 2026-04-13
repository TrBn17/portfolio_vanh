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

export default function Awards() {
  return (
    <section id="awards" className="py-24 bg-brand-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-12">
          <span className="text-brand-red text-xs font-semibold tracking-widest uppercase">Recognition</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mt-2">
            Awards & Honours
          </h2>
        </div>

        <div className="space-y-0">
          {awards.map((award, i) => (
            <div
              key={i}
              className="flex items-start gap-6 py-6 border-b border-neutral-800 hover:border-brand-red transition-colors group"
            >
              <div className="shrink-0 w-12 h-12 border border-brand-red flex items-center justify-center text-brand-red font-serif font-bold text-lg group-hover:bg-brand-red group-hover:text-white transition-colors">
                {award.year.slice(-2)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-brand-red font-semibold tracking-widest uppercase mb-1">
                  {award.event}
                </div>
                <h3 className="text-lg font-serif font-bold text-white">{award.name}</h3>
              </div>
              <div className="shrink-0">
                <div className="text-sm text-neutral-400 border border-neutral-700 px-3 py-1 font-semibold">
                  {award.rank}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-3 gap-8 text-center">
          {[
            { value: "3rd", label: "Vietnam Young Lion\nTop 3 / 1,200" },
            { value: "Best", label: "Japan Youth Summit\nBest Delegate" },
            { value: "2nd", label: "MA Cohort\nTop 2 / 200" },
          ].map((a) => (
            <div key={a.label} className="p-6 border border-neutral-800 text-center hover:border-brand-red transition-colors">
              <div className="text-3xl font-serif font-bold text-brand-red">{a.value}</div>
              <div className="text-xs text-neutral-500 mt-1 whitespace-pre-line">{a.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}