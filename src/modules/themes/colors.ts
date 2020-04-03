import { lighten, desaturate } from 'polished';

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

export default {
  darkBlue100,
  darkBlue95,
  darkBlue90,
  darkBlue80,
  darkBlue70,
  darkPurple100,
  purple100,
  purple50,
  blue100,
  blue50,
  green100,
  green50,
  orange100,
  orange50,
  pink200,
  pink100,
  pink50,
  white,
  grey100,
  grey50,
  red100,
}
