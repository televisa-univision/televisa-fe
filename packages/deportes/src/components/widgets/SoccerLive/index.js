import React from 'react';
import PropTypes from 'prop-types';

import createTimer from '@univision/fe-commons/dist/utils/timer';
import { isValidFunction } from '@univision/fe-commons/dist/utils/helpers';

import SoccerLiveGroups from './SoccerLiveGroups';
import SoccerLivePlaceholder from './SoccerLivePlaceholder';
import EndedMatchesToogle from './ShowEndedMatchesButton';

/**
 * Filter events by non ended matches
 * @param {boolean} showEndedMatches wheather or not filter show ended matches
 * @returns {Function}
 */
const createEventsFilter = (showEndedMatches) => {
  if (!showEndedMatches) {
    return event => event.status !== 'post';
  }

  return () => true;
};

/**
 * Soccer live events components
 * @access public
 * @extends {React.PureComponent}
 */
class SoccerLive extends React.PureComponent {
  state = {
    showEndedMatches: false,
  };

  /**
   * DFP ad generator
   * @param {Object} props React Props for this component
   * @constructor
   */
  constructor(props) {
    super(props);
    this.handleEndedMatchesToogle = this.handleEndedMatchesToogle.bind(this);
  }

  /**
   * Update soccer matches data after component was mount
   * @access public
   */
  componentDidMount() {
    const {
      getAllEvents,
    } = this.props;
    if (isValidFunction(getAllEvents)) {
      getAllEvents();

      // Get all events every ninety minutes.
      this.timer = createTimer(90, getAllEvents);
    }
  }

  /**
   * When the component is about to be unmounted
   * remove the timer just if exists.
   * @access public
   */
  componentWillUnmount() {
    if (this.timer) {
      this.timer.cancel();
    }
  }

  /**
  * Toogle state to show and hide ended matches.
  */
  handleEndedMatchesToogle() {
    const { showEndedMatches } = this.state;
    this.setState({ showEndedMatches: !showEndedMatches });
  }

  /**
   * Render method
   * @returns {JSX}
   */
  render() {
    const {
      ready,
      eventGroups,
      maxItemsReached,
      isWorldCupMVP,
    } = this.props;
    const { showEndedMatches } = this.state;
    const hasEndedMatches = eventGroups.some(
      eventGroup => eventGroup.events.some(event => event.status === 'post')
    );

    const toogleElement = maxItemsReached && hasEndedMatches ? (
      <EndedMatchesToogle
        onToogle={this.handleEndedMatchesToogle}
        showEndedMatches={showEndedMatches}
        isWorldCupMVP={isWorldCupMVP}
        isTudn
      />
    ) : null;

    return (
      <div className="uvs-widget">
        {ready && (
          <SoccerLiveGroups
            eventGroups={eventGroups}
            eventsFilter={createEventsFilter(!maxItemsReached || showEndedMatches)}
            showEndedMatchesToogle={toogleElement}
            isWorldCupMVP={isWorldCupMVP}
          />
        )}
        {!ready && <SoccerLivePlaceholder />}
      </div>
    );
  }
}

/**
 * propTypes
 * @param {Function} props.getAllEvents - Dispatches to get all events
 * @param {Object[]} props.eventGroups - Events groups to show
 * @param {boolean} props.maxItemsReached - max items to show at the begining has reached
 * @param {boolean} props.ready - Indicate wheather data is ready or not.
 */
SoccerLive.propTypes = {
  getAllEvents: PropTypes.func,
  eventGroups: PropTypes.array,
  maxItemsReached: PropTypes.bool,
  ready: PropTypes.bool,
  isWorldCupMVP: PropTypes.bool,
};

SoccerLive.defaultProps = {
  ready: false,
  isWorldCupMVP: false,
};

export default SoccerLive;
