"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { clampedNormalize } from "@/lib/normalize";
import useRelativeMousePosition from "@/lib/use-relative-mouse-position";

const CursorInteraction = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const fellowRef = useRef<HTMLDivElement>(null);
  const [mousePosition] = useRelativeMousePosition(wrapperRef);

  useEffect(() => {
    const fellow = fellowRef.current;
    if (!fellow || mousePosition.x === null || mousePosition.y === null) {
      return;
    }

    const distance = Math.hypot(mousePosition.x, mousePosition.y);

    const blurRadius = clampedNormalize(distance, 100, 300, 0, 20);
    const translateY = clampedNormalize(distance, 100, 300, 0, 16);

    fellow.style.filter = `blur(${blurRadius}px)`;
    fellow.style.transform = `translateY(${translateY}px)`;
  }, [mousePosition]);

  return (
    <div className="flex items-center justify-center">
      <div
        ref={wrapperRef}
        className="flex h-[250px] w-[250px] items-end justify-center overflow-hidden rounded-2xl border-3 border-gray-400"
      >
        <div
          ref={fellowRef}
          className="relative flex h-[230px] w-[230px] items-center justify-center"
          style={{ willChange: "transform, filter" }}
        >
          <Image
            src="/images/girl-with-braid.jpg"
            alt="Girl with braided hair"
            width={180}
            height={180}
            className="object-contain object-bottom"
          />
        </div>
      </div>
    </div>
  );
};

export default CursorInteraction; 