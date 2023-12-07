import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import {
  MAIL,
} from '@univision/fe-commons/dist/constants/socialTypes';
import {
  ROUNDED_VARIANT, DARK_VARIANT, LIGHT_VARIANT, COLOR_VARIANT,
} from '@univision/fe-commons/dist/utils/styled/constants';
import Icon from '@univision/fe-icons/dist/components/Icon';
import { isTelevisaSiteSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';

import Link from '../Link';
import shareButtonDataHelper from './shareButtonDataHelper';
import Styles from './ShareButton.styles';

const LinkStyled = styled(Link)`${Styles.link}`;

/**
 * Basic building block for share button component
 * @param {string} name The name of the social network to access from the data
 * @param {string} className Custom css class used for overriding styles
 * @param {string} iconSize Size string used for setting the icon dimensions
 * @param {string} iconSizeOverride Size string used for overriding the icon dimensions
 * @param {Object} sharingOptions Object containing the data to use for sharing,
 *                 will fallback to the web-api data.
 * @param {string} style the custom styles for the component
 * @param {string} theme options
 * @param {function} onClick - event handler
 * @param {string} variant - type of variant
 * @returns {jsx}
 */
const ShareButton = ({
  name,
  className,
  iconSize,
  iconSizeOverride,
  theme,
  sharingOptions,
  style,
  onClick,
  variant,
}) => {
  const isTelevisaSite = useSelector(isTelevisaSiteSelector);
  return (
    <LinkStyled
      className={className}
      style={style}
      theme={theme}
      name={name}
      {...shareButtonDataHelper(name, sharingOptions)}
      onClick={onClick}
      isTelevisaSite={isTelevisaSite}
    >
      <Icon
        name={`${isTelevisaSite ? `${name}Televisa` : name}${!isTelevisaSite && name !== MAIL ? 'Legacy' : ''}`}
        size={isTelevisaSite ? 'small' : iconSize}
        sizeOverride={iconSizeOverride}
        variant={variant}
      />
    </LinkStyled>
  );
};

ShareButton.propTypes = {
  name: PropTypes.string.isRequired,
  iconSize: PropTypes.string,
  iconSizeOverride: PropTypes.number,
  className: PropTypes.string,
  theme: PropTypes.string,
  sharingOptions: PropTypes.object,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
  onClick: PropTypes.func,
  variant: PropTypes.oneOf([DARK_VARIANT, LIGHT_VARIANT, COLOR_VARIANT, ROUNDED_VARIANT]),
};

/**
 * Default props
 * @type {{iconSize: string}}
 */
ShareButton.defaultProps = {
  iconSize: 'xsmall',
  className: '',
  variant: DARK_VARIANT,
};

export default ShareButton;
