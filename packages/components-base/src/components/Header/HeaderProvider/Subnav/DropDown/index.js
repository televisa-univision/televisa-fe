import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Store from '@univision/fe-commons/dist/store/store';
import { getSites } from '@univision/fe-commons/dist/store/storeHelpers';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import { hasKey, toAbsoluteUrl } from '@univision/fe-commons/dist/utils/helpers';
import Link from '../../../../Link';

import Styles from './DropDown.scss';

import Clickable from '../../../../Clickable';
import { trackSubnavClick } from '../helpers';

/**
 * DropDown indicator for autoplay slideshow
 */
class DropDown extends Component {
  /**
   * Constructor
   * @param {Object} props Component properties
   */
  constructor(props) {
    super(props);
    this.state = {
      showMoreOpen: false,
    };
    this.sites = getSites(Store);
    this.toggleShowMore = this.toggleShowMore.bind(this);
  }

  /**
   * Always re-render.
   * Should component update
   * @returns {boolean}
   */
  shouldComponentUpdate() {
    return true;
  }

  /**
   * Toggle the hidden navigation in the "show more" drop down component.
   */
  toggleShowMore() {
    const { showMoreOpen } = this.state;

    this.setState({
      showMoreOpen: !showMoreOpen,
    });
  }

  /**
   * Render method
   * @returns {JSX}
   */
  render() {
    const {
      props: {
        links, variant, subNavBackground, isTudn,
      },
      state: { showMoreOpen },
    } = this;

    if (links && hasKey(links, 'hidden') && links.hidden.length >= 1) {
      return (
        <div className={classnames(Styles.showMore, Styles[variant])}>
          <Clickable
            className={Styles.visibilityTrigger}
            type="link"
            size="medium"
            iconSize="xxsmall"
            appearance="plain"
            icon="arrowDownLegacy"
            label={localization.get('more')}
            onClick={this.toggleShowMore}
          />
          <ul
            className={classnames(Styles.list, {
              [Styles.open]: showMoreOpen,
              [Styles.tudn]: isTudn,
            })}
            style={isTudn ? {} : { backgroundColor: subNavBackground.color }}
          >
            {links.hidden.map(link => (
              <li
                key={link.link}
                className={classnames({
                  [Styles.tudn]: isTudn,
                })}
              >
                <Link
                  checkUserLocation={isTudn}
                  className={classnames(Styles.extraLink, {
                    [Styles.tudn]: isTudn,
                  })}
                  href={toAbsoluteUrl(link.link, this.sites[link.site])}
                  onClick={() => trackSubnavClick(link.name)}
                  site={link.site}
                  target={link.target}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return null;
  }
}

DropDown.propTypes = {
  links: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  variant: PropTypes.oneOf(['light', 'dark']),
  subNavBackground: PropTypes.object,
  isTudn: PropTypes.bool,
};

DropDown.defaultProps = {
  subNavBackground: {
    color: '#000000',
  },
  isTudn: false,
};

export default DropDown;
