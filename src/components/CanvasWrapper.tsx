"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

interface CanvasWrapperProps {
  children: ReactNode;
  canvasWidth?: number;
}

/**
 * CanvasWrapper: Fixed 1200px internal canvas with responsive scaling for mobile/tablet.
 *
 * On desktop (lg+): Displays the 1200px canvas centered with padding.
 * On mobile/tablet: Applies CSS scale transform to fit the viewport width.
 * This ensures consistent layout across all devices while maintaining single-source design.
 */
export default function CanvasWrapper({
  children,
  canvasWidth = 1200,
}: CanvasWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const container = containerRef.current;
      if (!container) return;

      // Only apply scale on mobile/tablet (< 1024px viewport width)
      const isSmall = window.innerWidth < 1024;
      if (isSmall) {
        // Calculate scale needed to fit viewport width (with 16px padding on each side)
        const availableWidth = window.innerWidth - 32; // 16px padding each side
        const computedScale = availableWidth / canvasWidth;
        setScale(Math.min(computedScale, 1)); // Never scale up, only down
      } else {
        setScale(1);
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [canvasWidth]);

  return (
    <div
      ref={containerRef}
      className="w-full min-h-screen flex items-start justify-center"
      style={{
        // On desktop: normal spacing; on mobile: squeeze for scale origin
        paddingTop: scale < 1 ? 0 : "2rem",
        paddingBottom: scale < 1 ? 0 : "2rem",
      }}
    >
      <div
        className="origin-top"
        style={{
          width: `${canvasWidth}px`,
          transform: `scale(${scale})`,
          transformOrigin: "top center",
          transition: "transform 0.3s ease-out",
        }}
      >
        {children}
      </div>
    </div>
  );
}
