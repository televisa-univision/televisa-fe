import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import getKey from '@univision/fe-utilities/helpers/object/getKey';
import isValidObject from '@univision/fe-utilities/helpers/common/isValidObject';

/**
 * Micro-data component for soccer events
 * @param {Object} props - the component props
 * @param {Object} props.data - sports/match data to build microdata
 * @access public
 * @returns {JSX}
 */
const Microdata = ({ data }) => {
  let json;

  // Only add in SSR and when have correctly data
  if (!isValidObject(data)) {
    return null;
  }

  const start = new Date(data.date);
  const end = new Date(start.getTime() + 120 * 60000);
  const eventName = `${getKey(data, 'teams.home.fullName', 'Equipo 1')} vs ${getKey(
    data,
    'teams.away.fullName',
    'Equipo 2'
  )}`;

  try {
    // Ensure the JSON is correctly or doesn't return anything
    const microdata = {
      '@context': 'http://schema.org',
      '@type': 'SportsEvent',
      location: {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'Country',
        },
        name: data.stadiumName,
      },
      name: eventName,
      url: data.url,
      description: eventName,
      performer: {
        '@type': 'PerformingGroup',
        name: data.leagueName,
      },
      image: 'https://cdn1.uvnimg.com/b1/39/942e7a774d78b1da3fa288eefa40/sports-event.png',
      startDate: start.toISOString(),
      endDate: end.toISOString(),
    };

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
};

/**
 * propTypes
 * @property {Object} data - the soccer event data
 */
Microdata.propTypes = {
  data: PropTypes.object,
};

Microdata.defaultProps = {
  data: {},
};

export default Microdata;
