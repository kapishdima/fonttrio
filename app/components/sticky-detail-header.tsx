"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface StickyDetailHeaderProps {
  title: string;
  titleStyle?: React.CSSProperties;
  backHref: string;
  backLabel: string;
}

export function StickyDetailHeader({
  title,
  titleStyle,
  backHref,
  backLabel,
}: StickyDetailHeaderProps) {
  const [isVisible, setIsVisible] = useState(false);
  const searchParams = useSearchParams();
  
  // Preserve query params when navigating back
  const backHrefWithParams = searchParams.toString() 
    ? `${backHref}?${searchParams.toString()}` 
    : backHref;

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
          href={backHrefWithParams}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors shrink-0"
        >
          <ArrowLeft className="size-4" />
          <span className="hidden sm:inline">{backLabel}</span>
        </Link>

        {/* Title with slide animation */}
        <div className="overflow-hidden ml-4 flex-1">
          <h2
            className={`text-xl tracking-tight transition-all duration-300 ease-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "-translate-y-full opacity-0"
            }`}
            style={titleStyle}
          >
            {title}
          </h2>
        </div>
      </div>
    </div>
  );
}
