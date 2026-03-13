"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Copy, Check } from "lucide-react";
import Lenis from "lenis";
import { SPONSORS } from "@/lib/sponsors";

// --- DATA ---
const PAIRINGS = [
  {
    id: "agency",
    heading: "Syne",
    body: "Inter",
    headingFont: "'Syne', sans-serif",
    bodyFont: "'Inter', sans-serif",
    description: "A brutalist approach to modern structural design.",
    year: "2026"
  },
  {
    id: "editorial",
    heading: "Playfair Display",
    body: "Space Mono",
    headingFont: "'Playfair Display', serif",
    bodyFont: "'Space Mono', monospace",
    description: "The intersection of high fashion and technical precision.",
    year: "2026"
  },
  {
    id: "modern",
    heading: "Bodoni Moda",
    body: "Helvetica",
    headingFont: "'Bodoni Moda', serif",
    bodyFont: "sans-serif",
    description: "Classic high-contrast serif married to neutral swiss neutrality.",
    year: "2026"
  },
  {
    id: "brutal",
    heading: "Bebas Neue",
    body: "Inter",
    headingFont: "'Bebas Neue', sans-serif",
    bodyFont: "'Inter', sans-serif",
    description: "Unapologetic weight and cinematic proportions.",
    year: "2026"
  },
];

// --- COMPONENTS ---

const Masthead = () => {
  return (
    <header className="w-full px-6 md:px-12 pt-8 pb-6 border-b border-[#C1B49A]/30 flex flex-col md:flex-row justify-between items-end md:items-center gap-6 z-50 relative bg-[#FAF9F6]">
      <div className="flex flex-col w-full md:w-auto">
        <span className="font-['Space_Mono'] text-[10px] tracking-[0.3em] uppercase text-[#1A1A1A]/50 mb-2">Issue No. 04 — Spring</span>
        <h1 className="font-['Playfair_Display'] text-3xl md:text-5xl font-medium tracking-tight text-[#1A1A1A]">
          FontTrio.
        </h1>
      </div>
      
      <nav className="flex items-center gap-8 w-full md:w-auto border-t border-[#C1B49A]/30 md:border-none pt-4 md:pt-0">
        <Link href="#" className="font-['Space_Mono'] text-xs tracking-widest uppercase text-[#1A1A1A] hover:text-[#C1B49A] transition-colors">Registry</Link>
        <Link href="#" className="font-['Space_Mono'] text-xs tracking-widest uppercase text-[#1A1A1A] hover:text-[#C1B49A] transition-colors">Docs</Link>
        <Link href="#" className="font-['Space_Mono'] text-xs tracking-widest uppercase text-[#1A1A1A] hover:text-[#C1B49A] transition-colors">Sponsors</Link>
      </nav>
    </header>
  );
};

const MagazineCover = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={containerRef} className="relative w-full min-h-[90vh] flex flex-col justify-center px-6 md:px-12 overflow-hidden bg-[#FAF9F6]">
      <motion.div style={{ y: y1, opacity }} className="relative z-10 w-full max-w-7xl mx-auto flex flex-col">
        
        {/* Top left teaser */}
        <div className="w-full md:w-64 mb-12 md:mb-24 border-l border-[#C1B49A] pl-4">
          <p className="font-['Space_Mono'] text-[10px] uppercase tracking-widest text-[#C1B49A] mb-2">The Preface</p>
          <p className="font-['Inter'] text-xs md:text-sm leading-relaxed text-[#1A1A1A]/80">
            A curated registry of typographic pairings engineered exclusively for developers. Stop guessing. Start shipping.
          </p>
        </div>

        {/* Massive Title */}
        <h2 className="font-['Playfair_Display'] text-[15vw] leading-[0.8] tracking-tighter text-[#1A1A1A] italic pr-4 md:pr-0 -ml-2 md:-ml-4">
          Aesthetics.
        </h2>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mt-4 gap-8">
          <h2 className="font-['Playfair_Display'] text-[15vw] leading-[0.8] tracking-tighter text-[#1A1A1A]">
            Engineered.
          </h2>
          
          <motion.div style={{ y: y2 }} className="w-full md:w-72 border-t border-[#C1B49A] pt-4 md:mt-12 text-right md:text-left">
             <button type="button" className="font-['Space_Mono'] text-xs uppercase tracking-[0.2em] text-[#1A1A1A] hover:text-[#C1B49A] transition-colors group flex items-center justify-end md:justify-start gap-4 w-full">
               <span>Explore Registry</span>
               <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
             </button>
          </motion.div>
        </div>
        
      </motion.div>

      {/* Background elegant lines */}
      <div className="absolute top-0 right-1/3 bottom-0 w-[1px] bg-[#C1B49A]/20 pointer-events-none" />
      <div className="absolute top-0 right-24 bottom-0 w-[1px] bg-[#C1B49A]/20 pointer-events-none" />
    </section>
  );
};

