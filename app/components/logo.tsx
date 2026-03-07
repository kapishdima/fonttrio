interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "square" | "circle" | "text";
  className?: string;
}

export function Logo({ 
  size = "md", 
  variant = "text",
  className = ""
}: LogoProps) {
  const sizes = {
    sm: { width: 32, height: 32, fontSize: 16 },
    md: { width: 40, height: 40, fontSize: 20 },
    lg: { width: 48, height: 48, fontSize: 24 }
  };

  const { width, height, fontSize } = sizes[size];

  if (variant === "text") {
    const textClass = size === "sm" ? "text-lg" : size === "lg" ? "text-2xl" : "text-xl";
    return (
      <span className={`flex items-center ${className}`}>
        <span className={`font-display ${textClass} tracking-tight`}>Font</span>
        <span className={`font-display ${textClass} tracking-tight text-muted-foreground`}>trio</span>
      </span>
    );
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {variant === "circle" && (
        <>
          {/* Circle background - command component colors */}
          <rect width="40" height="40" rx="20" className="fill-surface stroke-border" strokeWidth="1"/>
          {/* tt letters in Heebo font */}
          <text
            x="50%"
            y="55%"
            dominantBaseline="middle"
            textAnchor="middle"
            className="fill-foreground"
            fontFamily="var(--font-heebo), system-ui, sans-serif"
            fontSize={fontSize}
            fontWeight="700"
            letterSpacing="-0.08em"
          >
            tt
          </text>
        </>
      )}
      
      {variant === "square" && (
        <>
          {/* Square background with command component colors */}
          <rect width="40" height="40" rx="6" className="fill-surface stroke-border" strokeWidth="1"/>
          {/* tt letters in Heebo font - centered */}
          <text
            x="50%"
            y="55%"
            dominantBaseline="middle"
            textAnchor="middle"
            className="fill-foreground"
            fontFamily="var(--font-heebo), system-ui, sans-serif"
            fontSize={fontSize}
            fontWeight="700"
            letterSpacing="-0.08em"
          >
            tt
          </text>
        </>
      )}
    </svg>
  );
}

// Icon version for header - uses Command component styling
export function LogoIcon({
  size = "md",
  className = ""
}: Omit<LogoProps, 'variant'>) {
  const sizes = {
    sm: { width: 32, height: 32, fontSize: 14 },
    md: { width: 40, height: 40, fontSize: 18 },
    lg: { width: 48, height: 48, fontSize: 22 }
  };

  const { width, height, fontSize } = sizes[size];

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Square background - same styling as Command component */}
      <rect width="40" height="40" rx="6" className="fill-surface stroke-border" strokeWidth="1"/>
      {/* tt letters in Heebo font - centered */}
      <text
        x="50%"
        y="55%"
        dominantBaseline="middle"
        textAnchor="middle"
        className="fill-foreground"
        fontFamily="var(--font-heebo), system-ui, sans-serif"
        fontSize={fontSize}
        fontWeight="700"
        letterSpacing="-0.08em"
      >
        tt
      </text>
    </svg>
  );
}

// Alternative: Custom geometric tt logo without text element
export function LogoGeometric({ 
  size = "md", 
  variant = "square",
  className = ""
}: LogoProps) {
  const sizes = {
    sm: 32,
    md: 40,
    lg: 48
  };

  const s = sizes[size];
  const strokeWidth = s * 0.125; // 12.5% of size
  const offset = s * 0.25;

  return (
    <svg
      width={s}
      height={s}
      viewBox={`0 0 ${s} ${s}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {variant === "circle" && (
        <rect width={s} height={s} rx={s / 2} className="fill-surface stroke-border" strokeWidth={strokeWidth * 0.5} />
      )}
      {variant === "square" && (
        <rect width={s} height={s} rx={s * 0.15} className="fill-surface stroke-border" strokeWidth={strokeWidth * 0.5} />
      )}
      
      {/* First t */}
      <g className="stroke-foreground" strokeWidth={strokeWidth} strokeLinecap="round">
        {/* Vertical line */}
        <line x1={offset} y1={s * 0.2} x2={offset} y2={s * 0.8} />
        {/* Horizontal line */}
        <line x1={s * 0.1} y1={s * 0.35} x2={s * 0.4} y2={s * 0.35} />
      </g>
      
      {/* Second t - slightly offset */}
      <g className="stroke-foreground" strokeWidth={strokeWidth} strokeLinecap="round">
        {/* Vertical line */}
        <line x1={offset * 2.2} y1={s * 0.2} x2={offset * 2.2} y2={s * 0.8} />
        {/* Horizontal line */}
        <line x1={s * 0.32} y1={s * 0.35} x2={s * 0.62} y2={s * 0.35} />
      </g>
    </svg>
  );
}

// Minimal line art version
export function LogoMinimal({ 
  size = "md", 
  variant = "square",
  className = ""
}: LogoProps) {
  const sizes = {
    sm: 32,
    md: 40,
    lg: 48
  };

  const s = sizes[size];
  const strokeWidth = s * 0.1;

  return (
    <svg
      width={s}
      height={s}
      viewBox={`0 0 ${s} ${s}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {variant === "circle" && (
        <rect width={s} height={s} rx={s / 2} className="stroke-border" strokeWidth={strokeWidth} fill="none" />
      )}
      {variant === "square" && (
        <rect width={s} height={s} rx={s * 0.15} className="stroke-border" strokeWidth={strokeWidth} fill="none" />
      )}
      
      {/* tt in outline style */}
      <g className="stroke-foreground" strokeWidth={strokeWidth} strokeLinecap="round" fill="none">
        {/* First t */}
        <line x1={s * 0.22} y1={s * 0.18} x2={s * 0.22} y2={s * 0.82} />
        <line x1={s * 0.12} y1={s * 0.32} x2={s * 0.32} y2={s * 0.32} />
        
        {/* Second t */}
        <line x1={s * 0.48} y1={s * 0.18} x2={s * 0.48} y2={s * 0.82} />
        <line x1={s * 0.38} y1={s * 0.32} x2={s * 0.58} y2={s * 0.32} />
      </g>
    </svg>
  );
}
