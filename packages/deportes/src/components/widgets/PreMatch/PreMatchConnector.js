import { connect } from 'react-redux';
import getScheduleEvent from '@univision/fe-commons/dist/store/actions/deportes/scheduleResults-actions';
import { getWidgetById } from '@univision/fe-commons/dist/store/storeHelpers';
import {
  exists, getKey, isEqual, isValidObject,
} from '@univision/fe-commons/dist/utils/helpers';
import preMatchExtractor from '@univision/shared-components/dist/extractors/preMatchExtractor';
import PreMatch from '.';

/**
 * Connector to be called when state change
 * @param {Object} state of the page
 * @param {Object} ownProps properties
 * @returns {{standings: Object}}
 */
const mapStateToProps = (state, ownProps) => {
  const { settings } = ownProps;
  const widget = exists(settings.uid) && getWidgetById(state.page, settings.uid);
  let data = {};

  if (widget) {
    data = widget.extraData;
  }
  return {
    data,
  };
};

/**
 * Check if shouldn't set new props if the data is equal or the previous
 * data is not a error
 * @param {Object} nextProps the new prop data
 * @param {Object} prevProps the previous prop data
 * @returns {boolean}
 */
const areStatePropsEqual = (nextProps, prevProps) => {
  const prevData = getKey(prevProps, 'data') || {};
  const nextData = getKey(nextProps, 'data') || {};

  return (
    !isValidObject(nextData) || (nextData.error && !prevData.error) || isEqual(nextData, prevData)
  );
};

/**
 * Object or function to be merged into component props
 * @param {Object} dispatch of redux
 * @param {Object} ownProps properties
 * @returns {{matches: Array}}
 */
const mapDispatchToProps = (dispatch, ownProps) => {
  return { getPreMatch: () => dispatch(getScheduleEvent(ownProps, preMatchExtractor)) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    pure: true,
    areStatePropsEqual,
  }
)(PreMatch);
