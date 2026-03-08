"use client";

import { useState, useCallback, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

interface UseScrambleAnimationOptions {
  text: string;
  speed?: number;
  iterationStep?: number;
  overshoot?: number;
}

export function useScrambleAnimation({
  text,
  speed = 30,
  iterationStep = 0.5,
  overshoot = 8,
}: UseScrambleAnimationOptions) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scramble = useCallback(() => {
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

      iteration += iterationStep;

      if (iteration >= text.length + overshoot) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
        setIsScrambling(false);
      }
    }, speed);
  }, [text, speed, iterationStep, overshoot]);

  const cleanup = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  return { displayText, isScrambling, scramble, cleanup };
}
