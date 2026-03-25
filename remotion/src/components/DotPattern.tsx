import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../constants";

export const DotPattern: React.FC<{
  opacity?: number;
}> = ({ opacity = 0.15 }) => {
  const frame = useCurrentFrame();

  // Animate a radial "spotlight" position across the pattern
  const spotX = interpolate(frame, [0, 300], [400, 1500], {
    extrapolateRight: "clamp",
  });
  const spotY = interpolate(frame, [0, 300], [300, 700], {
    extrapolateRight: "clamp",
  });

  const dotSize = 2;
  const gap = 30;

  return (
    <AbsoluteFill style={{ opacity }}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="dotPattern"
            x="0"
            y="0"
            width={gap}
            height={gap}
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx={gap / 2}
              cy={gap / 2}
              r={dotSize / 2}
              fill={COLORS.dotBase}
            />
          </pattern>
          <radialGradient id="spotGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={COLORS.dotActive} />
            <stop offset="60%" stopColor={COLORS.dotBase} />
            <stop offset="100%" stopColor={COLORS.dotBase} />
          </radialGradient>
          <pattern
            id="dotPatternActive"
            x="0"
            y="0"
            width={gap}
            height={gap}
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx={gap / 2}
              cy={gap / 2}
              r={dotSize / 2}
              fill="url(#spotGradient)"
            />
          </pattern>
          <radialGradient id="spotlight">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="spotMask">
            <rect width="100%" height="100%" fill="black" />
            <circle cx={spotX} cy={spotY} r="200" fill="url(#spotlight)" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#dotPattern)" />
        <rect
          width="100%"
          height="100%"
          fill="url(#dotPatternActive)"
          mask="url(#spotMask)"
        />
      </svg>
    </AbsoluteFill>
  );
};
