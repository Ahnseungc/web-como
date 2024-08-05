"use client";

import { useEffect, useRef } from "react";
import { getZoomValue } from "@/hooks/responsiveZoom";

export default function ShopCategoryCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  const moveCursor = (event: MouseEvent) => {
    if (!cursorRef.current) {
      return;
    }

    const { clientX: x, clientY: y } = event;
    const zoom = getZoomValue();

    cursorRef.current.style.left = (x - 5) / zoom + "px";
    cursorRef.current.style.top = (y - 35) / zoom + "px";
  };

  const showCursor = (totalExpense: string) => {
    if (!cursorRef.current) {
      return;
    }

    cursorRef.current.innerText = totalExpense;
    cursorRef.current.classList.remove("opacity-0");
  };

  const hideCursor = () => {
    if (!cursorRef.current) {
      return;
    }

    cursorRef.current.classList.add("opacity-0");
  };

  useEffect(() => {
    if (!window) {
      return;
    }

    window.addEventListener("mousemove", moveCursor);

    document.querySelectorAll("div.shop-category-bar").forEach((category) => {
      category.addEventListener("mouseenter", () => showCursor(category.id));
      category.addEventListener("mouseleave", hideCursor);
    });
  }, []);

  return (
    <div
      ref={cursorRef}
      id="cursor"
      style={{ top: "9999px", left: "9999px" }}
      className="opacity-0 fixed z-50 py-1 px-3 rounded-full border border-gray-300 body-1 font-bold text-gray-900 bg-gray-0 shadow transition-opacity duration-300"
    />
  );
}
