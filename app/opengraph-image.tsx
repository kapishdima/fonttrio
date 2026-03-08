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
        
        {/* Logo from logo-square.svg */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "48px",
          }}
        >
         <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="64" height="64" rx="8" fill="#141414"/>
            <path d="M23.66 47.616C20.5507 47.616 18.204 46.868 16.62 45.372C15.0653 43.8467 14.288 41.2947 14.288 37.716V29.752H12.352V22.536C13.4667 22.536 14.3027 22.2573 14.86 21.7C15.4173 21.1133 15.696 20.3213 15.696 19.324V17.344H25.024V22.536H30.964V29.752H25.024V36.968C25.024 37.936 25.2293 38.6547 25.64 39.124C26.08 39.564 26.7253 39.784 27.576 39.784C28.6907 39.784 29.908 39.652 31.228 39.388V46.296C30.4067 46.6187 29.292 46.912 27.884 47.176C26.5053 47.4693 25.0973 47.616 23.66 47.616ZM43.5116 47.616C40.4022 47.616 38.0556 46.868 36.4716 45.372C34.9169 43.8467 34.1396 41.2947 34.1396 37.716V29.752H32.2036V22.536C33.3182 22.536 34.1542 22.2573 34.7116 21.7C35.2689 21.1133 35.5476 20.3213 35.5476 19.324V17.344H44.8756V22.536H50.8156V29.752H44.8756V36.968C44.8756 37.936 45.0809 38.6547 45.4916 39.124C45.9316 39.564 46.5769 39.784 47.4276 39.784C48.5422 39.784 49.7596 39.652 51.0796 39.388V46.296C50.2582 46.6187 49.1436 46.912 47.7356 47.176C46.3569 47.4693 44.9489 47.616 43.5116 47.616Z" fill="white"/>
            <rect x="29.5" y="22.536" width="5" height="7.20545" fill="white"/>
            <path d="M35.9548 43.8232C34.883 44.6496 31.2651 45.7749 31.2651 45.7749L31.1765 39.9152C31.1765 39.9152 34.6401 39.2419 36.8651 38.0282C38.2077 37.2959 38.9932 41.5015 38.9932 41.5015C38.9932 41.5015 36.9525 43.054 35.9548 43.8232Z" fill="white" stroke="white"/>
          </svg>
        </div>

        {/* Main heading */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "32px" }}>
          <h1
            style={{
              fontSize: "72px",
              fontWeight: 700,
              color: "white",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              margin: 0,
              marginBottom: "4px",
            }}
          >
            Three fonts.
          </h1>
          <h1
            style={{
              fontSize: "72px",
              fontWeight: 700,
              color: "white",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            One command.
          </h1>
        </div>

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
            npx shadcn@latest add @fonttrio/r/editorial.json
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
