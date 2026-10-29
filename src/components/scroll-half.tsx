"use client";

import { useLayoutEffect, useRef } from "react";
import "./scroll-half.css";

export default function ScrollHalf() {
  const rootRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const mark = markRef.current;
    const line = lineRef.current;
    if (!root || !mark || !line) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        line.classList.toggle("visible", entry.isIntersecting);
      },
      { root, rootMargin: "0px 0px -99% 0px", threshold: 0 },
    );

    observer.observe(mark);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="scroll-half" ref={rootRef}>
      <div className="scroll-half__track">
        <div className="scroll-half__pin">
          <p className="elem" ref={lineRef}>
            I become visible at 50%! ✨
          </p>
          <p className="instruction">↓ Scroll down to trigger ↓</p>
        </div>
        <div className="scroll-half__mark" ref={markRef} aria-hidden />
      </div>
    </div>
  );
}
