import { DataType } from 'modules/api/regions/types';

export type Scale = 'log' | 'linear';

export interface DataTypeRadioSelectOption {
  label: string,
  value: DataType
}

export interface ScaleRadioSelectOption {
  label: string,
  value: Scale
}

export interface ActiveRegion {
  region: string,
  color: string
}
