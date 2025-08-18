// components/DarkNeatBackground.tsx
"use client";

import { NeatGradient } from "@firecms/neat";
import { useEffect, useRef } from "react";

export default function DarkNeatBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const gradient = new NeatGradient({
        ref: canvasRef.current,
        colors: [
          { color: "#0f0c29", enabled: true }, // Dark purple
          { color: "#302b63", enabled: true }, // Deep blue
          { color: "#24243e", enabled: true }, // Dark navy
        ],
        speed: 2,
        horizontalPressure: 4,
        verticalPressure: 5,
        waveFrequencyX: 2,
        waveFrequencyY: 3,
        waveAmplitude: 5,
        shadows: 2,
        highlights: 4,
        colorSaturation: 0.5,
        colorBrightness: 0.5,
        wireframe: false,
        colorBlending: 5,
        backgroundAlpha: 1,
        interactive: true,
      });

      return () => gradient.destroy();
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10"
      style={{
        background: "linear-gradient(to bottom, #0f0c29, #302b63, #24243e)",
      }}
    />
  );
}