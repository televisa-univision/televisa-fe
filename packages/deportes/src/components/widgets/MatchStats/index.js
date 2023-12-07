import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

import features from '@univision/fe-commons/dist/config/features';
import MatchStatsCard from '@univision/shared-components/dist/components/v2/MatchStatsCard';
import WidgetTitle from '@univision/shared-components/dist/components/v2/WidgetTitle';
import TitleWrapper from '@univision/shared-components/dist/components/v2/TitleWrapper';
import NavWrapper from '@univision/shared-components/dist/components/v2/NavWrapper';
import Button from '@univision/shared-components/dist/components/v2/Button';
import CoreSlider from '@univision/fe-components-base/dist/components/CoreSlider';
import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';
import AdProxy from '@univision/fe-commons/dist/components/ads/dfp/AdProxy';
import getKey from '@univision/fe-utilities/helpers/object/getKey';

import { DEEP_SEA } from '@univision/fe-utilities/styled/constants';
import soccerMatchNavDefinitions from '../../../utils/layoutWidgets/matchCenter/soccerMatchNavDefinitions';
import SoccerMatchNavContext from '../../base/SoccerMatchNav/SoccerMatchNavContext';
import StatWrapper from '../../base/StatWrapper';
import localization from '../../../utils/localization';

import Styles from './MatchStats.scss';
/**
 * MatchStats component wrapper
 * @param {!Object} props - components props
 * @param {!Object} home - object with team info
 * @param {!Object} away - object with away info
 * @param {!Object} data - component data
 * @returns {?JSX}
 */
class MatchStats extends React.PureComponent {
  /**
   * getTrackingTab Method
   * @param {number} index - active card
   * @param {string} device - current page device
   * @returns {string} - utag tab string
   */
  static getTrackingTab(index, device) {
    const target = device === 'mobile' ? device : 'desktop';

    if (index === 1) {
      return `match-stats-mc-distribucion-${target}`;
    }
    if (index === 2) {
      return `match-stats-mc-ataque-${target}`;
    }
    if (index === 3) {
      return `match-stats-mc-defensa-${target}`;
    }

    return `match-stats-mc-general-${target}`;
  }

  /**
   * Setup component state.
   */
  constructor() {
    super();

    this.state = {
      active: 0,
      innerWidth: getKey(global, 'window.innerWidth', 0),
    };

    this.timer = null;
    this.slider = React.createRef();
    this.toggleActiveTab = this.toggleActiveTab.bind(this);
    this.hasResize = this.hasResize.bind(this);
    this.onSwipe = this.onSwipe.bind(this);
    this.debounceHasResize = debounce(this.hasResize, 250).bind(this);
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    const { getMatchStats } = this.props;
    window.addEventListener('resize', this.debounceHasResize);
    this.hasResize();
    if (getMatchStats) {
      getMatchStats();
      this.startInterval();
    }
  }

  /**
   * component did update method
   *@param {Object} prevProps - the previous props component
   */
  componentDidUpdate(prevProps) {
    const {
      props: { status },
      state: { active },
    } = this;
    const prevStatus = getKey(prevProps, 'data.status', null);

    if (prevStatus !== status && status === 'post') {
      this.stopInteval();
    }

    if (this.slider.current) {
      this.slider.current.goToSlide(active);
    }
  }

  /**
   * Clear the timer on unmount
   */
  componentWillUnmount() {
    this.stopInteval();
    window.removeEventListener('resize', this.debounceHasResize);
  }

  /**
   * Sets the center padding for core slider
   * @returns {Object}
   */
  static get settings() {
    const width = getKey(global, 'window.innerWidth', 0);

    let settings;

    // We're using if instead of switch based on browsers performance tests
    // http://jsfiddle.net/some/HKdug/
    if (width >= 480 && width < 768) {
      settings = { centerPadding: 70, size: 'medium', isAbbreviated: true };
    } else if (width >= 768 && width < 1024) {
      settings = { centerPadding: 150, size: 'small', isAbbreviated: false };
    } else if (width >= 1024 && width < 1280) {
      settings = { centerPadding: 200, size: 'medium', isAbbreviated: false };
    } else if (width >= 1280) {
      settings = { centerPadding: 300, size: 'large', isAbbreviated: false };
    } else {
      settings = { centerPadding: 50, size: 'small', isAbbreviated: true };
    }

    return settings;
  }

  /**
   * Calls getMatchStats every 90 sec
   */
  startInterval() {
    const { getMatchStats, interval } = this.props;
    this.timer = setInterval(getMatchStats, interval * 1000);
  }

