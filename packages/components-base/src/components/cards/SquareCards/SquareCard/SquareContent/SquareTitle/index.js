import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import getKey from '@univision/fe-utilities/helpers/object/getKey';
import truncateString from '@univision/fe-utilities/helpers/string/truncateString';
import isValidValue from '@univision/fe-utilities/helpers/common/isValidValue';
import features from '@univision/fe-commons/dist/config/features';
import {
  LARGE,
  MEDIUM,
  SMALL,
} from '@univision/fe-commons/dist/constants/cardSizes';
import Title from '../../../../../Title';
import Link from '../../../../../Link';
import Styles from './SquareTitle.styles';

// Maximum amount of characters in title
const MAX_TITLE_CHARS_LENGTH = 125;
const MAX_TITLE_CHARS_LENGTH_SMALL = 110;

const TitleStyled = styled(Title)`
  ${Styles.title}
`;
const LinkStyled = styled(Link)`
  ${Styles.link}
`;
const TitleWrapper = styled.div`
  ${Styles.titleWrapper}
`;

/**
 * Square Card Title
 * @param {!Object} props - Props for this component
 * @param {string} [props.className] - Class name modifier class
 * @param {bool} [props.isDark = false] - true if it is in dark mode
 * @param {string} [props.size] - the size of the card
 * @param {style} [props.style] - Modifier style
 * @param {Object} [props.theme] - the theme object
 * @param {string} [props.title] - the card title
 * @param {function} [props.trackClick] - the tracking function
 * @param {string} [props.type] -the card type
 * @param {string} [props.uri] - the card uri
 * @access public
 * @returns {JSX}
 */
const SquareTitle = ({
  className,
  isDark,
  showBadge,
  size,
  style,
  theme,
  title,
  trackClick,
  type,
  uri,
  target,
  useExplicitNavigation,
}) => {
  const isWorldCupMVP = features.deportes.isWorldCupMVP();
  return isValidValue(size) && isValidValue(type) ? (
    <TitleWrapper
      className={className}
      style={style}
      size={size}
      type={type}
    >
      <TitleStyled
        isDark={isDark}
        fontName={getKey(theme, `headlineFont.${type}`)}
        titleSize={size}
        theme={theme}
        type={type}
        showBadge={showBadge}
        isWorldCupMVP={isWorldCupMVP}
      >
        <LinkStyled
          useExplicitNavigation={useExplicitNavigation}
          href={uri}
          onClick={trackClick}
          type={type}
          size={size}
          target={target}
        >
          {truncateString(title, {
            maxChars: size === SMALL ? MAX_TITLE_CHARS_LENGTH_SMALL : MAX_TITLE_CHARS_LENGTH,
          })}
        </LinkStyled>
      </TitleStyled>
    </TitleWrapper>
  ) : null;
};

SquareTitle.propTypes = {
  className: PropTypes.string,
  isDark: PropTypes.bool,
  showBadge: PropTypes.bool,
  size: PropTypes.oneOf([LARGE, MEDIUM, SMALL]),
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
  theme: PropTypes.object,
  title: PropTypes.string,
  trackClick: PropTypes.func,
  type: PropTypes.string,
  uri: PropTypes.string,
  target: PropTypes.string,
  useExplicitNavigation: PropTypes.bool,
};

SquareTitle.defaultProps = {
  title: '',
};

export default SquareTitle;
