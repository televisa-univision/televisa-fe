import { css } from 'styled-components';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import media from '@univision/fe-utilities/styled/mixins/media';
import {
  ASPHALT,
  DESERT_STORM,
  CAB_SAV,
  CLARET,
} from '@univision/fe-utilities/styled/constants';
import { US } from '@univision/fe-commons/dist/constants/userLocation';
import getFromMap from '@univision/fe-utilities/helpers/object/getFromMap';

import {
  PARTIDOS_TAB,
  POSICIONES_TAB,
  EQUIPOS_TAB,
} from './constants';

/**
 * Gets the min-height according to active tab
 * @param {string} activeTab - active tab
 * @returns {*}
 */
const getBottomWrapperHeight = activeTab => getFromMap(activeTab, {
  [PARTIDOS_TAB]: css`
    min-height: 210px;
  `,
  [POSICIONES_TAB]: css`
    min-height: 730px;

    ${media.md`
      min-height: 263px;
    `}
  `,
  [EQUIPOS_TAB]: css`
    min-height: 860px;

    ${media.md`
      min-height: 263px;
    `}
  `,
});

export default {
  logoWrapper: css`
    align-items: center;
    background-color: ${CAB_SAV};
    display: flex;
    height: 46px;
    justify-content: center;

    ${media.md`
      height: 56px;
    `}
  `,
  logoImg: ({ userLocation }) => css`
    height: ${userLocation === US ? '30px' : '24px'};

    ${media.md`
      height: ${userLocation === US ? '42px' : '24px'};
    `}
  `,
  tab: ({ isActive }) => css`
    background-color: ${CAB_SAV};
    color: ${DESERT_STORM};
    flex: 1;
    font-family: 'Poppins', sans-serif;
    font-size: ${rem(16)};
    font-weight: 700;
    height: 40px;
    opacity: 0.4;
    text-transform: uppercase;

    ${isActive && css`
      background-color: ${CLARET};
      opacity: 1;
    `}

    ${media.md`
      flex: 0;
      padding: 0 12px;
    `}
  `,
  tabContainer: css`
    background-color: ${CAB_SAV};
    display: flex;
    flex-direction: row;
  `,
  topWrapper: css`
    background-color: ${CAB_SAV};
  `,
  bottomWrapper: ({ activeTab }) => css`
    background: linear-gradient(360deg, ${ASPHALT} 1.04%, ${CLARET} 91.98%);
    ${getBottomWrapperHeight(activeTab)}
  `,
};
