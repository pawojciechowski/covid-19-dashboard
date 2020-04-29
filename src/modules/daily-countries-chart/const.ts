import { DataTypeRadioSelectOption, ScaleRadioSelectOption } from './types';
import { LogScale, LinearScale } from '@nivo/scales';
import { AxisProps } from '@nivo/axes';

export const dataTypeOptions: DataTypeRadioSelectOption[] = [{
  label: 'Total cases',
  value: 'total'
}, {
  label: 'Deaths',
  value: 'deaths'
}];

export const scaleOptions: ScaleRadioSelectOption[] = [{
  label: 'Linear',
  value: 'linear'
}, {
  label: 'Logarithmic',
  value: 'log'
}];

export const logGridValues = [1, 10, 100, 1000, 10000, 100000, 1000000, 10000000];
export const scaleConfig = {
  'log': { type: 'log', min: 1, max: 10000000, base: 10 } as LogScale,
  'linear': { type: 'linear', min: 0, max: 'auto' } as LinearScale
};

const baseAxisConfig = {
  tickSize: 5,
  tickPadding: 5,
  tickRotation: 0,
  legendOffset: -60,
  legendPosition: 'middle',
  format: (v: number) => v.toLocaleString()
};

export const linearAxisConfig = {
  ...baseAxisConfig
} as AxisProps;

export const logAxisConfig = {
  ...baseAxisConfig,
  tickValues: logGridValues
} as AxisProps;
