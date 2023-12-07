/**
 * @module Prende TV Call To Action
 */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import BaseLink from '@univision/fe-components-base/dist/components/Link';
import isValidString from '@univision/fe-utilities/helpers/common/isValidString';
import toKebabCase from '@univision/fe-utilities/helpers/string/toKebabCase';

import { setContentTracking, setPrendeTVCookie } from '../../utils';
import Styles from './CTA.styles';

const Link = styled(BaseLink).attrs({ className: 'uvs-font-c-bold' })`${Styles.link}`;

/**
 * Prende TV static Call To Action button
 * @param {string} className - style button
 * @param {string} href - link to visit
 * @param {string} target - target of the link
 * @param {string} text - button text
 * @returns {JSX}
 */
const CTA = ({
  className, href, target, text,
}) => {
  const ctaCallback = useCallback((event) => {
    setPrendeTVCookie();
    setContentTracking(event);
  }, []);

  if (!isValidString(text)) return null;

  const trackingName = toKebabCase(`cta ${text}`).toUpperCase();

  return (
    <Link
      className={className}
      href={href}
      target={target}
      onClick={ctaCallback}
      data-app={trackingName}
    >{text}
    </Link>
  );
};

CTA.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string,
  target: PropTypes.string,
  text: PropTypes.string,
};

export default CTA;
