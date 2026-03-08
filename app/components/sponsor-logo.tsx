import type { Sponsor } from "@/lib/sponsors";

interface SponsorLogoProps {
  sponsor: Sponsor;
  className?: string;
}

/**
 * Renders a sponsor logo with automatic dark-mode support.
 * If `sponsor.logoDark` is set, swaps between light/dark variants via CSS.
 * Otherwise renders the single logo as-is.
 */
export function SponsorLogo({ sponsor, className = "" }: SponsorLogoProps) {
  if (sponsor.logoDark) {
    return (
      <>
        <img
          src={sponsor.logo}
          alt={sponsor.name}
          className={`dark:hidden ${className}`}
        />
        <img
          src={sponsor.logoDark}
          alt={sponsor.name}
          className={`hidden dark:block ${className}`}
        />
      </>
    );
  }

  return (
    <img
      src={sponsor.logo}
      alt={sponsor.name}
      className={className}
    />
  );
}
