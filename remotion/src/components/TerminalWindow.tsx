import React from "react";
import { COLORS } from "../constants";

interface TerminalWindowProps {
  children: React.ReactNode;
  width?: number;
}

export const TerminalWindow: React.FC<TerminalWindowProps> = ({
  children,
  width = 900,
}) => {
  return (
    <div
      style={{
        width,
        borderRadius: 16,
        backgroundColor: COLORS.surface,
        border: `1px solid ${COLORS.surfaceBorderStrong}`,
        overflow: "hidden",
        boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
      }}
    >
      {/* Title bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "14px 18px",
          borderBottom: `1px solid ${COLORS.surfaceBorder}`,
        }}
      >
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
        <div
          style={{
            flex: 1,
            textAlign: "center",
            fontSize: 13,
            color: COLORS.textSubtle,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Terminal
        </div>
      </div>
      {/* Content */}
      <div
        style={{
          padding: "24px 28px",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 16,
          lineHeight: 1.8,
          color: COLORS.text,
        }}
      >
        {children}
      </div>
    </div>
  );
};
