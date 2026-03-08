"use client";

import { useState, useCallback, useMemo } from "react";
import type { PairingData, TypographyScale } from "@/lib/pairings";
import { Slider } from "@/components/ui/slider";

interface TypographyCustomizerProps {
  pairing: PairingData;
  onScaleChange?: (scale: TypographyScale) => void;
}

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

const HEADING_LEVELS: HeadingLevel[] = ["h1", "h2", "h3", "h4", "h5", "h6"];

export function TypographyCustomizer({
  pairing,
  onScaleChange,
}: TypographyCustomizerProps) {
  const [scale, setScale] = useState<TypographyScale>(pairing.scale);
  const [expanded, setExpanded] = useState<string | null>("h1");

  const isCustomized = useMemo(() => {
    return JSON.stringify(scale) !== JSON.stringify(pairing.scale);
  }, [scale, pairing.scale]);

  const reset = useCallback(() => {
    setScale(pairing.scale);
    onScaleChange?.(pairing.scale);
  }, [pairing.scale, onScaleChange]);

  const updateHeading = useCallback(
    (
      level: HeadingLevel,
      field: "size" | "weight" | "lineHeight" | "letterSpacing",
      value: string | number
    ) => {
      setScale((prev) => {
        const next = { ...prev, [level]: { ...prev[level], [field]: value } };
        onScaleChange?.(next);
        return next;
      });
    },
    [onScaleChange]
  );

  const updateBody = useCallback(
    (field: "size" | "lineHeight" | "weight", value: string | number) => {
      setScale((prev) => {
        const next = { ...prev, body: { ...prev.body, [field]: value } };
        onScaleChange?.(next);
        return next;
      });
    },
    [onScaleChange]
  );

  const headingFont = `"${pairing.heading}", ${pairing.headingCategory}`;
  const bodyFont = `"${pairing.body}", ${pairing.bodyCategory}`;

  return (
    <div>
      {isCustomized && (
        <div className="flex items-center justify-between mb-6 pb-6 border-b border-border">
          <span className="text-sm text-foreground">Scale modified</span>
          <button
            onClick={reset}
            className="text-sm text-muted-foreground hover:text-foreground transition-[color]"
          >
            Reset
          </button>
        </div>
      )}

      <div className="border border-border rounded-lg overflow-hidden">
        {HEADING_LEVELS.map((level, i) => (
          <HeadingRow
            key={level}
            level={level}
            data={scale[level]}
            font={headingFont}
            isFirst={i === 0}
            isOpen={expanded === level}
            onToggle={() => setExpanded(expanded === level ? null : level)}
            onChange={(field, value) => updateHeading(level, field, value)}
          />
        ))}

        <BodyRow
          data={scale.body}
          font={bodyFont}
          isOpen={expanded === "body"}
          onToggle={() => setExpanded(expanded === "body" ? null : "body")}
          onChange={updateBody}
        />
      </div>
    </div>
  );
}

interface HeadingRowProps {
  level: HeadingLevel;
  data: TypographyScale[HeadingLevel];
  font: string;
  isFirst: boolean;
  isOpen: boolean;
  onToggle: () => void;
  onChange: (field: "size" | "weight" | "lineHeight" | "letterSpacing", value: string | number) => void;
}

function HeadingRow({ level, data, font, isFirst, isOpen, onToggle, onChange }: HeadingRowProps) {
  return (
    <div className={isFirst ? "" : "border-t border-border"}>
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between py-4 px-5 text-left hover:bg-muted/50 transition-[background-color]"
      >
        <div className="flex items-center gap-5">
          <span className="text-xs text-muted-foreground font-mono w-6">
            {level}
          </span>
          <span
            style={{
              fontFamily: font,
              fontSize: `min(${data.size}, 1.5rem)`,
              fontWeight: data.weight,
              lineHeight: "1.2",
              letterSpacing: data.letterSpacing,
            }}
          >
            Heading {level.slice(1)}
          </span>
        </div>
        <span className="text-xs text-muted-foreground font-mono tabular-nums">
          {data.size} / {data.weight}
        </span>
      </button>

      {isOpen && (
        <div className="px-5 pb-5 pt-1 space-y-4 bg-muted/30">
          <SliderRow
            label="Size" value={parseFloat(data.size)}
            min={0.75} max={6} step={0.125} unit="rem"
            onChange={(v) => onChange("size", `${v}rem`)}
          />
          <SliderRow
            label="Weight" value={data.weight}
            min={100} max={900} step={100}
            onChange={(v) => onChange("weight", v)}
          />
          <SliderRow
            label="Leading" value={parseFloat(data.lineHeight)}
            min={0.8} max={2} step={0.05}
            onChange={(v) => onChange("lineHeight", v.toString())}
          />
          <SliderRow
            label="Tracking" value={parseFloat(data.letterSpacing)}
            min={-0.05} max={0.1} step={0.005} unit="em"
            onChange={(v) => onChange("letterSpacing", `${v}em`)}
          />
          <div className="pt-4 border-t border-border">
            <p
              style={{
                fontFamily: font,
                fontSize: data.size,
                fontWeight: data.weight,
                lineHeight: data.lineHeight,
                letterSpacing: data.letterSpacing,
              }}
              className="truncate"
            >
              The quick brown fox
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

interface BodyRowProps {
  data: TypographyScale["body"];
  font: string;
  isOpen: boolean;
  onToggle: () => void;
  onChange: (field: "size" | "lineHeight" | "weight", value: string | number) => void;
}

function BodyRow({ data, font, isOpen, onToggle, onChange }: BodyRowProps) {
  return (
    <div className="border-t border-border">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between py-4 px-5 text-left hover:bg-muted/50 transition-[background-color]"
      >
        <div className="flex items-center gap-5">
          <span className="text-xs text-muted-foreground font-mono w-6">
            p
          </span>
          <span
            style={{
              fontFamily: font,
              fontSize: data.size,
              fontWeight: data.weight,
              lineHeight: "1.4",
            }}
          >
            Body text
          </span>
        </div>
        <span className="text-xs text-muted-foreground font-mono tabular-nums">
          {data.size} / {data.lineHeight}
        </span>
      </button>

      {isOpen && (
        <div className="px-5 pb-5 pt-1 space-y-4 bg-muted/30">
          <SliderRow
            label="Size" value={parseFloat(data.size)}
            min={0.75} max={1.5} step={0.0625} unit="rem"
            onChange={(v) => onChange("size", `${v}rem`)}
          />
          <SliderRow
            label="Leading" value={parseFloat(data.lineHeight)}
            min={1.2} max={2.2} step={0.05}
            onChange={(v) => onChange("lineHeight", v.toString())}
          />
          <SliderRow
            label="Weight" value={data.weight}
            min={300} max={500} step={100}
            onChange={(v) => onChange("weight", v)}
          />
          <div className="pt-4 border-t border-border">
            <p
              style={{
                fontFamily: font,
                fontSize: data.size,
                fontWeight: data.weight,
                lineHeight: data.lineHeight,
              }}
              className="text-muted-foreground"
            >
              Typography exists to honor content. Good typography is
              invisible; bad typography is everywhere.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function SliderRow({
  label,
  value,
  min,
  max,
  step,
  unit = "",
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-xs text-muted-foreground w-16 shrink-0">
        {label}
      </span>
      <Slider
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        min={min}
        max={max}
        step={step}
        className="flex-1"
      />
      <span className="text-xs text-muted-foreground font-mono tabular-nums w-16 text-right">
        {Number.isInteger(value) ? value : value.toFixed(step < 0.01 ? 3 : 2)}
        {unit}
      </span>
    </div>
  );
}
