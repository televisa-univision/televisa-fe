import React from 'react';
import PropTypes from 'prop-types';
import { ReactReduxContext } from 'react-redux';
import { getDevice, getPageData } from '../../../store/storeHelpers';
import dfpManager from '../../../utils/ads/dfpManager';
import { asDeferrer } from '../../../utils/deferrer';
import { getKey, isValidFunction, isValidArray } from '../../../utils/helpers';
import AdWrapper from '../AdWrapper';
import thirdPartyFeatures from '../../../config/features/thirdParties';
import { getAdCountSelector } from '../../../store/selectors/ads-selectors';
import * as Actions from '../../../store/actions/ads-actions';

import Styles from './DFPAd.scss';
import config from '../../../config/features';
import { isVerticalTelevisaByUri } from '../../../utils/header/helpers';

/**
 * DFP Ad component
 * @access public
 * @extends {React.Component}
 */
@asDeferrer
class DFPAd extends React.Component {
  // Assign a contextType to read the redux context to avoid global store import.
  static contextType = ReactReduxContext;

  /**
   * DFP ad generator
   * @param {Object} props React Props for this component
   * @constructor
   */
  constructor(props) {
    super(props);
    /**
     * Setting of initial state for this component
     * @type {{id: ?string}}
     */
    this.state = {
      id: null,
    };
  }

  /**
   * Generate the slot ID and update the component state.
   * This will trigger a second render and the componentDidUpdate function.
   * We need to set the ID on client to avoid a mismatch with SSR ads.
   */
  componentDidMount() {
    // Disabling to allow code on client only
    this.setSlotId();
  }

  /**
   * Wait until we have a valid ID to register the ad slot.
   * The ID is generated in the componentDidMount function.
   * @param {Object} prevProps Previous properties
   * @param {Object} prevState Previous state
   */
  componentDidUpdate(prevProps, prevState) {
    const {
      state: { id },
      props: { onRegisterSlot, refreshable },
    } = this;
    // If there is an ID and we haven't registered it before
    if (
      !thirdPartyFeatures.isDFPDisabled()
      && id
      // validation to allow reusing exiting id: like in nextjs
      // that ads from section to section are not getting unmount
      && (id !== prevState.id || (process.env.APP_VERSION === '2' && !refreshable))
      && this.getSizeMapping()
      && !this.isContentSensitive()
    ) {
      // Let's defer the register of the slot so the main thread can complete
      // any pending paint, redraw, etc
      this.defer(() => {
        dfpManager.registerSlot({ ...this.props, slotID: id });
        if (isValidFunction(onRegisterSlot)) {
          onRegisterSlot(id);
        }
      });
    }
  }

  /**
   * Id generator use randome generator as fallback
   * @returns {string} id
   */
  idGenerator() {
    const store = getKey(this, 'context.store');
    const { position } = this.props;
    const prefix = 'div-gpt-ad';
    if (store) {
      const { site } = getPageData(getKey(this, 'context.store'));
      const order = getAdCountSelector(store.getState()) + 1;
      store.dispatch(Actions.increaseAdCount());

      if (isVerticalTelevisaByUri(site)) {
        return `slot_${order}`;
      }

      return `${prefix}-${position.toLowerCase()}-${order}`;
    }
    return `${prefix}${Math.floor(Math.random() * 10000)}`;
  }

  /**
   * Get content sensitive flag from context
   * @returns {boolean}
   */
  isContentSensitive() {
    if (this.context) {
      const pageData = getPageData(getKey(this, 'context.store'));
      return config.content.isSensitive(pageData);
    }
    return false;
  }

  /**
   * Set slotID to state
   */
  setSlotId() {
    const id = this.idGenerator();
    this.setState({ id });
  }

  /**
   * Get size mapping from device
   * @returns {Object}
   */
  getSizeMapping() {
    let device = 'mobile';
    if (this.context) {
      const { store } = this.context;
      device = getDevice(store);
    }
    const { props: { sizeMapping } } = this;
    if (device && sizeMapping && sizeMapping[device]) {
      return sizeMapping[device];
    }
    return null;
  }

  /**
   * regular ad render
   * @returns {JSX}
   */
  regularAd() {
    // just to avoid server client inconsistency
    let style = Styles.empty;
    let skeleton = null;
    let adMinWidth = 'auto';
    let adMinHeight = 'auto';
    const {
      state: { id },
      props: { hasBg, trackingValue },
    } = this;
    const deviceSizeMapping = this.getSizeMapping();
    if (deviceSizeMapping) {
      style = '';
      const size = deviceSizeMapping[0];
      if (isValidArray(size) && size[1] > 0) {
        [adMinWidth, adMinHeight] = size;
        skeleton = (
          <div
            style={{
              width: size[0],
              height: size[1],
            }}
            className="uvs-skeleton"
          />
        );
      }
    }
    return (
      <AdWrapper className={style} hasBg={hasBg}>
        <div
          id={id}
          style={{
            minWidth: adMinWidth,
            minHeight: adMinHeight,
          }}
          data-tracking-value={trackingValue}
        >
          {skeleton}
        </div>
      </AdWrapper>
    );
  }

  /**
   * special ad render
   * @returns {JSX}
   */
  specialAd() {
    const { id } = this.state;

    return <div id={id} className={Styles.special} />;
  }

  /**
   * regular ad render
   * @returns {JSX}
   */
  renderAd() {
    const { isSpecialAd } = this.props;
    return isSpecialAd ? this.specialAd() : this.regularAd();
  }

  /**
   * On render it returns the ad.
   * The children need to be wrapped in individual divs.
   * @returns {JSX}
   */
  render() {
    return (
      // Passing special ad flag but ignoring native ad since it will be embedded on the widgets
      // so it could be treated as regular ad in a personalization case
      !this.isContentSensitive() && <div>{this.renderAd()}</div>
    );
  }
}

/**
 * propTypes
 * Note: This component will also receive properties from ad setting
 * packages/commons/src/utils/ads/adSettings.json
 * @property {Object} sizeMapping - main ad configuration per device type
 * @property {Object} refreshable - is the current ad refreshable
 * @property {boolean} isSpecialAd - True if should render as special ad for personalization
 * @property {boolean} hasBg - True will render ad with a default background
 * @property {function} onRegisterSlot - callback when register the ad slot, is returns the slot ID
 * @property {string} trackingValue - ad traking value
 */
DFPAd.propTypes = {
  sizeMapping: PropTypes.object,
  refreshable: PropTypes.bool,
  isSpecialAd: PropTypes.bool,
  hasBg: PropTypes.bool,
  onRegisterSlot: PropTypes.func,
  position: PropTypes.string,
  trackingValue: PropTypes.string,
};

/**
 * Default prop values
 * @type {{isSpecialAd: boolean}}
 * @type {{hasBg: boolean}}
 */
DFPAd.defaultProps = {
  isSpecialAd: false,
  hasBg: true,
  position: 'special',
};

export default DFPAd;
