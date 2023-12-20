/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import localization from '@univision/fe-utilities/localization';
import Icon from '@univision/fe-icons/dist/components/Icon';
import Tracker from '@univision/fe-commons/dist/utils/tracking/tealium/Tracker';
import { useSelector } from 'react-redux';
import { themeSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';
import { VIX_BANNER_DOMAIN, VIX_BANNER_PATH } from '@univision/fe-commons/dist/constants/televisaSitesData';

// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member
import Styles from './TelevisaRebrand.styles';
import Link from '../../../../../Link';

const Wrapper = styled.div`${Styles.wrapper}`;
const VixLogoWrapper = styled.div`${Styles.vixLogoWrapper}`;
const SearchIcon = styled.div`${Styles.searchIcon}`;
const SearchLabel = styled.div`${Styles.searchLabel}`;

/**
 * Creates TelevisaRebrand right component
 * @returns {JSX}
 */
const TelevisaRebrand = () => {
  const theme = useSelector(themeSelector);
  const fillIcon = theme.colorBrandedLabels || '#FFFFFF';
  /**
   * Handle click event
   * @param {Object} e - event
   */
  const handleClick = (e) => {
    e.preventDefault();
    Tracker.fireEvent({
      event: 'topnav-vix-search-header',
      destination_url: '/search',
    });

    // Open appropriate URL based on environment
    if (typeof process.env.ENVIRONMENT !== 'undefined') {
      window.open('/search', '_self');
    } else {
      window.open(`${window.location.href.replace('/search', '')}/search`, '_self');
    }
  };

  /**
   * Handle click event
   * @param {Object} e - event
   */
  const vixClickHandler = (e) => {
    e.preventDefault();
    Tracker.fireEvent({
      event: 'topnav-vix-logo-header',
      destination_url: `${VIX_BANNER_DOMAIN}${VIX_BANNER_PATH}`,
    });
    window.open(`${VIX_BANNER_DOMAIN}${VIX_BANNER_PATH}`, '_self');
  };

  return (
    <Wrapper>
      <Link onClick={handleClick}>
        <SearchIcon>
          <Icon name="search" width={32} height={32} fill={fillIcon} className={'labelSearch'} />
          <SearchLabel>{localization.get('search')}</SearchLabel>
        </SearchIcon>
      </Link>
      <Link onClick={vixClickHandler}>
        <VixLogoWrapper>
          <Icon name="vix" viewBox="0 0 90 80" width={40} height={40} fill={fillIcon} />
        </VixLogoWrapper>
      </Link>
    </Wrapper>
  );
};

export default TelevisaRebrand;
