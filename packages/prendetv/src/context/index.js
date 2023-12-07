/**
 * @module PrendeTV Context
 */
import { createContext } from 'react';

import { MOBILE } from '@univision/fe-commons/dist/constants/devices';

import { PRENDE_TV_LANDING } from '../constants';

const PrendeTVContext = createContext({
  device: MOBILE,
  lang: undefined,
  path: PRENDE_TV_LANDING,
  page: null,
});

export default PrendeTVContext;
