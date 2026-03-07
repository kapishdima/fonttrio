export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  url: string;
  tier: "bronze" | "silver" | "gold";
}

export const SPONSORS: Sponsor[] = [
  // Add your sponsors here
  // {
  //   id: "1",
  //   name: "Your Company",
  //   logo: "/sponsors/logo.svg",
  //   url: "https://yourcompany.com",
  //   tier: "gold"
  // }
];

export interface SponsorTier {
  key: "bronze" | "silver" | "gold";
  name: string;
  price: number;
  description: string;
  benefits: string[];
  paymentUrl: string;
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
      "Good karma"
    ],
    paymentUrl: "https://www.creem.io/payment/prod_rwG87qt0R1UuhPLyL2WGg"
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
      "Good karma"
    ],
    paymentUrl: "https://www.creem.io/payment/prod_1Js8kckF3HRNEAGRmKp3g"
  },
  {
    key: "gold",
    name: "Gold",
    price: 50,
    description: "Everything in Silver, plus prominent placement and link to your site",
    benefits: [
      "Prominent placement on sponsors page",
      "Link to your website",
      "Logo on sponsors page",
      "Name listed on sponsors page",
      "Twitter shoutout",
      "Good karma"
    ],
    paymentUrl: "https://www.creem.io/payment/prod_kvmcaM5AWH5VIRMiJ7Asz" 
  }
];

// Page content constants
export const SPONSORS_PAGE = {
  title: "Support Fonttrio",
  description: "Fonttrio is an open-source project. Your support helps us maintain the registry, add new font pairings, and keep the service running.",
  
  sectionTitles: {
    sponsors: "Our Sponsors",
    whySponsor: "Why Sponsor Fonttrio?"
  },
  
  emptyState: {
    title: "No sponsors yet",
    description: "Be the first to support Fonttrio and help us continue building the best font pairing registry for the shadcn/ui community.",
    cta: "Become a Sponsor"
  },
  
  whySponsor: {
    openSource: {
      title: "Open Source",
      description: "All pairings are free and open source. Your support keeps it that way."
    },
    community: {
      title: "Community Driven",
      description: "Help us grow the collection and improve the service for everyone."
    },
    brand: {
      title: "Showcase Your Brand",
      description: "Get visibility among developers and designers using shadcn/ui."
    }
  }
} as const;
