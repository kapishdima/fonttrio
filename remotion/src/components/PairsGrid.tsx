import React from "react";
import { COLORS } from "../constants";
import { PAIRINGS } from "../data/pairings";
import { PairingCard } from "./PairingCard";

interface PairsGridProps {
  highlightIndex?: number;
  columns?: number;
}

export const PairsGrid: React.FC<PairsGridProps> = ({
  highlightIndex,
  columns = 3,
}) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: 16,
        padding: "40px 60px",
        backgroundColor: COLORS.bg,
      }}
    >
      {PAIRINGS.map((pairing, i) => (
        <PairingCard
          key={pairing.name}
          pairing={pairing}
          delay={i * 4}
          highlighted={highlightIndex === i}
        />
      ))}
    </div>
  );
};
