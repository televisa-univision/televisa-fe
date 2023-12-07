import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import NavigationTracker from '@univision/fe-commons/dist/utils/tracking/tealium/navigation/NavigationTracker';
import Icon from '@univision/fe-icons/dist/components/Icon';
import Link from '../../Link';

import Styles from './HeaderImageLink.scss';

/**
 * A clickable item with an image in the header
 * @param {Object} item The details of the link to display
 * @returns {JSX}
 */
const HeaderImageLink = ({ item, themeVariant }) => {
  /**
   * Method to track the link.
   */
  const trackAppLink = () => {
    NavigationTracker.track(NavigationTracker.events.click, { eventAction: `header-apps-${item.text.toLowerCase()}` });
  };

  return (
    <div
      key={item.text}
      className={classnames(Styles.wrapper, { [Styles.light]: themeVariant === 'light' })}
    >
      <Link href={item.href} target={item.target} onClick={trackAppLink}>
        <div className={Styles.imageCont}>
          <Icon {...item} name={item?.icon} />
        </div>
        <div className={Styles.textCont}>{item.text}</div>
      </Link>
    </div>
  );
};

/**
 * @property {Object} item the details of the link to display
 * @property {string} item.text the text to display in the UI;
 * @property {string} item.href the link's href attribute
 * @property {icon} item.icon the link's image icon url
 * @property {string} item.target the link's target attribute
 */
HeaderImageLink.propTypes = {
  item: PropTypes.shape({
    href: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    icon: PropTypes.string,
    target: PropTypes.string,
  }),
  themeVariant: PropTypes.object,
};

HeaderImageLink.defaultProps = {
  item: {},
};

export default HeaderImageLink;
