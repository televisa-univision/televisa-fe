import React from 'react';
import PropTypes from 'prop-types';

import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import isValidFunction from '@univision/fe-utilities/helpers/common/isValidFunction';
import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';
import SquadLayout from './SquadLayout';

import Styles from './Squad.scss';

const SQUAD_EVENT = 'Plantel_playerclick';
/**
 * Squad component - sample component
 * @access public
 * @extends {React.Component}
 */
class Squad extends React.Component {
  /**
   * the handler for player engagement tracker
   * @access public
   */
  static playerTracker() {
    WidgetTracker.track(
      WidgetTracker.events.engagement, {
        target: SQUAD_EVENT,
      },
    );
  }

  /**
   * Update team roster after component was mount
   * @access public
   */
  componentDidMount() {
    const {
      getSquad,
    } = this.props;
    if (isValidFunction(getSquad)) {
      getSquad();
    }
  }

  /**
   * Render method
   * @returns {JSX}
     */
  render() {
    const {
      roster,
    } = this.props;
    return isValidArray(roster.data) ? (
      <div className={`uvs-widget ${Styles.wrapper}`}>
        {isValidArray(roster.data)
        && roster.data.map(event => (
          <SquadLayout
            key={`${event.key}`}
            data={event}
            isTudn
            playerTracker={this.constructor.playerTracker}
          />
        ))
      }
      </div>
    ) : null;
  }
}

/**
 * propTypes
 * @property {object} roster - the roster team's data
 * @property {function} getSquad - the methods to be called to get team's squad data
 */
Squad.propTypes = {
  getSquad: PropTypes.func,
  roster: PropTypes.object,
};

Squad.defaultProps = {
  roster: {
    data: [],
  },
};

export default Squad;
