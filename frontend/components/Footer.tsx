"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-8 bg-brand-black border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <a href="#about" className="font-serif text-lg font-bold text-white hover:text-brand-red transition-colors">
            VA<span className="text-brand-red">.</span>
          </a>

          <p className="text-xs text-neutral-500">
            © {year} Pham Thi Van Anh
          </p>

          <div className="flex items-center gap-6">
            <a
              href="https://www.linkedin.com/in/pham-thi-van-anh-072265232/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-neutral-500 hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="mailto:vananhcindy02@gmail.com"
              className="text-xs text-neutral-500 hover:text-white transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}