/**
 * @module PrendeTV Copyright
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import localization from '../../constants/localization';
import Styles from './Copyright.styles';

const Copyright = styled.div`${Styles.copyright}`;

/**
 * Prende TV static Navigation.
 *
 * @param {boolean} isFooter - indicates if the the navigation will be in the footer.
 * @returns {JSX}
 */
function CopyrightComponent({ isFooter }) {
  return (
    <Copyright>
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={{ __html: localization.get(isFooter ? 'copyright' : 'shortCopyright') }} />
    </Copyright>
  );
}

CopyrightComponent.propTypes = {
  isFooter: PropTypes.bool,
};

export default CopyrightComponent;
