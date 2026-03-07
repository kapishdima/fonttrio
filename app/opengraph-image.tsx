import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(to bottom right, #0a0a0a, #171717)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
        }}
      >
        {/* Grid background pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(to right, #262626 1px, transparent 1px),
              linear-gradient(to bottom, #262626 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
            opacity: 0.4,
          }}
        />
        
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              background: "#171717",
              border: "1px solid #404040",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                color: "white",
                fontSize: "24px",
                fontWeight: 700,
                letterSpacing: "-0.08em",
                fontFamily: "system-ui",
              }}
            >
              tt
            </span>
          </div>
          <span
            style={{
              fontSize: "32px",
              fontWeight: 600,
              color: "white",
              letterSpacing: "-0.02em",
            }}
          >
            Fonttrio
          </span>
        </div>

        {/* Main heading */}
        <h1
          style={{
            fontSize: "72px",
            fontWeight: 700,
            color: "white",
            textAlign: "center",
            marginBottom: "24px",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
          }}
        >
          Three fonts.
        </h1>
        <h1
          style={{
            fontSize: "72px",
            fontWeight: 700,
            color: "white",
            textAlign: "center",
            marginBottom: "40px",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
          }}
        >
          One command.
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "28px",
            color: "#a3a3a3",
            textAlign: "center",
            maxWidth: "800px",
            lineHeight: 1.4,
          }}
        >
          Curated font pairings for shadcn/ui projects
        </p>

        {/* Command preview */}
        <div
          style={{
            marginTop: "48px",
            padding: "16px 32px",
            background: "#171717",
            border: "1px solid #404040",
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <span style={{ color: "#737373", fontSize: "18px" }}>$</span>
          <span
            style={{
              color: "white",
              fontSize: "18px",
              fontFamily: "monospace",
            }}
          >
            npx shadcn@latest add https://fonttrio.dev/r/editorial.json
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
