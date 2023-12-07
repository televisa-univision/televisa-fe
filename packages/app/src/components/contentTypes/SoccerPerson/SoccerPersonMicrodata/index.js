import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import isValidObject from '@univision/fe-utilities/helpers/common/isValidObject';

/**
 * Micro-data component for soccer person
 * @param {Object} props - the react component props
 * @param {Object} props.profile - soccer person profile information
 * @param {string} [props.profile.dateOfBirth] - date of birth of person
 * @param {number} [props.profile.height] - height of the person
 * @param {string} [props.profile.name] - the player full name
 * @param {string} [props.profile.nationality] - nationality of the person
 * @param {string} [props.profile.picture] - soccer person picture url image
 * @param {string} [props.profile.url] - soccer person CMS url
 * @param {number} [props.profile.weight] - weight of the person
 * @access public
 * @returns {JSX}
 */
function SoccerPersonMicrodata({ profile }) {
  let json;

  if (!isValidObject(profile)) {
    return null;
  }

  const {
    dateOfBirth,
    height,
    name,
    nationality,
    picture,
    url,
    weight,
  } = profile;
  const microdata = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    height: `${height} cm`,
    weight: `${weight} kg`,
    birthDate: dateOfBirth,
    image: picture,
    name,
    nationality,
    url,
  };

  try {
    json = JSON.stringify(microdata, null, 2);
  } catch (e) {
    return null;
  }

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ // eslint-disable-line react/no-danger
          __html: json,
        }}
      />
    </Head>
  );
}

SoccerPersonMicrodata.propTypes = {
  profile: PropTypes.shape({
    dateOfBirth: PropTypes.string,
    height: PropTypes.number,
    name: PropTypes.string,
    nationality: PropTypes.string,
    picture: PropTypes.string,
    url: PropTypes.string,
    weight: PropTypes.number,
  }),
};

export default SoccerPersonMicrodata;
