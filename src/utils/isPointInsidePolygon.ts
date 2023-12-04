import { IPoint, IPolygon } from '../types';

export const isPointInsidePolygon = (
  point: IPoint,
  polygon: IPolygon
): boolean => {
  const vertices = polygon.points;
  const n = vertices.length;
  let inside = false;

  for (let i = 0, j = n - 1; i < n; j = i++) {
    const vertexI = vertices[i];
    const vertexJ = vertices[j];

    if (
      vertexI.y > point.y !== vertexJ.y > point.y &&
      point.x <
        ((vertexJ.x - vertexI.x) * (point.y - vertexI.y)) /
          (vertexJ.y - vertexI.y) +
          vertexI.x
    ) {
      inside = !inside;
    }
  }

  return inside;
};
