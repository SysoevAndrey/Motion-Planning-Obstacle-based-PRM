import { INodePoint, IPoint } from '../types';

export const generatePath = (node: INodePoint): IPoint[] => {
  const points: IPoint[] = [];

  let currentNode: INodePoint | null = node;

  while (currentNode !== null) {
    const point: IPoint = {
      type: 'point',
      x: currentNode.x,
      y: currentNode.y,
    };
    points.unshift(point);
    currentNode = currentNode.parent;
  }

  return points;
};
