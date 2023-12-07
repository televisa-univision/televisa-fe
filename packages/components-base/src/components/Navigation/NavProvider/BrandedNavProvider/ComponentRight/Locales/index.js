import React from 'react';
import PropTypes from 'prop-types';

import LocalTvIcon from '../../../../../widgets/LocalTvIcon';
import ButtonPrendeTV from '../../../../ButtonPrendeTv';

/**
 * Locales right component for branded nav
 * @param {Object} props of the component
 * @param {Object} [theme] - theme from the themeProvider
 * @returns {JSX}
 */
const Locales = ({ theme }) => {
  const { isBrandedHeaderBlack } = theme;
  const tvIconProps = {
    trackingEvent: 'header_TVEnvivo',
    variant: isBrandedHeaderBlack ? 'dark' : 'light',
    iconColor: isBrandedHeaderBlack ? 'white' : 'black',
  };

  return (
    <>
      <LocalTvIcon {...tvIconProps} />
      <ButtonPrendeTV />
    </>
  );
};

Locales.propTypes = {
  theme: PropTypes.object,
};

Locales.defaultProps = {
  theme: {},
};

export default Locales;
