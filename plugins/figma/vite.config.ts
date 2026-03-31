import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig(({ mode }) => {
  if (mode === "sandbox") {
    // Figma sandbox code — no DOM, IIFE output
    return {
      build: {
        target: "es2017",
        lib: {
          entry: "src/code.ts",
          formats: ["iife"],
          name: "code",
          fileName: () => "code.js",
        },
        outDir: "dist",
        emptyOutDir: false,
        rollupOptions: {
          output: {
            extend: true,
          },
        },
      },
    };
  }

  // UI build — React + Tailwind, inlined into single HTML
  return {
    plugins: [react(), viteSingleFile()],
    root: "src/ui",
    build: {
      outDir: "../../dist",
      emptyOutDir: true,
    },
  };
});
