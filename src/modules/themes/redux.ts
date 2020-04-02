import { themes } from "./const";
import { ThemeAction, ThemeState, ThemeName } from "./types";
import { AppState } from "config/redux";

export function setTheme(theme: ThemeName): ThemeAction {
  return {
    type: 'SET_THEME',
    theme
  };
}

const initialState: ThemeState = {
  name: 'dark',
  current: themes.dark
};

export const themeReducer = (state = initialState, action: ThemeAction): ThemeState => {
  switch(action.type) {
    case 'SET_THEME': {
      return {
        ...state,
        name: action.theme,
        current: themes[action.theme]
      }
    }
    default:
      return state;
  }
}

export const themeSelector = (state: AppState) => state.theme.current;
export const themeNameSelector = (state: AppState) => state.theme.name;
