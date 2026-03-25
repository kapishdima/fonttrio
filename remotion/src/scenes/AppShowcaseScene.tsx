import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS } from "../constants";
import { CameraMove } from "../components/CameraMove";
import { BrowserFrame } from "../components/BrowserFrame";
import { HeroSection } from "../components/HeroSection";
import { HowItWorksCards } from "../components/HowItWorksCards";
import { PairsGrid } from "../components/PairsGrid";

export const AppShowcaseScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Smooth scroll: ease in-out over the scene duration
  const scrollProgress = interpolate(
    frame,
    [10, durationInFrames - 10],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.quad),
    }
  );

  // Total scroll distance (page height minus viewport)
  const totalScroll = 1800;
  const translateY = -scrollProgress * totalScroll;

  return (
    <CameraMove fromScale={1} toScale={1.15} fromY={0} toY={-30}>
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <BrowserFrame url="fonttrio.xyz">
        <div
          style={{
            transform: `translateY(${translateY}px)`,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
          }}
        >
          <HeroSection />
          <HowItWorksCards />
          <div style={{ padding: "40px 60px" }}>
            <h2
              style={{
                fontSize: 48,
                fontWeight: 500,
                color: COLORS.text,
                marginBottom: 30,
                fontFamily: "'Inter', sans-serif",
                letterSpacing: -1,
              }}
            >
              Popular font pairs
            </h2>
          </div>
          <PairsGrid columns={3} />
        </div>
      </BrowserFrame>
    </AbsoluteFill>
    </CameraMove>
  );
};
