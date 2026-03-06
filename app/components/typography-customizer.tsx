"use client";

import { useState, useCallback, useMemo } from "react";
import type { PairingData, TypographyScale } from "@/lib/pairings";

interface TypographyCustomizerProps {
  pairing: PairingData;
  onScaleChange?: (scale: TypographyScale) => void;
}

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export function TypographyCustomizer({
  pairing,
  onScaleChange,
}: TypographyCustomizerProps) {
  const [scale, setScale] = useState<TypographyScale>(pairing.scale);
  const [openSection, setOpenSection] = useState<string | null>("h1");

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
        const next = {
          ...prev,
          [level]: { ...prev[level], [field]: value },
        };
        onScaleChange?.(next);
        return next;
      });
    },
    [onScaleChange]
  );

  const updateBody = useCallback(
    (field: "size" | "lineHeight" | "weight", value: string | number) => {
      setScale((prev) => {
        const next = {
          ...prev,
          body: { ...prev.body, [field]: value },
        };
        onScaleChange?.(next);
        return next;
      });
    },
    [onScaleChange]
  );

  const headingFont = `"${pairing.heading}", ${pairing.headingCategory}`;
  const bodyFont = `"${pairing.body}", ${pairing.bodyCategory}`;

  const headingLevels: HeadingLevel[] = ["h1", "h2", "h3", "h4", "h5", "h6"];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-sans font-medium text-muted">
          Typography Scale
        </h3>
        {isCustomized && (
          <button
            onClick={reset}
            className="text-xs font-mono text-accent hover:text-accent/80"
          >
            Reset to defaults
          </button>
        )}
      </div>

      {/* Heading levels */}
      {headingLevels.map((level) => {
        const data = scale[level];
        const isOpen = openSection === level;

        return (
          <div key={level} className="border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => setOpenSection(isOpen ? null : level)}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-accent-soft/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-muted uppercase w-6">
                  {level}
                </span>
                <span
                  style={{
                    fontFamily: headingFont,
                    fontSize: `min(${data.size}, 1.5rem)`,
                    fontWeight: data.weight,
                    lineHeight: "1.2",
                    letterSpacing: data.letterSpacing,
                  }}
                >
                  Heading {level.slice(1)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-muted">
                  {data.size} / {data.weight}
                </span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className={`text-muted transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                >
                  <path d="M3 4.5l3 3 3-3" />
                </svg>
              </div>
            </button>

            {isOpen && (
              <div className="px-4 pb-4 pt-2 space-y-3 border-t border-border">
                <SliderRow
                  label="Size"
                  value={parseFloat(data.size)}
                  min={0.75}
                  max={6}
                  step={0.125}
                  unit="rem"
                  onChange={(v) => updateHeading(level, "size", `${v}rem`)}
                />
                <SliderRow
                  label="Weight"
                  value={data.weight}
                  min={100}
                  max={900}
                  step={100}
                  onChange={(v) => updateHeading(level, "weight", v)}
                />
                <SliderRow
                  label="Line Height"
                  value={parseFloat(data.lineHeight)}
                  min={0.8}
                  max={2}
                  step={0.05}
                  onChange={(v) =>
                    updateHeading(level, "lineHeight", v.toString())
                  }
                />
                <SliderRow
                  label="Tracking"
                  value={parseFloat(data.letterSpacing)}
                  min={-0.05}
                  max={0.1}
                  step={0.005}
                  unit="em"
                  onChange={(v) =>
                    updateHeading(level, "letterSpacing", `${v}em`)
                  }
                />

                {/* Live mini-preview */}
                <div className="pt-2 border-t border-border/50">
                  <p
                    style={{
                      fontFamily: headingFont,
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
      })}

      {/* Body */}
      <div className="border border-border rounded-lg overflow-hidden">
        <button
          onClick={() =>
            setOpenSection(openSection === "body" ? null : "body")
          }
          className="w-full flex items-center justify-between px-4 py-3 hover:bg-accent-soft/30 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-muted uppercase w-6">
              P
            </span>
            <span
              style={{
                fontFamily: bodyFont,
                fontSize: scale.body.size,
                fontWeight: scale.body.weight,
                lineHeight: "1.4",
              }}
            >
              Body text
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-muted">
              {scale.body.size} / {scale.body.lineHeight}
            </span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className={`text-muted transition-transform duration-200 ${
                openSection === "body" ? "rotate-180" : ""
              }`}
            >
              <path d="M3 4.5l3 3 3-3" />
            </svg>
          </div>
        </button>

        {openSection === "body" && (
          <div className="px-4 pb-4 pt-2 space-y-3 border-t border-border">
            <SliderRow
              label="Size"
              value={parseFloat(scale.body.size)}
              min={0.75}
              max={1.5}
              step={0.0625}
              unit="rem"
              onChange={(v) => updateBody("size", `${v}rem`)}
            />
            <SliderRow
              label="Line Height"
              value={parseFloat(scale.body.lineHeight)}
              min={1.2}
              max={2.2}
              step={0.05}
              onChange={(v) => updateBody("lineHeight", v.toString())}
            />
            <SliderRow
              label="Weight"
              value={scale.body.weight}
              min={300}
              max={500}
              step={100}
              onChange={(v) => updateBody("weight", v)}
            />

            <div className="pt-2 border-t border-border/50">
              <p
                style={{
                  fontFamily: bodyFont,
                  fontSize: scale.body.size,
                  fontWeight: scale.body.weight,
                  lineHeight: scale.body.lineHeight,
                }}
                className="text-muted"
              >
                Typography exists to honor content. Good typography is
                invisible; bad typography is everywhere.
              </p>
            </div>
          </div>
        )}
      </div>

      {isCustomized && (
        <p className="text-[11px] font-mono text-accent">
          Scale customized. Install command will include your changes.
        </p>
      )}
    </div>
  );
}

/* ── Slider Row ── */
interface SliderRowProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (value: number) => void;
}

function SliderRow({
  label,
  value,
  min,
  max,
  step,
  unit = "",
  onChange,
}: SliderRowProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[11px] font-mono text-muted w-16 shrink-0">
        {label}
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1"
      />
      <span className="text-[11px] font-mono text-muted w-14 text-right tabular-nums">
        {Number.isInteger(value) ? value : value.toFixed(step < 0.01 ? 3 : 2)}
        {unit}
      </span>
    </div>
  );
}
