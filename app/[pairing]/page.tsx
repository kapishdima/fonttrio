import { getAllPairings, getPairing } from "@/lib/pairings";
import { notFound } from "next/navigation";
import { PairingDetail } from "./pairing-detail";

interface PairingPageProps {
  params: Promise<{ pairing: string }>;
}

export async function generateStaticParams() {
  return getAllPairings().map((p) => ({ pairing: p.name }));
}

export async function generateMetadata({ params }: PairingPageProps) {
  const { pairing: name } = await params;
  const pairing = getPairing(name);
  if (!pairing) return {};
  return {
    title: pairing.name,
    description: `${pairing.description} Includes ${pairing.heading}, ${pairing.body}, and ${pairing.mono}.`,
    alternates: {
      canonical: `https://www.fonttrio.xyz/${pairing.name}`,
    },
    openGraph: {
      title: `${pairing.name} - Font Pairing for shadcn`,
      description: pairing.description,
      url: `https://www.fonttrio.xyz/${pairing.name}`,
    },
  };
}

export default async function PairingPage({ params }: PairingPageProps) {
  const { pairing: name } = await params;
  const pairing = getPairing(name);

  if (!pairing) {
    notFound();
  }

  return <PairingDetail pairing={pairing} />;
}
