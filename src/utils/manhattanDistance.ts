import { IPoint } from '../types';

export const manhattanDistance = (point1: IPoint, point2: IPoint): number => {
  const distanceX = Math.abs(point1.x - point2.x);
  const distanceY = Math.abs(point1.y - point2.y);
  return distanceX + distanceY;
};
