import { RegionsData } from "./types";

export function getRegionSummedData(data: RegionsData, region: string) {
  const lastDayValue = [...data[region]].sort((d1, d2) => new Date(d1.date) > new Date(d2.date) ? -1 : 1)[0];
  return {
    total: lastDayValue.total,
    deaths: lastDayValue.deaths
  };
}
