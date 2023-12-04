import { IPoint, IPolyline } from '../types';

export const generateOutput = (path: IPoint[]): IPolyline[] => [
  {
    type: 'polyline',
    size: 1.0,
    color: 4572354,
    points: path,
  },
];
