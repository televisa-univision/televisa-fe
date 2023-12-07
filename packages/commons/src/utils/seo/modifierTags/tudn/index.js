import toRelativeUrl from '@univision/fe-utilities/helpers/url/toRelativeUrl';
import isValidValue from '@univision/fe-utilities/helpers/common/isValidValue';

import { SECTION } from '../../../../constants/contentTypes.json';
import features from '../../../../config/features';

const MX_PATH_REGEX = /\/mx/;

/**
 * Get custom language  data for tudn site
 * @returns {Object}
 */
const tudnData = {
  alternateSection(pageState) {
    // check if feature flag is enabled and content type is section
    if (
      !features.deportes.isWorldCupMVP({ page: pageState })
      || pageState?.data?.type !== SECTION
      || !isValidValue(pageState?.data?.uri)
    ) {
      return [];
    }

    const {
      domain = 'https://www.tudn.com',
      data: { uri },
    } = pageState;

    // Remove /mx from relative url
    const defaultPath = toRelativeUrl(uri).replace(MX_PATH_REGEX, '');
    const usUri = `${domain}${defaultPath}`;
    const mxUri = `${domain}/mx${defaultPath}`;

    return [
      {
        hrefLang: 'es-us',
        href: usUri,
      },
      {
        hrefLang: 'es-mx',
        href: mxUri,
      },
      {
        hrefLang: 'x-default',
        href: usUri,
      },
    ];
  },
  metas(_, metaData) {
    const meta = { ...metaData };

    if (meta.property === 'fb:app_id') {
      meta.content = '447901525311921';
    }

    return meta;
  },
};

export default tudnData;
