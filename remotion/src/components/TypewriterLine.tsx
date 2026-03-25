import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface TypewriterLineProps {
  text: string;
  startFrame: number;
  /** Frames to type the full text */
  typeDuration: number;
  color?: string;
  prefix?: string;
  prefixColor?: string;
  showCursor?: boolean;
}

export const TypewriterLine: React.FC<TypewriterLineProps> = ({
  text,
  startFrame,
  typeDuration,
  color = "#ededed",
  prefix,
  prefixColor,
  showCursor = false,
}) => {
  const frame = useCurrentFrame();

  if (frame < startFrame) return null;

  const localFrame = frame - startFrame;
  const charsToShow = Math.floor(
    interpolate(localFrame, [0, typeDuration], [0, text.length], {
      extrapolateRight: "clamp",
    })
  );

  const displayText = text.slice(0, charsToShow);
  const isTyping = charsToShow < text.length;
  const cursorVisible = showCursor || (isTyping && frame % 16 < 10);

  return (
    <div style={{ minHeight: "1.8em" }}>
      {prefix && (
        <span style={{ color: prefixColor || "#22c55e" }}>{prefix} </span>
      )}
      <span style={{ color }}>{displayText}</span>
      {cursorVisible && (
        <span
          style={{
            color,
            opacity: frame % 30 < 15 ? 1 : 0,
          }}
        >
          █
        </span>
      )}
    </div>
  );
};
