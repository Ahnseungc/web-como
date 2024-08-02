"use client";

import { useEffect } from "react";

export default function useResponsiveZoom() {
  const minWidth = 480;
  const breakpoint = 1800;

  useEffect(() => {
    const onResize = () => {
      const width = Math.max(window.innerWidth, minWidth);
      const zoom = Math.min(width / breakpoint, 1);

      document.documentElement.style.zoom = `${zoom}`;
    };
    onResize();

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
}
