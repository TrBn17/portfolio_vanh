"use client";

export default function About() {
  return (
    <section id="about" className="py-24 bg-brand-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Heading */}
          <div>
            <span className="text-brand-red text-xs font-semibold tracking-widest uppercase mb-4 block">
              About
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-black mb-6 leading-tight">
              Bridging Creative Vision<br />with Measurable Results
            </h2>
            <div className="w-16 h-1 bg-brand-red mb-8" />

            <div className="space-y-4 text-brand-grey leading-relaxed">
              <p>
                A digital marketing leader with a passion for building brand narratives that connect and convert.
                With hands-on experience leading campaigns for global brands and high-growth startups, I bridge the
                gap between creative vision and measurable results.
              </p>
              <p>
                Trained in international communications and marketing strategy at ESSEC Business School and the
                Diplomatic Academy of Vietnam, I thrive in environments that demand both analytical rigour and
                bold storytelling.
              </p>
              <p>
                My work spans B2B and B2C contexts — from managing 450-person international events at Dell
                Technologies to scaling LinkedIn communities to 46,000+ at DarkHorseStocks — with a consistent
                track record of delivering measurable impact.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-10">
              {[
                { value: "5+", label: "Years Experience" },
                { value: "9+", label: "Campaigns Led" },
                { value: "46k+", label: "LinkedIn Reach" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-serif font-bold text-brand-red">{stat.value}</div>
                  <div className="text-xs text-brand-grey mt-1 uppercase tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Quick Facts */}
          <div className="space-y-6">
            {[
              {
                label: "Location",
                value: "Singapore",
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                ),
              },
              {
                label: "Education",
                value: "MSc ESSEC Business School (Scholar)",
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                ),
              },
              {
                label: "Availability",
                value: "April – December 2026",
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ),
              },
              {
                label: "Pass Valid",
                value: "Until January 2027",
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
              },
              {
                label: "Email",
                value: "vananhcindy02@gmail.com",
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
              },
              {
                label: "Phone",
                value: "+65 81586466",
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                ),
              },
            ].map((fact) => (
              <div key={fact.label} className="flex items-start gap-4 p-4 bg-brand-offwhite border border-brand-lightgrey">
                <div className="text-brand-red mt-0.5">{fact.icon}</div>
                <div>
                  <div className="text-xs text-brand-grey uppercase tracking-wide font-semibold mb-0.5">{fact.label}</div>
                  <div className="text-sm font-medium text-brand-black">{fact.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}