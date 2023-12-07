import React from 'react';
import PropTypes from 'prop-types';

import SummaryMatch from '@univision/shared-components/dist/components/v2/SummaryMatch';
import WidgetTitle from '@univision/shared-components/dist/components/v2/WidgetTitle';
import TitleWrapper from '@univision/shared-components/dist/components/v2/TitleWrapper';
import AdProxy from '@univision/fe-commons/dist/components/ads/dfp/AdProxy';
import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import isValidFunction from '@univision/fe-utilities/helpers/common/isValidFunction';
import getKey from '@univision/fe-utilities/helpers/object/getKey';
import hasKey from '@univision/fe-utilities/helpers/object/hasKey';
import { DEEP_SEA } from '@univision/fe-utilities/styled/constants';
import localization from '../../../utils/localization';
import soccerMatchNavDefinitions from '../../../utils/layoutWidgets/matchCenter/soccerMatchNavDefinitions';
import SoccerMatchNavContext from '../../base/SoccerMatchNav/SoccerMatchNavContext';
import StatWrapper from '../../base/StatWrapper';

import Styles from './MatchSummary.scss';

/**
 * MatchSummary Component
 */
class MatchSummary extends React.PureComponent {
  /**
   * Returns true if it has valid data
   * @param {Array} data - card data
   * @returns {bool}
   */
  static hasData(data) {
    return data && hasKey(data, 'homeName') && hasKey(data, 'awayName');
  }

  /**
   * bind methods and setup component
   * @param {Object} props the component props
   * @param {Object} context react context from parent component
   */
  constructor(props, context) {
    super(props, context);
    this.state = {
      activeTeam: null,
      activeHighlight: null,
    };
    this.timer = null;
    this.isMobile = props.device === 'mobile';
    this.highlightHandler = this.highlightHandler.bind(this);
  }

  /**
   * ComponentDidMount method
   */
  componentDidMount() {
    const { getSummary } = this.props;
    if (getSummary && isValidFunction(getSummary)) {
      getSummary();
      this.startInterval();
    }
  }

  /**
   * Check if the status of the soccer event change
   * to set interval according of that status
   * @param {Object} prevProps - the previous props component
   * @access public
   */
  componentDidUpdate(prevProps) {
    const status = getKey(this.props, 'data.status', null);
    const prevStatus = getKey(prevProps, 'data.status', null);

    if (prevStatus !== status && status === 'post') {
      this.stopInteval();
    }
  }

  /**
   * Clear the timer on unmount
   */
  componentWillUnmount() {
    this.stopInteval();
  }

  /**
   * isAbbreviated getter
   * @returns {Object}
   */
  static get settings() {
    const innerWidth = getKey(global, 'window.innerWidth', 0);
    const isAbbreviated = this.isMobile || innerWidth <= 1024;
    let size = 'small';
    let iconSize = 'medium';

    if (innerWidth >= 768 && innerWidth <= 1279) {
      size = 'medium';
    } else if (innerWidth >= 1280) {
      size = 'medium';
      iconSize = 'large';
    }

    return {
      isAbbreviated,
      size,
      iconSize,
    };
  }

  /**
   * Calls getSummary every 90 sec
   */
  startInterval() {
    const { getSummary, interval } = this.props;
    this.timer = setInterval(getSummary, interval * 1000);
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
   * highlightHandler
   * @param {Object} event - a native JS event
   * @param {string} id - the highlight id
   * @param {string} team - team alignment
   */
  highlightHandler(event, id, team) {
    const {
      props: { data: { homeData, awayData } },
    } = this;
    event.preventDefault();
    if (isValidArray(homeData) || isValidArray(awayData)) {
      const newActiveHighlight = homeData.find(datum => datum.id === id)
        || awayData.find(datum => datum.id === id);
      this.setState({
        activeTeam: team,
        activeHighlight: newActiveHighlight,
      });
    }
  }

  /**
   * render method
   * @returns {?JSX}
   */
  render() {
    const {
      props: { data, settings, widgetContext: { isWorldCupMVP } },
      state: { activeTeam, activeHighlight },
      context,
    } = this;
    let period = '1';
    const hasData = this.constructor.hasData(data);
    if (!hasData) {
      return null;
    }
    if (context?.setNavigationItem) {
      context.setNavigationItem(soccerMatchNavDefinitions.SUMMARY);
    }

    if (isValidArray(data?.timelineData)) {
      period = `${data.timelineData[data.timelineData.length - 1]?.periodTime}`;
    }
    return (
      <>
        <div className="uvs-widget row">
          <StatWrapper>
            <TitleWrapper isTudn>
              <WidgetTitle
                isTudn
                isLowerCase={isWorldCupMVP}
                fontColor={isWorldCupMVP && DEEP_SEA}
              >
                {localization.get('matchSummary')}
              </WidgetTitle>
            </TitleWrapper>
            <SummaryMatch
              {...data}
              {...this.constructor.settings}
              className={Styles.wrapper}
              title={false}
              isTudn
              activeTeam={activeTeam}
              activeHighlight={activeHighlight}
              highlightLinkHandler={this.highlightHandler}
              useWebFont
              isMobile={this.isMobile}
              period={period}
              isWorldCupMVP={isWorldCupMVP}
            />
          </StatWrapper>
        </div>
        <AdProxy className="uvs-ad-widget" {...settings?.widgetAd} />
      </>
    );
  }
}

MatchSummary.propTypes = {
  data: PropTypes.shape({
    isTudn: PropTypes.bool,
    outcomeType: PropTypes.string,
    minutesElapsed: PropTypes.string,
    timelineData: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        time: PropTypes.number,
        actionName: PropTypes.oneOf(['goal', 'yellowCard', 'redCard', 'playerSubstitution']),
        periodTime: PropTypes.number,
      })
    ),
    homeName: PropTypes.shape({
      id: PropTypes.string,
      fullName: PropTypes.string,
      abbreviatedName: PropTypes.string,
      imageURI: PropTypes.string,
    }).isRequired,
    awayName: PropTypes.shape({
      id: PropTypes.string,
      fullName: PropTypes.string,
      abbreviatedName: PropTypes.string,
      imageURI: PropTypes.string,
    }),
    homeData: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        tagName: PropTypes.string.isRequired,
        actionName: PropTypes.string.isRequired,
        hasTime: PropTypes.bool,
        minute: PropTypes.string,
        periodTime: PropTypes.number,
      })
    ),
    awayData: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        tagName: PropTypes.string.isRequired,
        actionName: PropTypes.string.isRequired,
        hasTime: PropTypes.bool,
        minute: PropTypes.string,
        periodTime: PropTypes.number,
      })
    ),
  }),
  device: PropTypes.string,
  interval: PropTypes.number,
  settings: PropTypes.shape({
    widgetAd: PropTypes.shape({
      type: PropTypes.string,
    }),
  }),
  // Redux callback
  getSummary: PropTypes.func,
  widgetContext: {},
};

MatchSummary.defaultProps = {
  interval: 90,
  widgetContext: PropTypes.shape({
    isWorldCupMVP: PropTypes.bool,
  }),
};

MatchSummary.contextType = SoccerMatchNavContext;

export default MatchSummary;
