import { Serie } from '@nivo/line';
import { RegionsData, ActiveRegion, DataType } from './types';

export function mapRegionsData(data: RegionsData, activeRegions: ActiveRegion[], dataType: DataType): Serie[] {
  return Object.keys(data).filter((region) => activeRegions.find((ar) => ar.region === region)).map((region) => ({
    id: region,
    data: data[region].map((entry) => ({
      x: entry.date,
      y: entry[dataType]
    }))
  }));
}

export function mapRegionsToOptions(regions: string[])  {
  return regions.map((region) => ({
    label: region,
    value: region
  })).sort((r1, r2) => r1.label > r2.label ? 1 : -1);
}
