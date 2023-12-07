import {
  pageUriSelector,
} from '@univision/fe-commons/dist/store/selectors/page-selectors';
import { connect } from 'react-redux';
import WithNativeMarker from '@univision/fe-commons/dist/components/ads/dfp/Native/WithNativeMarker';
import ListEnhancement from '.';

/**
 * Connector to be called when state change
 * @param {Object} state of the app
 * @returns {Object}
 */
const mapStateToProps = state => ({
  currentPageUri: pageUriSelector(state),
});

/**
 * Check if state props are equal
 * @param {Object} nextProps to be applied
 * @param {Object} prevProps to be applied
 * @returns {boolean}
 */
export const areStatePropsEqual = (nextProps, prevProps) => {
  return nextProps.currentPageUri === prevProps.currentPageUri;
};

/**
 * Defines which card the native ad should replace when loaded
 * Lastly, apply Native Ad Marker before export
 */
const nativeAdPosition = 4;

const ConnectedListWidget = connect(
  mapStateToProps,
  null,
  null,
  {
    areStatePropsEqual,
  }
)(ListEnhancement);
const ListWidgetWithNative = WithNativeMarker(ConnectedListWidget, 'content', nativeAdPosition);

export default ListWidgetWithNative;
