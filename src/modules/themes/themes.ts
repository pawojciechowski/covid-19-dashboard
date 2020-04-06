import { Theme, ThemeName } from "./types";
import logoDark from 'assets/icons/logo.svg';
import logoLight from 'assets/icons/logo-light.svg';
import colors from './colors';

export const themeNames = ['light', 'dark'] as const;

export const themes: {[key in ThemeName]: Theme} = {
  light: {
    fg: colors.darkBlue100,
    bg: colors.white,
    inputBackground: colors.grey100,
    titleColor: colors.blue100,
    titleGradient: `-webkit-linear-gradient(left,${colors.purple100},${colors.blue100})`,
    evenListElementBackground: colors.grey50,
    danger: colors.red100,
    warn: colors.orange100,
    logoUrl: logoLight,
    buttonBackground: colors.pink100,
    buttonTextColor: colors.white,
    chart: {
      colors: [
        colors.purple100,
        colors.blue100,
        colors.green100,
        colors.orange100,
        colors.pink100,
        colors.purple50,
        colors.blue50,
        colors.green50,
        colors.orange50,
        colors.pink50
      ]
    }
  },
  dark: {
    fg: colors.white,
    bg: colors.darkBlue100,
    inputBackground: colors.darkBlue90,
    titleColor: colors.blue100,
    titleGradient: `-webkit-linear-gradient(left,${colors.purple100},${colors.blue100})`,
    evenListElementBackground: colors.darkBlue95,
    danger: colors.red100,
    warn: colors.orange100,
    logoUrl: logoDark,
    buttonBackground: colors.pink100,
    buttonTextColor: colors.pink200,
    chart: {
      axis: {
        legend: {
          text: {
            fill: colors.white
          }
        },
        ticks: {
          text: {
            fill: colors.white
          }
        }
      },
      grid: {
        line: {
          stroke: colors.darkBlue70
        }
      },
      legends: {
        text: {
          fill: colors.white
        }
      },
      labels: {
        text: {
          fill: colors.white
        }
      },
      markers: {
        textColor: colors.white
      },
      tooltip: {
        container: {
          background: colors.darkBlue80,
          color: colors.white
        }
      },
      colors: [
        colors.purple100,
        colors.blue100,
        colors.green100,
        colors.orange100,
        colors.pink100,
        colors.purple50,
        colors.blue50,
        colors.green50,
        colors.orange50,
        colors.pink50
      ]
    }
  }
};

