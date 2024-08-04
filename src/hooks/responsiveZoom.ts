"use client";

import { useEffect } from "react";
import { ZOOM_MIN_WIDTH, ZOOM_BREAKPOINT } from "@/lib/constants";

export function getZoomValue() {
  const width = Math.max(window.innerWidth, ZOOM_MIN_WIDTH);
  const zoom = Math.min(width / ZOOM_BREAKPOINT, 1);

  return zoom;
}

export default function useResponsiveZoom() {
  useEffect(() => {
    const onResize = () => {
      const zoom = getZoomValue();
      document.documentElement.style.zoom = `${zoom}`;
    };
    onResize();

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
}
