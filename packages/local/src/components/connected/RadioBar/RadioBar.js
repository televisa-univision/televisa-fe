import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Toolbar from '../../compound/Toolbar/Toolbar';

/**
 * RadioBar Animations
 */
class RadioBar extends Component {
  /**
   * Set up initial component state
   * @param {Object} props Properties
   */
  constructor(props) {
    super();
    /**
     * Local State for this component
     * @type {Object}
     */
    this.state = {
      visible: props.visible,
    };

    // This binding is necessary to make `this` work in the callback
    this.listenScrollEvent = this.listenScrollEvent.bind(this);
  }

  /**
   * Items for after Component mount
   */
  componentDidMount() {
    window.addEventListener('scroll', this.listenScrollEvent);
  }

  /**
   * Items for before Component mount
   */
  componentWillUnmount() {
    window.removeEventListener('scroll', this.listenScrollEvent);
  }

  /**
   * Items for before Component mount
   */
  listenScrollEvent() {
    const { props: { topOffset }, state: { visible } } = this;
    const clientRect = window.document.body.getBoundingClientRect();

    if (clientRect.top <= -topOffset) {
      if (!visible) {
        this.setState({ visible: true });
      }
    } else {
      this.setState({ visible: false });
    }
  }

  /**
   * Wrapper module to prepare RadioBar Settings
   * @returns {JSX}
   */
  render() {
    const { visible } = this.state;
    const {
      type, sharingOptions, theme, device, pageData,
    } = this.props;

    return (
      <div className="uvn-radiobar">
        <Toolbar
          isContentPage={type !== 'radio'}
          visible={visible}
          type={type}
          theme={theme}
          sharingOptions={sharingOptions}
          device={device}
          pageData={pageData}
        />
      </div>
    );
  }
}

/**
 * propTypes
 * @property {Number} topOffset to clear header sizes
 * @property {String} type the type of toolbar to be displayed
 */
RadioBar.propTypes = {
  topOffset: PropTypes.number,
  type: PropTypes.string,
  sharingOptions: PropTypes.object,
  theme: PropTypes.object,
  device: PropTypes.string,
  pageData: PropTypes.object,
  visible: PropTypes.bool,
};

RadioBar.defaultProps = {
  topOffset: 100,
  visible: false,
};

export default RadioBar;
