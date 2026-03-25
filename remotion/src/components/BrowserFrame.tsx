import React from "react";
import { COLORS } from "../constants";

interface BrowserFrameProps {
  url: string;
  children: React.ReactNode;
}

export const BrowserFrame: React.FC<BrowserFrameProps> = ({
  url,
  children,
}) => {
  return (
    <div
      style={{
        width: 1600,
        height: 900,
        borderRadius: 20,
        backgroundColor: COLORS.bg,
        border: `1px solid ${COLORS.surfaceBorderStrong}`,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
      }}
    >
      {/* Browser chrome */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "12px 18px",
          borderBottom: `1px solid ${COLORS.surfaceBorder}`,
          backgroundColor: COLORS.surface,
        }}
      >
        {/* Dots */}
        <div style={{ display: "flex", gap: 7 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: COLORS.terminalDotRed,
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: COLORS.terminalDotYellow,
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: COLORS.terminalDotGreen,
            }}
          />
        </div>
        {/* URL bar */}
        <div
          style={{
            flex: 1,
            marginLeft: 12,
            padding: "6px 16px",
            borderRadius: 8,
            backgroundColor: COLORS.bg,
            border: `1px solid ${COLORS.surfaceBorder}`,
            fontSize: 13,
            color: COLORS.textMuted,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {url}
        </div>
      </div>
      {/* Content */}
      <div
        style={{
          flex: 1,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
};
