import { IPoint } from '../types';

export const halfDivide = (pointA: IPoint, pointB: IPoint): IPoint => ({
  type: 'point',
  x: (pointA.x + pointB.x) / 2,
  y: (pointA.y + pointB.y) / 2,
});
