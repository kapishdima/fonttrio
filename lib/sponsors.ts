export interface Sponsor {
  id: string;
  name: string;
  /** Logo for light theme (or universal if logoDark is not set) */
  logo: string;
  /** Optional logo variant for dark theme — use when the default logo has dark fills that disappear on dark backgrounds */
  logoDark?: string;
  url: string;
  tier: "bronze" | "silver" | "gold";
}

export const SPONSORS: Sponsor[] = [
  // Add your sponsors here
  {
    id: "1",
    name: "SlidesAI",
    logo: "/sponsors/slidesai-logo.svg",
    logoDark: "/sponsors/slidesai-logo-dark.svg",
    url: "https://www.slidesai.io?utm_source=fonttrio&utm_medium=sponsor&utm_campaign=fonttrio_sponsors_page",
    tier: "gold"
  },
  {
    id: "2",
    name: "shadcn/space",
    logo: "https://shadcnspace.com/images/logo/shadcnspace.svg",
    logoDark: "https://shadcnspace.com/images/logo/shadcnspace-white.svg",
    url: "https://shadcnspace.com/?utm_source=fonttrio&utm_medium=sponsor&utm_campaign=fonttrio_sponsors_page",
    tier: "silver"
  },
  {
    id: "3",
    name: "Shoogle",
    logo: "/sponsors/shoogle.svg",
    logoDark: "/sponsors/shoogle-dark.svg",
    url: "https://shoogle.dev/?utm_source=fonttrio&utm_medium=sponsor&utm_campaign=fonttrio_sponsors_page",
    tier: "silver"
  },
  {
    id: "4",
    name: "shadcn blocks",
    logo: "/sponsors/shadcnblocks.svg",
    logoDark: "/sponsors/shadcnblocks-dark.svg",
    url: "https://shadcnblocks.dev/?utm_source=fonttrio&utm_medium=sponsor&utm_campaign=fonttrio_sponsors_page",
    tier: "silver"
  },
  {
    id: "5",
    name: "shadcn studio",
    logo: "https://cdn.shadcnstudio.com/ss-assets/marketing/shadcn-studio-logos/shadcn-studio-light-full-logo.png",
    logoDark: "https://cdn.shadcnstudio.com/ss-assets/marketing/shadcn-studio-logos/shadcn-studio-dark-full-logo.png",
    url: "https://shadcnstudio.com/?utm_source=fonttrio&utm_medium=sponsor&utm_campaign=fonttrio_sponsors_page",
    tier: "silver"
  },
  {
    id: "6",
    name: "",
    logo: "/sponsors/react-bits.svg",
    logoDark: "/sponsors/react-bits-dark.svg",
    url: "https://pro.reactbits.dev/?utm_source=fonttrio&utm_medium=sponsor&utm_campaign=fonttrio_sponsors_page",
    tier: "silver"
  }
];

// ─── Billing cycles ───────────────────────────────────────────────

export type BillingCycle = "monthly" | "one-time";

export interface BillingOption {
  key: BillingCycle;
  label: string;
  suffix: string;
}

export const BILLING_OPTIONS: BillingOption[] = [
  { key: "monthly", label: "Monthly", suffix: "/month" },
  { key: "one-time", label: "One-time", suffix: "" },
];


// ─── Tiers ────────────────────────────────────────────────────────

export interface SponsorTier {
  key: "bronze" | "silver" | "gold";
  name: string;
  price: number;
  description: string;
  benefits: string[];
  paymentUrls: Record<BillingCycle, string>;
}

export const SPONSOR_TIERS: SponsorTier[] = [
  {
    key: "bronze",
    name: "Bronze",
    price: 5,
    description: "Support the project and get a shoutout on Twitter",
    benefits: [
      "Name listed on sponsors page",
      "Twitter shoutout",
      "Good karma",
    ],
    paymentUrls: {
      monthly: "https://www.creem.io/payment/prod_rwG87qt0R1UuhPLyL2WGg",
      "one-time": "https://www.creem.io/payment/prod_1a5aJmM7LZ1xyPilOVX7fw",
    },
  },
  {
    key: "silver",
    name: "Silver",
    price: 10,
    description: "Everything in Bronze, plus your logo on the sponsors page",
    benefits: [
      "Logo on sponsors page",
      "Name listed on sponsors page",
      "Twitter shoutout",
      "Good karma",
    ],
    paymentUrls: {
      monthly: "https://www.creem.io/payment/prod_1Js8kckF3HRNEAGRmKp3g",
      "one-time": "https://www.creem.io/payment/prod_7Na4t7X6YTDFvJ2P4m65t8",
    },
  },
  {
    key: "gold",
    name: "Gold",
    price: 50,
    description:
      "Everything in Silver, plus prominent placement and link to your site",
    benefits: [
      "Prominent placement on sponsors page",
      "Link to your website",
      "Logo on sponsors page",
      "Name listed on sponsors page",
      "Twitter shoutout",
      "Good karma",
    ],
    paymentUrls: {
      monthly: "https://www.creem.io/payment/prod_kvmcaM5AWH5VIRMiJ7Asz",
      "one-time": "https://www.creem.io/payment/prod_6jqT12WZiYYGBY2NUxchb8",
    },
  },
];

// ─── Page content ─────────────────────────────────────────────────

export const SPONSORS_PAGE = {
  title: "Support Fonttrio",
  description:
    "Fonttrio is an open-source project. Your support helps us maintain the registry, add new font pairings, and keep the service running.",

  sectionTitles: {
    sponsors: "Our Sponsors",
    whySponsor: "Why Sponsor Fonttrio?",
  },

  emptyState: {
    title: "No sponsors yet",
    description:
      "Be the first to support Fonttrio and help us continue building the best font pairing registry for the shadcn/ui community.",
    cta: "Become a Sponsor",
  },

  whySponsor: {
    openSource: {
      title: "Open Source",
      description:
        "All pairings are free and open source. Your support keeps it that way.",
    },
    community: {
      title: "Community Driven",
      description:
        "Help us grow the collection and improve the service for everyone.",
    },
    brand: {
      title: "Showcase Your Brand",
      description:
        "Get visibility among developers and designers using shadcn/ui.",
    },
  },

  ctaLabel: "Become a {tier} Sponsor",
} as const;
