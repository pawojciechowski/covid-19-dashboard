import { themeNames } from './const';
import { Theme as NivoTheme } from '@nivo/core';

export interface Theme {
  fg: string,
  bg: string,
  inputBackground: string,
  chart: NivoTheme & { colors: string[]}
};

export type ThemeName = typeof themeNames[number];

export type ThemeAction =
  | { type: 'SET_THEME', theme: ThemeName};

export interface ThemeState {
  name: ThemeName,
  current: Theme
}

