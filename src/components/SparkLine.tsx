"use client";

import { normalize } from "@/lib/normalize";

const SVG_WIDTH = 300;
const SVG_HEIGHT = 200;

interface SparkLineProps {
  data?: number[];
}

export default function SparkLine({ data = [] }: SparkLineProps) {
  if (!data.length) return null;

  // --- auto scaling ---
  const min = Math.min(...data);
  const max = Math.max(...data);

  const points = data
    .map((value, index) => {
      const x = normalize(index, 0, data.length - 1, 0, SVG_WIDTH);
      const y = normalize(value, min, max, SVG_HEIGHT, 0);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width={SVG_WIDTH} height={SVG_HEIGHT}>
      <polyline
        points={points}
        fill="none"
        stroke="hotpink"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
