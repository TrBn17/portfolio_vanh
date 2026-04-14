"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Education", href: "#education" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Campaigns", href: "#campaigns" },
  { label: "Awards", href: "#awards" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);

      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docH > 0 ? (y / docH) * 100 : 0);

      // Active section detection
      const sections = NAV_LINKS.map((l) => l.href.slice(1));
      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) current = id;
        }
      }
      setActiveSection(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-black/5 bg-white/88 shadow-[0_12px_32px_rgba(13,13,13,0.08)] backdrop-blur-xl"
          : "bg-white/72 backdrop-blur-md"
      }`}
    >
      {/* Scroll progress bar */}
      <div
        className="navbar-progress"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div
          className={`flex items-center justify-between transition-all duration-500 ${
            scrolled ? "h-14" : "h-16"
          }`}
        >
          {/* Logo */}
          <a
            href="#about"
            className="font-serif text-lg font-bold tracking-tight text-brand-black transition-all duration-300 hover:scale-[1.03] hover:text-brand-red"
          >
            VA<span className="text-brand-red">.</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`nav-underline text-sm font-medium transition-colors duration-300 hover:text-brand-black uppercase tracking-wide ${
                  activeSection === link.href.slice(1)
                    ? "text-brand-red active"
                    : "text-brand-grey"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right CTA */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="hidden md:inline-flex items-center bg-brand-red text-white px-5 py-2 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-black magnetic"
            >
              Get in Touch
            </a>
            <button
              className="md:hidden p-2 text-brand-black transition-transform duration-300 hover:scale-105"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-[max-height,opacity,transform] duration-500 ${
            mobileOpen
              ? "max-h-[28rem] opacity-100 translate-y-0"
              : "max-h-0 opacity-0 -translate-y-2"
          }`}
        >
          <div className="mb-4 rounded-2xl border border-brand-lightgrey bg-white/95 py-3 shadow-[0_16px_40px_rgba(13,13,13,0.08)]">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 text-sm font-medium transition-colors uppercase tracking-wide ${
                  activeSection === link.href.slice(1) ? "text-brand-red" : "text-brand-black hover:text-brand-red"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 px-4">
              <a
                href="#contact"
                className="block w-full bg-brand-red text-white text-center px-5 py-3 text-sm font-semibold transition-colors hover:bg-brand-black"
                onClick={() => setMobileOpen(false)}
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
