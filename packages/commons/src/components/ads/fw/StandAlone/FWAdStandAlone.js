import React from 'react';
import PropTypes from 'prop-types';

import { hasKey, exists } from '../../../../utils/helpers';
import AdSettings from '../../../../utils/ads/adSettings.json';

/**
 * FW Ad StandAlone component
 * Allows these props: (adType, width, height)
 * @access public
 * @extends {React.Component}
 */
export default class FWAdStandAlone extends React.Component {
  /**
   * Helper to build ad iframe src
   * @param {string} adType type of ad to be displayed
   * @param {Object} pageData page api data
   * @returns {XML}
   */
  static getIframeSrc(adType, pageData) {
    if (
      typeof AdSettings[adType] !== 'undefined'
      && exists(pageData)
      && hasKey(pageData, 'data.adSettings.freewheel.sectionId')
    ) {
      let env = 'production';
      if (exists(pageData.env)) {
        ({ env } = pageData);
      }
      if (exists(pageData.data.adSettings.freewheel[env])) {
        // The advertisement env can be overridden using the query string params "mode" or "debug"
        if (hasKey(pageData, 'requestParams')) {
          if (pageData.requestParams.mode === 'test' || pageData.requestParams.debug === 'true') {
            env = 'test';
          } else if (pageData.requestParams.mode === 'prod') {
            env = 'production';
          }
        }

        let device = 'mobile';
        if (exists(pageData.device)) {
          ({ device } = pageData);
        }

        const { sectionId } = pageData.data.adSettings.freewheel;
        const { adValue } = pageData.data.adSettings.freewheel;
        const settings = pageData.data.adSettings.freewheel[env];
        const adTypeSettings = AdSettings[adType];
        let printOptions = '';
        if (Array.isArray(adTypeSettings) && adTypeSettings.length) {
          printOptions = adTypeSettings.join('&');
        }
        return `${settings.host}/ad/g/1?
            nw=${settings.networkCode}&
            prof=${settings.linkTag2Profile}&
            ssid=${device.substring(0, 1)}.${sectionId}&
            resp=ad;
            module=ContentTypeTransform;
            adType=text/javascript;
            tag=${adValue}&
            ${printOptions}`.replace(/ /g, '');
      }
    }
    return null;
  }

  /**
   * FW Ad StandAlone generator
   * @constructor
   */
  constructor() {
    super();
    this.state = {
      iframeSrc: null,
    };
  }

  /**
   * Using didMount to be ensure this fw ad call
   * is made after DFP calls that rely on didMount too
   */
  componentDidMount() {
    const { adType, pageData } = this.props;
    // Disabling to allow code on client only
    /* eslint-disable react/no-did-mount-set-state */
    this.setState({
      iframeSrc: FWAdStandAlone.getIframeSrc(adType, pageData),
    });
  }

  /**
   * On render it returns the ad iframe on client only
   * @returns {JSX}
   */
  render() {
    const {
      state: { iframeSrc },
      props: { width, height },
    } = this;

    if (iframeSrc) {
      const iframeHtml = `<iframe
          style="width:${width}px;height:${height}px;overflow:hidden;border:none;"
          scrolling="no"
          src="${iframeSrc}"
          />`;
      return (
        <div
          dangerouslySetInnerHTML={{ __html: iframeHtml }} // eslint-disable-line react/no-danger
        />
      );
    }
    return null;
  }
}

/**
 * propTypes
 * @type {{adSetting: *}}
 */
FWAdStandAlone.propTypes = {
  adType: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  pageData: PropTypes.object,
};
