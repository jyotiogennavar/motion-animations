"use client";

import { useEffect, useId, useMemo, useRef } from "react";
import throttle from "lodash/throttle";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { normalize } from "@/lib/normalize";

const SPRING_CONFIG = {
  stiffness: 100,
  damping: 20,
};

const LINE_PATH =
  "M10 96.3698C10 96.3698 17 92.3698 53.5 82.8698C90 73.3698 130 79.8698 136.5 79.8698C143 79.8698 160 81.8697 181 79.8698C202 77.8698 217 66.3698 232 61.8698C247 57.3698 270 55.3698 291.5 48.8698C313 42.3698 347.5 23.8698 378.5 15.8698C409.5 7.86982 475.5 10.3698 475.5 10.3698";

const FILL_PATH =
  "M53.5 82.8698C17 92.3698 10 96.3698 10 96.3698V112H475.5V10.3698C475.5 10.3698 409.5 7.86982 378.5 15.8698C347.5 23.8698 313 42.3698 291.5 48.8698C270 55.3698 247 57.3698 232 61.8698C217 66.3698 202 77.8698 181 79.8698C160 81.8697 143 79.8698 136.5 79.8698C130 79.8698 90 73.3698 53.5 82.8698Z";

export default function GraphFollow() {
  const graphRef = useRef<SVGSVGElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const gradientId = useId().replace(/:/g, "");
  const springX = useSpring(100, SPRING_CONFIG);
  const clipPath = useMotionTemplate`polygon(0% 0%, ${springX}% 0%, ${springX}% 100%, 0% 100%)`;

  const getThrottledBoundingBox = useMemo(
    () =>
      throttle(() => {
        return graphRef.current?.getBoundingClientRect() ?? null;
      }, 500),
    []
  );

  useEffect(() => {
    if (reduceMotion) {
      springX.jump(100);
      return;
    }

    function handlePointerMove(event: PointerEvent) {
      const bounds = getThrottledBoundingBox();
      if (!bounds) {
        return;
      }

      const relativeX = event.clientX - bounds.x;
      const xPercentage = normalize(relativeX, 0, bounds.width, 0, 100);
      springX.set(xPercentage);
    }

    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      getThrottledBoundingBox.cancel();
    };
  }, [getThrottledBoundingBox, reduceMotion, springX]);

  return (
    <div className="relative h-screen bg-[hsl(210deg_15%_6%)]">
      <motion.svg
        ref={graphRef}
        className="absolute inset-0 m-auto w-[90%] will-change-[clip-path]"
        viewBox="0 0 486 122"
        style={{ clipPath }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id={gradientId}
            x1="243"
            y1="0"
            x2="243"
            y2="102"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.2" stopColor="#FFBF00" />
            <stop offset="1" stopColor="#FFBF00" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={FILL_PATH} fill={`url(#${gradientId})`} fillOpacity="0.2" />
        <path
          d={LINE_PATH}
          fill="none"
          stroke="#FFBF00"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </motion.svg>
    </div>
  );
}
