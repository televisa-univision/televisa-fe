import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import throttle from 'lodash.throttle';

import Icon from '@univision/fe-icons/dist/components/Icon';
import Button from '@univision/fe-components-base/dist/components/Button';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import {
  exists,
  isValidArray,
  getKey,
  hasKey,
  isInViewport,
} from '@univision/fe-commons/dist/utils/helpers';
import Store from '@univision/fe-commons/dist/store/store';
import { getTheme, getPageData } from '@univision/fe-commons/dist/store/storeHelpers';
import Styles from './ClosedCaptions.scss';

/**
 * Closed captions
 */
class ClosedCaptions extends React.Component {
  /**
   * Constructor
   * @param {Object} props Properties of the component
   */
  constructor(props) {
    super(props);

    this.state = {
      captionsOpen: false,
      showCloseButton: false,
    };

    this.variant = getKey(getTheme(Store), 'variant');
    this.mcpId = getKey(getPageData(Store), 'data.mcpid');
    this.wrapperElem = React.createRef();
    this.closeElem = React.createRef();
    this.toggleCaptionsElem = React.createRef();
    this.showCloseButton = throttle(this.showCloseButton.bind(this), 100);
  }

  /**
   * lifeCycle method
   */
  componentDidMount() {
    window.addEventListener('scroll', this.showCloseButton);
  }

  /**
   * Remove event listeners
   */
  componentWillUnmount() {
    document.removeEventListener('scroll', this.showCloseButton);
  }

  /**
   * Display close button if the toggle button is hidden
   */
  showCloseButton = () => {
    if (hasKey(this.toggleCaptionsElem, 'current')) {
      const { bottom } = this.toggleCaptionsElem.current.getBoundingClientRect();
      this.setState({
        showCloseButton: !isInViewport(this.toggleCaptionsElem.current, 0, bottom),
      });
    }
  }

  /**
   * Positions close button inside the captions wrapper
   */
  positionCloseButton = () => {
    if (hasKey(this.wrapperElem, 'current')) {
      const position = this.wrapperElem.current.getBoundingClientRect();
      const { right } = position;

      if (hasKey(this.closeElem, 'current')) {
        const left = right - 40;
        this.closeElem.current.style.left = `${left}px`;
      }
    }
  }

  /**
   * Toggles the captions text
   */
  toggleCaptions = () => {
    const { captionsOpen } = this.state;

    this.setState({ captionsOpen: !captionsOpen }, () => {
      if (!captionsOpen) {
        this.positionCloseButton();
      }
    });
  }

  /**
   * Closes captions box and scrolls to the top
   */
  closeCaptions = () => {
    window.scrollTo({ top: 0 });
    this.setState({ captionsOpen: false });
  }

  /**
   * Renders closed captions component
   * @returns {JSX}
   */
  render() {
    const { captions, mcpId } = this.props;
    const { captionsOpen, showCloseButton } = this.state;

    if (isValidArray(captions) && exists(this.mcpId) && this.mcpId === mcpId) {
      const parsedCaptions = captions.map((caption) => {
        return `${(getKey(caption, 'content') || '').toLowerCase()}`;
      });
      const fillColor = this.variant === 'dark' ? '#a2a2a2' : '#808080';

      return (
        <Fragment>
          <div ref={this.closeElem} className={Styles.closeContainer}>
            {showCloseButton && captionsOpen && (
              <Button
                onClick={this.closeCaptions}
                className={`${Styles.captionsClose} ${Styles[`captionsClose_${this.variant}`]}`}
                ref={this.closeElem}
                plain
              >
                <Icon name="arrowUp" size="small" fill={this.variant === 'dark' ? '#000' : '#fff'} />
              </Button>
            )}
          </div>
          <div
            ref={this.wrapperElem}
            className={
              classnames(
                Styles[`Captions_${this.variant}`],
                Styles.CaptionsWrapper,
                { [Styles.WrapperOpen]: captionsOpen }
              )}
          >
            <div className={Styles.CaptionsButtonWrapper} ref={this.toggleCaptionsElem}>
              <Button
                onClick={this.toggleCaptions}
                className={`${Styles.CaptionsButton} ${Styles[`Captions_${this.variant}`]}`}
              >
                <Icon name="closedCaption" fill={fillColor} />
                { captionsOpen ? localization.get('hideTranscript') : localization.get('readTranscript') }
                <Icon size="small" name={captionsOpen ? 'arrowUp' : 'arrowDown'} fill={fillColor} />
              </Button>
            </div>
            <p className={classnames('uvs-font-a-light', { [Styles.CaptionsContent]: captionsOpen })}>
              { parsedCaptions.map(caption => (
                <span key={caption} className={Styles.CaptionLine}>{caption}</span>
              ))}
            </p>
          </div>
        </Fragment>
      );
    }

    return null;
  }
}

/**
 * ClosedCaptions proptypes
 * @param {Array} captions array of closed captions
 * @param {String} mcpId current video id
 */
ClosedCaptions.propTypes = {
  captions: PropTypes.array,
  mcpId: PropTypes.string,
};

export default ClosedCaptions;
