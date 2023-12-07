import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import createTimer from '@univision/fe-commons/dist/utils/timer';
import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';
import LineupShared from '@univision/shared-components/dist/components/v2/Lineup';
import AdProxy from '@univision/fe-commons/dist/components/ads/dfp/AdProxy';
import isValidObject from '@univision/fe-utilities/helpers/common/isValidObject';

import soccerMatchNavDefinitions from '../../../utils/layoutWidgets/matchCenter/soccerMatchNavDefinitions';
import SoccerMatchNavContext from '../../base/SoccerMatchNav/SoccerMatchNavContext';

import Styles from './Lineup.styles';

const LINEUP_EVENT = 'lineup_playerclick';

const LineupStyled = styled(LineupShared)`${Styles.lineup}`;

/**
 * A lineup of teams displaying logo name and list of players
 * @param {Object} props The details of the players, lineup and  formation position
 * @param {Object} context react context from parent component
 * @returns {JSX}
 */
class Lineup extends React.PureComponent {
  /**
   * Returns the handler for the player tracking
   * @access public
   */
  static playerHandler() {
    WidgetTracker.track(
      WidgetTracker.events.engagement,
      {
        target: LINEUP_EVENT,
      },
    );
  }

  /**
   * Setup the state
   * @param {Object} props - reacr props for this component
   * @param {Object} context react context from parent component
   */
  constructor(props, context) {
    super(props, context);
    this.timer = 0;
    this.state = {
      activeIndex: 0,
    };
    this.onActiveIndexChange = this.onActiveIndexChange.bind(this);
  }

  /**
   * Update component to show when is mounted
   */
  componentDidMount() {
    const { getLineup } = this.props;
    this.timer = createTimer(60, this.updateLineup);
    if (getLineup) {
      getLineup();
    }
  }

  /**
   * Remove interval
   */
  componentWillUnmount() {
    this.timer.cancel();
  }

  /**
   * Toggle between active teams
   * @param {string} activeIndex for the team to set active
   * @returns {function}
   */
  onActiveIndexChange(activeIndex) {
    return () => {
      this.setState({
        activeIndex,
      });
      WidgetTracker.track(WidgetTracker.events.engagement, { target: 'lineup-team-selector' });
    };
  }

  /**
   * Update lineup data if event is active
   */
  updateLineup = () => {
    const { active, getLineup } = this.props;
    if (active && getLineup) {
      getLineup();
    }
  };

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const {
      props: {
        data, device, settings, widgetContext,
      },
      state: { activeIndex },
      context,
    } = this;
    const { isWorldCupMVP } = widgetContext;
    const isMobile = device === 'mobile';

    if (!isValidObject(data) || data.error) {
      return null;
    }
    if (context?.setNavigationItem) {
      context.setNavigationItem(soccerMatchNavDefinitions.LINEUP);
    }

    return (
      <>
        <div className="uvs-widget lineup-widget row no-gutters">
          <LineupStyled
            lineup={data}
            onActiveIndexChange={this.onActiveIndexChange}
            activeIndex={activeIndex}
            {...this.state}
            layoutType="extended"
            isAbbreviated={isMobile}
            isTudn
            playerOnPress={this.constructor.playerHandler}
            isWorldCupMVP={isWorldCupMVP}
          />
        </div>
        <AdProxy className="uvs-ad-widget" {...settings?.widgetAd} />
      </>
    );
  }
}

/**
 * propTypes
 * @property {string} device - page device from widget factory
 * @property {object} settings - widget settings from definition/factory
 * @property {bool} [settings.widgetAd] - ad options/settings to render inside widget
 * @property {string} [settings.widgetAd.type] - ad type that should be render
 * @property {Object} data - Data for rendering lineup
 * @property {Object} getLineup - function for retrieving lineup data
 * @property {boolean} active - if match is active to fetch new data
 */
Lineup.propTypes = {
  device: PropTypes.string,
  settings: PropTypes.shape({
    widgetAd: PropTypes.shape({
      type: PropTypes.string,
    }),
  }),
  // props from redux
  data: PropTypes.object,
  getLineup: PropTypes.func.isRequired,
  active: PropTypes.bool,
  widgetContext: PropTypes.object,
};

Lineup.defaultProps = {
  data: {},
  active: false,
  widgetContext: PropTypes.shape({
    isWorldCupMVP: PropTypes.bool,
  }),
};

Lineup.contextType = SoccerMatchNavContext;

export default Lineup;
