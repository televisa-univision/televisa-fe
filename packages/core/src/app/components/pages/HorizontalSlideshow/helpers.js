import classnames from 'classnames';
import SocialTracker from '@univision/fe-commons/dist/utils/tracking/tealium/social/SocialTracker';
import GeneralStyles from './HorizontalSlideshow.scss';

/**
 * share bar button clicked
 * @param {string} name to share
 * @param {Object} props required props
 */
export const handleShareBarClick = (name = '', props = {}) => {
  const { shareData = {}, actions = {} } = props;
  SocialTracker.track(SocialTracker.events.share, { name, ...shareData });

  if (actions.onShareClick) {
    actions.onShareClick();
  }
};

/**
 * Gets CSS class names to fade-in/fade-out element
 * @param {boolean} showContent determines if certain content should be shown or hidden
 * @returns {string}
 */
export const getFadeAnimationClassName = ({ showContent }) => {
  return classnames({
    [GeneralStyles.show]: showContent,
    [GeneralStyles.hide]: !showContent,
  });
};
