import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Store from '@univision/fe-commons/dist/store/store';
import { getSharingOptions, getDomain, getPageData } from '@univision/fe-commons/dist/store/storeHelpers';
import ResponsiveLoader from '@univision/fe-commons/dist/components/breakpoint/ResponsiveLoader';
import SocialTracker from '@univision/fe-commons/dist/utils/tracking/tealium/social/SocialTracker';
import heart from '@univision/fe-commons/dist/assets/icons/heart.svg';
import Tracker from '@univision/fe-commons/dist/utils/tracking/tealium/Tracker';
import { slugify } from '@univision/fe-commons/dist/utils/helpers';

import Image from '../../Image';
import Dropdown from '../../Dropdown';
import ShareBar from '../../ShareBar';
import Clickable from '../../Clickable';
import Title from '../../Title';
import TopicBar from '../../TopicBar';

import configs from './configs';

import Styles from './LoveCalculator.scss';

const { signs, pairings, settings } = configs;

/**
 * LoveCalculator widget
 */
export default class LoveCalculator extends React.Component {
  /**
   * set initial state
   */
  constructor() {
    super();

    this.state = {
      first: signs[0].value,
      second: signs[0].value,
    };

    this.onClickSeeResults = this.onClickSeeResults.bind(this);
  }

  /**
   * handle select change
   * @param {Object} e the event
   */
  onChange = (e) => {
    const { name } = e.target;
    this.setState({
      [name]: e.target.value.toLowerCase(),
    });
    this.trackEvents(name);
  };

  /**
   * handle click on share button
   * @param {string} name social network name (facebook, twitter, mail, etc)
   */
  onShare = (name) => {
    const pageData = getPageData(Store);
    const { data: { uid, title, type } } = pageData;
    const shareData = { uid, title, type };
    SocialTracker.track(SocialTracker.events.share, { name, ...shareData });
  };

  /**
   * handle click on results button
   */
  onClickSeeResults() {
    this.trackEvents('results');
  }

  /**
   * Tracking custom events
   * @param {string} actionName Name of the action to track.
   */
  trackEvents = (actionName) => {
    const utagData = {
      event: 'engagement_widget',
      event_action: 'horoscope_widget_love',
      event_label: slugify(actionName),
    };
    Tracker.fireEvent(utagData);
  };

  /**
   * render
   * @returns {JSX} the LoveCalculator view
   */
  render() {
    const { theme, widgetContext } = this.props;
    const { first, second } = this.state;

    const selection = `${first}:${second}`;

    let path;
    if (first && second) {
      path = Object.keys(pairings).reduce((acc, pair) => {
        const result = pairings[pair];
        if (pair === selection) return result;
        const reverse = pair
          .split(':')
          .reverse()
          .join(':');
        if (reverse === selection) return result;
        return acc;
      }, null);
    }
    const { title, description } = settings;
    const sharingOptions = getSharingOptions(Store);
    const domain = getDomain(Store);
    Object.keys(sharingOptions).forEach((option) => {
      sharingOptions[option].url = `${domain}${path}`;
      sharingOptions[option].body = `${domain}${path}`;
      sharingOptions[option].title = `${title}: ${first} - ${second}`;
      sharingOptions[option].subject = `${title}: ${first} - ${second}`;
    });

    const share = path && (
      <ShareBar sharingOptions={sharingOptions} onClick={this.onShare} className={Styles.share} />
    );

    return (
      <div className={classnames('uvs-widget', 'row', Styles.loveCalculatorWrapper)}>
        <div className="col-sm-6 col-lg-5">
          <TopicBar
            settings={{ title }}
            separator="top"
            theme={theme}
            widgetContext={widgetContext}
          />
          <div className={Styles.introWrapper}>
            <Image src={heart} alt={title} className={Styles.heart} />
            <div>
              <Title className={Styles.title}>{description}</Title>
              <ResponsiveLoader breakpoints={['sm', 'md', 'lg', 'xl']}>
                <div className={Styles.desktopShare}>{share}</div>
              </ResponsiveLoader>
            </div>
          </div>
        </div>
        <div className={classnames('col-sm-6', Styles.right)}>
          <div>
            <p className={Styles.label}>Escoge tu signo y el signo de tu pareja.</p>
            <div className={Styles.options}>
              <Dropdown
                options={signs}
                name="first"
                onChange={this.onChange}
                className={Styles.select}
              />
              <Dropdown
                options={signs}
                name="second"
                onChange={this.onChange}
                className={Styles.select}
              />
            </div>
          </div>
          <div className={Styles.resultAction}>
            <Clickable
              type="link"
              appearance="primary"
              theme={theme}
              href={path}
              label="Ver Compatibilidad"
              icon="arrow"
              onClick={this.onClickSeeResults}
            />
          </div>
          <ResponsiveLoader breakpoints={['xxs', 'xs']}>
            <div className={Styles.mobileShare}>{share}</div>
          </ResponsiveLoader>
        </div>
      </div>
    );
  }
}

LoveCalculator.propTypes = {
  theme: PropTypes.object,
  widgetContext: PropTypes.object,
};
