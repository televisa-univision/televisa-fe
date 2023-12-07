import React from 'react';
import NavigationTracker from '@univision/fe-commons/dist/utils/tracking/tealium/navigation/NavigationTracker';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Icon from '@univision/fe-icons/dist/components/Icon';
import { KEPPEL } from '@univision/fe-utilities/styled/constants';
import ActionLink from '../../ActionLink';
import Styles from './ButtonShop.scss';

/**
 * ButtonShop
 * @param {Object} props component props
 * @returns {JSX}
 */
const ButtonShop = ({
  className,
}) => {
  /**
   * Tracks click watch button
   */
  const trackClick = () => {
    const eventAction = 'topnav-header-shopunivision';
    const utagData = {
      eventAction,
    };
    NavigationTracker.track(NavigationTracker.events.click, utagData);
  };

  return (
    <div className={classnames(
      Styles.containerShop,
      className,
    )}
    >
      <ActionLink
        onClick={trackClick}
        target="_blank"
        href="https://shop.univision.com/?utm_source=Univision&utm_medium=widget&utm_campaign=Home"
        className={classnames(
          Styles.Shop,
          'uvs-font-c-bold'
        )}
        theme={{ primary: KEPPEL, secondary: KEPPEL, direction: 'top' }}
      >
        <Icon name={'shoppingBag'} viewBox="0 0 16 16" fill={KEPPEL} />
        <span>SHOP</span>
      </ActionLink>
    </div>
  );
};

ButtonShop.propTypes = {
  className: PropTypes.string,
};

export default ButtonShop;
