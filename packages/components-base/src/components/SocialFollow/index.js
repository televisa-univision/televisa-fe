/* eslint-disable react/no-array-index-key */
import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

import Store from '@univision/fe-commons/dist/store/store';
import { getPageData } from '@univision/fe-commons/dist/store/storeHelpers';
import {
  exists,
  getSocialNetworks,
  hasKey,
  isValidArray,
} from '@univision/fe-commons/dist/utils/helpers';
import univisionTulip from '@univision/fe-commons/dist/assets/images/logo-univision-tulip-color.svg';
import Icon from '@univision/fe-icons/dist/components/Icon';
import Link from '../Link';
import Logo from '../Logo';

import Styles from './SocialFollow.scss';

/**
 * Social Follow component.
 * @param {Object} props of the component.
 * @returns {JSX}
 */
const SocialFollow = ({
  className, title, subtitle, theme, socialNetworks,
}) => {
  let socialLinks = null;
  let widgetTitle = null;
  let networks = [];
  const pageData = getPageData(Store);

  // If no networks override from props, then grab from the Store.
  if (socialNetworks.length <= 0 && exists(pageData) && hasKey(pageData, 'data.socialNetworks')) {
    networks = getSocialNetworks(pageData.data, ['facebook', 'twitter', 'instagram', 'youTube']);
  } else if (isValidArray(socialNetworks)) {
    networks = socialNetworks;
  }

  // If no title override from props, then grab from the Store.
  if (title === null && exists(pageData) && hasKey(pageData, 'data.primaryTag.name')) {
    widgetTitle = pageData.data.primaryTag.name;
  } else if (title !== null) {
    widgetTitle = title;
  }

  if (networks.length > 0) {
    socialLinks = networks.map(({ href, name }, key) => {
      return (
        <Link key={key} href={href} target="_blank" className={Styles.networkLink}>
          <Icon
            name={`${name.toLowerCase()}Legacy`}
            size="xsmall"
            className={Styles[`icon-${name.toLowerCase()}`]}
          />
        </Link>
      );
    });
  } else {
    return null;
  }

  return (
    <div className={classnames([Styles.wrapper, className])}>
      <div className={Styles.logo}>
        <Logo src={univisionTulip} />
      </div>

      <div className={Styles.headline} style={{ color: theme.primary }}>
        {widgetTitle}
      </div>

      <div className={Styles.subheadline}>
        {subtitle}
      </div>

      <div className={Styles.socialNetworks}>
        {socialLinks}
      </div>
    </div>
  );
};

/**
 * @param {String} classname Classname override for the widget.
 * @param {String} title Title for the widget.
 * @param {String} subtitle Secondary Title for the widget.
 * @param {Object} theme Theme colors for the widget.
 * @param {Array} socialNetworks Social Networks associated with the widget.
 */
SocialFollow.propTypes = {
  className: PropTypes.object,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  theme: PropTypes.shape({
    primary: PropTypes.string.isRequired,
    secondary: PropTypes.string,
  }),
  socialNetworks: PropTypes.array,
};

SocialFollow.defaultProps = {
  className: {},
  title: null,
  subtitle: 'Síguenos en nuestras redes',
  theme: {
    primary: '#000',
    secondary: '',
  },
  socialNetworks: [],
};

export default SocialFollow;
