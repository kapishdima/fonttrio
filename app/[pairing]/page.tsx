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
    title: `${pairing.name} | fonttrio`,
    description: pairing.description,
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
