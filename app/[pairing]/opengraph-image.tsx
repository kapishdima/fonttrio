import { ImageResponse } from "next/og";
import { getPairing } from "@/lib/pairings";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({ params }: { params: { pairing: string } }) {
  const pairing = getPairing(params.pairing);

  if (!pairing) {
    return new ImageResponse(
      (
        <div
          style={{
            background: "linear-gradient(to bottom right, #0a0a0a, #171717)",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1 style={{ color: "white", fontSize: "48px" }}>Fonttrio</h1>
        </div>
      ),
      { ...size }
    );
  }

  const headingFont = `"${pairing.heading}", ${pairing.headingCategory}`;

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
            position: "absolute",
            top: "40px",
            left: "60px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
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
                fontSize: "20px",
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
              fontSize: "24px",
              fontWeight: 600,
              color: "white",
              letterSpacing: "-0.02em",
            }}
          >
            Fonttrio
          </span>
        </div>

        {/* Pairing name with actual font */}
        <h1
          style={{
            fontSize: "80px",
            fontWeight: 700,
            color: "white",
            textAlign: "center",
            marginBottom: "24px",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            fontFamily: headingFont,
          }}
        >
          {pairing.name}
        </h1>

        {/* Font combination */}
        <p
          style={{
            fontSize: "24px",
            color: "#a3a3a3",
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          {pairing.heading} + {pairing.body} + {pairing.mono}
        </p>

        {/* Description */}
        <p
          style={{
            fontSize: "20px",
            color: "#737373",
            textAlign: "center",
            maxWidth: "800px",
            lineHeight: 1.5,
          }}
        >
          {pairing.description}
        </p>

        {/* Install command */}
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
          <span style={{ color: "#737373", fontSize: "16px" }}>$</span>
          <span
            style={{
              color: "white",
              fontSize: "16px",
              fontFamily: "monospace",
            }}
          >
            shadcn add {pairing.name}
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
