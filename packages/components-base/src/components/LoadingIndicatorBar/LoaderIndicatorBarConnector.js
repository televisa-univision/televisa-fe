import { connect } from 'react-redux';
import { getKey } from '@univision/fe-commons/dist/utils/helpers';
import LoadingIndicatorBar from '.';

/**
 * Connector to be called when state change
 * @param {Object} state of the page
 * @param {Object} ownProps of the page
 * @returns {{page: Object}}
 */
export const mapStateToProps = (state) => {
  return {
    loading: getKey(state, 'page.loading', false),
  };
};

/**
 * Check to mount only when loading flag change
 * ****** DO NOT DELETE ******
 * Without this break there will be infinite loops
 * because other components affecting the Store
 * @param {Object} nextState to be applied
 * @param {Object} prevState to be applied
 * @returns {boolean}
 */
export const areStatesEqual = (nextState, prevState) => {
  return (
    Boolean(nextState.page.loading) === Boolean(prevState.page.loading)
  );
};

export default connect(
  mapStateToProps,
  null,
  null,
  {
    areStatesEqual,
  }
)(LoadingIndicatorBar);
