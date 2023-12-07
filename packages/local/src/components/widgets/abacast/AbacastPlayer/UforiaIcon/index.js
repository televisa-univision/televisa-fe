import React, { Component } from 'react';
import PropTypes from 'prop-types';

import chevronDown from '@univision/fe-commons/dist/assets/icons/uforia/chevronDown.svg';
import chevronUp from '@univision/fe-commons/dist/assets/icons/uforia/chevronUp.svg';
import close from '@univision/fe-commons/dist/assets/icons/uforia/close.svg';
import contact from '@univision/fe-commons/dist/assets/icons/uforia/contact.svg';
import more from '@univision/fe-commons/dist/assets/icons/uforia/more.svg';
import pause from '@univision/fe-commons/dist/assets/icons/uforia/pause.svg';
import play from '@univision/fe-commons/dist/assets/icons/uforia/play.svg';
import radio from '@univision/fe-commons/dist/assets/icons/uforia/radio.svg';
import share from '@univision/fe-commons/dist/assets/icons/uforia/share.svg';
import thumbDown from '@univision/fe-commons/dist/assets/icons/uforia/thumbDown.svg';
import thumbUp from '@univision/fe-commons/dist/assets/icons/uforia/thumbUp.svg';
import volumeHigh from '@univision/fe-commons/dist/assets/icons/uforia/volumeHigh.svg';
import volumeLow from '@univision/fe-commons/dist/assets/icons/uforia/volumeLow.svg';
import volumeOff from '@univision/fe-commons/dist/assets/icons/uforia/volumeOff.svg';

import Button from '@univision/fe-components-base/dist/components/Button';

import Styles from './UforiaIcon.scss';

const icons = {
  chevronDown,
  chevronUp,
  close,
  contact,
  more,
  pause,
  play,
  radio,
  share,
  thumbDown,
  thumbUp,
  volumeHigh,
  volumeLow,
  volumeOff,
};

/**
 * Uforia Icon component
 */
class UforiaIcon extends Component {
  /**
   * Constructor
   */
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * Handle icon click
   * @param {Object} evt the event object
   */
  handleClick(evt) {
    evt.stopPropagation();

    const { openKey, onClick } = this.props;

    onClick(openKey);
  }

  /**
   * Render
   * @returns {JSX}
   */
  render() {
    const { name, size, ...rest } = this.props;

    return (
      <Button {...rest} onClick={this.handleClick} className={Styles.icon}>
        <img
          src={icons[name]}
          alt={name}
          style={{
            width: `${size}px`,
            height: `${size}px`,
          }}
        />
      </Button>
    );
  }
}

UforiaIcon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  onClick: PropTypes.func,
  openKey: PropTypes.string,
};

UforiaIcon.defaultProps = {
  size: 16,
};

export default UforiaIcon;
