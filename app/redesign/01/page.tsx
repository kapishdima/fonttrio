"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const FONTS = [
  "'Inter', sans-serif",
  "'Playfair Display', serif",
  "'Space Mono', monospace",
  "'Syne', sans-serif",
  "'Cinzel', serif",
  "'Anton', sans-serif",
  "'Bodoni Moda', serif",
  "'Bebas Neue', sans-serif",
];

const KINETIC_LETTERS = [
  { id: "L1", char: "F", initialY: -10, initialRotate: -5, isMidMorph: true },
  { id: "L2", char: "O", initialY: 20, initialRotate: 2, isMidMorph: false },
  { id: "L3", char: "N", initialY: -5, initialRotate: 8, isMidMorph: false },
  { id: "L4", char: "T", initialY: 15, initialRotate: -2, isMidMorph: true },
  { id: "L5", char: "T", initialY: -25, initialRotate: -10, isMidMorph: false },
  { id: "L6", char: "R", initialY: 5, initialRotate: 4, isMidMorph: false },
  { id: "L7", char: "I", initialY: -15, initialRotate: 0, isMidMorph: true },
  { id: "L8", char: "O", initialY: 10, initialRotate: 6, isMidMorph: false },
];

const CARDS = [
  {
    id: 1,
    title1: "Inter",
    title2: "Playfair",
    font1: "'Inter', sans-serif",
    font2: "'Playfair Display', serif",
    top: "12%",
    left: "8%",
    rotate: -6,
  },
  {
    id: 2,
    title1: "Space",
    title2: "Syne",
    font1: "'Space Mono', monospace",
    font2: "'Syne', sans-serif",
    top: "50%",
    left: "12%",
    rotate: 8,
  },
  {
    id: 3,
    title1: "Bodoni",
    title2: "Helvetica",
    font1: "'Bodoni Moda', serif",
    font2: "sans-serif",
    top: "22%",
    left: "65%",
    rotate: 12,
  },
  {
    id: 4,
    title1: "Cinzel",
    title2: "Anton",
    font1: "'Cinzel', serif",
    font2: "'Anton', sans-serif",
    top: "65%",
    left: "70%",
    rotate: -10,
  },
  {
    id: 5,
    title1: "Bebas",
    title2: "Caveat",
    font1: "'Bebas Neue', sans-serif",
    font2: "cursive",
    top: "40%",
    left: "38%",
    rotate: -2,
  },
];

type LetterData = {
  id: string;
  char: string;
  initialY: number;
  initialRotate: number;
  isMidMorph: boolean;
};

