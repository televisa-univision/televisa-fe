import { connect } from 'react-redux';
import { getKey } from '@univision/fe-commons/dist/utils/helpers';
import { fetchPageData } from '@univision/fe-commons/dist/store/actions/page-actions';
import SpaShellDummyContainer from './SpaShellDummyContainer';

/**
 * Connector to be called when state change
 * @param {Object} state of the page
 * @returns {{matches: Object}}
 */
export const mapStateToProps = (state) => {
  return {
    page: getKey(state, 'page', {}),
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpaShellDummyContainer);
