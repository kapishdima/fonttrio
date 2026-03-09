"use client";

import { useParallax } from "@/lib/hooks/use-parallax";
import { GridBackground } from "../grid-background";
import { MetricLines } from "../metric-lines";
import { AnimatedLayout } from "../animated-layout";

const METRIC_LINES = [
  { position: "20%", label: "Ascender" },
  { position: "50%", label: "Baseline" },
  { position: "80%", label: "Descender" },
];

interface DetailHeroProps {
  title: string;
  titleStyle: React.CSSProperties;
  children: React.ReactNode;
}

export function DetailHero({ title, titleStyle, children }: DetailHeroProps) {
  const parallaxRef = useParallax();

  return (
    <header
      id="main-content"
      className="pt-24 sm:pt-[100px] lg:pt-[120px] relative flex flex-col"
    >
      <GridBackground />

      <div className="relative flex flex-col px-4 sm:px-6 lg:px-8 xl:px-12 pb-8 sm:pb-12">
        <AnimatedLayout>
          <div className="max-w-none">
            {/* Title with Metric Lines + Parallax */}
            <div className="relative mt-4 sm:mt-0 h-[clamp(2rem,10vw,6rem)] sm:h-[clamp(2.5rem,12vw,10rem)] lg:h-[clamp(3rem,15vw,12rem)] overflow-hidden">
              <div className="hidden sm:block">
                <MetricLines lines={METRIC_LINES} />
              </div>
              <div
                ref={parallaxRef as React.RefObject<HTMLDivElement>}
                className="h-full flex items-center relative z-10 overflow-hidden"
              >
                <h1
                  style={{
                    lineHeight: "0.9",
                    fontSize: "clamp(1.5rem,8vw,5rem)",
                    ...titleStyle,
                  }}
                  className="truncate w-full text-[clamp(1.5rem,8vw,5rem)] sm:text-[clamp(1.75rem,10vw,8rem)] lg:text-[clamp(2.5rem,14vw,12rem)]"
                >
                  {title}
                </h1>
              </div>
            </div>

            {/* Page-specific content */}
            {children}
          </div>
        </AnimatedLayout>
      </div>

      <div className="absolute bottom-0 left-0 right-0 border-b border-border" />
    </header>
  );
}
