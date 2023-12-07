import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Icon from '@univision/fe-icons/dist/components/Icon';
import {
  GREY_BLACK,
} from '@univision/fe-utilities/styled/constants';

import Link from '../../Link';
import Title from '../../Title';
import Styles from './ArchiveTitle.styles';

const IconWrapper = styled.div`${Styles.iconWrapper}`;
const MainTitle = styled.span`${Styles.mainTitle}`;
const SecondTitle = styled.span`${Styles.secondTitle}`;
const ThirdTitle = styled.span`${Styles.thirdTitle}`;
const TitleWrapper = styled(Title).attrs({ element: 'h1' })`${Styles.titleWrapper}`;
const Wrapper = styled.div`${Styles.wrapper}`;

/**
 * ArchiveTitle base component.
 * @param {Object} props - Object content attrs
 * @param {string} [props.mainLabel] - Main label to show inside the title
 * @param {string} [props.secondLabel] - this label is the one that appears on top
 * @param {string} [props.thirdLabel] - this label appear next to the main label
 * @param {string} [props.onClick] - function to be executed when the title is clicked
 * @param {boolean} [props.isArrowActive] - show or not the arrow to back to the previeous page
 * @returns {JSX}
 */
const ArchiveTitle = ({
  mainLabel, secondLabel, thirdLabel, href, isArrowActive,
}) => {
  return (
    <Wrapper>
      <Link href={href}>
        <TitleWrapper>
          {isArrowActive && (
          <IconWrapper>
            <Icon name="arrowLeft" size="small" fill={GREY_BLACK} />
          </IconWrapper>
          )}
          <MainTitle className="uvs-font-a-black">{mainLabel} </MainTitle>
          {secondLabel && <SecondTitle className="uvs-font-c-bold">{secondLabel} </SecondTitle>}
          {thirdLabel && <ThirdTitle className="uvs-font-a-light">{thirdLabel} </ThirdTitle>}
        </TitleWrapper>
      </Link>
    </Wrapper>
  );
};

ArchiveTitle.propTypes = {
  isArrowActive: PropTypes.bool,
  mainLabel: PropTypes.string,
  secondLabel: PropTypes.string,
  thirdLabel: PropTypes.string,
  href: PropTypes.string,
};

ArchiveTitle.defaultProps = {
  href: '#',
};

export default ArchiveTitle;
