"use client";

interface ChipToggleProps<T extends string> {
  items: { key: T; label: string }[];
  value: T | null;
  onChange: (value: T | null) => void;
}

export function ChipToggle<T extends string>({
  items,
  value,
  onChange,
}: ChipToggleProps<T>) {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
      {items.map((item) => (
        <button
          key={item.key}
          onClick={() => onChange(value === item.key ? null : item.key)}
          aria-pressed={value === item.key}
          className={`px-2.5 py-1 text-[11px] uppercase tracking-wider whitespace-nowrap transition-[background-color,color,border-color] border shrink-0 ${
            value === item.key
              ? "bg-foreground text-background border-foreground"
              : "bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
