"use client";

import { useState, useEffect, useRef } from "react";
import type { PairingData } from "@/lib/pairings";
import { useScrambleAnimation } from "@/lib/hooks/use-scramble-animation";

interface FontSwitcherProps {
  pairings: PairingData[];
  onIndexChange?: (index: number) => void;
}

export function FontSwitcher({ pairings, onIndexChange }: FontSwitcherProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const { displayText, scramble, cleanup } = useScrambleAnimation({
    text: "Three fonts",
    speed: 30,
    iterationStep: 0.5,
    overshoot: 8,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setIsFading(true);

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % pairings.length);
        scramble();
        setIsFading(false);
      }, 200);
    }, 4000);

    return () => {
      clearInterval(timer);
      cleanup();
    };
  }, [pairings.length, scramble, cleanup]);

  useEffect(() => {
    onIndexChange?.(currentIndex);
  }, [currentIndex, onIndexChange]);

  const currentPairing = pairings[currentIndex];
  const fontFamily = `"${currentPairing.heading}", ${currentPairing.headingCategory}`;

  return (
    <span
      className={`inline-block transition-opacity duration-200 ${isFading ? "opacity-0" : "opacity-100"}`}
      style={{
        fontFamily,
        fontWeight: currentPairing.scale.h1.weight,
        lineHeight: "1",
        letterSpacing: "-0.03em",
        minWidth: "8ch",
      }}
    >
      {displayText}
      <span className="cursor-blink ml-1 inline-block w-1 h-[0.75em] bg-current align-middle" />
    </span>
  );
}

interface AnimatedSubtitleProps {
  pairings: PairingData[];
  currentIndex: number;
  text: string;
}

export function AnimatedSubtitle({ pairings, currentIndex, text }: AnimatedSubtitleProps) {
  const [isFading, setIsFading] = useState(false);
  const prevIndexRef = useRef(currentIndex);

  const { displayText, scramble } = useScrambleAnimation({
    text,
    speed: 5,
    iterationStep: 3,
    overshoot: 3,
  });

  useEffect(() => {
    if (prevIndexRef.current !== currentIndex) {
      prevIndexRef.current = currentIndex;
      setIsFading(true);

      setTimeout(() => {
        scramble();
        setIsFading(false);
      }, 200);
    }
  }, [currentIndex, scramble]);

  const currentPairing = pairings[currentIndex];
  const fontFamily = `"${currentPairing.body}", ${currentPairing.bodyCategory}`;

  return (
    <span
      className={`inline-block transition-opacity duration-200 ${isFading ? "opacity-0" : "opacity-100"}`}
      style={{
        fontFamily,
        fontWeight: currentPairing.scale.body.weight,
        lineHeight: "1.5",
      }}
    >
      {displayText}
    </span>
  );
}
