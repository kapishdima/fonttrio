"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

// --- Types & Data ---

type CardData = {
  id: string;
  font1: string;
  font2: string;
  fontFamily1: string;
  fontFamily2: string;
  category: string;
};

const PAIRS: CardData[] = [
  { id: "p1", font1: "Bebas Neue", font2: "Inter", fontFamily1: "'Bebas Neue', sans-serif", fontFamily2: "'Inter', sans-serif", category: "SANS" },
  { id: "p2", font1: "Playfair", font2: "Space", fontFamily1: "'Playfair Display', serif", fontFamily2: "'Space Mono', monospace", category: "SERIF" },
  { id: "p3", font1: "Syne", font2: "Inter", fontFamily1: "'Syne', sans-serif", fontFamily2: "'Inter', sans-serif", category: "DISPLAY" },
  { id: "p4", font1: "Bodoni", font2: "Helvetica", fontFamily1: "'Bodoni Moda', serif", fontFamily2: "sans-serif", category: "SERIF" },
  { id: "p5", font1: "Cinzel", font2: "Anton", fontFamily1: "'Cinzel', serif", fontFamily2: "'Anton', sans-serif", category: "DISPLAY" },
  { id: "p6", font1: "Inter", font2: "Space Mono", fontFamily1: "'Inter', sans-serif", fontFamily2: "'Space Mono', monospace", category: "SANS" },
];

const FILTERS = ["ALL", "SANS", "SERIF", "MONO", "DISPLAY"];

const HERO_PAIRS = ["BEBAS / INTER", "PLAYFAIR / SPACE", "SYNE / INTER", "BODONI / SANS", "CINZEL / ANTON"];

