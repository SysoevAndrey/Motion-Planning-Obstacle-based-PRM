import { INodePoint, IPoint } from '../types';

export const generatePath = (node: INodePoint): IPoint[] => {
  const points: IPoint[] = [];

  let currentNode: INodePoint | null = node;

  while (currentNode !== null) {
    const point: IPoint = {
      type: 'point',
      x: parseFloat(currentNode.x.toFixed(1)),
      y: parseFloat(currentNode.y.toFixed(1)),
    };
    points.unshift(point);
    currentNode = currentNode.parent;
  }

  return points;
};
