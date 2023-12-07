import {
  GRADIENT_DESTINO_2020_NATIONAL,
  DODGER_BLUE,
  CERULEAN_BLUE,
  LIGHT_BLUE,
} from '../../utils/styled/constants';
import { getHorizontalThemeGradient } from '../../utils/styled/mixins';

const gradient = getHorizontalThemeGradient({ end: DODGER_BLUE, start: CERULEAN_BLUE });

export default () => ({
  exposedNavBackgroundImages: {
    xxs: 'https://st1.uvnimg.com/d5/ac/ba0cd332476083d2bac9d6c8399b/background-expose-eleciones-national-mobile.png',
    sm: 'https://st1.uvnimg.com/99/aa/9c9219064e6283684b9cd839ee54/background-expose-eleciones-national-tablet-768.png',
    md: 'https://st1.uvnimg.com/d9/af/f4e030c443e69c1539b1bd3942f7/exposed-elections-national-md.png',
    xl: 'https://st1.uvnimg.com/c8/97/c4f47b28479eb62b59ac0d1e219a/background-expose-eleciones-national-desktop.png',
  },
  globalNavBackgroundColor: GRADIENT_DESTINO_2020_NATIONAL,
  gradient,
  isBrandedHeaderBlack: false,
  primary: CERULEAN_BLUE,
  secondary: LIGHT_BLUE,
  shortTitleBackgroundImages: {
    xxs: 'https://st1.uvnimg.com/b7/73/6ba5e39348ef9bb765bf6b60516c/background-content-eleciones-national-mobile.jpg.png',
    sm: 'https://st1.uvnimg.com/52/27/f7b3576744d283fbc3b1d1520201/background-content-eleciones-national-tablet-768.png',
    md: 'https://st1.uvnimg.com/08/cb/2ec55cde41cf9296f8577ed11aec/content-elections-national-md.png',
    xl: 'https://st1.uvnimg.com/e3/79/344f87614d698ee69f107b719399/background-content-eleciones-national-desktop.png',
  },
});
