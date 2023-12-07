import { createGlobalStyle } from 'styled-components';
import { BLACK_GREY, GOSSAMER, GAMBOGE } from '@univision/fe-utilities/styled/constants';
import SplashImage from '../../../assets/tudn/images/cast-placeholder.png';

// posibly chamge splash color to black
export default {
  global: createGlobalStyle`
    cast-media-player {
      --progress-color: ${GOSSAMER};
      --splash-color: ${BLACK_GREY};
      --splash-image: url(${SplashImage});
      --theme-hue: 180;
      --break-color: ${GAMBOGE};
      line-height: 48px;
    }
  `,
};
