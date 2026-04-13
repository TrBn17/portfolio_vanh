"use client";

import { useEffect, useRef, useState } from "react";

interface AnimateInProps {
  children: React.ReactNode;
  from?: string;
  to?: string;
  delay?: number;
  className?: string;
  /** Animate each direct child separately as it enters the viewport */
  staggerChildren?: boolean;
  /** Gap in ms between each child's animation (default 80) */
  staggerDelay?: number;
}

/**
 * Scroll-triggered fade + slide-up entrance animation.
 * SSR-safe: starts hidden, animates in after mount when element enters viewport.
 * Respects prefers-reduced-motion: no animation, content visible immediately.
 *
 * With staggerChildren=true, each direct child element gets its own
 * scroll-triggered animation so content reveals progressively as you scroll.
 */
export default function AnimateIn({
  children,
  from = "opacity-0 translate-y-5",
  to = "opacity-100 translate-y-0",
  delay = 0,
  className = "",
  staggerChildren = false,
  staggerDelay = 80,
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mq.matches);

    if (mq.matches) {
      setVisible(true);
      return;
    }

    if (staggerChildren) {
      // Stagger children individually
      const container = ref.current;
      if (!container) return;

      const childEls = Array.from(container.children) as HTMLElement[];

      // Start all children hidden
      childEls.forEach((child) => {
        child.className = `${from} ${child.className}`;
      });

      const observers: IntersectionObserver[] = [];

      childEls.forEach((child, i) => {
        const obs = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              // Apply animation with staggered delay
              const targetDelay = delay + i * staggerDelay;
              child.style.transition = `opacity 0.45s ease-out ${targetDelay}ms, transform 0.45s ease-out ${targetDelay}ms`;
              child.className = `${to} ${child.className}`;
              obs.disconnect();
            }
          },
          { threshold: 0.05, rootMargin: "0px 0px -30px 0px" }
        );
        obs.observe(child);
        observers.push(obs);
      });

      return () => observers.forEach((o) => o.disconnect());
    } else {
      // Animate the whole wrapper
      const el = ref.current;
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
      );

      observer.observe(el);
      return () => observer.disconnect();
    }
  }, [from, to, delay, staggerChildren, staggerDelay]);

  const transitionStyle = prefersReduced
    ? "none"
    : `opacity 0.5s ease-out ${delay}ms, transform 0.5s ease-out ${delay}ms`;

  if (staggerChildren) {
    return (
      <div
        ref={ref}
        className={className}
        style={{ transition: prefersReduced ? "none" : undefined }}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{ transition: transitionStyle }}
    >
      <div className={visible ? to : from} aria-hidden={!visible}>
        {children}
      </div>
    </div>
  );
}
