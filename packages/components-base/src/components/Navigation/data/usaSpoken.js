import { MARINE_BLUE } from '@univision/fe-commons/dist/utils/styled/constants';
import { UNIVISION_SITE } from '@univision/fe-commons/dist/constants/sites';
import LocalizationManager from '@univision/fe-commons/dist/utils/localization/LocalizationManager';

const rootPath = '/se-habla-usa';
const site = UNIVISION_SITE;
const target = '_self';

export default {
  children: [],
  href: rootPath,
  name: LocalizationManager.get('usaSpoken'),
  site,
  target,
  theme: {
    primary: MARINE_BLUE,
  },
};
