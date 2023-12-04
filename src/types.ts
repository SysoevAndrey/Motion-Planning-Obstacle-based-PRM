export interface IInfo {
  type: 'info';
  seed: number;
  countVertex: number;
  density: number;
  size: number;
}

export interface IPoint {
  type: 'point' | 'startPoint' | 'endPoint';
  x: number;
  y: number;
}

export interface INodePoint extends IPoint {
  h: number;
  g: number;
  parent: INodePoint | null;
}

export interface IPolygon {
  type: 'polygon';
  points: IPoint[];
}

export type TEntity = IInfo | IPoint | IPolygon;

export interface IRange {
  min: number;
  max: number;
}

export enum EStatus {
  'initial' = 'Файл не задан',
  'loaded' = 'Файл загружен',
  'processing' = 'Вычисление',
  'hasSolution' = 'Решение найдено',
  'noSolution' = 'Решения не найдено',
}

export interface IPolyline {
  type: 'polyline';
  size: number;
  color: number;
  points: IPoint[];
}
