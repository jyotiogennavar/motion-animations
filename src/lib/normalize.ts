export function normalize(
  number: number,
  currentMin: number,
  currentMax: number,
  newMin: number,
  newMax: number
): number {
  if (currentMax === currentMin) return newMin; // avoid divide by zero
  const ratio = (number - currentMin) / (currentMax - currentMin);
  return (newMax - newMin) * ratio + newMin;
}
