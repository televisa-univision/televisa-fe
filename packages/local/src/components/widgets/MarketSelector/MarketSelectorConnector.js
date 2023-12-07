import { connect } from 'react-redux';
import {
  deviceSelector,
  isMarketSelectorOpenSelector,
  hasAdSkinSelector,
} from '@univision/fe-commons/dist/store/selectors/page-selectors';
import { fetchLocalMarketContent, setCurrentMarketByLocation } from '@univision/fe-commons/dist/store/actions/local/local-actions';
import { currentMarketByLocationSelector } from '@univision/fe-commons/dist/store/selectors/local-selectors';

import {
  setMarketSelectorClosed,
  setMarketSelectorOpen,
} from '@univision/fe-commons/dist/store/actions/header/header-actions';

import MarketSelector from '.';

/**
 * Map stat to props for component
 * @param {Object} state of the page
 * @param {Object} ownProps component props
 * @returns {Object}
 */
const mapStateToProps = (state, ownProps) => ({
  isDesktop: deviceSelector(state) === 'desktop',
  isMarketSelectorOpen: isMarketSelectorOpenSelector(state),
  localMarket: currentMarketByLocationSelector(state),
  hasAdSkin: hasAdSkinSelector(state),
  ...ownProps,
});

/**
 * Connector to be called for dispatch actions
 * @param {Object} dispatch method of the state
 * @returns {Object}
 */
const mapDispatchToProps = {
  fetchLocalMarketContent,
  setCurrentMarketByLocation,
  setMarketSelectorClosed,
  setMarketSelectorOpen,
};

export default connect(mapStateToProps, mapDispatchToProps)(MarketSelector);
