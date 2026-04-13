import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-brand-black overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-black via-neutral-900 to-neutral-800" />

      {/* Dot texture */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Red accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-red" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-32 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: Text */}
        <div>
          <div className="inline-block border border-brand-red px-3 py-1 mb-6">
            <span className="text-brand-red text-xs font-semibold tracking-widest uppercase">
              Portfolio 2026
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-black text-white leading-none mb-4">
            Pham Thi<br />
            <span className="text-brand-red">Van Anh</span>
          </h1>

          <div className="w-16 h-1 bg-brand-red mb-6" />

          <p className="text-lg md:text-xl text-neutral-300 font-light leading-relaxed max-w-md mb-4">
            Digital Marketing Leader<br />& Campaign Strategist
          </p>

          <p className="text-sm text-neutral-500 italic mb-10">
            Creative. Data-Driven. Results-Focused.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#experience"
              className="bg-brand-red text-white px-8 py-3 text-sm font-semibold hover:bg-white hover:text-brand-black transition-colors"
            >
              View Experience
            </a>
            <a
              href="#campaigns"
              className="border border-neutral-600 text-white px-8 py-3 text-sm font-semibold hover:border-white transition-colors"
            >
              See Campaigns
            </a>
            <a
              href="https://www.linkedin.com/in/pham-thi-van-anh-072265232/"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-neutral-600 text-white px-8 py-3 text-sm font-semibold hover:border-white transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
          </div>
        </div>

        {/* Right: Photo */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            {/* Decorative rings */}
            <div className="absolute -inset-4 border border-brand-red rounded-full opacity-30" />
            <div className="absolute -inset-8 border border-neutral-600 rounded-full opacity-20" />

            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-brand-red">
              <Image
                src="/assets/Van_Anh.png"
                alt="Pham Thi Van Anh"
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            {/* Status badge */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-brand-red text-white text-xs font-semibold px-4 py-1.5 whitespace-nowrap">
              Available Apr – Dec 2026
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-500">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-neutral-600 animate-pulse" />
      </div>
    </section>
  );
}
