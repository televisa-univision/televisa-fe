import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from '../../../../../../Link';

import Styles from './SubNavigation.styles';

const Wrapper = styled.nav`${Styles.wrapper}`;
const MainList = styled.ul`${Styles.mainList}`;
const MainMenuItem = styled.li`${Styles.mainMenuItem}`;
const LinkWrapper = styled(Link)`${Styles.link}`;

/**
 * Renders current link list
 * @param {[]} linkList current list of links
 * @param {boolean} isWorldCupMVP is world cup mvp
 * @returns {JSX}
 */
const SubNavigation = ({ linkList, isWorldCupMVP }) => {
  return (
    <Wrapper>
      <MainList className="uvs-font-c-regular">
        {linkList.map(linkItem => (
          <MainMenuItem key={linkItem.name} isWorldCupMVP={isWorldCupMVP}>
            <LinkWrapper
              href={linkItem.link}
              site={linkItem.site}
              isWorldCupMVP={isWorldCupMVP}
            >
              {linkItem.name}
            </LinkWrapper>
          </MainMenuItem>
        ))}
      </MainList>
    </Wrapper>
  );
};

SubNavigation.propTypes = {
  isWorldCupMVP: PropTypes.bool,
  linkList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    link: PropTypes.string,
  })),
};

export default SubNavigation;
