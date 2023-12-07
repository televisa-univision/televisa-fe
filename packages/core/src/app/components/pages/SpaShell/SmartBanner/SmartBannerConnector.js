import { connect } from 'react-redux';
import SmartBanner from '@univision/fe-components-base/dist/components/widgets/SmartBanner';
import { getSmartBannerData } from '@univision/fe-commons/dist/utils/smartapp';
import { isEqual } from '@univision/fe-commons/dist/utils/helpers';

/**
 * map app state to local props
 * @param  {Object} state the state from app store
 * @returns {Object} the props to inject to the component
 */
export const mapStateToProps = ({ page }) => ({
  ...getSmartBannerData(page),
});

/**
 * Check if shouldn't set new props to the component if
 * the current and the new one are equals
 * @param {Object} nextProps the new prop data
 * @param {Object} prevProps the previous prop data
 * @returns {boolean}
 */
export const areStatePropsEqual = (nextProps, prevProps) => {
  return isEqual(prevProps, nextProps);
};

export default connect(
  mapStateToProps,
  null,
  null,
  {
    pure: true,
    areStatePropsEqual,
  }
)(SmartBanner);
