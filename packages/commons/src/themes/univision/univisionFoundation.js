import {
  BLACK,
  CHAMBRAY,
  CORNFLOWER_BLUE,
  LUCKY_POINT,
  THEME_DEFAULT_SECONDARY,
} from '../../utils/styled/constants';

export default () => ({
  subNavBackgroundColor: CHAMBRAY,
  primary: BLACK,
  secondary: THEME_DEFAULT_SECONDARY,
  custom: {
    a: LUCKY_POINT,
    'a:hover': CORNFLOWER_BLUE,
  },
});
