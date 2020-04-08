import { RegionsData } from './types';

export function getRegionSummedData(data: RegionsData, region: string) {
  const lastDayValue = [...data[region]].sort((d1, d2) => new Date(d1.date) > new Date(d2.date) ? -1 : 1)[0];
  return {
    total: lastDayValue.total,
    deaths: lastDayValue.deaths
  };
}

export function getGlobalStatistics(data: RegionsData) {
  return Object.keys(data).reduce((acc, region) => {
    const regionData = getRegionSummedData(data, region);
    return {
      total: acc.total + regionData.total,
      deaths: acc.deaths + regionData.deaths
    };
  }, { total: 0, deaths: 0 });
}
