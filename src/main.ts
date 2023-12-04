import {
  TEntity,
  IInfo,
  IPoint,
  IPolygon,
  INodePoint,
  IPolyline,
} from './types';
import { generateNeighbours } from './utils/generateNeighbours';
import { generatePoints } from './utils/generatePoints';
import { generatePath } from './utils/generatePath';
import { getMinF } from './utils/getMinF';
import { isPointInsidePolygon } from './utils/isPointInsidePolygon';
import { manhattanDistance } from './utils/manhattanDistance';
import { refinePointsOutsidePolygons } from './utils/refinePointsOutsidePolygon';
import { generateOutput } from './utils/generateOutput';

export const solve = (data: TEntity[]): Promise<IPolyline[]> => {
  const info: IInfo = data.find(
    (entity): entity is IInfo => entity.type === 'info'
  )!;
  const startPoint: IPoint | undefined = data.find(
    (entity): entity is IPoint => entity.type === 'startPoint'
  )!;
  const endPoint: IPoint = data.find(
    (entity): entity is IPoint => entity.type === 'endPoint'
  )!;
  const polygons: IPolygon[] = data.filter(
    (entity): entity is IPolygon => entity.type === 'polygon'
  );

  const initialPoints = generatePoints();

  const points = initialPoints.reduce<IPoint[]>(
    (acc, point) => {
      const count = Math.random() * 5 + 5;
      const refinedPoints = refinePointsOutsidePolygons(
        point,
        polygons,
        count,
        {
          min: info.size / 1.5,
          max: info.size * 1.5,
        }
      );
      const filteredPoints = refinedPoints.filter(
        (point) =>
          !polygons.some((polygon) => isPointInsidePolygon(point, polygon))
      );
      return acc.concat(filteredPoints);
    },
    [endPoint]
  );

  // -----
  // Graph
  // -----

  const startNode: INodePoint = {
    ...startPoint,
    g: 0,
    h: manhattanDistance(startPoint, endPoint),
    parent: null,
  };
  const open: Map<IPoint, INodePoint> = new Map();
  const closed: Map<IPoint, INodePoint> = new Map();

  open.set(startPoint, startNode);

  let solution: INodePoint | null = null;

  while (open.size > 0) {
    const [point, node] = getMinF(open);

    if (node.h === 0) {
      solution = node;
      break;
    }

    open.delete(point);
    closed.set(point, node);

    const neighbours = generateNeighbours(
      node,
      points,
      polygons,
      closed,
      endPoint
    );

    neighbours.forEach(({ key, value }) => {
      if (open.has(key)) {
        const prevG = open.get(key)!.g;
        const currentG = value.g;

        if (currentG < prevG) {
          open.set(key, value);
        }
      } else {
        open.set(key, value);
      }
    });
  }

  return new Promise((resolve, reject) => {
    if (solution) {
      console.log('solution created');
      const path = generatePath(solution);
      const output = generateOutput(path);
      resolve(output);
    } else {
      reject('no solution');
    }
  });
};
