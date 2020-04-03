import { Theme, ThemeName } from "./types";
import { lighten, desaturate } from 'polished';
import logoDark from 'assets/icons/logo.svg';
import logoLight from 'assets/icons/logo-light.svg';

const darkBlue100 = '#131427';
const darkBlue95 = desaturate(0.1, lighten(0.05, darkBlue100));
const darkBlue90 = desaturate(0.2, lighten(0.1, darkBlue100));
const darkBlue80 = desaturate(0.5, lighten(0.1, darkBlue100));
const darkBlue70 = desaturate(0.5, lighten(0.2, darkBlue100));
const darkPurple100 = '#392338';
const purple100 = '#a06cc8';
const purple50 = lighten(0.3, purple100);
const blue100 = '#34b5d9';
const blue50 = lighten(0.3, blue100);
const green100 = '#94cc00';
const green50 = lighten(0.3, green100);
const orange100 = '#ff8f00';
const orange50 = lighten(0.3, orange100);
const pink200 = '#2A0417';
const pink100 = '#dd0063';
const pink50 = lighten(0.3, pink100);
const white = '#fff';
const grey100 = '#eee';
const grey50 = '#f5f5f5';
const red100 = '#f00';

export const themeNames = ['light', 'dark'] as const;

export const themes: {[key in ThemeName]: Theme} = {
  light: {
    fg: darkBlue100,
    bg: white,
    inputBackground: grey100,
    titleColor: blue100,
    titleGradient: `-webkit-linear-gradient(left,${purple100},${blue100})`,
    evenListElementBackground: grey50,
    danger: red100,
    logoUrl: logoLight,
    buttonBackground: pink100,
    buttonTextColor: white,
    chart: {
      colors: [
        purple100,
        blue100,
        green100,
        orange100,
        pink100,
        purple50,
        blue50,
        green50,
        orange50,
        pink50
      ]
    }
  },
  dark: {
    fg: white,
    bg: darkBlue100,
    inputBackground: darkBlue90,
    titleColor: blue100,
    titleGradient: `-webkit-linear-gradient(left,${purple100},${blue100})`,
    evenListElementBackground: darkBlue95,
    danger: red100,
    logoUrl: logoDark,
    buttonBackground: pink100,
    buttonTextColor: pink200,
    chart: {
      axis: {
        legend: {
          text: {
            fill: white
          }
        },
        ticks: {
          text: {
            fill: white
          }
        }
      },
      grid: {
        line: {
          stroke: darkBlue70
        }
      },
      legends: {
        text: {
          fill: white
        }
      },
      labels: {
        text: {
          fill: white
        }
      },
      markers: {
        textColor: white
      },
      tooltip: {
        container: {
          background: darkBlue80,
          color: white
        }
      },
      colors: [
        purple100,
        blue100,
        green100,
        orange100,
        pink100,
        purple50,
        blue50,
        green50,
        orange50,
        pink50
      ]
    }
  }
}

