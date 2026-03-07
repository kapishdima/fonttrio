import type { ReactNode } from "react";
import { AnimatedLayout } from "../animated-layout";
import { SectionLabel } from "../section-label";

interface SectionWrapperProps {
  children: ReactNode;
  label?: string;
  className?: string;
  delay?: number;
}

export function SectionWrapper({ 
  children, 
  label, 
  className = "",
  delay = 0 
}: SectionWrapperProps) {
  return (
    <section className={`border-b border-border ${className}`}>
      <div className="px-4 lg:px-8 xl:px-12 py-16 lg:py-24">
        <AnimatedLayout delay={delay}>
          {label && <SectionLabel className="mb-8">{label}</SectionLabel>}
          {children}
        </AnimatedLayout>
      </div>
    </section>
  );
}
