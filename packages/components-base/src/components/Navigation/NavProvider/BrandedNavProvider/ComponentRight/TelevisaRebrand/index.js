import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import localization from '@univision/fe-utilities/localization';
import Icon from '@univision/fe-icons/dist/components/Icon';
import Tracker from '@univision/fe-commons/dist/utils/tracking/tealium/Tracker';
import { useSelector } from 'react-redux';
import { themeSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';

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
      window.open(`${window.location.href}/search`, '_self');
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <Link onClick={handleClick}>
      <Wrapper>
        <SearchIcon>
          <Icon name="search" width={32} height={32} fill={fillIcon} className={'labelSearch'} />
          <SearchLabel>{localization.get('search')}</SearchLabel>
        </SearchIcon>
        <VixLogoWrapper>
          <Icon name="vix" viewBox="0 0 90 80" width={40} height={40} fill={fillIcon} />
        </VixLogoWrapper>
      </Wrapper>
    </Link>
  );
};

export default TelevisaRebrand;
