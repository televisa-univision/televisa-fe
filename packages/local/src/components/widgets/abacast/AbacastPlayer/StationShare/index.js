import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BackgroundImage from '@univision/fe-components-base/dist/components/BackgroundImage';
import Link from '@univision/fe-components-base/dist/components/Link';
import Icon from '@univision/fe-icons/dist/components/Icon';
import { getKey } from '@univision/fe-commons/dist/utils/helpers';
import getRenditionUrl from '@univision/fe-commons/dist/utils/images/renditions';
import radioRatios from '@univision/fe-commons/dist/utils/images/ratios/radio';
import shareButtonDataHelper from '@univision/fe-components-base/dist/components/ShareButton/shareButtonDataHelper';
import StationPopup from '../StationPopup';
import Styles from './StationShare.scss';

/**
 * Station share component
 */
class StationShare extends Component {
  /**
   * Constructor
   */
  constructor() {
    super();

    this.handleCopy = this.handleCopy.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  /**
   * Copy the link to the clipboard
   * @param {Event} event JS event.
   */
  handleCopy(event) {
    const { uri, onShare } = this.props;

    const element = document.createElement('textarea');

    element.value = uri;

    // Prevent keyboard from showing on mobile
    element.setAttribute('readonly', '');

    element.style.contain = 'strict';
    element.style.position = 'absolute';
    element.style.left = '-9999px';
    element.style.fontSize = '12pt'; // Prevent zooming on iOS

    const selection = document.getSelection();
    let originalRange = false;

    if (selection.rangeCount > 0) {
      originalRange = selection.getRangeAt(0);
    }

    document.body.append(element);
    element.select();

    // Explicit selection workaround for iOS
    element.selectionStart = 0;
    element.selectionEnd = uri.length;

    document.execCommand('copy');

    element.remove();

    if (originalRange) {
      selection.removeAllRanges();
      selection.addRange(originalRange);
    }

    if (typeof onShare === 'function') {
      onShare(event);
    }
  }

  /**
   * Handle close
   */
  handleClose() {
    const { onClose } = this.props;
    onClose('stationShare');
  }

  /**
   * Render
   * @returns {JSX}
   */
  render() {
    const {
      description, image, sharingOptions, title, onShare,
    } = this.props;

    const overrideImageUrl = getRenditionUrl(getKey(image, 'renditions.original', {}), radioRatios['1:1-sm']);
    return (
      <StationPopup onClose={this.handleClose} title="Share">
        <div className={Styles.share}>
          <BackgroundImage
            className={Styles.image}
            image={image}
            overrideImageUrl={overrideImageUrl}
          />
          <div className={Styles.shareLinks}>
            <Link {...shareButtonDataHelper('facebook', sharingOptions)} onClick={onShare} data-share="facebook">
              <Icon name="facebookLegacy" size="xsmall" />
              Facebook
            </Link>
            <Link {...shareButtonDataHelper('twitter', sharingOptions)} onClick={onShare} data-share="twitter">
              <Icon name="twitterLegacy" size="xsmall" />
              Twitter
            </Link>
            <button onClick={this.handleCopy} data-share="copylink">
              <Icon name="link" size="xsmall" />
              Copy link
            </button>
          </div>
          <div className={Styles.stationInfo}>
            <strong>{title}</strong>
            <p>{description}</p>
          </div>
        </div>
      </StationPopup>
    );
  }
}

StationShare.propTypes = {
  description: PropTypes.string,
  image: PropTypes.object,
  onShare: PropTypes.func,
  onClose: PropTypes.func.isRequired,
  sharingOptions: PropTypes.object,
  title: PropTypes.string,
  uri: PropTypes.string,
};

StationShare.defaultProps = {
  sharingOptions: {},
};

export default StationShare;
