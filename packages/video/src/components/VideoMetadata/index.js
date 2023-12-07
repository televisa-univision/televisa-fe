import PropTypes from 'prop-types';
import React from 'react';
import { getKey } from '@univision/fe-commons/dist/utils/helpers';
import { getISOdate } from '@univision/fe-commons/dist/utils/helpers/dateTimeUtils';
import tudnLogo from '@univision/fe-commons/dist/assets/images/tudn/tudn-green-logo.svg';
import univisionLogo from '@univision/fe-commons/dist/assets/images/logo-univision-color.svg';
import clientLogging from '@univision/fe-commons/dist/utils/logging/clientLogging';

/**
 * Get Json metadata
 * @param {Object} page - the pageData
 * @returns {Object}
 */
function getJsonData(page) {
  let json = {};
  const {
    authors,
    description,
    durationString,
    publishDate,
    title,
    uri,
    vertical,
    type,
    expirationDate,
    source,
    supplier,
    streamStartTime,
    streamEndTime,
  } = page;

  const image = getKey(page, 'image.renditions.original.href', 'https://st1.uvnimg.com/3e/f3/8c2a63a94fa4af1bc3d3fd5739c1/default-content-image.png');
  const contentSource = source || supplier || 'Univision';
  const isUnivision = contentSource === 'Univision';

  const microdata = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: title || vertical,
    description: description || vertical,
    embedUrl: `${uri}/embed`,
    thumbnailUrl: [image],
    uploadDate: publishDate,
    duration: getISOdate(durationString || '1:00'),
    publisher: {
      '@type': 'Organization',
      name: authors?.[0]?.fullName || contentSource,
      logo: {
        '@type': 'ImageObject',
        url: isUnivision ? univisionLogo : tudnLogo,
        width: isUnivision ? 152 : 133,
        height: isUnivision ? 30 : 50,
      },
    },
  };

  const liveTypes = ['livestream', 'soccermatch'];
  if (liveTypes.includes(type)) {
    const startDate = streamStartTime || publishDate;
    const endDate = streamEndTime || expirationDate;

    microdata.publication = {
      '@type': 'BroadcastEvent',
      name: microdata.name,
      isLiveBroadcast: true,
    };

    try {
      microdata.publication.startDate = new Date(startDate)?.toISOString();
      microdata.publication.endDate = new Date(endDate)?.toISOString();
    } catch (e) {
      e.message = `Error generating video microdata: ${e.message}`;
      clientLogging(e);
    }

    if (type === 'soccermatch') {
      microdata.contentUrl = 'https://anvato-gcdn-oiaqnocss6k3lxvnfcail63uec-us.storage.googleapis.com/us/vod/2168/20/02/27/3824166/3824166_60A8D7E3AA6845B48126D120F070FBED_200227_3824166_TUDN_Video_Slate_for_DAI_2_27_20_12000.mp4';
    } else {
      microdata.contentUrl = 'https://anvato-gcdn-oiaqnocss6k3lxvnfcail63uec-us.storage.googleapis.com/us/vod/2168/20/10/15/3932889/3932889_110D3048C1D042E795D9E69C2AA34119_201015_3932889_La_Transmision_Comenzara_12000.mp4';
    }

    delete microdata.embedUrl;
  }

  // JSON.stringify will remove the undefined values
  json = JSON.stringify(microdata, (key, value) => (value || undefined), 2);

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}

/**
 * Container component representing a Video metadata
 * @param {Object} props React Props for this component
 * @returns {JSX}
 */
const VideoMetadata = ({ page }) => {
  return getJsonData(page);
};

/**
 * propTypes
 * @property {Array} widgets - React widgets to be rendered in the page
 */
VideoMetadata.propTypes = {
  page: PropTypes.object,
};

export default VideoMetadata;
