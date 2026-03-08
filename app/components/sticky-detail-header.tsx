"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { PairingData } from "@/lib/pairings";
import { ArrowLeft } from "lucide-react";

interface StickyDetailHeaderProps {
  pairing: PairingData;
}

export function StickyDetailHeader({ pairing }: StickyDetailHeaderProps) {
  const [isVisible, setIsVisible] = useState(false);
  const headingFont = `"${pairing.heading}", ${pairing.headingCategory}`;

  useEffect(() => {
    const handleScroll = () => {
      const visible = window.scrollY > 100;
      setIsVisible((prev) => {
        if (prev === visible) return prev;
        return visible;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-16 left-0 right-0 z-40 bg-background/95 border-b border-border backdrop-blur-sm">
      <div className="px-4 lg:px-8 h-14 flex items-center">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors shrink-0"
        >
          <ArrowLeft className="size-4" />
          <span className="hidden sm:inline">Back to pairings</span>
        </Link>

        {/* Title with slide animation */}
        <div className="overflow-hidden ml-4 flex-1">
          <h2
            className={`text-xl tracking-tight transition-all duration-300 ease-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "-translate-y-full opacity-0"
            }`}
            style={{
              fontFamily: headingFont,
              fontWeight: pairing.scale.h1.weight,
            }}
          >
            {pairing.name}
          </h2>
        </div>
      </div>
    </div>
  );
}
