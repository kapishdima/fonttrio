"use client";

import { useQueryState, parseAsArrayOf, parseAsString } from "nuqs";
import { useCallback, useMemo } from "react";

// Maximum number of fonts that can be selected
const MAX_SELECTED_FONTS = 10;

// Query param key for selected fonts
const SELECTED_PARAM = "selected";

export interface SelectedFont {
  name: string;
}

export function useFontSelection() {
  // Use nuqs to store selected fonts in URL as comma-separated list
  const [selectedFonts, setSelectedFonts] = useQueryState(
    SELECTED_PARAM,
    parseAsArrayOf(parseAsString, ",")
      .withDefault([])
      .withOptions({
        shallow: true, // Don't trigger server navigation
        history: "push", // Add to history so back button works
      })
  );

  // Check if a font is selected
  const isSelected = useCallback(
    (fontName: string): boolean => {
      return selectedFonts.includes(fontName);
    },
    [selectedFonts]
  );

  // Add a font to selection
  const addFont = useCallback(
    (fontName: string): boolean => {
      if (selectedFonts.includes(fontName)) {
        return true; // Already selected
      }
      
      if (selectedFonts.length >= MAX_SELECTED_FONTS) {
        return false; // Max limit reached
      }
      
      setSelectedFonts([...selectedFonts, fontName]);
      return true;
    },
    [selectedFonts, setSelectedFonts]
  );

  // Remove a font from selection
  const removeFont = useCallback(
    (fontName: string) => {
      setSelectedFonts(selectedFonts.filter((name) => name !== fontName));
    },
    [selectedFonts, setSelectedFonts]
  );

  // Toggle a font selection
  const toggleFont = useCallback(
    (fontName: string): boolean => {
      if (selectedFonts.includes(fontName)) {
        removeFont(fontName);
        return false; // Now deselected
      } else {
        return addFont(fontName); // Returns true if added, false if max reached
      }
    },
    [selectedFonts, addFont, removeFont]
  );

  // Clear all selections
  const clearSelection = useCallback(() => {
    setSelectedFonts([]);
  }, [setSelectedFonts]);

  // Get count of selected fonts
  const count = useMemo(() => selectedFonts.length, [selectedFonts]);

  // Check if max limit reached
  const isMaxReached = useMemo(
    () => selectedFonts.length >= MAX_SELECTED_FONTS,
    [selectedFonts.length]
  );

  return {
    selectedFonts,
    count,
    isSelected,
    addFont,
    removeFont,
    toggleFont,
    clearSelection,
    isMaxReached,
    maxAllowed: MAX_SELECTED_FONTS,
  };
}
