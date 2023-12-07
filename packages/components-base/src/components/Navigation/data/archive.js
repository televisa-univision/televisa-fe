import {
  DARKER_GREY,
} from '@univision/fe-utilities/styled/constants';
import { UNIVISION_SITE } from '@univision/fe-commons/dist/constants/sites';
import localization from '@univision/fe-utilities/localization';

const rootPath = '/archivo';
const site = UNIVISION_SITE;
const target = '_self';

export default {
  children: [],
  href: rootPath,
  name: localization.get('archive'),
  site,
  target,
  theme: {
    primary: DARKER_GREY,
  },
};
