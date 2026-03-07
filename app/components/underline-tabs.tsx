"use client";

interface UnderlineTabsProps<T extends string> {
  items: { key: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}

export function UnderlineTabs<T extends string>({
  items,
  value,
  onChange,
}: UnderlineTabsProps<T>) {
  return (
    <div className="flex items-center gap-0" role="tablist">
      {items.map((item) => (
        <button
          key={item.key}
          role="tab"
          aria-selected={value === item.key}
          onClick={() => onChange(item.key)}
          className={`px-4 py-2 text-xs uppercase tracking-wider border-b-2 transition-[color,border-color] ${
            value === item.key
              ? "border-foreground text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