// --- Components ---

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const letters = [
    { id: "pre-f", char: "F", font: "'Bebas Neue', sans-serif", x: -1000, y: -500 },
    { id: "pre-o1", char: "O", font: "'Playfair Display', serif", x: 800, y: -600 },
    { id: "pre-n", char: "N", font: "'Space Mono', monospace", x: -600, y: 800 },
    { id: "pre-t1", char: "T", font: "'Inter', sans-serif", x: 900, y: 400 },
    { id: "pre-t2", char: "T", font: "'Playfair Display', serif", x: -200, y: -900 },
    { id: "pre-r", char: "R", font: "'Bebas Neue', sans-serif", x: 200, y: 900 },
    { id: "pre-i", char: "I", font: "'Space Mono', monospace", x: -800, y: 0 },
    { id: "pre-o2", char: "O", font: "'Inter', sans-serif", x: 1000, y: 200 },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      onAnimationComplete={onComplete}
    >
      <div className="flex space-x-2 md:space-x-6 text-6xl md:text-[12vw] leading-none text-white">
        {letters.map((l, i) => (
            <motion.span
            key={l.id}
            style={{ fontFamily: l.font }}
            initial={{ x: l.x, y: l.y, opacity: 0, rotate: i % 2 === 0 ? 45 : -45 }}
            animate={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
            exit={{ 
              x: (i % 2 === 0 ? -1 : 1) * (i * 100 + 500), 
              opacity: 0, 
              scale: 3, 
              filter: "blur(10px)",
              transition: { duration: 0.8, ease: "circIn" }
            }}
            transition={{
              duration: 1.5,
              ease: [0.22, 1, 0.36, 1],
              delay: i * 0.05,
            }}
          >
            {l.char}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

const HeroWord = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % HERO_PAIRS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const currentWord = HERO_PAIRS[index];
  const characters = currentWord.split("");

  const characterObjects = characters.map((char, i) => ({
    id: `char-${index}-${i}`,
    char,
    dir: i % 2 === 0 ? -1 : 1,
    distance: 200 + (i * 50)
  }));

  return (
    <div className="flex justify-center overflow-hidden h-[12vw] min-h-[100px] items-center">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={index}
          className="flex whitespace-nowrap"
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {characterObjects.map((item) => (
            <motion.span
              key={item.id}
              className="inline-block text-[10vw] md:text-[8vw] font-['Bebas_Neue'] leading-none text-white"
              initial={{ x: item.dir * item.distance, opacity: 0, filter: "blur(8px)" }}
              animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ x: -item.dir * item.distance, opacity: 0, filter: "blur(8px)" }}
              transition={{
                duration: 0.8,
                ease: [0.19, 1, 0.22, 1],
                delay: Math.abs(item.distance - 200) / 50 * 0.03, // Reconstruct stagger without using map index
              }}
            >
              {item.char === " " ? "\u00A0" : item.char}
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default function SwissKineticPage() {
  const [loading, setLoading] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  const { scrollYProgress } = useScroll();
  const parallaxHeading = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const parallaxBody = useTransform(scrollYProgress, [0, 1], [0, 50]);

  useEffect(() => {
    const t = setTimeout(() => {
      setExiting(true);
    }, 2500);
    return () => clearTimeout(t);
  }, []);

  const filteredPairs = useMemo(() => {
    if (activeFilter === "ALL") return PAIRS;
    return PAIRS.filter(p => p.category === activeFilter);
  }, [activeFilter]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,900;1,6..96,400&family=Cinzel:wght@400..900&family=Inter:wght@100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Syne:wght@400..800&display=swap');
        
        body {
          background-color: #000;
          color: #fff;
          margin: 0;
          font-family: 'Inter', sans-serif;
        }

        /* Swiss aesthetic overrides */
        ::selection {
          background: #E30613;
          color: #fff;
        }

        /* Hide scrollbar for cleaner look */
        ::-webkit-scrollbar { width: 0; height: 0; }
      `}</style>

      <AnimatePresence>
        {loading && (
          <Preloader onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {exiting && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="min-h-screen border-x border-[#333] max-w-[1920px] mx-auto overflow-x-hidden flex flex-col"
          >
            {/* --- HEADER --- */}
            <header className="grid grid-cols-12 border-b border-[#333] uppercase text-xs tracking-[0.15em] font-medium h-16 items-center">
              <div className="col-span-6 md:col-span-4 px-4 md:px-8 border-r border-[#333] h-full flex items-center">
                FONTTRIO©
              </div>
              <div className="hidden md:flex col-span-4 px-4 md:px-8 border-r border-[#333] h-full items-center">
                KINETIC REGISTRY
              </div>
              <div className="col-span-6 md:col-span-4 px-4 md:px-8 h-full flex items-center justify-end text-[#E30613]">
                SWISS / EDITION
              </div>
            </header>

            {/* --- HERO SECTION (01) --- */}
            <section className="grid grid-cols-12 border-b border-[#333] min-h-[60vh] relative overflow-hidden">
              <div className="absolute top-4 left-4 md:top-8 md:left-8 z-10">
                <span className="font-['Space_Mono'] text-[0.65rem] tracking-widest text-white/50">01 / SPECIMEN</span>
              </div>
              
              <div className="col-span-12 flex flex-col justify-center items-center py-24 relative z-0">
                <HeroWord />
                
                {/* Parallax elements */}
                <motion.div 
                  style={{ y: parallaxHeading }}
                  className="mt-12 text-center max-w-xl px-4"
                >
                  <p className="text-sm md:text-base font-light text-white/70 uppercase tracking-widest leading-loose">
                    Typography as motion. A strict modular grid meets cinematic type transitions.
                  </p>
                </motion.div>
                <motion.div 
                  style={{ y: parallaxBody }}
                  className="mt-8 font-['Space_Mono'] text-xs text-[#E30613] tracking-widest"
                >
                  VOL. 2 — NO BORDERS
                </motion.div>
              </div>
            </section>

            {/* --- FILTERS SECTION --- */}
            <section className="grid grid-cols-12 border-b border-[#333]">
              <div className="col-span-12 md:col-span-2 border-b md:border-b-0 md:border-r border-[#333] px-4 md:px-8 py-4 flex items-center">
                <span className="font-['Space_Mono'] text-[0.65rem] tracking-widest text-white/50">02 / FILTERS</span>
              </div>
              <div className="col-span-12 md:col-span-10 flex overflow-x-auto hide-scrollbar">
                {FILTERS.map((f, i) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setActiveFilter(f)}
                    className={`
                      px-8 py-4 border-r border-[#333] last:border-r-0 text-xs tracking-[0.2em] transition-colors
                      ${activeFilter === f ? 'bg-white text-black font-bold' : 'text-white hover:text-[#E30613]'}
                    `}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </section>

            {/* --- DIRECTORY (GRID) SECTION --- */}
            <section className="grid grid-cols-1 md:grid-cols-3 border-b border-[#333]">
              <AnimatePresence mode="popLayout">
                {filteredPairs.map((pair, idx) => {
                  const isHovered = hoveredCardId === pair.id;
                  const isDimmed = hoveredCardId !== null && hoveredCardId !== pair.id;

                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ 
                        opacity: isDimmed ? 0.2 : 1, 
                        scale: 1,
                        backgroundColor: isHovered ? '#050505' : '#000000',
                      }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                      key={pair.id}
                      onMouseEnter={() => setHoveredCardId(pair.id)}
                      onMouseLeave={() => setHoveredCardId(null)}
                      className={`
                        relative aspect-square md:aspect-[4/5] p-6 md:p-8 flex flex-col justify-between 
                        border-b md:border-b-0 border-[#333]
                        ${(idx + 1) % 3 !== 0 ? 'md:border-r' : ''}
                      `}
                    >
                      {/* Top bar of card */}
                      <div className="flex justify-between items-start z-10 mix-blend-difference">
                        <span className="font-['Space_Mono'] text-[0.6rem] tracking-[0.2em] text-white/50 uppercase">
                          No. {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                        </span>
                        <motion.span 
                          className="font-['Space_Mono'] text-[0.6rem] tracking-widest"
                          animate={{ color: isHovered ? '#E30613' : 'rgba(255,255,255,0.5)' }}
                        >
                          {pair.category}
                        </motion.span>
                      </div>

                      {/* Expanding Center Typography */}
                      <div className="relative z-50 flex-grow flex flex-col justify-center">
                        {/* 
                            We use overflow-visible on the card itself (default for divs unless specified)
                            and high z-index when hovered to allow the text to break boundaries.
                        */}
                        <motion.div
                          className="whitespace-nowrap"
                          animate={{ 
                            zIndex: isHovered ? 50 : 10,
                          }}
                        >
                          <motion.h3
                            className="text-4xl md:text-5xl lg:text-6xl font-black uppercase origin-left"
                            style={{ fontFamily: pair.fontFamily1 }}
                            animate={{ 
                              scale: isHovered ? 1.4 : 1,
                              color: isHovered ? '#E30613' : '#FFFFFF',
                              x: isHovered ? 10 : 0
                            }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                          >
                            {pair.font1}
                          </motion.h3>
                          <motion.h3
                            className="text-4xl md:text-5xl lg:text-6xl font-light italic mt-2 origin-left"
                            style={{ fontFamily: pair.fontFamily2 }}
                            animate={{ 
                              scale: isHovered ? 1.4 : 1,
                              color: isHovered ? '#E30613' : '#FFFFFF',
                              x: isHovered ? 10 : 0
                            }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
                          >
                            + {pair.font2}
                          </motion.h3>
                        </motion.div>
                      </div>

                      {/* Bottom bar of card */}
                      <div className="z-10 mix-blend-difference mt-auto">
                        <p className="font-['Space_Mono'] text-[0.55rem] tracking-widest text-white/40 uppercase leading-relaxed">
                          Aa Bb Cc Dd Ee Ff Gg Hh<br />01 23 45 67 89 & ? !
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </section>

            {/* --- INSTALL SECTION (03) --- */}
            <section className="grid grid-cols-12 min-h-[30vh]">
              <div className="col-span-12 md:col-span-4 border-b md:border-b-0 md:border-r border-[#333] p-8 flex flex-col justify-between">
                <span className="font-['Space_Mono'] text-[0.65rem] tracking-widest text-white/50">03 / INSTALL</span>
                <div className="mt-8">
                  <h4 className="font-['Bebas_Neue'] text-3xl tracking-wide">SYSTEM REQUIREMENTS</h4>
                  <p className="text-xs text-white/50 mt-2 max-w-xs leading-relaxed">
                    Integrate the registry into your local environment. Supports strictly disciplined environments.
                  </p>
                </div>
              </div>
              <div className="col-span-12 md:col-span-8 p-8 flex items-center justify-center md:justify-start">
                <motion.div 
                  className="border border-[#333] bg-black p-6 flex items-center gap-4 w-full max-w-xl group cursor-pointer"
                  whileHover={{ borderColor: "#E30613" }}
                >
                  <span className="font-['Space_Mono'] text-[#E30613] text-sm">~</span>
                  <code className="font-['Space_Mono'] text-sm tracking-wide flex-grow">
                    npx fonttrio@latest init
                  </code>
                  <div className="w-4 h-4 border border-white/30 group-hover:border-[#E30613] group-hover:bg-[#E30613] transition-colors" />
                </motion.div>
              </div>
            </section>
            
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
