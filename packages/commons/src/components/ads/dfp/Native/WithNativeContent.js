import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import isEqual from '@univision/fe-utilities/helpers/common/isEqual';
import getKey from '@univision/fe-utilities/helpers/object/getKey';

import { wasNativeAddCalledSelector, isNativeAdEmptySelector } from '../../../../store/selectors/ads-selectors';
import Store from '../../../../store/store';
import { getPageData } from '../../../../store/storeHelpers';
import * as Actions from '../../../../store/actions/ads-actions';
import AdSettings from '../../../../utils/ads/adSettings.json';
import adHelpers from '../../../../utils/ads/adHelper';
import { asDeferrer } from '../../../../utils/deferrer';
import DFPAd from '../DFPAd';
import Styles from './WithNativeContent.styles';
import config from '../../../../config/features';

const ContentWrapper = styled.div`
  ${Styles.contentWrapper}
`;

/**
 * HOC to add showNative marker
 */
@asDeferrer
class WithNativeContent extends React.Component {
  /**
   * Main constructor
   * @param {Object} props React Props for this component
   * @constructor
   */
  constructor(props) {
    super(props);

    /**
     * Setting of initial state for this component
     * @type {{id: null, device: string}}
     */
    this.state = {
      isLoading: true,
    };
    // To prevent only one ad call per page
    this.adEnabled = false;
    this.newProps = Object.assign({}, this.props);
    this.adBlock = null;
  }

  /**
   * Set loading state to make sure the Ad was loaded.
   */
  componentDidMount() {
    this.setIsLoading(false);
  }

  /**
   *  Dispatches Action to set native ad not
   *  called if native ad in unmounted
   */
  componentWillUnmount() {
    const { setNativeCalled, showNative } = this.props;
    if (showNative) {
      setNativeCalled(false);
    }
  }

  /**
   * Update loading state
   * @param {boolean} isLoading flag
   */
  setIsLoading(isLoading) {
    this.defer(() => { this.setState({ isLoading }); });
  }

  /**
   * Helper to handle display native ad logic
   * @returns {Object}
   */
  displayAd() {
    if (this.adBlock !== null) {
      return this.adBlock;
    }
    // create a flag to call the ad
    // and that guarantee that the ad is been called
    // only one time on the page

    const { isNativeAdCalled, setNativeCalled } = this.props;
    const pageData = getPageData(Store);
    const pageType = getKey(pageData, 'data.type', null);
    const isSectionPage = pageType === 'section';
    const { oneTimeCall, adType } = this.props;

    if (
      !config.content.isSensitive(pageData)
      && (this.adEnabled
      || (isSectionPage // Limit native ads to section pages only
      && typeof window !== 'undefined'
      && !isNativeAdCalled))
    ) {
      if (oneTimeCall) {
        setNativeCalled(true);
      }
      this.adEnabled = true;
      const adSettings = AdSettings[adType];
      const settings = adHelpers.getSettings(adSettings);
      const widgetName = getKey(this.props, 'widgetContext.name', '').replace(/ - | /g, '');
      const cardType = getKey(this.props, 'widgetContext.metaData.cardType', '');

      this.adBlock = (
        <DFPAd
          {...settings}
          widgetName={widgetName}
          cardType={cardType}
        />
      );

      return this.adBlock;
    }

    return null;
  }

  /**
   * Isolating logic to display content or not when not ad is called
   * @returns {boolean}
   */
  shouldContentDisplay() {
    const { isNativeAdEmpty } = this.props;

    if (this.adEnabled) {
      return isNativeAdEmpty;
    }

    return true;
  }

  /**
   * On initial render will only display the ad
   * then with the callback the desition for native or regular item is made
   * @returns {JSX}
   */
  render() {
    const {
      props: {
        onDevice, actualDevice, showNative, WrappedComponent,
      },
      state: { isLoading },
    } = this;

    if (
      showNative
      // Device need to be added to make sure the ad is called Only One Time
      // in case the ad component is render in different breakpoints like in SixItems
      && onDevice
      && onDevice === actualDevice
    ) {
      return [
        <div key="ad" className="uvn-native-ad">
          {this.displayAd()}
        </div>,
        !isLoading && (
          <ContentWrapper
            key="promoItem"
            className={this.shouldContentDisplay() ? '' : 'uvn-ad-native-item-hidden'}
          >
            <WrappedComponent {...this.newProps} />
          </ContentWrapper>
        ),
      ];
    }
    return <WrappedComponent {...this.newProps} />;
  }
}

/**
 * propTypes
 * @type {{device: children property passed to this component, showNative: boolean}}
 */
WithNativeContent.propTypes = {
  onDevice: PropTypes.string,
  actualDevice: PropTypes.string,
  showNative: PropTypes.bool,
  callback: PropTypes.func,
  adType: PropTypes.string,
  oneTimeCall: PropTypes.bool,
  isNativeAdCalled: PropTypes.bool,
  isNativeAdEmpty: PropTypes.bool,
  setNativeCalled: PropTypes.func,
  WrappedComponent: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.node,
    PropTypes.func,
  ]),
};

WithNativeContent.defaultProps = {
  oneTimeCall: true,
};

/**
 * Connector to be called when state change
 * @param {Object} state of the app
 * @returns {Object}
 */
const mapStateToProps = state => ({
  isNativeAdEmpty: isNativeAdEmptySelector(state),
  isNativeAdCalled: wasNativeAddCalledSelector(state),
});

/**
 * Map app state to local props
 * @param  {function} dispatch redux action
 * @returns {Object} the actions to inject to the component
 */
const mapDispatchToProps = {
  setNativeCalled: Actions.setNativeCalled,
};

/**
 * Check if connector state props are equal
 * @param {Object} nextProps - next react to be applied
 * @param {Object} prevProps - previous react props
 * @returns {boolean}
 */
export const areStatePropsEqual = (nextProps, prevProps) => {
  // this must compare just primitive values, not deep objects
  return isEqual(nextProps, prevProps);
};

export const ConnectedWithNativeContent = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    areStatePropsEqual,
  }
)(WithNativeContent);

/**
 * HOC to call and swipe native ad
 * @param {Object} WrappedComponent to be proxy
 * @returns {React.Component}
 */
export default function WithNativeContentComponent(WrappedComponent) {
  return props => <ConnectedWithNativeContent {...props} WrappedComponent={WrappedComponent} />;
}
