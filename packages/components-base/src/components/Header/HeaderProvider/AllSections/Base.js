import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Store from '@univision/fe-commons/dist/store/store';
import { getDevice } from '@univision/fe-commons/dist/store/storeHelpers';
import NavigationTracker from '@univision/fe-commons/dist/utils/tracking/tealium/navigation/NavigationTracker';
import { getKey } from '@univision/fe-commons/dist/utils/helpers';

import AllSectionsMobile from './Mobile';
import AllSectionsDesktop from './Desktop';

/**
 * "Sections" menu for global navigation
 * {@link https://sites.google.com/fusion.net/univision-design-framework/components/header-nav-v1#h.p_8QImqUl3Qqk5}
 * @param {Object} props props
 * @returns {JSX} the view
 */
export default class AllSections extends React.Component {
  /**
   * tracks clicks on the main sections on the hamburger menu
   * @param {array} sectionName name of the section that was clicked.
   * @returns {void}
   */
  static trackSectionClick = (sectionName) => {
    const eventAction = `hamburger-${sectionName}`;
    const utagData = {
      eventAction,
    };

    NavigationTracker.track(NavigationTracker.events.click, utagData);
  };

  /**
   * initialize state
   */
  constructor() {
    super();
    this.state = {};
  }

  /**
   * Global Nav link handler
   * @param {event} e object
   */
  handlerLink = (e) => {
    const sectionName = getKey(e, 'target.innerText', '').toLowerCase();

    AllSections.trackSectionClick(sectionName);
  };

  /**
   * render the "sections" menu
   * @returns {JSX} the view
   */
  render() {
    const { open, profile, toggleMenu } = this.props;
    return (
      <Fragment>
        {getDevice(Store) !== 'desktop' && (
          <AllSectionsMobile
            open={open}
            onClickMainLink={this.handlerLink}
            profile={profile}
            toggleMenu={toggleMenu}
          />
        )}
        {getDevice(Store) === 'desktop' && (
          <AllSectionsDesktop
            open={open}
            onClickMainLink={this.handlerLink}
            profile={profile}
            toggleMenu={toggleMenu}
          />
        )}
      </Fragment>
    );
  }
}

AllSections.propTypes = {
  open: PropTypes.bool,
  profile: PropTypes.string,
  toggleMenu: PropTypes.func,
};
