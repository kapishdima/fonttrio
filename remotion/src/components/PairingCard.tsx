import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../constants";
import type { Pairing } from "../data/pairings";

interface PairingCardProps {
  pairing: Pairing;
  delay?: number;
  highlighted?: boolean;
}

export const PairingCard: React.FC<PairingCardProps> = ({
  pairing,
  delay = 0,
  highlighted = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    delay,
    config: { damping: 200 },
  });

  const translateY = interpolate(entrance, [0, 1], [30, 0]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const cardScale = highlighted ? 1.05 : 1;

  return (
    <div
      style={{
        transform: `translateY(${translateY}px) scale(${cardScale})`,
        opacity,
        borderRadius: 16,
        border: `1px solid ${highlighted ? COLORS.surfaceBorderStrong : COLORS.surfaceBorder}`,
        backgroundColor: COLORS.surface,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: highlighted
          ? "0 8px 30px rgba(255,255,255,0.05)"
          : "none",
      }}
    >
      {/* Content */}
      <div style={{ padding: "24px 28px", flex: 1 }}>
        <div
          style={{
            fontFamily: pairing.headingFamily,
            fontSize: 28,
            fontWeight: 800,
            color: COLORS.text,
            marginBottom: 8,
            lineHeight: 1.2,
          }}
        >
          {pairing.heading}
        </div>
        <div
          style={{
            fontFamily: pairing.bodyFamily,
            fontSize: 14,
            color: COLORS.textMuted,
            lineHeight: 1.5,
          }}
        >
          The quick brown fox jumps over the lazy dog.
        </div>
      </div>
      {/* Footer */}
      <div
        style={{
          padding: "14px 28px",
          borderTop: `1px solid ${COLORS.surfaceBorder}`,
          backgroundColor: "rgba(255,255,255,0.02)",
        }}
      >
        <code
          style={{
            fontFamily: pairing.monoFamily,
            fontSize: 12,
            color: COLORS.textSubtle,
          }}
        >
          fonttrio.xyz/r/{pairing.name}
        </code>
      </div>
    </div>
  );
};
