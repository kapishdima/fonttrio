import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../constants";
import type { Pairing } from "../data/pairings";

interface PlaygroundPreviewProps {
  pairing: Pairing;
  opacity?: number;
}

export const PlaygroundPreview: React.FC<PlaygroundPreviewProps> = ({
  pairing,
  opacity = 1,
}) => {
  return (
    <div style={{ opacity, position: "absolute", inset: 0 }}>
      <div
        style={{
          display: "flex",
          borderRadius: 16,
          border: `1px solid ${COLORS.surfaceBorder}`,
          backgroundColor: COLORS.surface,
          overflow: "hidden",
          height: 400,
        }}
      >
        {/* Heading column */}
        <div
          style={{
            flex: 1,
            padding: "28px 32px",
            borderRight: `1px solid ${COLORS.surfaceBorder}`,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span
              style={{
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: 2,
                color: COLORS.textSubtle,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Heading
            </span>
            <span
              style={{
                fontSize: 12,
                color: COLORS.textMuted,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {pairing.heading}
            </span>
          </div>
          <div
            style={{
              fontFamily: pairing.headingFamily,
              fontSize: 36,
              fontWeight: 700,
              color: COLORS.text,
              lineHeight: 1.2,
            }}
          >
            The quick brown fox jumps over the lazy dog
          </div>
        </div>

        {/* Body column */}
        <div
          style={{
            flex: 1,
            padding: "28px 32px",
            borderRight: `1px solid ${COLORS.surfaceBorder}`,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span
              style={{
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: 2,
                color: COLORS.textSubtle,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Body
            </span>
            <span
              style={{
                fontSize: 12,
                color: COLORS.textMuted,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {pairing.body}
            </span>
          </div>
          <div
            style={{
              fontFamily: pairing.bodyFamily,
              fontSize: 16,
              color: COLORS.textMuted,
              lineHeight: 1.7,
            }}
          >
            Typography is the art and technique of arranging type to make
            written language legible, readable, and appealing when displayed.
            The arrangement of type involves selecting typefaces, point sizes,
            line lengths, line-spacing, and letter-spacing.
          </div>
        </div>

        {/* Code column */}
        <div
          style={{
            flex: 1,
            padding: "28px 32px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span
              style={{
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: 2,
                color: COLORS.textSubtle,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Code
            </span>
            <span
              style={{
                fontSize: 12,
                color: COLORS.textMuted,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {pairing.mono}
            </span>
          </div>
          <div
            style={{
              fontFamily: pairing.monoFamily,
              fontSize: 14,
              color: COLORS.textMuted,
              lineHeight: 1.8,
              whiteSpace: "pre",
            }}
          >
{`const config = {
  heading: "${pairing.heading}",
  body: "${pairing.body}",
  mono: "${pairing.mono}",
};`}
          </div>
        </div>
      </div>

      {/* Pairing name & mood */}
      <div
        style={{
          marginTop: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: COLORS.text,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {pairing.name}
        </span>
        <span
          style={{
            fontSize: 13,
            color: COLORS.textSubtle,
            fontFamily: "'Inter', sans-serif",
            padding: "4px 12px",
            borderRadius: 8,
            backgroundColor: "rgba(255,255,255,0.05)",
            border: `1px solid ${COLORS.surfaceBorder}`,
          }}
        >
          {pairing.mood}
        </span>
      </div>
    </div>
  );
};
