import { IPoint, IRange } from '../types';

export const generatePointsAtDistance = (
  point: IPoint,
  count: number,
  range: IRange
): IPoint[] => {
  const points: IPoint[] = [];

  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count;

    const distance = range.min + Math.random() * (range.max - range.min);

    const newX = point.x + distance * Math.cos(angle);
    const newY = point.y + distance * Math.sin(angle);

    const newPoint: IPoint = {
      type: 'point',
      x: newX,
      y: newY,
    };

    points.push(newPoint);
  }

  return points;
};
