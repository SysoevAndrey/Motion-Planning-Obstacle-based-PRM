import { INodePoint, IPoint } from '../types';

export const getMinF = (
  nodes: Map<IPoint, INodePoint>
): [IPoint, INodePoint] => {
  let min = Array.from(nodes.entries())[0];
  for (let node of nodes) {
    const f = node[1].g + node[1].h;
    const minF = min[1].g + min[1].h;
    if (f < minF) {
      min = node;
    }
  }
  return min;
};
