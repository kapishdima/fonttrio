"use client";

import Link from "next/link";
import type { PairingData, TypographyScale } from "@/lib/pairings";
import { FontProvider } from "../components/font-provider";
import { ThemeToggle } from "../components/theme-toggle";
import { TypeTester } from "../components/type-tester";
import { ContextPreview } from "../components/context-preview";
import { TypographyCustomizer } from "../components/typography-customizer";
import { InstallCommand } from "../components/install-command";
import { SideBySide } from "../components/side-by-side";
import { getAllPairings } from "@/lib/pairings";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";

interface PairingDetailProps {
  pairing: PairingData;
}

export function PairingDetail({ pairing }: PairingDetailProps) {
  const [isCustomized, setIsCustomized] = useState(false);

  const allPairings = getAllPairings();
  const allFontUrls = allPairings
    .map((p) => p.googleFontsUrl)
    .filter(Boolean);

  const headingFont = `"${pairing.heading}", ${pairing.headingCategory}`;
  const bodyFont = `"${pairing.body}", ${pairing.bodyCategory}`;
  const monoFont = `"${pairing.mono}", monospace`;

  const handleScaleChange = (scale: TypographyScale) => {
    const changed = JSON.stringify(scale) !== JSON.stringify(pairing.scale);
    setIsCustomized(changed);
  };

  return (
    <div className="min-h-screen bg-background">
      {allFontUrls.map((url) => (
        <FontProvider key={url} fonts={[]} googleFontsUrl={url} />
      ))}

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="px-6 lg:px-12 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            <span className="font-display text-lg tracking-wider">BACK</span>
          </Link>
          <ThemeToggle />
        </div>
      </nav>

      {/* Hero Header */}
      <header id="main-content" className="border-b border-border">
        <div className="px-6 lg:px-12 py-12 lg:py-20">
          <div className="max-w-[1600px] mx-auto">
            <div className="grid grid-cols-12 gap-4">
              {/* Section Label */}
              <div className="col-span-12 lg:col-span-1">
                <span className="text-xs text-muted-foreground uppercase tracking-widest">01</span>
              </div>
              
              {/* Main Content */}
              <div className="col-span-12 lg:col-span-11">
                {/* Mood Tags */}
                <div className="flex items-center gap-2 mb-6">
                  {pairing.mood.map((m) => (
                    <span
                      key={m}
                      className="text-xs uppercase tracking-wider px-2 py-1 border border-[#e30613] text-[#e30613]"
                    >
                      {m}
                    </span>
                  ))}
                </div>
                
                {/* Giant Title */}
                <h1
                  style={{
                    fontFamily: headingFont,
                    fontWeight: pairing.scale.h1.weight,
                    lineHeight: "0.9",
                    letterSpacing: "-0.02em",
                  }}
                  className="text-[clamp(3rem,12vw,10rem)] uppercase"
                >
                  {pairing.name}
                </h1>
                
                {/* Font Trio Display */}
                <div className="grid grid-cols-12 gap-8 mt-12 pt-8 border-t border-border">
                  <div className="col-span-12 lg:col-span-5">
                    <p 
                      className="text-lg leading-relaxed text-muted-foreground"
                      style={{ fontFamily: bodyFont }}
                    >
                      {pairing.description}
                    </p>
                  </div>
                  
                  <div className="col-span-12 lg:col-span-6 lg:col-start-7">
                    <div className="grid grid-cols-3 gap-4">
                      <FontDisplay
                        label="Heading"
                        name={pairing.heading}
                        font={headingFont}
                      />
                      <FontDisplay
                        label="Body"
                        name={pairing.body}
                        font={bodyFont}
                      />
                      <FontDisplay
                        label="Mono"
                        name={pairing.mono}
                        font={monoFont}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sections */}
      <main>
        {/* Type Tester */}
        <DetailSection number="02" label="Type Tester">
          <TypeTester pairing={pairing} />
        </DetailSection>

        {/* In Context */}
        <DetailSection number="03" label="In Context">
          <ContextPreview pairing={pairing} />
        </DetailSection>

        {/* Typography Scale */}
        <DetailSection number="04" label="Typography Scale">
          <TypographyCustomizer
            pairing={pairing}
            onScaleChange={handleScaleChange}
          />
        </DetailSection>

        {/* Install */}
        <DetailSection number="05" label="Install">
          <InstallCommand
            pairingName={pairing.name}
            isCustomized={isCustomized}
          />
        </DetailSection>

        {/* Compare */}
        <DetailSection number="06" label="Compare" last>
          <SideBySide current={pairing} />
        </DetailSection>
      </main>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="px-6 lg:px-12 py-8">
          <div className="max-w-[1600px] mx-auto">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 lg:col-span-6">
                <Link 
                  href="/" 
                  className="font-display text-xl tracking-wider hover:text-muted-foreground transition-colors"
                >
                  FONTTRIO
                </Link>
              </div>
              <div className="col-span-12 lg:col-span-6 lg:text-right">
                <p className="text-xs text-muted-foreground uppercase tracking-widest">
                  {pairing.heading} / {pairing.body} / {pairing.mono}
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FontDisplay({
  label,
  name,
  font,
}: {
  label: string;
  name: string;
  font: string;
}) {
  return (
    <div className="border-l-2 border-border pl-4">
      <span className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
        {label}
      </span>
      <span
        className="block text-lg"
        style={{ fontFamily: font, fontWeight: 500 }}
      >
        {name}
      </span>
    </div>
  );
}

function DetailSection({
  number,
  label,
  last,
  children,
}: {
  number: string;
  label: string;
  last?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className={`border-b border-border ${last ? "" : ""}`}>
      <div className="px-6 lg:px-12 py-12 lg:py-20">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-12 gap-4">
            {/* Section Number & Label */}
            <div className="col-span-12 lg:col-span-3 mb-8 lg:mb-0">
              <div className="lg:sticky lg:top-24">
                <span className="block text-xs text-muted-foreground uppercase tracking-widest mb-2">
                  {number}
                </span>
                <h2 className="font-display text-3xl lg:text-4xl tracking-wider">
                  {label}
                </h2>
              </div>
            </div>
            
            {/* Content */}
            <div className="col-span-12 lg:col-span-9">
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
