interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <p className={`text-[10px] uppercase tracking-wider text-muted-foreground ${className}`}>
      {children}
    </p>
  );
}
