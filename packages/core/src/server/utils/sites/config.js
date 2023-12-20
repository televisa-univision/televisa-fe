import {
  DEPORTES_DEFAULT_PATH,
  TUDN_DEFAULT_HOST,
  TUDN_SITE,
  UNIVISION_DEFAULT_HOST,
  UNIVISION_SITE,
  DELICIOSO_DEFAULT_HOST,
  DELICIOSO_SITE,
  MULHER_DEFAULT_HOST,
  MULHER_SITE,
  ZAPPEANDO_SITE,
  ZAPPEANDO_DEFAULT_HOST,
  TASAUDAVEL_SITE,
  TASAUDAVEL_DEFAULT_HOST,
  // Televisa Constants
  LAS_ESTRELLAS_DEFAULT_HOST,
  LAS_ESTRELLAS_SITE,
  CANAL5_SITE,
  CANAL5_DEFAULT_HOST,
  DISTRITOCOMEDIA_SITE,
  DISTRITOCOMEDIA_DEFAULT_HOST,
  TELEVISA_SITE,
  TELEVISA_DEFAULT_HOST,
  UNICABLE_SITE,
  UNICABLE_DEFAULT_HOST,
  TELEHIT_SITE,
  TELEHIT_DEFAULT_HOST,
  ELNU9VE_SITE,
  ELNU9VE_DEFAULT_HOST,
  LOS_BINGERS_SITE,
  LOS_BINGERS_DEFAULT_HOST,
  BANDAMAX_SITE,
  BANDAMAX_DEFAULT_HOST,
} from '@univision/fe-commons/dist/constants/sites';

export const GENERIC_SITE_TYPE = 'generic';

/**
 * Sites list config
 */
export const SITES_LIST = {
  [TUDN_SITE]: {
    defaultPath: DEPORTES_DEFAULT_PATH,
    defaultHost: TUDN_DEFAULT_HOST,
  },
  [LAS_ESTRELLAS_SITE]: {
    defaultPath: '',
    defaultHost: LAS_ESTRELLAS_DEFAULT_HOST,
    type: LAS_ESTRELLAS_SITE,
  },
  [UNIVISION_SITE]: {
    defaultPath: '',
    defaultHost: UNIVISION_DEFAULT_HOST,
    type: UNIVISION_SITE,
  },
  [MULHER_SITE]: {
    defaultPath: '',
    defaultHost: MULHER_DEFAULT_HOST,
  },
  [DELICIOSO_SITE]: {
    defaultPath: '',
    defaultHost: DELICIOSO_DEFAULT_HOST,
  },
  [ZAPPEANDO_SITE]: {
    defaultPath: '',
    defaultHost: ZAPPEANDO_DEFAULT_HOST,
  },
  [TASAUDAVEL_SITE]: {
    defaultPath: '',
    defaultHost: TASAUDAVEL_DEFAULT_HOST,
  },
  [CANAL5_SITE]: {
    defaultPath: '',
    defaultHost: CANAL5_DEFAULT_HOST,
    type: CANAL5_SITE,
  },
  [DISTRITOCOMEDIA_SITE]: {
    defaultPath: '',
    defaultHost: DISTRITOCOMEDIA_DEFAULT_HOST,
    type: DISTRITOCOMEDIA_SITE,
  },
  [UNICABLE_SITE]: {
    defaultPath: '',
    defaultHost: UNICABLE_DEFAULT_HOST,
    type: UNICABLE_SITE,
  },
  [TELEHIT_SITE]: {
    defaultPath: '',
    defaultHost: TELEHIT_DEFAULT_HOST,
    type: TELEHIT_SITE,
  },
  [ELNU9VE_SITE]: {
    defaultPath: '',
    defaultHost: ELNU9VE_DEFAULT_HOST,
    type: ELNU9VE_SITE,
  },
  [LOS_BINGERS_SITE]: {
    defaultPath: '',
    defaultHost: LOS_BINGERS_DEFAULT_HOST,
    type: LOS_BINGERS_SITE,
  },
  // This must be at the end of the list to give priority to the other sites
  [TELEVISA_SITE]: {
    defaultPath: '',
    defaultHost: TELEVISA_DEFAULT_HOST,
    type: TELEVISA_SITE,
  },
  [BANDAMAX_SITE]: {
    defaultPath: '',
    defaultHost: BANDAMAX_DEFAULT_HOST,
    type: BANDAMAX_SITE,
  },
};
