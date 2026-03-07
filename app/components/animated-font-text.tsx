"use client";

import { useState, useEffect } from "react";
import type { PairingData } from "@/lib/pairings";

interface AnimatedFontTextProps {
  pairings: PairingData[];
  text: string;
  className?: string;
}

export function AnimatedFontText({ pairings, text, className = "" }: AnimatedFontTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % pairings.length);
        setIsAnimating(false);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, [pairings.length]);

  const currentPairing = pairings[currentIndex];
  const fontFamily = `"${currentPairing.heading}", ${currentPairing.headingCategory}`;

  return (
    <span
      className={`inline-block transition-all duration-300 ${
        isAnimating ? "opacity-0 blur-sm translate-y-[-10px]" : "opacity-100 blur-0 translate-y-0"
      } ${className}`}
      style={{
        fontFamily,
        fontWeight: currentPairing.scale.h1.weight,
      }}
    >
      {text}
    </span>
  );
}
