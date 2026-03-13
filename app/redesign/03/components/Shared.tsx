"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Magnet from "./Magnet";

export const Header = () => {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-6 py-3 w-[90%] max-w-2xl bg-[#F7F7F5]/80 backdrop-blur-xl border border-[#E5E3DB] rounded-full shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]"
    >
      <Magnet padding={20} magnetStrength={0.2}>
        <Link href="/redesign/03" className="flex items-center gap-2 cursor-pointer">
          <div className="w-6 h-6 rounded-full bg-[#2C2C2A]" />
          <span className="font-medium text-sm tracking-tight text-[#2C2C2A]">
            FontTrio
          </span>
        </Link>
      </Magnet>

      <nav className="hidden md:flex items-center gap-2">
        <Magnet padding={20} magnetStrength={0.2}>
          <Link
            href="/redesign/03/pairs"
            className="text-sm text-[#737370] hover:text-[#2C2C2A] transition-colors px-4 py-2"
          >
            Pairs
          </Link>
        </Magnet>
        <Magnet padding={20} magnetStrength={0.2}>
          <Link
            href="/redesign/03/fonts"
            className="text-sm text-[#737370] hover:text-[#2C2C2A] transition-colors px-4 py-2"
          >
            Fonts
          </Link>
        </Magnet>
        <Magnet padding={20} magnetStrength={0.2}>
          <Link
            href="#"
            className="text-sm text-[#737370] hover:text-[#2C2C2A] transition-colors px-4 py-2"
          >
            Docs
          </Link>
        </Magnet>
      </nav>

      <Magnet padding={20} magnetStrength={0.2}>
        <button
          type="button"
          className="px-4 py-2 bg-[#2C2C2A] text-[#F7F7F5] rounded-full text-sm font-medium hover:bg-[#40403e] transition-colors"
        >
          Get Started
        </button>
      </Magnet>
    </motion.header>
  );
};

export const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full h-screen bg-[#2C2C2A] flex flex-col items-center justify-center -z-10 px-6">
      <div className="max-w-4xl mx-auto text-center w-full">
        <h2 className="text-6xl md:text-8xl lg:text-9xl text-[#F7F7F5] font-['Playfair_Display'] italic mb-12">
          Ready to explore?
        </h2>

        <Magnet padding={50} magnetStrength={0.3}>
          <Link
            href="/redesign/03/pairs"
            className="inline-block px-8 py-4 bg-[#F7F7F5] text-[#2C2C2A] rounded-full text-lg font-medium hover:scale-105 transition-transform duration-300"
          >
            Open the Registry
          </Link>
        </Magnet>

        <div className="mt-32 flex justify-between items-center text-[#F7F7F5]/40 text-sm font-medium w-full border-t border-[#F7F7F5]/10 pt-8">
          <span>© 2026 FontTrio.</span>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-[#F7F7F5] transition-colors">
              Twitter
            </Link>
            <Link href="#" className="hover:text-[#F7F7F5] transition-colors">
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};