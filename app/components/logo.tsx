interface LogoProps {
  size?: "sm" | "lg";
}

export function Logo({ size = "lg" }: LogoProps) {
  const textClass = size === "sm" ? "text-lg" : "text-2xl";

  return (
    <span className="flex items-center">
      <span className={`font-display ${textClass} tracking-tight`}>Font</span>
      <span className={`font-display ${textClass} tracking-tight text-muted-foreground`}>trio</span>
    </span>
  );
}
