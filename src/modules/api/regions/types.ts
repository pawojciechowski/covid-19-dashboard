import { dataTypes } from './const';

export interface RegionData {
  date: string,
  total: number,
  deaths: number
}

export interface RegionsData {
  [region: string]: RegionData[]
}

export type DataType = typeof dataTypes[number];
