import React from 'react';
import PropTypes from 'prop-types';

import isValidFunction from '@univision/fe-utilities/helpers/common/isValidFunction';
import Styles from './Collapsible.scss';

/**
 * Collapsible component for create accordion style
 * @access public
 * @extends {React.Component}
 */
class Collapsible extends React.Component {
  /**
   * bind methods and setup component
   * @param {Object} props the component props
   * @constructor
   */
  constructor (props) {
    super(props);

    this.collapsible = null;
    this.collapsibleHandler = this.collapsibleHandler.bind(this);
    this.toggleHandler = this.toggleHandler.bind(this);
    this.hideHandler = this.hideHandler.bind(this);
    this.transitionEndHandler = this.transitionEndHandler.bind(this);
    this.state = {
      show: false,
      height: 0,
    };
    this.timeout = null;
  }

  /**
   * When the component update check if should be hide
   * @param {Object} prevProps - the previou component props
   * @param {Object} prevState - the previou component state
   * @access public
   */
  componentDidUpdate (prevProps, prevState) {
    const { show } = this.state;
    if (prevState.height === 'auto' && show === false) {
      // Ensure a true re-render
      this.timeout = window.setTimeout(this.hideHandler, 50);
    }
  }

  /**
   * Component will unmount method
   */
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  /**
   * Get the current collapsible status
   * @access public
   * @returns {string}
   */
  get status () {
    const { show } = this.state;
    return show ? 'show' : 'hide';
  }

  /**
   * Handler set collapsible element
   * @access public
   * @param {Object} element - the collapsible element node
   */
  collapsibleHandler (element) {
    this.collapsible = element;
  }

  /**
   * Handler to hide collapsible
   * @access public
   */
  hideHandler () {
    this.setState({
      height: 0,
    });
  }

  /**
   * Handler when transition ends for set
   * height 'auto' to make the container responsive
   * @access public
   */
  transitionEndHandler () {
    this.setState(({ show }) => ({
      height: show ? 'auto' : 0,
    }));
  }

  /**
   * Hide or show collapsible element
   * @param {Object} event - the instance of JS event
   * @access public
   */
  toggleHandler (event) {
    const { show } = this.state;
    const { collapsible } = this;
    const { onChange } = this.props;

    event.preventDefault();

    if (collapsible) {
      const rect = collapsible.getBoundingClientRect();

      this.setState({
        height: rect.height,
        show: !show,
      }, () => {
        onChange(this.status);
      });
    }
  }

  /**
   * Render the Collapsible component
   * @returns {JSX}
   */
  render () {
    const { className, children, header: Header } = this.props;
    const { height, show } = this.state;

    return (
      <div className={`${Styles.container} ${className}`}>
        <div role="button" tabIndex={-1} className={Styles.toggle} onClick={this.toggleHandler}>
          {Header ? <Header status={this.status} /> : <div className={Styles.header} />}
        </div>
        <div
          className={`${Styles.wrapper} ${show ? Styles.isOpen : ''}`}
          style={{ height }}
          onTransitionEnd={this.transitionEndHandler}
        >
          <div className={Styles.collapsible} ref={this.collapsibleHandler}>
            { (isValidFunction(children) && children({
              colapse: this.toggleHandler,
              status: this.status,
            })) || children }
          </div>
        </div>
      </div>
    );
  }
}

/**
 * @property {function|node[]} [children] - child component for collapsible
 * @property {(function|element)} [header] - an custom header component
 * @property {function} [onChange] - an callback function on status change
 * @property {String} [className] - the custom class name for collapsible
 */
Collapsible.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  header: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
  ]),
  onChange: PropTypes.func,
  className: PropTypes.string,
};

Collapsible.defaultProps = {
  children: [],
  onChange: () => {},
  className: '',
};

export default Collapsible;
