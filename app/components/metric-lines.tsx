interface MetricLine {
  position: string;
  label: string;
}

interface MetricLinesProps {
  lines: MetricLine[];
}

export function MetricLines({ lines }: MetricLinesProps) {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {lines.map((line) => (
        <div
          key={line.label}
          className="absolute left-0 right-0 flex items-center gap-2"
          style={{ top: line.position }}
        >
          <div className="flex-1 border-t border-dashed border-border" />
          <span className="text-[10px] font-mono text-muted-foreground shrink-0">
            {line.label}
          </span>
        </div>
      ))}
    </div>
  );
}
