import { connect } from 'react-redux';
import { getKey } from '@univision/fe-commons/dist/utils/helpers';
import {
  fetchPageData,
} from '@univision/fe-commons/dist/store/actions/page-actions';
import SpaShellContainer from './SpaShellContainer';

/**
 * Connector to be called when state change
 * @param {Object} state of the page
 * @param {Object} ownProps of the page
 * @returns {{page: Object}}
 */
export const mapStateToProps = (state, ownProps) => {
  return {
    page: getKey(ownProps, 'page') || getKey(state, 'page', {}),
  };
};

/**
 * Object or function to be merged into component props
 * @param {Object} dispatch of redux
 * @returns {{fetchPageData: Function}}
 */
export const mapDispatchToProps = {
  fetchPageData,
};

/**
 * Check to mount only when page uri changes and the initiator is a SPA transition.
 * ****** DO NOT DELETE ******
 * Without this break there will be infinite loops
 * because other components affecting the Store
 * @param {Object} nextProps to be applied
 * @param {Object} prevProps to be applied
 * @returns {boolean}
 */
export const areStatePropsEqual = (nextProps, prevProps) => {
  return prevProps.page.navigationCount === nextProps.page.navigationCount
    || nextProps.page.initiator !== 'spa'; // We only care about changes initiated by a SPA navigation
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    areStatePropsEqual,
  }
)(SpaShellContainer);
