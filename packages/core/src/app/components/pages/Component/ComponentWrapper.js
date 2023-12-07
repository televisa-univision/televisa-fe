import React, { Component } from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';

import Store from '@univision/fe-commons/dist/store/store';
import BKPIndicator from '@univision/fe-commons/dist/components/breakpoint/BreakPointIndicator';

import getComponent from 'app/utils/factories/components/componentFactory';

/**
 * Container component representing a Video page
 * @param {Object} initialState Initial state
 * @returns {JSX}
 */
class ComponentWrapper extends Component {
  /**
   * ComponentWrapper constructor
   * @param {Object} props React Props for this component
   */
  constructor(props) {
    super(props);
    this.timeout = null;
    this.container = React.createRef();
  }

  /**
   * Post a message to the parent window no notify the component height
   */
  componentDidMount() {
    const { initialState } = this.props;
    // Wait for the CSS before posting the message
    this.timeout = setTimeout(() => {
      if (this.container.current) {
        window.parent.postMessage({
          event: 'componentDidMount',
          component: initialState.component,
          height: this.container.current.getBoundingClientRect().height,
          width: this.container.current.getBoundingClientRect().width,
        }, '*');
      }
    }, 500);
  }

  /**
   * Component will unmount method
   */
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  /**
   * Renders the component and includes the Provider and BreakpointIndicator
   * @returns {XML}
   */
  render() {
    const { initialState } = this.props;

    return (
      <Provider store={Store}>
        <div ref={this.container}>
          <BKPIndicator />
          { getComponent(initialState) }
        </div>
      </Provider>
    );
  }
}

/**
 * propTypes
 */
ComponentWrapper.propTypes = {
  initialState: PropTypes.object,
};

ComponentWrapper.defaultProps = {
  initialState: {},
};

export default ComponentWrapper;
