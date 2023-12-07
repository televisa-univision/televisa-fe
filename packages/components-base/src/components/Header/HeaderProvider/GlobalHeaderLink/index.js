import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Store from '@univision/fe-commons/dist/store/store';
import { getPageData, getDevice, getDeviceType } from '@univision/fe-commons/dist/store/storeHelpers';
import {
  hasKey,
  exists,
  getScrollTop,
} from '@univision/fe-commons/dist/utils/helpers';
import { asDeferrer } from '@univision/fe-commons/dist/utils/deferrer';

import themes from '@univision/fe-commons/dist/utils/themes/themes.json';

import Link from '../../../Link';
import Styles from './GlobalHeaderLink.scss';

/**
 * GlobalHeader > Subnav anchor component
 * @param   {Object} props  component props
 * @returns {JSX} the view
 */
@asDeferrer
class GlobalHeaderLink extends React.PureComponent {
  /**
   * Constructor
   * @param {Object} props of the component
   */
  constructor(props) {
    super(props);

    this.linkRef = React.createRef();
    this.timeout = null;
    this.device = getDevice(Store);
    this.deviceType = getDeviceType(Store);
  }

  /**
   * Check the ref and scroll into view on mobile
   */
  componentDidMount() {
    const {
      device,
      deviceType,
      linkRef,
      props: { active },
    } = this;

    if (
      linkRef
      && linkRef.current
      && active
      && device === 'mobile'
      && getScrollTop() === 0
    ) {
      // Fix issue with subNav gradient animation
      this.defer(() => {
        if (deviceType === 'ios') {
          linkRef.current.scrollIntoView(false);
        } else {
          linkRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center',
          });
        }
      });
    }
  }

  /**
   * Renders the component
   * @returns {JSX}
   */
  render() {
    const {
      href, text, theme, active, variant, target, className, onClick,
      activeLinkIndicatorColor, icon, site,
    } = this.props;
    const pageData = getPageData(Store);
    const { data } = pageData;
    let borderBottomColor = activeLinkIndicatorColor;

    if (!activeLinkIndicatorColor && (
      (hasKey(data, 'type')
        // Including other pages with expected theme border bottom
        && (data.type === 'section'
          || data.type === 'soccercompetition'
          || data.type === 'soccerteam'))
      || variant !== 'dark')
    ) {
      borderBottomColor = exists(theme) ? theme.primary : themes.themes.black.primary;
    }

    return (
      <Link
        href={href}
        className={classnames(
          Styles.link,
          { [Styles.active]: !!active },
          Styles[variant],
          className
        )}
        site={site}
        target={target}
        onClick={onClick}
      >
        {exists(icon) && icon}
        <span
          dangerouslySetInnerHTML={{ __html: text }} // eslint-disable-line
        />
        <span
          className={Styles.activeIndicator}
          style={{ borderBottomColor }}
          ref={this.linkRef}
        />
      </Link>
    );
  }
}

GlobalHeaderLink.propTypes = {
  href: PropTypes.string,
  text: PropTypes.string.isRequired,
  theme: PropTypes.object,
  active: PropTypes.bool,
  variant: PropTypes.string,
  site: PropTypes.string,
  target: PropTypes.oneOf(['_blank', '_self']),
  className: PropTypes.string,
  onClick: PropTypes.func,
  activeLinkIndicatorColor: PropTypes.string,
  icon: PropTypes.node,
};

export default GlobalHeaderLink;
