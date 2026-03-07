export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  url: string;
  tier: "bronze" | "silver" | "gold";
}

export const SPONSORS: Sponsor[] = [
  // Gold Sponsors
  {
    id: "1",
    name: "Vercel",
    logo: "",
    url: "https://vercel.com",
    tier: "gold"
  },
  {
    id: "2",
    name: "Linear",
    logo: "",
    url: "https://linear.app",
    tier: "gold"
  },
  // Silver Sponsors
  {
    id: "3",
    name: "Raycast",
    logo: "",
    url: "https://raycast.com",
    tier: "silver"
  },
  {
    id: "4",
    name: "Supabase",
    logo: "",
    url: "https://supabase.com",
    tier: "silver"
  },
  {
    id: "5",
    name: "Prisma",
    logo: "",
    url: "https://prisma.io",
    tier: "silver"
  },
  // Bronze Sponsors
  {
    id: "6",
    name: "Resend",
    logo: "",
    url: "https://resend.com",
    tier: "bronze"
  },
  {
    id: "7",
    name: "Upstash",
    logo: "",
    url: "https://upstash.com",
    tier: "bronze"
  },
  {
    id: "8",
    name: "PlanetScale",
    logo: "",
    url: "https://planetscale.com",
    tier: "bronze"
  },
  {
    id: "9",
    name: "Clerk",
    logo: "",
    url: "https://clerk.com",
    tier: "bronze"
  },
  {
    id: "10",
    name: "Trigger.dev",
    logo: "",
    url: "https://trigger.dev",
    tier: "bronze"
  }
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
    paymentUrl: "https://buy.stripe.com/bronze_tier_link" // Replace with actual Stripe/PayPal link
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
    paymentUrl: "https://buy.stripe.com/silver_tier_link" // Replace with actual Stripe/PayPal link
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
    paymentUrl: "https://buy.stripe.com/gold_tier_link" // Replace with actual Stripe/PayPal link
  }
];
