import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import marketCoordinates from '@univision/fe-commons/dist/constants/marketCoordinates.json';

import Link from '../../Link';
import Styles from './TuCiudad.styles';
import GlobalNavStyles from './GlobalNav.styles';
import trackClickEvent from '../helpers';

const TuCiudadLink = styled(Link)`${Styles.tuCiudadLink}`;
const ItemList = styled.div`${GlobalNavStyles.itemList}`;

/**
 * Tu Ciudad
 * @param {string} href site section url
 * @param {bool} isMobile is device mobile
 * @param {string} label button label
 * @param {string} market current market
 * @param {bool} site current site
 * @returns {JSX}
 */
const TuCiudad = ({
  href,
  isMobile,
  label,
  market,
  site,
}) => {
  const uri = marketCoordinates[market]?.uri ?? href;

  /**
   * Toggles Market modal
   * @param {Object} tag - native JS event
   * @returns {function}
   */
  const trackEvent = useCallback((tag) => {
    return () => {
      trackClickEvent('topnav', { getAttribute: () => tag });
    };
  }, []);

  return (
    <div>
      <ItemList
        itemProp="name"
        role="menuitem"
        isMobile={isMobile}
        isTuCiudad
      >
        <TuCiudadLink site={site} href={uri} onClick={trackEvent('tuciudad')}>
          {label}
        </TuCiudadLink>
      </ItemList>
    </div>
  );
};

TuCiudad.propTypes = {
  href: PropTypes.string,
  isMobile: PropTypes.bool,
  label: PropTypes.string,
  market: PropTypes.string,
  site: PropTypes.string,
};

export default TuCiudad;
