import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ChannelButton from '@univision/shared-components/dist/components/v2/ChannelButton';
import NavWrapper from '@univision/shared-components/dist/components/v2/NavWrapper';
import { getDevice } from '@univision/fe-commons/dist/store/storeHelpers';
import Store from '@univision/fe-commons/dist/store/store';
import { isValidArray } from '@univision/fe-commons/dist/utils/helpers';
import Styles from './TvGuideNav.scss';

/**
 * Tv Guide Nav widget
 * @param {Object} props wrapper props
 * @returns {?JSX}
 */
const TvGuideNav = (props) => {
  const {
    channels,
    className,
    activeChannel,
    onPress,
  } = props;
  if (!isValidArray(channels)) {
    return null;
  }
  const isMobile = getDevice(Store) === 'mobile';
  const channelNav = channels.map(nav => (
    <ChannelButton
      key={`channel${nav}`}
      onPress={() => onPress(nav)}
      isActive={nav === activeChannel}
      isChannel
      logo={nav}
      className={Styles.navItem}
    />
  ));

  return (
    <div className={classnames(
      className,
      Styles.navWrapper,
      { [Styles.withScroll]: isMobile }
    )}
    >
      <NavWrapper className={Styles.nav}>
        {channelNav}
      </NavWrapper>
    </div>
  );
};

/**
 * propTypes
 * @property {Array} channels - the channels for the nav
 * @property {string} [activeChannel the name of the currently active channel
 * @property {string} [className] - a custom class name
 * @property {Function} [onPress] - the callback when pressing a channel button
 */
TvGuideNav.propTypes = {
  channels: PropTypes.array,
  activeChannel: PropTypes.string,
  className: PropTypes.string,
  onPress: PropTypes.func,
};

/**
 * Default Prop Values
 */
TvGuideNav.defaultProps = {
  channels: [],
};

export default TvGuideNav;