const KineticLetter = ({ letterData, index }: { letterData: LetterData; index: number }) => {
  const [fontIndex, setFontIndex] = useState((index * 3) % FONTS.length);
  const [isMorphing, setIsMorphing] = useState(letterData.isMidMorph);

  useEffect(() => {
    // If starting mid-morph, resolve it quickly
    if (letterData.isMidMorph) {
      const t = setTimeout(() => {
        setFontIndex((prev) => (prev + 1) % FONTS.length);
        setIsMorphing(false);
      }, 600); // Hold the blur a bit on load to show "mid-animation"
      return () => clearTimeout(t);
    }
  }, [letterData.isMidMorph]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsMorphing(true);
      setTimeout(() => {
        setFontIndex((prev) => (prev + 1) % FONTS.length);
        setIsMorphing(false);
      }, 300); // 300ms motion blur transition
    }, 2000 + Math.random() * 500); // ~2s staggered interval

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="inline-block relative"
      animate={{
        y: [letterData.initialY, letterData.initialY - 15, letterData.initialY],
        rotate: [letterData.initialRotate, letterData.initialRotate + 2, letterData.initialRotate],
      }}
      transition={{
        duration: 4 + (index % 3),
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <motion.span
        className="inline-block origin-center will-change-[filter,transform]"
        style={{ fontFamily: FONTS[fontIndex], textShadow: "0 0 20px rgba(255,255,255,0.1)" }}
        initial={{
          filter: letterData.isMidMorph ? "blur(12px)" : "blur(0px)",
          scale: letterData.isMidMorph ? 1.1 : 1,
          opacity: letterData.isMidMorph ? 0.6 : 1,
        }}
        animate={{
          filter: isMorphing ? "blur(12px)" : "blur(0px)",
          scale: isMorphing ? 1.1 : 1,
          opacity: isMorphing ? 0.6 : 1,
          color: isMorphing && (index % 3 === 0) ? "#CC0011" : "#FFF", // Occasional electric red flash during morph
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {letterData.char}
      </motion.span>
    </motion.div>
  );
};

export default function KineticLandingPage() {
  // Start with card 5 hovered to satisfy "one card in hovered state"
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(5);

  return (
    <>
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,900;1,6..96,400&family=Cinzel:wght@400..900&family=Inter:wght@100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Syne:wght@400..800&display=swap');
        
        body {
          background-color: #000;
          color: #fff;
          overflow: hidden;
          margin: 0;
        }
        
        /* Custom scrollbar hiding */
        ::-webkit-scrollbar {
          display: none;
        }
        `}
      </style>

      <main className="relative w-screen h-screen bg-black overflow-hidden flex items-center justify-center selection:bg-[#CC0011] selection:text-white">
        
        {/* Background ambient gradient or noise could go here, keeping it pure black for starkness */}
        
        {/* HERO TYPOGRAPHY */}
        <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
          <h1 className="text-[14vw] sm:text-[18vw] leading-none tracking-tighter uppercase font-black text-white flex gap-[2vw]">
            {KINETIC_LETTERS.map((letter, index) => (
              <KineticLetter key={letter.id} letterData={letter} index={index} />
            ))}
          </h1>
        </div>

        {/* SCATTERED FONT CARDS */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {CARDS.map((card) => {
            const isHovered = hoveredCardId === card.id;
            const isDimmed = hoveredCardId !== null && hoveredCardId !== card.id;

            return (
              <motion.div
                key={card.id}
                className="absolute border border-white/10 bg-black/60 backdrop-blur-lg p-6 flex flex-col justify-between pointer-events-auto shadow-2xl"
                style={{
                  top: card.top,
                  left: card.left,
                  width: 320,
                  height: 420,
                  rotate: card.rotate,
                }}
                initial={false}
                animate={{
                  opacity: isDimmed ? 0.2 : 1,
                  scale: isHovered ? 1.05 : 1,
                  zIndex: isHovered ? 50 : 10,
                  borderColor: isHovered ? "#CC0011" : "rgba(255,255,255,0.1)",
                  boxShadow: isHovered 
                    ? "0 20px 40px -10px rgba(204,0,17,0.3)" 
                    : "0 10px 30px -10px rgba(0,0,0,0.5)",
                }}
                onMouseEnter={() => setHoveredCardId(card.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
              >
                {/* Header */}
                <div className="flex justify-between items-start opacity-60">
                  <span className="text-xs tracking-[0.2em] uppercase font-['Inter']">
                    Pairing 0{card.id}
                  </span>
                  <motion.span 
                    className="text-lg"
                    animate={{ 
                      color: isHovered ? "#CC0011" : "#FFF",
                      x: isHovered ? 5 : 0,
                      y: isHovered ? -5 : 0
                    }}
                  >
                    ↗
                  </motion.span>
                </div>

                {/* Expanding Headlines */}
                <div className="relative z-50 flex-grow flex flex-col justify-center mt-4">
                  <motion.h2
                    className="whitespace-nowrap origin-left will-change-[transform,color,font-size]"
                    style={{ fontFamily: card.font1 }}
                    animate={{
                      fontSize: isHovered ? "4.5rem" : "2.8rem",
                      lineHeight: 1.1,
                      color: isHovered ? "#CC0011" : "#FFF",
                      x: isHovered ? -30 : 0,
                      letterSpacing: isHovered ? "-0.02em" : "0em"
                    }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {card.title1}
                  </motion.h2>
                  <motion.h2
                    className="whitespace-nowrap origin-left will-change-[transform,font-size]"
                    style={{ fontFamily: card.font2 }}
                    animate={{
                      fontSize: isHovered ? "4.5rem" : "2.8rem",
                      lineHeight: 1.1,
                      x: isHovered ? -30 : 0,
                      letterSpacing: isHovered ? "-0.02em" : "0em"
                    }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
                  >
                    & {card.title2}
                  </motion.h2>
                </div>

                {/* Specimen Footer */}
                <motion.div 
                  className="mt-auto pt-8 border-t border-white/10"
                  animate={{ opacity: isHovered ? 0.8 : 0.4 }}
                >
                  <p 
                    className="text-[0.65rem] uppercase tracking-widest leading-loose"
                    style={{ fontFamily: card.font1 }}
                  >
                    A B C D E F G H I J K L M N O P Q R S T U V W X Y Z<br/>
                    a b c d e f g h i j k l m n o p q r s t u v w x y z<br/>
                    0 1 2 3 4 5 6 7 8 9 ! ? & @ # % *
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Floating Brand/Nav items */}
        <div className="absolute top-8 left-8 z-50 mix-blend-difference">
          <div className="font-['Inter'] text-sm tracking-widest font-bold uppercase text-white">
            FontTrio®
          </div>
        </div>
        <div className="absolute top-8 right-8 z-50 mix-blend-difference">
          <div className="font-['Inter'] text-xs tracking-widest uppercase text-white hover:text-[#CC0011] transition-colors cursor-pointer">
            Explore Registry
          </div>
        </div>
        <div className="absolute bottom-8 left-8 z-50 mix-blend-difference max-w-xs">
          <p className="font-['Inter'] text-xs leading-relaxed text-white/50">
            A kinetic registry of typographic pairings. Morphing, floating, and shifting in real-time.
          </p>
        </div>
      </main>
    </>
  );
}
