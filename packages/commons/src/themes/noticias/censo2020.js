import {
  CERULEAN_BLUE,
  CHATHAMS_BLUE,
  LIGHT_BLUE,
} from '../../utils/styled/constants';

/**
 * Censo 2020 theme settings
 * @returns {Object}
 */
const censo2020 = () => ({
  exposedNavBackgroundImages: {
    xxs: 'https://st1.uvnimg.com/3c/8b/875fb75b4180b31cdf649ef99998/xxs.jpg',
    sm: 'https://st1.uvnimg.com/7e/89/1325478e448c8c5604f03b1cd61d/sm.png',
    md: 'https://st1.uvnimg.com/90/cb/876843334266bce6b2a8d4493335/md.png',
    xl: 'https://st1.uvnimg.com/9b/db/e26f464444ffa6c0bd60039ef4c3/xl.png',
  },
  globalNavBackgroundColor: CHATHAMS_BLUE,
  headlineFont: {
    default: 'uvs-font-b-bold',
  },
  isBrandedHeaderBlack: false,
  primary: CERULEAN_BLUE,
  secondary: LIGHT_BLUE,
  shortTitleBackgroundImages: {
    xxs: 'https://st1.uvnimg.com/32/54/2f5c41284c7bbb13fd9c89edeb3d/xxs.jpg',
    sm: 'https://st1.uvnimg.com/26/db/64cd8fde4a358e0dc5e864ef5cdb/sm.jpg',
    md: 'https://st1.uvnimg.com/f3/00/0b8444d24cca90d32db51f7e818b/md.jpg',
    xl: 'https://st1.uvnimg.com/8a/6e/409e625c40cc91f1b01c0954033a/xl.jpg',
  },
});

export default censo2020;
