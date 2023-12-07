import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Icon from '@univision/fe-icons/dist/components/Icon';
import { WHITE } from '@univision/fe-commons/dist/utils/styled/constants';
import Link from '../Link';

import Styles from './SocialLink.styles';

const SocialLinkWrapper = styled.div`${Styles.socialLink}`;

/**
 * SocialLink
 * @param {Object} link the link object
 * @param {string} type the social media network being linked to
 * @returns {JSX}
 */
const SocialLink = ({
  link, type, className, iconOnly, iconSize,
}) => {
  return (
    <SocialLinkWrapper type={type} className={`uvs-font-a-bold ${className}`}>
      <Link href={link.url} target="_blank">
        <Icon name={`${type}Legacy`} size={iconSize} fill={WHITE} />
        {!iconOnly ? ` ${type}` : null}
      </Link>
    </SocialLinkWrapper>
  );
};

SocialLink.propTypes = {
  className: PropTypes.string,
  link: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }),
  type: PropTypes.string.isRequired,
  iconOnly: PropTypes.bool,
  iconSize: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

SocialLink.defaultProps = {
  className: '',
  iconOnly: false,
  iconSize: 'medium',
};

export default SocialLink;