  /**
   * Stop refresh interval
   */
  stopInteval() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  /**
   * Triggers when the windows resize
   */
  hasResize() {
    this.setState({ innerWidth: getKey(global, 'window.innerWidth', 0) });
  }

  /**
   * Toggle active tab
   * @param {number} index - index number
   */
  toggleActiveTab(index) {
    const { device } = this.props;
    const { active: newActive } = this.state;

    this.setState({
      active: index,
    });

    if (newActive === index) {
      WidgetTracker.track(WidgetTracker.events.engagement, {
        target: this.constructor.getTrackingTab(index, device),
      });
    }
  }

  /**
   * onSwipe method
   */
  onSwipe() {
    const { device } = this.props;

    WidgetTracker.track(WidgetTracker.events.engagement, {
      target: device === 'mobile'
        ? 'match-stats-mc-swipe-mobile'
        : 'match-stats-mc-scroll-desktop',
    });
  }

  /**
   * Render Method
   * @returns {JSX}
   */
  render() {
    const {
      state: {
        active,
        innerWidth,
      },
      props: {
        home,
        away,
        stats,
        device,
        settings,
      },
      constructor,
      context,
    } = this;
    const { centerPadding, isAbbreviated, size } = constructor.settings;
    const isMobile = device === 'mobile';

    if (!home || !away || !stats) {
      return null;
    }
    if (context?.setNavigationItem) {
      context.setNavigationItem(soccerMatchNavDefinitions.STATS);
    }

    const sliderProps = {
      settings: {
        dots: false,
        infinite: false,
        arrows: false,
        lazyLoad: false,
        vertical: false,
        variableWidth: true,
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    };
    const sliderSettings = {
      dots: false,
      slidesToScroll: 1,
      lazyLoad: false,
      vertical: false,
      slidesToShow: 1,
      centerMode: true,
      centerPadding: `${centerPadding}px`,
      arrows: false,
      afterChange: this.toggleActiveTab,
      infinite: centerPadding > 50,
      onSwipe: this.onSwipe,
    };
    const isWorldCupMVP = features.deportes.isWorldCupMVP();
    const navContent = stats.map((card, i) => (
      <Button
        key={`tab${card.statName}`}
        type="nav"
        onPress={() => this.toggleActiveTab(i)}
        isActive={i === active}
        isTudn
        isWorldCupMVP={isWorldCupMVP}
      >
        {card && card.statName ? card.statName : ''}
      </Button>
    ));

    return (
      <>
        <div className="row uvs-widget">
          <StatWrapper>
            <TitleWrapper isTudn className={Styles.title}>
              <WidgetTitle isTudn isLowerCase={isWorldCupMVP} fontColor={isWorldCupMVP && DEEP_SEA}>{localization.get('stats')}</WidgetTitle>
              <NavWrapper isTudn isWorldCupMVP={isWorldCupMVP} className={Styles.nav}>
                {isMobile && innerWidth > 768 ? (
                  navContent
                ) : (
                  <CoreSlider {...sliderProps}>{navContent}</CoreSlider>
                )}
              </NavWrapper>
            </TitleWrapper>

            <CoreSlider
              settings={sliderSettings}
              className={Styles.slider}
              ref={this.slider}
            >
              {stats.map((card, i) => (
                <div className={Styles.cardWrapper} key={`card${card.statName}`}>
                  <MatchStatsCard
                    className={Styles.card}
                    homeName={home}
                    awayName={away}
                    data={card.data}
                    active={i === active}
                    isTudn
                    size={size}
                    isAbbreviated={isAbbreviated}
                  />
                </div>
              ))}
            </CoreSlider>
          </StatWrapper>
        </div>
        <AdProxy className="uvs-ad-widget" {...settings?.widgetAd} />
      </>
    );
  }
}

MatchStats.propTypes = {
  device: PropTypes.string,
  getMatchStats: PropTypes.func,
  home: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    abbreviatedName: PropTypes.string.isRequired,
    imageURI: PropTypes.string.isRequired,
  }).isRequired,
  away: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    abbreviatedName: PropTypes.string.isRequired,
    imageURI: PropTypes.string.isRequired,
  }).isRequired,
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      statName: PropTypes.string,
      data: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string.isRequired,
          range: PropTypes.array.isRequired,
        })
      ),
    })
  ),
  interval: PropTypes.number,
  status: PropTypes.string,
  settings: PropTypes.shape({
    widgetAd: PropTypes.shape({
      type: PropTypes.string,
    }),
  }),
};

MatchStats.defaultProps = {
  interval: 30,
};

MatchStats.contextType = SoccerMatchNavContext;

export default MatchStats;
