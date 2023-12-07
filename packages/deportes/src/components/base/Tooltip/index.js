import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Styles from './Tooltip.scss';

/**
 * Tooltip component
 */
class Tooltip extends Component {
  /**
   * Setup the state
   * @param {Object} props for this component
   */
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  /**
   * handle mouse enter
   */
  handleMouseEnter() {
    this.setState(({ isVisible }) => ({
      isVisible: !isVisible,
    }));
  }

  /**
   * handle mouse leave
   */
  handleMouseLeave() {
    this.setState(({ isVisible }) => ({
      isVisible: !isVisible,
    }));
  }

  /**
   * render the component
   * @returns {JSX}
   */
  render() {
    const { props: { children, label }, state: { isVisible } } = this;
    const isVisibleStatus = isVisible ? Styles.active : Styles.notActive;
    const className = `${Styles.tooltip} ${isVisibleStatus}`;

    return (
      <div
        className={className}
        onMouseEnter={() => this.handleMouseEnter()}
        onMouseLeave={() => this.handleMouseLeave()}
      >
        <span className={`uvs-font-a-bold ${Styles.tooltipLabel}`}>{label}</span>
        {children}
      </div>
    );
  }
}

Tooltip.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default Tooltip;
