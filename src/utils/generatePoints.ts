import { IPoint } from '../types';

export const generatePoints = (count: number = 100): IPoint[] => {
  const points: IPoint[] = [];

  for (let i = 0; i < count; i++) {
    const point: IPoint = {
      type: 'point',
      x: Math.random() * 100,
      y: Math.random() * 100,
    };
    points.push(point);
  }

  return points;
};
