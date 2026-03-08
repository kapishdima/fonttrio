interface LogoSizeConfig {
  width: number;
  height: number;
  fontSize: number;
}

const SIZES: Record<"sm" | "md" | "lg", LogoSizeConfig> = {
  sm: { width: 32, height: 32, fontSize: 14 },
  md: { width: 40, height: 40, fontSize: 18 },
  lg: { width: 48, height: 48, fontSize: 22 },
};

interface LogoBaseProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

function LogoText({ size = "md", className = "" }: LogoBaseProps) {
  const textClass = size === "sm" ? "text-lg" : size === "lg" ? "text-2xl" : "text-xl";
  return (
    <span className={`flex items-center ${className}`}>
      <span className={`font-display ${textClass} tracking-tight`}>Font</span>
      <span className={`font-display ${textClass} tracking-tight text-muted-foreground`}>trio</span>
    </span>
  );
}

function LogoIcon({ size = "md", className = "" }: LogoBaseProps) {
  const { width, height, fontSize } = SIZES[size];

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="40" height="40" rx="6" className="fill-surface stroke-border" strokeWidth="1"/>
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

function LogoCircle({ size = "md", className = "" }: LogoBaseProps) {
  const { width, height, fontSize } = SIZES[size];

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="40" height="40" rx="20" className="fill-surface stroke-border" strokeWidth="1"/>
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

export const Logo = {
  Text: LogoText,
  Icon: LogoIcon,
  Circle: LogoCircle,
};
