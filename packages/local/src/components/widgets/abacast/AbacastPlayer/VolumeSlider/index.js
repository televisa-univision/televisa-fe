/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Styles from './VolumeSlider.scss';

/**
 * VolumeSlider component for AbacastPlayer
 */
class VolumeSlider extends Component {
  /**
   * Handle click
   * @param {Object} evt the event object
   */
  handleClick(evt) {
    evt.stopPropagation();
  }

  /**
   * Render
   * @returns {JSX}
   */
  render() {
    const { volume, onChange } = this.props;

    return (
      <div
        className={Styles.volumeSlider}
        role="button"
        tabIndex="0"
        onClick={this.handleClick}
        onKeyPress={this.handleClick}
      >
        <input type="range" min="0" max="100" value={volume} onChange={onChange} />
        <div
          className={Styles.sliderTrack}
          style={{
            backgroundImage: `linear-gradient(90deg, #fff ${volume}%, #777 0)`,
          }}
        >
          <div
            className={Styles.sliderThumb}
            style={{
              left: `${(volume / 100) * (120 - 8)}px`, // 120px track width - 8px thumb width
            }}
          />
        </div>
      </div>
    );
  }
}

VolumeSlider.propTypes = {
  volume: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default VolumeSlider;
