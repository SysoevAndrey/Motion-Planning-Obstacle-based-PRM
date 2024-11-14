import { INodePoint, IPoint, IPolygon } from '../types';
import { canConnectPoints } from './canConnectPoints';
import { manhattanDistance } from './manhattanDistance';

export const generateNeighbours = (
  node: INodePoint,
  points: IPoint[],
  n: number,
  polygons: IPolygon[],
  closed: Map<IPoint, INodePoint>,
  endPoint: IPoint
): { key: IPoint; value: INodePoint }[] => {
  const sorted = points.sort(
    (a, b) =>
      Math.sqrt(Math.pow(a.x - node.x, 2) + Math.pow(a.y - node.y, 2)) -
      Math.sqrt(Math.pow(b.x - node.x, 2) + Math.pow(b.y - node.y, 2))
  );

  return sorted
    .slice(0, n)
    .filter(
      (point) => canConnectPoints(node, point, polygons) && !closed.has(point)
    )
    .map((point) => ({
      key: point,
      value: {
        ...point,
        h: manhattanDistance(point, endPoint),
        g: node.g + 1,
        parent: node,
      },
    }));
};
