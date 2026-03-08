import Link from "next/link";
import { Logo } from "./logo";
import { XIcon, GitHubIcon } from "./icons";
import { SOCIAL_LINKS } from "@/lib/constants";

function SocialLinks() {
  return (
    <div className="flex items-center gap-3">
      <a
        href={SOCIAL_LINKS.x.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-foreground transition-colors"
        aria-label={SOCIAL_LINKS.x.label}
      >
        <XIcon className="size-4" />
      </a>
      <a
        href={SOCIAL_LINKS.github.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-foreground transition-colors"
        aria-label={SOCIAL_LINKS.github.label}
      >
        <GitHubIcon className="size-4" />
      </a>
    </div>
  );
}

export function SiteFooter({ subtitle = "Curated font pairings for shadcn/ui" }: { subtitle?: string }) {
  return (
    <footer className="border-t border-border">
      <div className="px-4 lg:px-8 py-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1 hover:opacity-70 transition-opacity">
            <Logo.Text size="sm" />
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/sponsors"
              className="text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              Sponsors
            </Link>
            <SocialLinks />
          </div>
        </div>
      </div>
    </footer>
  );
}
