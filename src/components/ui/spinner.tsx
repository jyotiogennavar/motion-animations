import React from "react";

interface SpinnerProps {
  color?: string; // Accept any CSS color (e.g., "#000", "red")
  size?: number; // Default 20px
}

type SpinnerRootStyle = React.CSSProperties & {
  ["--spinner-size"]?: string;
  ["--spinner-color"]?: string;
};

const bars = Array(12).fill(0);

export function Spinner({ color = "#000", size = 20 }: SpinnerProps) {
  return (
    <div
      className="flex items-center justify-center"
      style={{
        "--spinner-size": `${size}px`,
        "--spinner-color": color,
      } as SpinnerRootStyle}
    >
      <div
        className="relative"
        style={{
          width: "var(--spinner-size)",
          height: "var(--spinner-size)",
        }}
      >
        {bars.map((_, i) => (
          <div
            key={`spinner-bar-${i}`}
            className="absolute rounded bg-[var(--spinner-color)] animate-spinner"
            style={{
              width: "24%",
              height: "8%",
              top: "-3.9%",
              left: "-10%",
              transform: `rotate(${i * 30}deg) translate(146%)`,
              animationDelay: `${-1.2 + i * 0.1}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
