import React from 'react';
import NavigationTracker from '@univision/fe-commons/dist/utils/tracking/tealium/navigation/NavigationTracker';
import features from '@univision/fe-commons/dist/config/features';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from '@univision/fe-icons/dist/components/Icon';

import { ALTO } from '@univision/fe-utilities/styled/constants';
import ActionLink from '../../ActionLink';
import Styles from './ButtonUniNow.scss';

/**
 * ButtonUniNow
 * @param {Object} props component props
 * @returns {JSX}
 */
const ButtonUniNow = ({
  className,
}) => {
  /**
   * Tracks click watch button
   */
  const trackClick = () => {
    const eventAction = 'topnav-header-unow watch button';
    const utagData = {
      eventAction,
    };
    NavigationTracker.track(NavigationTracker.events.click, utagData);
  };

  const displayType = features.header.buttonUniNow();

  const displayText = {
    enVivoTvIcon: 'EN VIVO',
    enVivoTvText: 'TV EN VIVO',
    verTvIcon: 'VER',
    verTvText: 'VER TV',
    watchIcon: 'WATCH',
  }[displayType];

  const hasIcon = displayType.includes('Icon');

  return (
    <div className={classnames(
      Styles.containerUniNow,
      className,
    )}
    >
      <ActionLink
        target="_blank"
        href="https://tv.univision.com/channels?seoName=univision&utm_source=univisioncom&utm_medium=nav-watchbutton&utm_campaign=TVE-2019-seoName"
        className={classnames(
          Styles.uniNow,
          'uvs-font-c-bold'
        )}
        onClick={trackClick}
        theme={{ primary: '#323F5E', secondary: '#161B27', direction: 'top' }}
      >
        {hasIcon && <Icon name={'dot'} size="extraLarge" fill={ALTO} />}
        <span>{displayText}</span>
      </ActionLink>
    </div>
  );
};

ButtonUniNow.propTypes = {
  className: PropTypes.string,
};

export default ButtonUniNow;
