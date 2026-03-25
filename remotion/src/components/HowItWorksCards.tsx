import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../constants";

const CARDS = [
  {
    badge: "01",
    title: "Browse curated pairs",
    description:
      "Explore professionally curated font combinations designed for real-world projects.",
  },
  {
    badge: "02",
    title: "Preview with your content",
    description:
      "See headings, body copy, and code blocks rendered side by side before committing.",
  },
  {
    badge: "03",
    title: "Install with one command",
    description:
      "One shadcn command adds fonts, CSS variables, and a full typography scale.",
  },
];

export const HowItWorksCards: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        width: "100%",
        padding: "60px 80px",
        backgroundColor: COLORS.bg,
      }}
    >
      <h2
        style={{
          fontSize: 48,
          fontWeight: 500,
          color: COLORS.text,
          marginBottom: 40,
          fontFamily: "'Inter', sans-serif",
          letterSpacing: -1,
        }}
      >
        How it works
      </h2>
      <div style={{ display: "flex", gap: 20 }}>
        {CARDS.map((card, i) => {
          const cardSpring = spring({
            frame,
            fps,
            delay: i * 5,
            config: { damping: 200 },
          });
          const y = interpolate(cardSpring, [0, 1], [40, 0]);
          const opacity = interpolate(cardSpring, [0, 1], [0, 1]);

          return (
            <div
              key={i}
              style={{
                flex: 1,
                transform: `translateY(${y}px)`,
                opacity,
                borderRadius: 16,
                backgroundColor: COLORS.surface,
                border: `1px solid ${COLORS.surfaceBorder}`,
                padding: "32px 28px",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: 2,
                  color: COLORS.textSubtle,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {card.badge}
              </span>
              <h3
                style={{
                  fontSize: 24,
                  fontWeight: 600,
                  color: COLORS.text,
                  margin: 0,
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: -0.5,
                }}
              >
                {card.title}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: COLORS.textMuted,
                  margin: 0,
                  lineHeight: 1.6,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {card.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
