import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import LOGOS from '@univision/fe-commons/dist/constants/vixSitesData';

import Styles from './Header.styles';
import Link from '../../../../../Link';
import Navigation from '../Navigation';
import LINK_LIST from '../Navigation/VixLinkList';

const Wrapper = styled.div`${Styles.wrapper}`;
const LogoWrapper = styled.img`${Styles.logo}`;

/**
 * Header sites
 * @param {Object} pageData current page data
 * @returns {JSX}
 */
const Header = ({ pageData }) => {
  const { site } = pageData;
  return (
    <>
      <Wrapper>
        <Link href={site}>
          <LogoWrapper src={LOGOS[site]} />
        </Link>
      </Wrapper>
      <Navigation links={LINK_LIST[site]} />
    </>
  );
};

Header.propTypes = {
  pageData: PropTypes.object,
};

export default Header;
