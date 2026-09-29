export const clamp = (
  value: number,
  min = 0,
  max = 1
): number => {
  if (min > max) {
    [min, max] = [max, min];
  }

  return Math.max(min, Math.min(max, value));
};

export const normalize = (
  number: number,
  currentScaleMin: number,
  currentScaleMax: number,
  newScaleMin = 0,
  newScaleMax = 1
): number => {
  if (currentScaleMax === currentScaleMin) return newScaleMin;

  const standardNormalization =
    (number - currentScaleMin) / (currentScaleMax - currentScaleMin);

  return (newScaleMax - newScaleMin) * standardNormalization + newScaleMin;
};

export const clampedNormalize = (
  value: number,
  currentScaleMin: number,
  currentScaleMax: number,
  newScaleMin = 0,
  newScaleMax = 1
): number => {
  return clamp(
    normalize(
      value,
      currentScaleMin,
      currentScaleMax,
      newScaleMin,
      newScaleMax
    ),
    newScaleMin,
    newScaleMax
  );
};
