import React from 'react';
import PropTypes from 'prop-types';

import localization from '@univision/fe-commons/dist/utils/localization/deportes';
import { isValidArray, getKey } from '@univision/fe-commons/dist/utils/helpers';
import TVGuidePlaceholder from '@univision/fe-components-base/dist/components/Placeholder/tvGuideCards';
import DateTime from '@univision/shared-components/dist/components/v2/DateTime';
import Store from '@univision/fe-commons/dist/store/store';
import { getDevice } from '@univision/fe-commons/dist/store/storeHelpers';
import TvGuideEvent from '../../base/TvGuideEvent';
import Styles from './Agenda.scss';

/**
 * Today's Agenda component - sample component
 * @access public
 * @extends {React.Component}
 */
class Agenda extends React.PureComponent {
  /**
   * Helper to separate events by day
   * @param {array} events - Events by day
   * @returns {Object}
   */
  static getEventsByDay(events) {
    const eventsByDate = {};
    if (isValidArray(events)) {
      events.forEach((e) => {
        if (e.time) {
          const eDay = new Date(e.time).getDate();
          if (eventsByDate[eDay]) {
            eventsByDate[eDay].push(e);
          } else {
            eventsByDate[eDay] = [e];
          }
        }
      });
      if (Object.keys(eventsByDate).length) {
        return eventsByDate;
      }
    }
    return null;
  }

  /**
   * Helper to isolate events rendering logic
   * @param {array} events - Event list
   * @returns {JSX}
   */
  static renderEventList(events) {
    if (isValidArray(events)) {
      return events.map(event => (
        <TvGuideEvent
          key={`${event.type}-${event.time}`}
          event={event}
        />
      ));
    }
    return null;
  }

  /**
   * Detect mobile
   * @returns {boolean}
   */
  static isMobile() {
    return getDevice(Store) === 'mobile';
  }

  /**
   * Update soccer matches data after component was mount
   * @access public
   */
  componentDidMount() {
    const {
      getAllEvents,
    } = this.props;
    if (typeof getAllEvents === 'function') {
      getAllEvents();
    }
  }

  /**
   * Helper to isolate rendering logic
   * @param {Object} eventsByDate - Events by day
   * @returns {JSX}
   */
  renderEventsByDate(eventsByDate) {
    const today = getKey(this, 'props.date');
    if (today && eventsByDate) {
      const todayDate = new Date(today).getDate();
      if (eventsByDate[todayDate]) {
        return this.constructor.renderEventList(eventsByDate[todayDate]);
      }
      return this.renderEvents(eventsByDate);
    }
    return <div className={Styles.noInfo}>{localization.get('noInfo')}</div>;
  }

  /**
   * Helper to render date
   * @param {string} date - Date to be render
   * @returns {JSX}
   */
  renderDate(date) {
    return (
      <DateTime
        className={Styles.date}
        date={date}
        format={this.constructor.isMobile() ? 'ddd, DD MMM YYYY' : 'dddd, DD [de] MMMM [de] YYYY'}
        capitalize
      />
    );
  }

  /**
   * Events and date list render
   * @param {Object} eventObj - Events collection
   * @returns {JSX}
   */
  renderEvents(eventObj) {
    if (eventObj) {
      const eventKeys = Object.keys(eventObj).sort();
      return eventKeys.map((key) => {
        const firstEventDate = getKey(eventObj, [key, 0, 'date']);
        return (
          <div>
            {firstEventDate && this.renderDate(firstEventDate)}
            {this.constructor.renderEventList(eventObj[key])}
          </div>
        );
      });
    }
    return null;
  }

  /**
   * Render method
   * @returns {JSX}
     */
  render() {
    const {
      events,
      ready,
    } = this.props;
    const eventsByDate = this.constructor.getEventsByDay(events);
    return (
      <div className="uvs-widget">
        <div>
          {!ready
            ? <TVGuidePlaceholder />
            : this.renderEventsByDate(eventsByDate)}
        </div>
      </div>
    );
  }
}

Agenda.propTypes = {
  getAllEvents: PropTypes.func,
  ready: PropTypes.bool,
  events: PropTypes.array,
};

export default Agenda;
