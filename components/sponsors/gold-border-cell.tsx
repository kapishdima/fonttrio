import type { ReactNode } from "react";

export function GoldBorderCell({
  children,
  className,
  reverse,
}: {
  children: ReactNode;
  className?: string;
  reverse?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden ${className ?? ""}`}>
      <div
        className="gold-border-spinner pointer-events-none absolute inset-[-50%] z-0"
        style={{
          background:
            "conic-gradient(from 0deg, var(--gold-border-dim) 0deg, var(--gold-border-color) 90deg, var(--gold-border-dim) 180deg, var(--gold-border-dim) 360deg)",
          animationDirection: reverse ? "reverse" : "normal",
        }}
      />
      <div className="relative z-10 m-[1.5px] h-[calc(100%-3px)] bg-white dark:bg-neutral-950">
        {children}
      </div>
    </div>
  );
}
