"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { XIcon, GitHubIcon } from "./icons";
import { SOCIAL_LINKS } from "@/lib/constants";
import { Menu, X } from "lucide-react";

function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <a
        href={SOCIAL_LINKS.x.url}
        target="_blank"
        rel="noopener noreferrer"
        className="size-11 sm:size-10 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-[color,background-color] min-h-[44px] min-w-[44px]"
        aria-label={SOCIAL_LINKS.x.label}
      >
        <XIcon className="size-5 sm:size-4" />
      </a>
      <a
        href={SOCIAL_LINKS.github.url}
        target="_blank"
        rel="noopener noreferrer"
        className="size-11 sm:size-10 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-[color,background-color] min-h-[44px] min-w-[44px]"
        aria-label={SOCIAL_LINKS.github.label}
      >
        <GitHubIcon className="size-5 sm:size-4" />
      </a>
    </div>
  );
}

function SponsorButton({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/sponsors"
      className={`flex items-center justify-center gap-2 px-4 py-3 text-sm sm:text-xs uppercase tracking-wider border border-border bg-surface hover:bg-surface-hover transition-colors min-h-[44px] ${className}`}
    >
      <span>Support</span>
    </Link>
  );
}

function useHrefWithParams(baseHref: string): string {
  const searchParams = useSearchParams();
  return searchParams.toString() ? `${baseHref}?${searchParams.toString()}` : baseHref;
}

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const homeHref = useHrefWithParams("/");
  const pairingsHref = useHrefWithParams("/pairings");
  const fontsHref = useHrefWithParams("/fonts");

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 border-b border-border backdrop-blur-sm">
      <div className="px-4 lg:px-12 h-16 flex items-center justify-between">
        <Link href={homeHref} className="flex items-center gap-3 hover:opacity-70 transition-opacity">
          <Logo.Text size="sm" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex items-center gap-2">
          <Link
            href={pairingsHref}
            className="flex items-center justify-center gap-2 px-4 py-3 text-sm sm:text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors min-h-[44px]"
          >
            Pairings
          </Link>
          <Link
            href={fontsHref}
            className="flex items-center justify-center gap-2 px-4 py-3 text-sm sm:text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors min-h-[44px]"
          >
            Fonts
          </Link>
          <SponsorButton />
          <SocialLinks />
          <ThemeToggle />
        </div>

        {/* Mobile Navigation */}
        <div className="flex sm:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="size-11 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-[color,background-color] min-h-[44px] min-w-[44px]"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-border bg-background/95 backdrop-blur-sm">
          <div className="px-4 py-4 space-y-4">
            <Link
              href={pairingsHref}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center w-full px-4 py-3 text-sm uppercase tracking-wider border border-border hover:bg-surface transition-colors min-h-[44px]"
            >
              Browse Pairings
            </Link>
            <Link
              href={fontsHref}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center w-full px-4 py-3 text-sm uppercase tracking-wider border border-border hover:bg-surface transition-colors min-h-[44px]"
            >
              Browse Fonts
            </Link>
            <SponsorButton className="w-full" />
            <div className="flex items-center justify-center gap-4 pt-2 border-t border-border">
              <SocialLinks />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
