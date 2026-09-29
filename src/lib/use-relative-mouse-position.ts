import { useEffect, useMemo, useState, type RefObject } from "react";
import throttle from "lodash/throttle";

export type RelativeMousePosition = {
  x: number | null;
  y: number | null;
};

export default function useRelativeMousePosition<T extends HTMLElement>(
  ref: RefObject<T | null>,
  throttleDuration = 500
): [RelativeMousePosition, DOMRect | null] {
  const [mousePosition, setMousePosition] = useState<RelativeMousePosition>({
    x: null,
    y: null,
  });
  const [boundingBox, setBoundingBox] = useState<DOMRect | null>(null);

  const getThrottledBoundingBox = useMemo(
    () =>
      throttle((): DOMRect | null => {
        if (!ref.current) {
          return null;
        }

        return ref.current.getBoundingClientRect();
      }, throttleDuration),
    [ref, throttleDuration]
  );

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    function handlePointerMove(event: PointerEvent) {
      const rect = getThrottledBoundingBox();
      if (!rect) {
        return;
      }

      setMousePosition({
        x: event.clientX - rect.left - rect.width / 2,
        y: event.clientY - rect.top - rect.height / 2,
      });
      setBoundingBox(rect);
    }

    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      getThrottledBoundingBox.cancel();
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [ref, getThrottledBoundingBox]);

  return [mousePosition, boundingBox];
}
