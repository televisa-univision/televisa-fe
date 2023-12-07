import * as subNavTypes from '@univision/fe-commons/dist/constants/subNavTypes';

import Content from './Content';
import Section from './Section';

export default (subNavType) => {
  switch (subNavType) {
    case subNavTypes.SECTION_SUBNAV:
      return Section;

    case subNavTypes.CONTENT_SUBNAV:
    default:
      return Content;
  }
};
