import React from 'react';
import NavigationTracker from '@univision/fe-commons/dist/utils/tracking/tealium/navigation/NavigationTracker';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Icon from '@univision/fe-icons/dist/components/Icon';
import ActionLink from '../../ActionLink';
import Styles from './ButtonTelevisa.scss';

/**
 * ButtonTelevisa
 * @param {Object} props component props
 * @returns {JSX}
 */
const ButtonTelevisa = ({
  className,
  name,
  link,
  style,
}) => {
  /**
   * Tracks click watch button
   */
  const trackClick = () => {
    const eventAction = `topnav-header-${name.replace(/ +/g, '-')}`;
    const utagData = {
      eventAction,
    };
    NavigationTracker.track(NavigationTracker.events.click, utagData);
  };

  return (
    <div
      style={style}
      className={classnames(
        Styles.containerShop,
        className,
      )}
    >
      <ActionLink
        onClick={trackClick}
        target="_blank"
        href={link}
        className={classnames(
          Styles.Shop,
          'uvs-font-c-bold'
        )}
        theme={{ primary: '#323F5E', secondary: '#161B27', direction: 'bottom' }}
      >
        <Icon name={'dot'} viewBox="0 0 16 16" fill={'#D41D31'} />
        <span>{name}</span>
      </ActionLink>
    </div>
  );
};

ButtonTelevisa.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  link: PropTypes.string,
  style: PropTypes.object,
};

export default ButtonTelevisa;
