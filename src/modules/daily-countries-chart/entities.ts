import { SelectOption, SelectValue } from "modules/common/select/entities";

export interface RegionData {
  date: string,
  total: number,
  deaths: number
}

export interface RegionsData {
  [region: string]: RegionData[]
}


export interface RegionSelectOption extends SelectOption {
  color: string
}

export interface RegionSelectValue extends SelectValue {
  color: string
}

export interface ActiveRegion {
  region: string,
  color: string
}
