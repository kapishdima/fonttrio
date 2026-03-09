"use client";

import { useEffect, useRef } from "react";

interface UseParallaxOptions {
  speed?: number; // multiplier for scroll offset (default 0.6)
  fadeDistance?: number; // px of scroll before fully faded (default 250)
}

export function useParallax<T extends HTMLElement = HTMLDivElement>({
  speed = 0.6,
  fadeDistance = 250,
}: UseParallaxOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleScroll = () => {
      const el = ref.current;
      if (!el) return;
      const y = window.scrollY;
      el.style.transform = `translateY(${-y * speed}px)`;
      el.style.opacity = `${Math.max(0, 1 - y / fadeDistance)}`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed, fadeDistance]);

  return ref;
}
