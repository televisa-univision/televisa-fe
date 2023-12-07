import { connect } from 'react-redux';

import { fetchLocalMarketContent } from '@univision/fe-commons/dist/store/actions/local/local-actions';
import {
  currentMarketByLocationSelector,
  contentByLocationSelector,
} from '@univision/fe-commons/dist/store/selectors/local-selectors';

import LinksList from './LinksList';

/**
 * Object or function to be merged into component props
 * @returns {Object}
 */
export const mapDispatchToProps = {
  fetchLocalMarket: fetchLocalMarketContent,
};

/**
 * Connector to subscribe to local market content
 * @param {Object} state - page state
 * @param {Object} ownProps - component props
 * @returns {Object}
 */
const mapStateToProps = (state, ownProps) => {
  const contents = contentByLocationSelector(state);
  const { widgetContext } = ownProps;

  return {
    contents,
    widgetContext,
    localMarket: currentMarketByLocationSelector(state),
    ...ownProps,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LinksList);
