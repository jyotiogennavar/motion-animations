type Point = {
  x: number;
  y: number;
};

export const getDistanceBetweenPoints = (a: Point, b: Point) => {
  const deltaX = b.x - a.x;
  const deltaY = b.y - a.y;

  return Math.sqrt(deltaX ** 2 + deltaY ** 2);
};

export const convertDegreesToRadians = (angle: number) =>
  (angle * Math.PI) / 180;

export const convertRadiansToDegrees = (angle: number) =>
  (angle * 180) / Math.PI;

export const convertPolarToCartesian = (
  angle: number,
  distance: number
): [number, number] => {
  const angleInRadians = convertDegreesToRadians(angle);

  const x = Math.cos(angleInRadians) * distance;
  const y = Math.sin(angleInRadians) * distance;

  return [x, y];
};

export const convertCartesianToPolar = (
  x: number,
  y: number
): [number, number] => {
  let angle = convertRadiansToDegrees(Math.atan2(y, x));

  if (angle < 0) {
    angle += 360;
  }

  const distance = Math.sqrt(x ** 2 + y ** 2);

  return [angle, distance];
};
