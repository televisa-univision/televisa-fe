import { connect } from 'react-redux';
import getTeams from '@univision/fe-commons/dist/store/actions/deportes/teamsGrid-actions';
import { getWidgetById } from '@univision/fe-commons/dist/store/storeHelpers';
import { exists, getKey } from '@univision/fe-commons/dist/utils/helpers';

import teamsExtractor from '@univision/shared-components/dist/extractors/teamsExtractor';
import TeamsGrid from '.';

/**
 * Connector to be called when state change
 * @param {Object} state of the page
 * @param {Object} ownProps properties
 * @returns {{teams: Object}}
 */
const mapStateToProps = (state, ownProps) => {
  const { settings } = ownProps;
  const widget = exists(settings.uid) && getWidgetById(state.page, settings.uid);
  const teams = getKey(widget, 'extraData', {});

  return {
    teams,
  };
};

/**
 * Object or function to be merged into component props
 * @param {Object} dispatch of redux
 * @param {Object} ownProps properties
 * @returns {{getTeams: Function}}
 */
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getTeams: () => (
      dispatch(getTeams(ownProps, teamsExtractor))
    ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamsGrid);
