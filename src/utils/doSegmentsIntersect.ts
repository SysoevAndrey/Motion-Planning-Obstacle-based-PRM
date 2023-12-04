import { IPoint } from '../types';

export const doSegmentsIntersect = (
  p1: IPoint,
  p2: IPoint,
  p3: IPoint,
  p4: IPoint
): boolean => {
  const ccw = (p1: IPoint, p2: IPoint, p3: IPoint): number => {
    const res = (p3.y - p1.y) * (p2.x - p1.x) - (p2.y - p1.y) * (p3.x - p1.x);
    if (res > 0) return 1; // Обратное направление
    if (res < 0) return -1; // Прямое направление
    return 0; // Коллинеарны
  };

  const isOnSegment = (p1: IPoint, p2: IPoint, p: IPoint): boolean => {
    return (
      Math.min(p1.x, p2.x) <= p.x &&
      p.x <= Math.max(p1.x, p2.x) &&
      Math.min(p1.y, p2.y) <= p.y &&
      p.y <= Math.max(p1.y, p2.y)
    );
  };

  const orientation1 = ccw(p1, p2, p3);
  const orientation2 = ccw(p1, p2, p4);
  const orientation3 = ccw(p3, p4, p1);
  const orientation4 = ccw(p3, p4, p2);

  // Отрезки пересекаются, если точки p1 и p2 находятся по разные стороны отрезка p3p4 и наоборот
  if (
    (orientation1 !== orientation2 && orientation3 !== orientation4) ||
    (orientation1 === 0 && isOnSegment(p1, p2, p3)) ||
    (orientation2 === 0 && isOnSegment(p1, p2, p4)) ||
    (orientation3 === 0 && isOnSegment(p3, p4, p1)) ||
    (orientation4 === 0 && isOnSegment(p3, p4, p2))
  ) {
    return true; // Отрезки пересекаются
  }

  return false; // Отрезки не пересекаются
};
