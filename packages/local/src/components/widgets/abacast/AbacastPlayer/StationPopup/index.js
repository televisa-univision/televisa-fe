import React, { Component } from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';

import UforiaIcon from '../UforiaIcon';
import Styles from './StationPopup.scss';

/**
 * StationPopup component for radio player
 */
export class StationPopupComponent extends Component {
  /**
   * Constructor
   * @param {Object} props component props
   */
  constructor(props) {
    super(props);

    this.handleClickOutside = props.onClose;
  }

  /**
   * Render
   * @returns {JSX}
   */
  render() {
    const { children, onClose, title } = this.props;

    return (
      <div className={Styles.popup}>
        <div className={Styles.popupHeader}>
          <strong>{title}</strong>
          <UforiaIcon name="close" onClick={onClose} />
        </div>
        {children}
      </div>
    );
  }
}

StationPopupComponent.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

const EnhancedStationPopup = onClickOutside(StationPopupComponent);

/**
 * Overlay to display with popup
 * @param {Object} props component props
 * @returns {JSX}
 */
const Overlay = props => (
  <div className={Styles.popupOverlay}>
    <EnhancedStationPopup {...props} />
  </div>
);

export default Overlay;
