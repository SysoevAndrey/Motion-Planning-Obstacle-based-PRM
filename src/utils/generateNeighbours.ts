import { INodePoint, IPoint, IPolygon } from '../types';
import { canConnectPoints } from './canConnectPoints';
import { manhattanDistance } from './manhattanDistance';

export const generateNeighbours = (
  node: INodePoint,
  points: IPoint[],
  polygons: IPolygon[],
  closed: Map<IPoint, INodePoint>,
  endPoint: IPoint
): { key: IPoint; value: INodePoint }[] =>
  points
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
