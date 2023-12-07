import React from 'react';
import { ReactReduxContext } from 'react-redux';
import PropTypes from 'prop-types';

import BreakPoint from '../../../utils/breakpoint/breakPointMediator';
import { getKey } from '../../../utils/helpers';

/**
 * Helper to display node on determined breakpoints
 * @access public
 * @extends {React.Component}
 */
export default class ResponsiveLoader extends React.Component {
  // Assign a contextType to read the redux context to avoid global store import.
  static contextType = ReactReduxContext;

  /**
   * Constructor
   * @param {Object} props React Props for this component
   * @constructor
   */
  constructor(props) {
    super(props);

    /**
     * Setting of initial state for this component
     * @type {{display: boolean}}
     */
    this.state = {
      display: this.shouldDisplay(),
    };
  }

  /**
   * Wait for breakpoint mediator to mount and determine the brerakpoint value
   */
  componentDidMount() {
    this.initState();
  }

  /**
   * setup the state when the component mounts
   */
  initState() {
    this.setState({
      display: this.shouldDisplay(),
    });
  }

  /**
   * determines whether child content should be display or not
   * @param {string} currentBreakpoint current breakpoint, based on viewport or default
   * @returns {boolean}
   */
  shouldDisplay(currentBreakpoint = '') {
    const { breakpoints } = this.props;
    let localBreakpoint = currentBreakpoint || BreakPoint.getValue();

    if (!localBreakpoint && this.context) {
      const { store } = this.context;
      localBreakpoint = getKey(store.getState(), 'page.breakpoint.size', 'sm');
    }
    return (Array.isArray(breakpoints) && breakpoints.indexOf(localBreakpoint) !== -1);
  }

  /**
   * Div helper to include breakpoint value using media queries
   * using local styles
   * @returns {JSX}
   */
  render() {
    const { state: { display }, props: { children } } = this;
    return display ? children : null;
  }
}

/**
 * propTypes
 * @property {Array} body an array of body chunks to be rendered
 * @property {Object} lead details about the articles lead content
 * @property {String} publishDate the timestamp when the article was published
 */
ResponsiveLoader.propTypes = {
  breakpoints: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node,
};
