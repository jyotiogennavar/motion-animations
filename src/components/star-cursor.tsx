"use client";

import { useEffect, useRef } from "react";

const STAR_SIZE = 32;

function prefersReducedMotion() {
  return !window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
}

export default function StarCursor() {
  const svgRef = useRef<SVGSVGElement>(null);
  const starRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const star = starRef.current;
    if (!svg || !star) return;

    if (prefersReducedMotion()) {
      svg.style.cursor = "auto";
    }

    function place(x: number, y: number) {
      star!.style.transform = `translate(${x}px, ${y}px)`;
      star!.style.opacity = "1";
    }

    place(svg.clientWidth / 2, svg.clientHeight / 2);

    function handlePointerMove(event: PointerEvent) {
      if (prefersReducedMotion()) return;

      const current = svgRef.current;
      if (!current) return;

      const ctm = current.getScreenCTM();
      if (!ctm) return;

      const point = current.createSVGPoint();
      point.x = event.clientX;
      point.y = event.clientY;

      const { x, y } = point.matrixTransform(ctm.inverse());
      place(x, y);
    }

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      className="block h-screen w-full cursor-none bg-[hsl(210deg_15%_6%)]"
    >
      <g ref={starRef} className="opacity-0 will-change-transform">
        <image
          href="/draw-star-svgrepo-com.svg"
          width={STAR_SIZE}
          height={STAR_SIZE}
          x={-STAR_SIZE / 2}
          y={-STAR_SIZE / 2}
        />
      </g>
    </svg>
  );
}
