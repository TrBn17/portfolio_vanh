"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

interface AnimateInProps {
  children: ReactNode;
  from?: string;
  to?: string;
  delay?: number;
  className?: string;
  staggerChildren?: boolean;
  staggerDelay?: number;
}

const parseMotionClasses = (input: string) => {
  const classes = input.split(/\s+/).filter(Boolean);
  const style: CSSProperties = {};

  for (const token of classes) {
    if (token === "opacity-0") style.opacity = 0;
    if (token === "opacity-100") style.opacity = 1;
    if (token === "translate-y-0") style.transform = "translate3d(0, 0, 0)";
    if (token === "translate-y-3") style.transform = "translate3d(0, 0.75rem, 0)";
    if (token === "translate-y-4") style.transform = "translate3d(0, 1rem, 0)";
    if (token === "translate-y-5") style.transform = "translate3d(0, 1.25rem, 0)";
    if (token === "-translate-y-3") style.transform = "translate3d(0, -0.75rem, 0)";
    if (token === "scale-[0.98]") style.transform = "scale(0.98)";
    if (token === "scale-100") style.transform = "scale(1)";
  }

  return style;
};

export default function AnimateIn({
  children,
  from = "opacity-0 translate-y-5",
  to = "opacity-100 translate-y-0",
  delay = 0,
  className = "",
  staggerChildren = false,
  staggerDelay = 90,
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (event: MediaQueryListEvent) => setPrefersReduced(event.matches);

    setPrefersReduced(mediaQuery.matches);
    mediaQuery.addEventListener("change", onChange);

    if (mediaQuery.matches) {
      setVisible(true);
      return () => mediaQuery.removeEventListener("change", onChange);
    }

    const element = ref.current;
    if (!element) {
      return () => mediaQuery.removeEventListener("change", onChange);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener("change", onChange);
    };
  }, []);

  const fromStyle = parseMotionClasses(from);
  const toStyle = parseMotionClasses(to);
  const transitionBase = prefersReduced
    ? "none"
    : "opacity 720ms cubic-bezier(0.22, 1, 0.36, 1), transform 720ms cubic-bezier(0.22, 1, 0.36, 1)";

  if (staggerChildren) {
    const items = Array.isArray(children) ? children : [children];

    return (
      <div ref={ref} className={className}>
        {items.map((child, index) => (
          <div
            key={index}
            style={
              visible || prefersReduced
                ? {
                    ...toStyle,
                    transition: transitionBase,
                    transitionDelay: `${delay + index * staggerDelay}ms`,
                    willChange: "opacity, transform",
                  }
                : {
                    ...fromStyle,
                    transition: transitionBase,
                    transitionDelay: `${delay + index * staggerDelay}ms`,
                    willChange: "opacity, transform",
                  }
            }
          >
            {child}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={className}
      style={
        visible || prefersReduced
          ? {
              ...toStyle,
              transition: transitionBase,
              transitionDelay: `${delay}ms`,
              willChange: "opacity, transform",
            }
          : {
              ...fromStyle,
              transition: transitionBase,
              transitionDelay: `${delay}ms`,
              willChange: "opacity, transform",
            }
      }
    >
      {children}
    </div>
  );
}
