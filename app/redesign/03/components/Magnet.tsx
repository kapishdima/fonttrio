"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useSpring } from "framer-motion";

interface MagnetProps {
  children: React.ReactNode;
  padding?: number;
  disabled?: boolean;
  magnetStrength?: number;
  className?: string;
}

export default function Magnet({
  children,
  padding = 100,
  disabled = false,
  magnetStrength = 0.5,
  className = "",
}: MagnetProps) {
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const x = useSpring(position.x, { stiffness: 150, damping: 15, mass: 0.1 });
  const y = useSpring(position.y, { stiffness: 150, damping: 15, mass: 0.1 });

  useEffect(() => {
    if (disabled) {
      setPosition({ x: 0, y: 0 });
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      
      const { clientX, clientY } = e;
      const rect = ref.current.getBoundingClientRect();
      const left = rect.left - padding;
      const top = rect.top - padding;
      const right = rect.right + padding;
      const bottom = rect.bottom + padding;

      if (clientX >= left && clientX <= right && clientY >= top && clientY <= bottom) {
        setIsActive(true);
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const distanceX = clientX - centerX;
        const distanceY = clientY - centerY;
        
        setPosition({
          x: distanceX * magnetStrength,
          y: distanceY * magnetStrength,
        });
      } else {
        setIsActive(false);
        setPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [padding, disabled, magnetStrength]);

  return (
    <motion.div ref={ref} style={{ x, y }} className={className}>
      {children}
    </motion.div>
  );
}