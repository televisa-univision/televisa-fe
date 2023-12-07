import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import NavigationTracker from '@univision/fe-commons/dist/utils/tracking/tealium/navigation/NavigationTracker';
import Icon from '@univision/fe-icons/dist/components/Icon';
import Link from '../../Link';

import Styles from './FooterImageLink.scss';

/**
 * A clickable item with an image in the footer
 * @param {Object} item The details of the link to display
 * @returns {JSX}
 */
const FooterImageLink = ({ item, themeVariant }) => {
  /**
   * Method to track the link.
   */
  const trackAppLink = () => {
    NavigationTracker.track(NavigationTracker.events.click, { eventAction: `footer-apps-${item.text.toLowerCase()}` });
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
FooterImageLink.propTypes = {
  item: PropTypes.shape({
    href: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    icon: PropTypes.string,
    target: PropTypes.string,
  }),
  themeVariant: PropTypes.string.isRequired,
};

FooterImageLink.defaultProps = {
  item: {},
};

export default FooterImageLink;
