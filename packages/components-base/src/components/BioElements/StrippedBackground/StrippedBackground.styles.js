import { css } from 'styled-components';
import StrippedImage from '@univision/fe-commons/dist/assets/images/striped-background.svg';

export default {
  background: css`
    background-image: url('${StrippedImage}');
    height: 10px;
    width: 100%;
  `,
};
