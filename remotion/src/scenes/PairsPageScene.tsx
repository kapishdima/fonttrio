import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS } from "../constants";
import { CameraMove } from "../components/CameraMove";
import { BrowserFrame } from "../components/BrowserFrame";
import { PairsGrid } from "../components/PairsGrid";

export const PairsPageScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Cursor animation: moves toward card index 1 (second card)
  const cursorProgress = interpolate(frame, [15, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Highlight card after cursor reaches it
  const highlightIndex = frame > 45 ? 0 : undefined;

  // Virtual cursor position
  const cursorX = interpolate(cursorProgress, [0, 1], [800, 380]);
  const cursorY = interpolate(cursorProgress, [0, 1], [600, 320]);
  const cursorOpacity = interpolate(frame, [10, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <CameraMove fromScale={1.12} toScale={1} fromX={20} toX={-20}>
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <BrowserFrame url="fonttrio.xyz/pairs">
        <div style={{ padding: "30px 40px" }}>
          {/* Page title */}
          <h1
            style={{
              fontSize: 40,
              fontWeight: 500,
              color: COLORS.text,
              fontFamily: "'Inter', sans-serif",
              letterSpacing: -1,
              marginBottom: 24,
            }}
          >
            Font Pairings
          </h1>
          {/* Search bar */}
          <div
            style={{
              width: "100%",
              maxWidth: 500,
              height: 44,
              borderRadius: 12,
              backgroundColor: COLORS.surface,
              border: `1px solid ${COLORS.surfaceBorder}`,
              marginBottom: 28,
              display: "flex",
              alignItems: "center",
              padding: "0 16px",
              fontSize: 14,
              color: COLORS.textSubtle,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Search pairings...
          </div>
        </div>
        <PairsGrid highlightIndex={highlightIndex} columns={3} />

        {/* Virtual cursor */}
        <div
          style={{
            position: "absolute",
            left: cursorX,
            top: cursorY,
            width: 20,
            height: 20,
            opacity: cursorOpacity,
            pointerEvents: "none",
            zIndex: 100,
          }}
        >
          {/* Cursor arrow SVG */}
          <svg
            width="20"
            height="24"
            viewBox="0 0 20 24"
            fill="none"
          >
            <path
              d="M1 1L1 18L5.5 14L10 22L13 20.5L8.5 12.5L14 11L1 1Z"
              fill="white"
              stroke="black"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      </BrowserFrame>
    </AbsoluteFill>
    </CameraMove>
  );
};
