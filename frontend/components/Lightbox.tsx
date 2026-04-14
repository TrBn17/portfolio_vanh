"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type LightboxProps = {
  src: string;
  alt: string;
  onClose: () => void;
};

export function Lightbox({ src, alt, onClose }: LightboxProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    const frame = window.requestAnimationFrame(() => setVisible(true));
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("keydown", handler);
      setMounted(false);
    };
  }, [onClose]);

  const handleClose = () => {
    setVisible(false);
    window.setTimeout(onClose, 180);
  };

  if (!mounted) {
    return null;
  }

  return createPortal(
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 transition-all duration-200 ${
        visible ? "bg-black/88 backdrop-blur-sm opacity-100" : "bg-black/0 opacity-0"
      }`}
      onClick={handleClose}
    >
      <button
        onClick={handleClose}
        className={`absolute top-4 right-4 z-10 text-white hover:text-brand-red transition-all duration-200 ${
          visible ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
        }`}
        aria-label="Close lightbox"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div
        className={`relative w-full max-w-6xl transition-all duration-300 ease-out ${
          visible ? "scale-100 translate-y-0 opacity-100" : "scale-[0.96] translate-y-4 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={src}
          alt={alt}
          width={1800}
          height={1200}
          className="max-h-[88vh] w-full object-contain rounded-md"
          unoptimized
        />
        <p className="text-white/60 text-sm text-center mt-3">{alt}</p>
      </div>
    </div>,
    document.body
  );
}

type ImageCardProps = {
  src: string;
  alt: string;
  onImageClick?: () => void;
};

export function CampaignImageCard({ src, alt, onImageClick }: ImageCardProps) {
  return (
    <div
      className="relative h-64 w-full overflow-hidden bg-[#f2f0eb] cursor-zoom-in group"
      onClick={onImageClick}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        unoptimized
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-3">
        <span className="text-white text-xs font-semibold flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
          </svg>
          Click to enlarge
        </span>
      </div>
    </div>
  );
}
