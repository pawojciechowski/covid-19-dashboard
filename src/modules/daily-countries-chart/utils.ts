import { Serie } from '@nivo/line';
import { ActiveRegion } from './types';
import { RegionsData, DataType } from 'modules/api/regions/types';
import { Theme } from 'modules/themes/types';
import { StylesConfig } from 'react-select';

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

export function prepareActiveRegions(regions: string[], theme: Theme, startColorIndex: number = 0) {
  return regions.map((r, i) => ({
    region: r,
    color: theme.chart.colors[(startColorIndex + i + 1) % theme.chart.colors.length]
  }));
}

export const getRegionSelectStyles = (activeRegions: ActiveRegion[]) => ({
  multiValue: (styles, state) => {
    const activeRegion = activeRegions.find((ar) => ar.region === state.data.value);
    return {
      ...styles,
      backgroundColor: activeRegion ? activeRegion.color : 'black'
    };
  }
} as StylesConfig);
