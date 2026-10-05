"use client";

import { memo, useEffect, useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useSpring,
} from "motion/react";
import throttle from "lodash/throttle";
import { clamp, clampedNormalize } from "@/lib/normalize";
import {
  convertCartesianToPolar,
  convertPolarToCartesian,
  getDistanceBetweenPoints,
} from "@/lib/polar";
import useRelativeMousePosition, {
  type RelativeMousePosition,
} from "@/lib/use-relative-mouse-position";

const SPRING_CONFIG = {
  stiffness: 200,
  damping: 20,
};

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
  hasPointer: boolean;
  isWithinRange: boolean;
};

const Eye = memo(function Eye({ hasPointer, isWithinRange }: EyeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const springX = useSpring(0, SPRING_CONFIG);
  const springY = useSpring(0, SPRING_CONFIG);
  const springScale = useSpring(1, SPRING_CONFIG);
  const transform = useMotionTemplate`translate(${springX}px, ${springY}px) scale(${springScale})`;

  useEffect(() => {
    if (reduceMotion) {
      springX.jump(0);
      springY.jump(0);
      springScale.jump(1);
      return;
    }

    if (!hasPointer) {
      return;
    }

    if (!isWithinRange) {
      springX.set(0);
      springY.set(0);
      springScale.set(0);
      return;
    }

    const getThrottledBoundingBox = throttle(() => {
      return ref.current?.getBoundingClientRect();
    }, 500);

    function handlePointerMove(event: PointerEvent) {
      const boundingBox = getThrottledBoundingBox();
      if (!boundingBox) {
        return;
      }

      const cursorPoint = {
        x: event.clientX,
        y: event.clientY,
      };
      const centerPoint = {
        x: boundingBox.left + boundingBox.width / 2,
        y: boundingBox.top + boundingBox.height / 2,
      };
      const distance = getDistanceBetweenPoints(cursorPoint, centerPoint);
      const [angle] = convertCartesianToPolar(
        cursorPoint.x - centerPoint.x,
        cursorPoint.y - centerPoint.y
      );
      const modifiedDistance = clamp(distance * 0.2, -10, 10);
      const [x, y] = convertPolarToCartesian(angle, modifiedDistance);

      springX.set(x);
      springY.set(y);
      springScale.set(clampedNormalize(distance, 10, 100, 1, 0));
    }

    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      getThrottledBoundingBox.cancel();
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [hasPointer, isWithinRange, reduceMotion, springScale, springX, springY]);

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
  const reduceMotion = useReducedMotion() ?? false;
  const [mousePosition] = useRelativeMousePosition(wrapperRef);
  const hasPointer = mousePosition.x !== null && mousePosition.y !== null;
  const isWithinRange = getIsWithinRange(mousePosition, maxMouseDistance);
  const leanX = useSpring(0, SPRING_CONFIG);
  const leanY = useSpring(0, SPRING_CONFIG);
  const leanRotate = useSpring(0, SPRING_CONFIG);
  const transform = useMotionTemplate`translate(${leanX}px, ${leanY}px) rotate(${leanRotate}deg)`;

  useEffect(() => {
    if (reduceMotion) {
      leanX.jump(0);
      leanY.jump(0);
      leanRotate.jump(0);
      return;
    }

    if (mousePosition.x === null || mousePosition.y === null) {
      return;
    }

    const distance = getDistanceBetweenPoints(
      { x: 0, y: 0 },
      { x: mousePosition.x, y: mousePosition.y }
    );

    if (distance <= maxMouseDistance && distance > 0) {
      const strength = clampedNormalize(distance, 30, maxMouseDistance, 1, 0);
      const directionX = mousePosition.x / distance;
      const directionY = mousePosition.y / distance;

      leanX.set(directionX * 10 * strength);
      leanY.set(directionY * 6 * strength);
      leanRotate.set(directionX * 14 * strength);
    } else {
      leanX.set(0);
      leanY.set(0);
      leanRotate.set(0);
    }
  }, [
    leanRotate,
    leanX,
    leanY,
    maxMouseDistance,
    mousePosition,
    reduceMotion,
  ]);

  return (
    <div ref={wrapperRef} className="grid place-items-center">
      <motion.div
        className="flex origin-bottom flex-col items-center gap-3 will-change-transform"
        style={{ transform }}
      >
        <div className="grid grid-cols-[auto_auto] gap-4">
          <Eye hasPointer={hasPointer} isWithinRange={isWithinRange} />
          <Eye hasPointer={hasPointer} isWithinRange={isWithinRange} />
        </div>
        <div className="h-16 w-[136px] rounded-[2rem] bg-[hsl(40deg_18%_86%)]" />
      </motion.div>
    </div>
  );
}

export default function LeaningEyes() {
  return (
    <div className="grid h-screen place-content-center bg-[hsl(210deg_15%_6%)]">
      <Creature maxMouseDistance={220} />
    </div>
  );
}
