import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS } from "../constants";
import { CameraMove } from "../components/CameraMove";
import { PAIRINGS } from "../data/pairings";
import { PlaygroundPreview } from "../components/PlaygroundPreview";

// Show 3 pairings: editorial → modern-clean → creative
const SHOWCASE_PAIRINGS = [PAIRINGS[0], PAIRINGS[1], PAIRINGS[3]];
const SWITCH_FRAMES = [0, 40, 80]; // when each pairing starts

export const PlaygroundScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Entrance
  const entrance = spring({ frame, fps, config: { damping: 200 } });
  const entranceY = interpolate(entrance, [0, 1], [50, 0]);
  const entranceOpacity = interpolate(entrance, [0, 1], [0, 1]);

  // Determine active pairing
  let activeIndex = 0;
  for (let i = SWITCH_FRAMES.length - 1; i >= 0; i--) {
    if (frame >= SWITCH_FRAMES[i]) {
      activeIndex = i;
      break;
    }
  }

  return (
    <CameraMove fromScale={1.15} toScale={1} fromX={-25} toX={25}>
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 120px",
      }}
    >
      <div
        style={{
          transform: `translateY(${entranceY}px)`,
          opacity: entranceOpacity,
          width: "100%",
        }}
      >
        {/* Title */}
        <h2
          style={{
            fontSize: 48,
            fontWeight: 500,
            color: COLORS.text,
            fontFamily: "'Inter', sans-serif",
            letterSpacing: -1,
            marginBottom: 12,
          }}
        >
          Playground
        </h2>
        <p
          style={{
            fontSize: 18,
            color: COLORS.textMuted,
            fontFamily: "'Inter', sans-serif",
            marginBottom: 28,
          }}
        >
          See how font pairings look with your content
        </p>

        {/* Selector pills */}
        <div style={{ display: "flex", gap: 8, marginBottom: 32 }}>
          {SHOWCASE_PAIRINGS.map((p, i) => (
            <div
              key={p.name}
              style={{
                padding: "8px 20px",
                borderRadius: 10,
                fontSize: 14,
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                backgroundColor:
                  i === activeIndex ? COLORS.white : COLORS.surface,
                color:
                  i === activeIndex ? COLORS.bg : COLORS.textMuted,
                border: `1px solid ${
                  i === activeIndex ? COLORS.white : COLORS.surfaceBorder
                }`,
              }}
            >
              {p.name}
            </div>
          ))}
        </div>

        {/* Preview cards with crossfade */}
        <div style={{ position: "relative", height: 460 }}>
          {SHOWCASE_PAIRINGS.map((pairing, i) => {
            // Calculate opacity for crossfade
            let opacity = 0;
            const switchFrame = SWITCH_FRAMES[i];
            const nextSwitch =
              i < SWITCH_FRAMES.length - 1
                ? SWITCH_FRAMES[i + 1]
                : durationInFrames;

            if (i === activeIndex) {
              // Fade in
              opacity = interpolate(
                frame,
                [switchFrame, switchFrame + 8],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );
            } else if (i < activeIndex) {
              // Already faded out
              const fadeEnd = SWITCH_FRAMES[i + 1];
              opacity = interpolate(
                frame,
                [fadeEnd - 8, fadeEnd],
                [1, 0],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );
            }

            if (opacity < 0.01) return null;

            return (
              <PlaygroundPreview
                key={pairing.name}
                pairing={pairing}
                opacity={opacity}
              />
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
    </CameraMove>
  );
};
