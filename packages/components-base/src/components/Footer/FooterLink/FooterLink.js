import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  setCookie,
  getKey,
} from '@univision/fe-commons/dist/utils/helpers';
import toAbsoluteUrl from '@univision/fe-utilities/helpers/url/toAbsoluteUrl';
import { DO_NOT_SELL_INFORMATION } from '@univision/fe-commons/dist/constants/personalization';
import NavigationTracker from '@univision/fe-commons/dist/utils/tracking/tealium/navigation/NavigationTracker';

import Link from '../../Link';
import Styles from './FooterLink.scss';

/**
 * A clickable item in the footer
 * @param {Object} className style rules
 * @param {Object} domain site domain
 * @param {Object} item The details of the link to display
 * @param {Object} themeVariant type of theme
 * @param {string} site site
 * @returns {JSX}
 */
const FooterLink = ({
  className,
  domain,
  item,
  themeVariant,
}) => {
  const linkClasses = classnames(Styles.footerLink, className, {
    [Styles.light]: themeVariant === 'light',
    'uvs-font-a-bold': item.isMain,
  });

  const cookie = getKey(item, 'setCookie');
  const { convertToAbsolute } = item;
  let { href } = item;

  if (convertToAbsolute && domain) {
    href = toAbsoluteUrl(href, domain);
  }

  /**
   * Handle Link click
   */
  const onClickHandler = () => {
    if (cookie) setCookie(DO_NOT_SELL_INFORMATION, cookie, 1000);

    NavigationTracker.track(NavigationTracker.events.click, { eventAction: `footer-hamburger-otras paginas-${item.text.toLowerCase()}` });
  };

  return (
    <Link
      className={linkClasses}
      href={href}
      target={item.target}
      onClick={onClickHandler}
    >
      {item.text}
    </Link>
  );
};

/**
 * @property {Object} item the details of the link to display
 * @property {string} item.domain domain name to convert to absolute url if required
 * @property {string} item.text the text to display in the UI;
 * @property {string} item.href the link's href attribute
 * @property {string} item.target the link's target attribute
 */
FooterLink.propTypes = {
  className: PropTypes.string,
  domain: PropTypes.string,
  item: PropTypes.shape({
    convertToAbsolute: PropTypes.bool,
    href: PropTypes.string,
    isMain: PropTypes.bool,
    text: PropTypes.string.isRequired,
    target: PropTypes.string,
  }),
  themeVariant: PropTypes.string,
};

FooterLink.defaultProps = {
  item: {},
  className: '',
};

export default FooterLink;
