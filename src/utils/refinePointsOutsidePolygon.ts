import { IPoint, IPolygon, IRange } from '../types';
import { generatePointsAtDistance } from './generatePointsAtDistance';
import { halfDivide } from './halfDivide';
import { isPointInsidePolygon } from './isPointInsidePolygon';

export const refinePointsOutsidePolygons = (
  point: IPoint,
  polygons: IPolygon[],
  count: number,
  range: IRange
): IPoint[] => {
  if (point.x < 0) point.x = 0;
  if (point.x > 100) point.x = 100;
  if (point.y < 0) point.y = 0;
  if (point.y > 100) point.y = 100;

  if (polygons.some((polygon) => isPointInsidePolygon(point, polygon))) {
    let generatedPoints = generatePointsAtDistance(point, count, range);

    for (let i = 0; i < 10; i++) {
      const outsidePoints = [];
      for (const genPoint of generatedPoints) {
        if (genPoint.x < 0) genPoint.x = 0;
        if (genPoint.x > 100) genPoint.x = 100;
        if (genPoint.y < 0) genPoint.y = 0;
        if (genPoint.y > 100) genPoint.y = 100;

        if (
          !polygons.some((polygon) => isPointInsidePolygon(genPoint, polygon))
        ) {
          outsidePoints.push(genPoint);
        } else {
          const midPoint = halfDivide(point, genPoint);
          const newPoint = generatePointsAtDistance(midPoint, 1, range)[0];

          if (newPoint.x < 0) newPoint.x = 0;
          if (newPoint.x > 100) newPoint.x = 100;
          if (newPoint.y < 0) newPoint.y = 0;
          if (newPoint.y > 100) newPoint.y = 100;

          outsidePoints.push(newPoint);
        }
      }

      if (outsidePoints.length === count) {
        return outsidePoints; // Все сгенерированные точки оказались снаружи всех полигонов
      }

      if (outsidePoints.length > 0) {
        generatedPoints = outsidePoints; // Оставляем только точки, которые находятся снаружи полигонов
      } else {
        // Перераспределяем точки методом половинного деления
        const midPoint = halfDivide(point, generatedPoints[0]);
        generatedPoints = generatePointsAtDistance(midPoint, count, range);
      }
    }

    return generatedPoints; // Возвращаем точки, находящиеся снаружи полигонов после нескольких итераций
  }

  return [point]; // Если точка не лежит внутри ни одного из полигонов, возвращаем массив с ней одной
};
