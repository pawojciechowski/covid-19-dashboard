import { Serie } from '@nivo/line';
import { RegionsData, ActiveRegion } from './entities';
import { colors } from 'modules/themes/colors';

export function mapRegionsData(data: RegionsData, activeRegions: ActiveRegion[]): Serie[] {
  return Object.keys(data).filter((region) => activeRegions.find((ar) => ar.region === region)).map((region) => ({
    id: region,
    data: data[region].map((entry) => ({
      x: entry.date,
      y: entry.total
    }))
  }));
}

export function mapRegionsToOptions(regions: string[])  {
  const colorGenerator = createColorGenerator();

  return regions.map((region) => ({
    label: region,
    value: region,
    color: colorGenerator.next().value as string
  }));
}

function* createColorGenerator() {
  let i = 0;

  while(true) {
    yield colors[i];
    i = (i + 1) % colors.length;
  }
}