const EditorialFeature = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="py-32 md:py-48 px-6 md:px-12 bg-[#FAF9F6] border-y border-[#C1B49A]/30">
      <motion.div style={{ y, opacity }} className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24">
        
        {/* Large Drop Cap Column */}
        <div className="hidden md:block w-32 shrink-0">
          <span className="font-['Playfair_Display'] text-[180px] leading-none text-[#1A1A1A] italic -mt-12 block">
            T
          </span>
        </div>

        {/* Article Body */}
        <div className="flex-1 font-['Inter'] text-lg md:text-2xl leading-[1.8] text-[#1A1A1A]/80 font-light">
          <p className="mb-8">
            <span className="md:hidden font-['Playfair_Display'] text-5xl float-left mr-2 leading-none italic">T</span>
            he craft of typography shouldn't slow down your engineering. For too long, developers have been forced to choose between shipping fast and looking premium.
          </p>
          <p>
            Hours spent adjusting line heights, wrestling with font weights, and guessing contrast ratios. FontTrio is the editorial layer for your codebase. Copy, paste, and let your interfaces scale flawlessly.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

const EditorialSpreadBeforeAfter = () => {
  return (
    <section className="py-32 bg-[#FAF9F6] px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Spread Header */}
        <div className="flex justify-between items-end border-b border-[#C1B49A] pb-4 mb-16">
          <h3 className="font-['Space_Mono'] text-xs tracking-[0.2em] uppercase text-[#1A1A1A]">The Critique</h3>
          <span className="font-['Playfair_Display'] text-2xl italic text-[#C1B49A]">Vol. 1</span>
        </div>

        {/* The Two Pages */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#C1B49A]/30">
          
          {/* Page 1: The Default (Bad) */}
          <div className="bg-[#FAF9F6] p-8 md:p-16 lg:p-24 flex flex-col justify-center">
            <span className="font-['Space_Mono'] text-[10px] tracking-widest uppercase text-[#1A1A1A]/40 mb-12 block">Page 01 — System Defaults</span>
            
            <div className="max-w-sm">
              <h4 className="font-['Arial'] text-3xl md:text-4xl font-bold text-black mb-4 leading-[1.1] tracking-tighter">
                The Anatomy of a Interface
              </h4>
              <p className="font-['Times_New_Roman'] text-base md:text-lg text-black leading-tight text-justify">
                Typography without intention becomes invisible noise. When forced to rely on standard system fallbacks, the interface loses its soul. Cramped line heights and mismatched geometries create an environment where the reader struggles to find a rhythm.
              </p>
            </div>
          </div>

          {/* Page 2: The Curated (Good) */}
          <div className="bg-[#F0EBE1] p-8 md:p-16 lg:p-24 flex flex-col justify-center">
            <span className="font-['Space_Mono'] text-[10px] tracking-widest uppercase text-[#C1B49A] mb-12 block">Page 02 — The Curated</span>
            
            <div className="max-w-sm">
              <h4 className="font-['Playfair_Display'] italic text-4xl md:text-5xl text-[#1A1A1A] mb-8 leading-[1.1]">
                The Anatomy of a Interface
              </h4>
              <p className="font-['Inter'] text-sm md:text-base text-[#1A1A1A]/70 leading-[2] font-light">
                Typography without intention becomes invisible noise. When forced to rely on standard system fallbacks, the interface loses its soul. Cramped line heights and mismatched geometries create an environment where the reader struggles to find a rhythm.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const LookbookGrid = () => {
  return (
    <section className="py-32 bg-[#FAF9F6] px-6 md:px-12 border-t border-[#C1B49A]/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h3 className="font-['Playfair_Display'] text-5xl md:text-7xl italic text-[#1A1A1A] mb-4">The Collection</h3>
          <p className="font-['Space_Mono'] text-xs tracking-widest uppercase text-[#C1B49A]">Curated Pairings</p>
        </div>

        {/* Masonry-esque Asymmetrical Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
          {PAIRINGS.map((pair, index) => {
            // Create asymmetrical layout logic
            const colSpan = index % 3 === 0 ? "md:col-span-12" : "md:col-span-6";
            const alignment = index % 2 === 0 ? "items-start" : "items-end md:mt-32";
            const textAlignment = index % 2 === 0 ? "text-left" : "text-left md:text-right";

            return (
              <motion.div 
                key={pair.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col ${colSpan} ${alignment} group cursor-pointer`}
              >
                {/* The "Artwork" */}
                <div className="w-full bg-white border border-[#C1B49A]/20 p-12 md:p-24 flex items-center justify-center relative overflow-hidden group-hover:bg-[#F0EBE1] transition-colors duration-500">
                  <div className="absolute top-6 left-6 font-['Space_Mono'] text-[10px] tracking-widest uppercase text-[#C1B49A]">
                    No. 0{index + 1}
                  </div>
                  <div className="absolute bottom-6 right-6 font-['Space_Mono'] text-[10px] tracking-widest text-[#C1B49A]">
                    {pair.year}
                  </div>

                  <h4 
                    className="text-6xl md:text-8xl lg:text-9xl text-[#1A1A1A] tracking-tighter leading-none text-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    style={{ fontFamily: pair.headingFont }}
                  >
                    {pair.heading}
                  </h4>
                </div>

                {/* The "Museum Label" */}
                <div className={`mt-6 w-full max-w-sm ${textAlignment}`}>
                  <div className={`flex flex-col gap-2 mb-4 font-['Space_Mono'] text-[10px] uppercase tracking-widest text-[#1A1A1A]/50 ${index % 2 === 0 ? "" : "md:items-end"}`}>
                    <span>Heading: {pair.heading}</span>
                    <span>Body: {pair.body}</span>
                  </div>
                  <p className="font-['Inter'] text-sm leading-relaxed text-[#1A1A1A]/80 font-light">
                    {pair.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const RecipeTerminal = () => {
  const [copied, setCopied] = React.useState(false);
  const command = "npx shadcn add @fonttrio/agency";

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-32 bg-[#FAF9F6] px-6 md:px-12 flex justify-center">
      <div className="w-full max-w-3xl bg-[#F0EBE1] border border-[#C1B49A] p-12 md:p-20 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FAF9F6] px-6 py-2 border border-[#C1B49A] font-['Playfair_Display'] italic text-xl text-[#1A1A1A]">
          The Recipe
        </div>
        
        <div className="text-center mb-12">
          <h3 className="font-['Inter'] text-lg md:text-xl font-light text-[#1A1A1A] leading-relaxed">
            Integration requires a single stanza of code. No configuration. No design files.
          </h3>
        </div>

        <button 
          onClick={handleCopy}
          type="button"
          className="w-full bg-[#FAF9F6] border border-[#C1B49A]/50 p-6 flex justify-between items-center cursor-pointer group hover:border-[#C1B49A] transition-colors"
        >
          <code className="font-['Space_Mono'] text-sm md:text-base text-[#1A1A1A]">
            {command}
          </code>
          <div className="text-[#C1B49A] group-hover:text-[#1A1A1A] transition-colors">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </div>
        </button>
      </div>
    </section>
  );
};

const ColophonSponsors = () => {
  // Filter and deduplicate sponsors for editorial display
  const validSponsors = SPONSORS.filter(s => s.logo && s.logo !== "");
  
  return (
    <footer className="bg-[#1A1A1A] pt-32 pb-12 px-6 md:px-12 text-[#FAF9F6]">
      <div className="max-w-7xl mx-auto">
        
        <div className="border-b border-[#FAF9F6]/20 pb-12 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          <div className="max-w-sm">
            <h3 className="font-['Playfair_Display'] text-3xl italic mb-6">Colophon</h3>
            <p className="font-['Inter'] text-sm font-light leading-relaxed text-[#FAF9F6]/70">
              FontTrio is an independent typography registry. Made possible by the patronage of the following technical institutions and tools.
            </p>
          </div>

          <div className="flex gap-12 font-['Space_Mono'] text-[10px] tracking-widest uppercase text-[#FAF9F6]/50">
            <Link href="#" className="hover:text-[#FAF9F6] transition-colors">Submit</Link>
            <Link href="#" className="hover:text-[#FAF9F6] transition-colors">Twitter</Link>
            <Link href="#" className="hover:text-[#FAF9F6] transition-colors">Github</Link>
          </div>
        </div>

        {/* Elegant Sponsor Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-16 items-center opacity-60">
          {validSponsors.map((sponsor) => (
            <div key={sponsor.id} className="flex justify-center md:justify-start">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={sponsor.logoDark || sponsor.logo} 
                alt={`${sponsor.name || 'Sponsor'} Logo`} 
                className="max-h-6 object-contain grayscale hover:grayscale-0 transition-all duration-500" 
              />
            </div>
          ))}
        </div>

        <div className="mt-32 text-center font-['Space_Mono'] text-[10px] tracking-widest uppercase text-[#FAF9F6]/30">
          © 2026 FontTrio Registry. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default function EditorialLandingPage() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5, // Slightly slower, more elegant scroll
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@300;400;500&family=Space+Mono:ital,wght@0,400;1,400&family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;1,6..96,400&family=Syne:wght@400;700&family=Bebas+Neue&display=swap');
        
        body {
          background-color: #FAF9F6;
          color: #1A1A1A;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* Elegant scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: #FAF9F6;
          border-left: 1px solid #C1B49A;
        }
        ::-webkit-scrollbar-thumb {
          background: #C1B49A;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #1A1A1A;
        }
      `}</style>

      <main className="relative w-full overflow-hidden bg-[#FAF9F6]">
        <Masthead />
        <MagazineCover />
        <EditorialFeature />
        <EditorialSpreadBeforeAfter />
        <LookbookGrid />
        <RecipeTerminal />
        <ColophonSponsors />
      </main>
    </>
  );
}
