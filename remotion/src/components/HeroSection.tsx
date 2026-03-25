import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../constants";

export const HeroSection: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 200 } });
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);
  const titleScale = interpolate(titleSpring, [0, 1], [0.9, 1]);

  return (
    <div
      style={{
        width: "100%",
        height: 860,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        backgroundColor: COLORS.bg,
      }}
    >
      {/* White container */}
      <div
        style={{
          position: "absolute",
          inset: 12,
          borderRadius: 24,
          backgroundColor: COLORS.white,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Dark nav pill */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#1a1a1a",
            borderRadius: "0 0 12px 12px",
            padding: "10px 32px",
            display: "flex",
            gap: 24,
            fontSize: 14,
            color: "rgba(255,255,255,0.7)",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          <span>Pairings</span>
          <span>Fonts</span>
          <span>Playground</span>
          <span>Sponsors</span>
        </div>

        <div
          style={{
            opacity: titleOpacity,
            transform: `scale(${titleScale})`,
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: 96,
              fontWeight: 500,
              color: "#2C2C2A",
              lineHeight: 1.05,
              letterSpacing: -2,
              fontFamily: "'Inter', sans-serif",
              margin: 0,
            }}
          >
            Three fonts
            <br />
            One{" "}
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
              }}
            >
              command
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};
