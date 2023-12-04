import { IPoint, IPolygon } from '../types';
import { doSegmentsIntersect } from './doSegmentsIntersect';

export const canConnectPoints = (
  pointA: IPoint,
  pointB: IPoint,
  polygons: IPolygon[]
): boolean => {
  for (const polygon of polygons) {
    for (let i = 0; i < polygon.points.length; i++) {
      const currPoint = polygon.points[i];
      const nextPoint = polygon.points[(i + 1) % polygon.points.length];

      const intersects = doSegmentsIntersect(
        pointA,
        pointB,
        currPoint,
        nextPoint
      );
      if (intersects) {
        return false; // Найдено пересечение, соединение невозможно
      }
    }
  }
  return true; // Нет пересечений, можно соединить точки прямой линией
};
