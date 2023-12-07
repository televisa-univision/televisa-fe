import React, { Fragment } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import Store from '@univision/fe-commons/dist/store/store';
import { getBrandable, getDevice } from '@univision/fe-commons/dist/store/storeHelpers';
import { getKey } from '@univision/fe-commons/dist/utils/helpers';
import NavigationTracker from '@univision/fe-commons/dist/utils/tracking/tealium/navigation/NavigationTracker';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';

import Icon from '@univision/fe-icons/dist/components/Icon';

import Link from '../../Link';
import Styles from './LocalTvIcon.scss';

/**
 * Widget to render a TV icon associated to the current tv station.
 * It will indicate whether there is a Live broadcast.
 */
export default class LocalTvIcon extends React.Component {
  /**
   * Track action events on icon click
   */
  static trackAction() {
    NavigationTracker.track(NavigationTracker.events.click, {
      eventAction: 'live tv',
    });
  }

  state = {
    liveBroadcast: false,
  };

  /**
   * Constructor.
   * @param {Object} props Component props.
   */
  constructor(props) {
    super(props);
    this.trackClick = this.trackClick.bind(this);
  }

  /**
   * Update the live broadcast flag.
   */
  componentDidMount() {
    // TODO: Logic to fetch the live broadcast status.
  }

  /**
   * Track engagement clicks on the icon. The tracking will be ignored if props.trackingEvent
   * is undefined.
   */
  trackEngagement() {
    const { trackingEvent } = this.props;

    if (trackingEvent) {
      WidgetTracker.track(WidgetTracker.events.engagement, {
        target: trackingEvent,
      });
    }
  }

  /**
   * Triggers all required tracking events on icon click
   */
  trackClick() {
    this.trackEngagement();
    LocalTvIcon.trackAction();
  }

  /**
   * Render the TV icon.
   * @returns {JSX}
   */
  render() {
    const {
      liveBroadcast,
    } = this.state;

    const {
      className,
      iconColor,
      variant,
    } = this.props;

    let text = localization.get('tv');
    if (getDevice(Store) !== 'mobile') {
      text = liveBroadcast ? localization.get('liveTvNow') : localization.get('localTvNow');
    }

    const cssClasses = classnames(
      className,
      Styles.mainContainer,
      liveBroadcast && Styles.liveBroadcast,
      Styles[variant]
    );

    const linkProps = {
      onClick: this.trackClick,
      href: `${getKey(getBrandable(Store), 'uri', '#')}/tv-en-vivo`,
      className: cssClasses,
    };

    return (
      <Link {...linkProps}>
        <Fragment>
          <div className={Styles.iconContainer}>
            <Icon name="screenWithPlayIcon" fill={iconColor} />
          </div>
          <span className="uvs-font-a-bold">{ text }</span>
        </Fragment>
      </Link>
    );
  }
}

LocalTvIcon.propTypes = {
  className: PropTypes.string,
  iconColor: PropTypes.string,
  trackingEvent: PropTypes.string,
  variant: PropTypes.oneOf(['light', 'dark']),
};

LocalTvIcon.defaultProps = {
  iconColor: 'white',
  variant: 'dark',
};
