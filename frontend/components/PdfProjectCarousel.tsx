"use client";

import { useEffect, useState } from "react";

type PdfProjectCarouselProps = {
  pdfSrc: string | null;
  driveUrl?: string;
  title: string;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export default function PdfProjectCarousel({ pdfSrc, driveUrl, title }: PdfProjectCarouselProps) {
  const [totalPages, setTotalPages] = useState<number | null>(null);

  useEffect(() => {
    if (!pdfSrc) {
      setTotalPages(null);
      return;
    }

    let isCancelled = false;

    const loadPdfPageCount = async () => {
      try {
        setTotalPages(null);
        const response = await fetch(pdfSrc);
        const buffer = await response.arrayBuffer();
        const { PDFDocument } = await import("pdf-lib");
        const document = await PDFDocument.load(buffer, { ignoreEncryption: true });
        if (!isCancelled) {
          const pages = Math.max(document.getPageCount(), 1);
          setTotalPages(pages);
        }
      } catch {
        if (!isCancelled) {
          setTotalPages(1);
        }
      }
    };

    loadPdfPageCount();
    return () => {
      isCancelled = true;
    };
  }, [pdfSrc]);

  const maxPage = clamp(totalPages ?? 1, 1, Number.MAX_SAFE_INTEGER);

  if (!pdfSrc) {
    return (
      <div className="border-b border-brand-lightgrey bg-[#f7f5f1]">
        <div className="relative flex aspect-video w-full items-end overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(185,28,28,0.15),_transparent_38%),linear-gradient(135deg,_#1a1a1a,_#442222_52%,_#f4eee6)] p-6">
          <div className="max-w-xs">
            <div className="mb-3 text-[11px] uppercase tracking-[0.22em] text-white/60">
              Extended deck
            </div>
            <h4 className="font-serif text-2xl font-bold leading-tight text-white">
              {title}
            </h4>
            <p className="mt-3 text-sm leading-relaxed text-white/78">
              This deck is hosted on Drive instead of Git to keep the site lightweight and deploy-safe.
            </p>
          </div>
        </div>

        <div className="px-4 py-3 flex items-center justify-between gap-3">
          <div className="text-[11px] text-brand-grey uppercase tracking-[0.2em]">
            Available in Drive
          </div>

          {driveUrl ? (
            <a
              href={driveUrl}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] border border-brand-lightgrey hover:border-brand-red hover:text-brand-red transition-colors"
              aria-label={`Open ${title} in Google Drive`}
            >
              More in Drive
            </a>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className="border-b border-brand-lightgrey bg-[#f7f5f1]">
      <div className="relative w-full aspect-video bg-[#ede8de] overflow-hidden block group">
        <iframe
          key={`${pdfSrc}-preview`}
          src={`${pdfSrc}#page=1&view=FitH`}
          title={`${title} first page preview`}
          className="h-full w-full border-0"
        />
      </div>

      <div className="px-4 py-3 flex items-center justify-between gap-3">
        <div className="text-[11px] text-brand-grey uppercase tracking-[0.2em]">
          Total pages: {maxPage}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={pdfSrc}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] border border-brand-lightgrey hover:border-brand-red hover:text-brand-red transition-colors"
            aria-label={`Open ${title} PDF in new tab`}
          >
            Open PDF
          </a>
        </div>
      </div>
    </div>
  );
}
