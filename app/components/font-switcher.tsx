"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { PairingData } from "@/lib/pairings";

interface FontSwitcherProps {
  pairings: PairingData[];
  onIndexChange?: (index: number) => void;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const DISPLAY_TEXT = "Three fonts";

export function FontSwitcher({ pairings, onIndexChange }: FontSwitcherProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState(DISPLAY_TEXT);
  const [isScrambling, setIsScrambling] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scrambleText = useCallback(() => {
    setIsScrambling(true);
    let iteration = 0;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(
        DISPLAY_TEXT
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) return DISPLAY_TEXT[index];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      iteration += 0.5;

      if (iteration >= DISPLAY_TEXT.length + 8) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(DISPLAY_TEXT);
        setIsScrambling(false);
      }
    }, 30);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % pairings.length;
        return next;
      });
      scrambleText();
    }, 4000);

    return () => {
      clearInterval(timer);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [pairings.length, scrambleText]);

  // Notify parent about index change
  useEffect(() => {
    onIndexChange?.(currentIndex);
  }, [currentIndex, onIndexChange]);

  const currentPairing = pairings[currentIndex];
  const fontFamily = `"${currentPairing.heading}", ${currentPairing.headingCategory}`;

  return (
    <span
      className={`inline-block ${isScrambling ? "text-muted-foreground" : ""}`}
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
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prevIndexRef = useRef(currentIndex);

  const scrambleText = useCallback(() => {
    setIsScrambling(true);
    let iteration = 0;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) return text[index];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      iteration += 3;

      if (iteration >= text.length + 3) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
        setIsScrambling(false);
      }
    }, 5);
  }, [text]);

  useEffect(() => {
    if (prevIndexRef.current !== currentIndex) {
      prevIndexRef.current = currentIndex;
      scrambleText();
    }
  }, [currentIndex, scrambleText]);

  const currentPairing = pairings[currentIndex];
  const fontFamily = `"${currentPairing.body}", ${currentPairing.bodyCategory}`;

  return (
    <span
      className={`inline-block ${isScrambling ? "text-muted-foreground/70" : ""}`}
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
