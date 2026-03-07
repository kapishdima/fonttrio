"use client";

import { useEffect, useState } from "react";

interface AnimatedLayoutProps {
  children: React.ReactNode;
  delay?: number;
}

export function AnimatedLayout({ children, delay = 0 }: AnimatedLayoutProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export function StaggerChildren({ children, stagger = 80 }: { children: React.ReactNode[]; stagger?: number }) {
  return (
    <>
      {children.map((child, i) => (
        <AnimatedLayout key={i} delay={i * stagger}>
          {child}
        </AnimatedLayout>
      ))}
    </>
  );
}
