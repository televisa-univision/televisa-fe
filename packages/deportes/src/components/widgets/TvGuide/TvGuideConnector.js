import { connect } from 'react-redux';
import {
  getAllEvents,
  setDate,
  setChannel,
  setContent,
} from '@univision/fe-commons/dist/store/actions/tvguide/all-actions';
import { getKey, isEqual, isValidArray } from '@univision/fe-commons/dist/utils/helpers';
import { SPORT } from '@univision/fe-commons/dist/constants/tvGuide';
import sportActionDefinition from '../../../utils/helpers/tvGuide/sportActionDefinition';
import showsActionDefinition from '../../../utils/helpers/tvGuide/showsActionDefinition';
import udnActionDefinition from '../../../utils/helpers/tvGuide/udnActionDefinition';
import { filterHandler } from '../../base/FilterTabMenu/helper';
import { isLive } from '../../../utils/helpers';
import TvGuide from '.';

/**
 * Helper to order events by time
 * @param {array} events - List of events
 * @returns {array}
 */
const sortEvents = (events) => {
  if (isValidArray(events)) {
    const sortedArray = [...events];
    return sortedArray.sort((a, b) => {
      return a.time - b.time;
    });
  }
  return [];
};

/**
 * Helper to prioritize sport card vs show if both share the same time.
 * @param {Object} event - event to filter
 * @param {string} contentType - content type
 * @returns {boolean}
 */
const prioritizeSportCard = (event, contentType) => {
  if (event.type === 'sport') {
    return filterHandler(event, contentType);
  }
  return false;
};

/**
 * Helper to filter events by contentType
 * @param {Object} state of the page
 * @returns {array}
 */
const filterEvents = (state) => {
  const events = getKey(state, 'tvGuide.events');
  const ready = getKey(state, 'tvGuide.ready');
  const contentType = getKey(state, 'tvGuide.contentType');
  if (ready && isValidArray(events)) {
    let listEvents = [];
    const today = new Date();
    let nextCard = -1;
    listEvents = sortEvents(events).filter((event, index, array) => {
      const after = index + 1;
      const currentDate = new Date(event.time);
      const isShowLive = event.type === SPORT ? isLive(event.date, 120)
        : isLive(event.time, event.d);
      // If today, there is an event before the current time, don't add it.
      if (today.getDate() === currentDate.getDate()
      && !(isShowLive || event.isLive || today < currentDate)) {
        return false;
      }
      // if the previous priorizeSportCard was true, hide the next card
      if (nextCard === index) { nextCard = -1; return false; }
      if (after < array.length
        && array[after].time === event.time
        && array[after].type !== event.type) {
        /* istanbul ignore else */
        if (prioritizeSportCard(event, contentType)) { nextCard = index + 1; }

        return prioritizeSportCard(event, contentType);
      }
      return filterHandler(event, contentType);
    });
    return listEvents;
  }
  return [];
};

/**
 * Hepler to register and validate actions
 * @returns {Array}
 */
const registerActions = () => {
  const actions = [];
  if (showsActionDefinition.action()) {
    actions.push(showsActionDefinition.action);
  }
  if (sportActionDefinition.action()) {
    actions.push(sportActionDefinition.action);
  }
  if (udnActionDefinition.action()) {
    actions.push(udnActionDefinition.action);
  }
  return actions;
};

/**
 * Connector to be called when state change
 * @param {Object} state of the page
 * @param {Object} ownProps properties
 * @returns {{standings: Object}}
 */
const mapStateToProps = (state, ownProps) => {
  return {
    ...getKey(state, 'tvGuide', {}),
    ...ownProps,
    events: filterEvents(state),
  };
};

/**
 * Object or function to be merged into component props
 * @param {Object} dispatch of redux
 * @param {Object} ownProps properties
 * @returns {{matches: Array}}
 */
const mapDispatchToProps = (dispatch) => {
  return ({
    getAllEvents: () => {
      return dispatch(getAllEvents(registerActions()));
    },
    setDate: date => dispatch(setDate(date)),
    setChannel: channel => dispatch(setChannel(channel)),
    setContent: contentType => dispatch(setContent(contentType)),
  });
};

/**
 * Check if shouldn't set new props if the data is equal or the previous
 * data is not a error
 * @param {Object} nextProps the new prop data
 * @param {Object} prevProps the previous prop data
 * @returns {boolean}
 */
const areStatePropsEqual = (nextProps, prevProps) => {
  const nextFlag = getKey(nextProps, 'ready');
  const prevFlag = getKey(prevProps, 'ready');
  const nextContent = getKey(nextProps, 'contentType');
  const prevContent = getKey(prevProps, 'contentType');
  // should returns false to rerender;
  return isEqual(nextFlag, prevFlag) && !nextProps.ready && isEqual(nextContent, prevContent);
};

const connector = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    pure: true,
    areStatePropsEqual,
  }
)(TvGuide);

export {
  connector as default,
  mapDispatchToProps,
  mapStateToProps,
  sortEvents,
  prioritizeSportCard,
  filterEvents,
  areStatePropsEqual,
  registerActions,
};
