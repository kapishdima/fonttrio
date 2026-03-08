import type { Metadata } from "next";
import { SPONSORS, SPONSOR_TIERS, SPONSORS_PAGE } from "@/lib/sponsors";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";
import { Heart, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Sponsors",
  description:
    "Support Fonttrio, the open-source font pairing registry for shadcn/ui. Become a sponsor and get your brand in front of developers.",
  alternates: {
    canonical: "https://www.fonttrio.xyz/sponsors",
  },
};

export default function SponsorsPage() {
  const goldSponsors = SPONSORS.filter((s) => s.tier === "gold");
  const silverSponsors = SPONSORS.filter((s) => s.tier === "silver");
  const bronzeSponsors = SPONSORS.filter((s) => s.tier === "bronze");
  const hasSponsors = SPONSORS.length > 0;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="pt-32 pb-16 px-4 lg:px-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            {SPONSORS_PAGE.title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {SPONSORS_PAGE.description}
          </p>
        </div>

        {/* Sponsor Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {SPONSOR_TIERS.map((tier) => (
            <div
              key={tier.key}
              className="border border-border bg-surface/50 p-6 flex flex-col"
            >
              <div className="mb-4">
                <h3 className="text-xl font-bold mb-1">{tier.name}</h3>
                <div className="text-3xl font-bold">
                  ${tier.price}
                  <span className="text-sm font-normal text-muted-foreground">/month</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-6">
                {tier.description}
              </p>

              <ul className="space-y-2 mb-6 flex-1">
                {tier.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-foreground mt-0.5">✓</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <a
                href={tier.paymentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-foreground text-background text-center text-sm uppercase tracking-wider font-medium hover:opacity-90 transition-opacity"
              >
                Become a {tier.name} Sponsor
              </a>
            </div>
          ))}
        </div>

        {/* Current Sponsors Section */}
        <div className="border-t border-border pt-16">
          <h2 className="text-2xl font-bold text-center mb-12">
            {SPONSORS_PAGE.sectionTitles.sponsors}
          </h2>

          {!hasSponsors ? (
            // Empty State
            <div className="text-center py-16 bg-surface/30 border border-border border-dashed">
              <Heart className="size-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">{SPONSORS_PAGE.emptyState.title}</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                {SPONSORS_PAGE.emptyState.description}
              </p>
              <a
                href={SPONSOR_TIERS[0].paymentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-foreground text-background text-sm uppercase tracking-wider font-medium hover:opacity-90 transition-opacity"
              >
                {SPONSORS_PAGE.emptyState.cta}
              </a>
            </div>
          ) : (
            // Sponsors List
            <div className="space-y-12">
              {/* Gold Sponsors - Largest */}
              {goldSponsors.length > 0 && (
                <div>
                  <h3 className="text-sm uppercase tracking-wider text-muted-foreground text-center mb-8">
                    Gold Sponsors
                  </h3>
                  <div className="flex flex-wrap justify-center gap-8">
                    {goldSponsors.map((sponsor) => (
                      <a
                        key={sponsor.id}
                        href={sponsor.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-6 p-6 border border-border bg-surface hover:bg-surface-hover transition-colors w-full sm:w-[calc(50%-1rem)] max-w-xl"
                      >
                        <div className="size-20 bg-muted rounded-lg flex items-center justify-center shrink-0">
                          {sponsor.logo ? (
                            <img
                              src={sponsor.logo}
                              alt={sponsor.name}
                              className="size-12 object-contain"
                            />
                          ) : (
                            <span className="text-2xl font-bold">
                              {sponsor.name.charAt(0)}
                            </span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xl font-medium truncate">{sponsor.name}</div>
                        </div>
                        <ExternalLink className="size-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Silver Sponsors - Medium */}
              {silverSponsors.length > 0 && (
                <div>
                  <h3 className="text-sm uppercase tracking-wider text-muted-foreground text-center mb-6">
                    Silver Sponsors
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {silverSponsors.map((sponsor) => (
                      <a
                        key={sponsor.id}
                        href={sponsor.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 p-4 border border-border bg-surface/50 hover:bg-surface transition-colors"
                      >
                        <div className="size-12 bg-muted rounded flex items-center justify-center shrink-0">
                          {sponsor.logo ? (
                            <img
                              src={sponsor.logo}
                              alt={sponsor.name}
                              className="size-7 object-contain"
                            />
                          ) : (
                            <span className="text-base font-bold">
                              {sponsor.name.charAt(0)}
                            </span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">{sponsor.name}</div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Bronze Sponsors - Smallest */}
              {bronzeSponsors.length > 0 && (
                <div>
                  <h3 className="text-sm uppercase tracking-wider text-muted-foreground text-center mb-6">
                    Bronze Sponsors
                  </h3>
                  <div className="flex flex-wrap justify-center gap-2">
                    {bronzeSponsors.map((sponsor) => (
                      <a
                        key={sponsor.id}
                        href={sponsor.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 border border-border bg-surface/30 hover:bg-surface transition-colors text-xs"
                      >
                        {sponsor.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Why Sponsor Section */}
        <div className="mt-20 pt-16 border-t border-border">
          <h2 className="text-2xl font-bold text-center mb-8">
            {SPONSORS_PAGE.sectionTitles.whySponsor}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="font-medium mb-2">{SPONSORS_PAGE.whySponsor.openSource.title}</h3>
              <p className="text-sm text-muted-foreground">
                {SPONSORS_PAGE.whySponsor.openSource.description}
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">{SPONSORS_PAGE.whySponsor.community.title}</h3>
              <p className="text-sm text-muted-foreground">
                {SPONSORS_PAGE.whySponsor.community.description}
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">{SPONSORS_PAGE.whySponsor.brand.title}</h3>
              <p className="text-sm text-muted-foreground">
                {SPONSORS_PAGE.whySponsor.brand.description}
              </p>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
