"use client";

import { memo, useEffect, useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useSpring,
} from "motion/react";
import throttle from "lodash/throttle";
import { clamp } from "@/lib/normalize";
import {
  convertCartesianToPolar,
  convertPolarToCartesian,
  getDistanceBetweenPoints,
} from "@/lib/polar";
import useRelativeMousePosition, {
  type RelativeMousePosition,
} from "@/lib/use-relative-mouse-position";

function getIsWithinRange(
  mousePosition: RelativeMousePosition,
  maxMouseDistance: number
) {
  if (mousePosition.x === null || mousePosition.y === null) {
    return false;
  }

  const distance = getDistanceBetweenPoints(
    { x: 0, y: 0 },
    { x: mousePosition.x, y: mousePosition.y }
  );

  return distance <= maxMouseDistance;
}

type EyeProps = {
  isWithinRange: boolean;
  stiffness?: number;
  damping?: number;
};

const Eye = memo(function Eye({
  isWithinRange,
  stiffness = 200,
  damping = 20,
}: EyeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const springX = useSpring(0, { stiffness, damping });
  const springY = useSpring(0, { stiffness, damping });
  const transform = useMotionTemplate`translate(${springX}px, ${springY}px)`;

  useEffect(() => {
    if (reduceMotion) {
      springX.jump(0);
      springY.jump(0);
      return;
    }

    if (!isWithinRange) {
      springX.set(0);
      springY.set(0);
      return;
    }

    const getThrottledBoundingBox = throttle(() => {
      return ref.current?.getBoundingClientRect();
    }, 500);

    function handlePointerMove(event: PointerEvent) {
      const bb = getThrottledBoundingBox();
      if (!bb) {
        return;
      }

      const centerX = bb.left + bb.width / 2;
      const centerY = bb.top + bb.height / 2;
      const relativeX = event.clientX - centerX;
      const relativeY = event.clientY - centerY;
      const [angle, distance] = convertCartesianToPolar(relativeX, relativeY);
      const modifiedDistance = clamp(distance * 0.2, -10, 10);
      const [x, y] = convertPolarToCartesian(angle, modifiedDistance);

      springX.set(x);
      springY.set(y);
    }

    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      getThrottledBoundingBox.cancel();
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [isWithinRange, reduceMotion, springX, springY]);

  return (
    <div
      ref={ref}
      className="grid size-[60px] place-content-center rounded-full bg-[hsl(40deg_20%_95%)]"
    >
      <motion.div
        className="size-[25px] rounded-full bg-[hsl(210deg_15%_6%)] will-change-transform"
        style={{ transform }}
      />
    </div>
  );
});

function Creature({ maxMouseDistance }: { maxMouseDistance: number }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [mousePosition] = useRelativeMousePosition(wrapperRef);
  const isWithinRange = getIsWithinRange(mousePosition, maxMouseDistance);

  return (
    <div ref={wrapperRef} className="grid grid-cols-[auto_auto_auto] gap-4">
      <Eye isWithinRange={isWithinRange} />
      <Eye isWithinRange={isWithinRange} />
    </div>
  );
}

export default function GooglyEyes() {
  return (
    <div className="grid h-screen place-content-center bg-[hsl(210deg_15%_6%)]">
      <Creature maxMouseDistance={220} />
    </div>
  );
}
