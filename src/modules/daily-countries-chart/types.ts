import { DataType } from 'modules/api/regions/types';

export type DataTypeRadioSelectOption = {
  label: string,
  value: DataType
}

export interface ActiveRegion {
  region: string,
  color: string
}
