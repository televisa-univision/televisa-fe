import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RouterContext from '@univision/fe-commons/dist/components/RouterContext';
import { actions } from '@univision/fe-commons/dist/utils/helpers/history';
import { getKey } from '@univision/fe-commons/dist/utils/helpers';
import { EVENT_PUSH_SPA_STATE } from '@univision/fe-commons/dist/constants/spa';

/**
 * The public API for putting history on context.
 */
class Router extends Component {
  /**
   * Constructor
   * @param {Object} props the component props;
   */
  constructor(props) {
    super(props);
    const { history } = props;

    this.location = getKey(history, 'location');
    this.pushSpaState = this.pushSpaState.bind(this);

    this.unlisten = history && history.listen((location, action) => {
      /* istanbul ignore next */
      if (action !== actions.REPLACE) {
        if (global.window) {
          if (props.beforeChange) {
            // If there is an URL in the history state, then let's use that one
            let url = getKey(location, 'state.url', props.history.createHref(location));
            const { location: pathname } = this;

            if (props.baseName) {
              url = url.replace(props.baseName, '');
            }

            if (pathname !== url) {
              props.beforeChange(url);
            }
          }
        }
        this.location = location;
      }
    });
  }

  /**
   * Push a new state to the history.
   * @param {Object} detail Event data
   */
  pushSpaState({ detail: { path, url } }) {
    const { history } = this.props;
    if (history && typeof history.push === 'function') {
      history.push(path, { url });
    }
  }

  /**
   * Set didMount to true
   */
  componentDidMount() {
    window.addEventListener(EVENT_PUSH_SPA_STATE, this.pushSpaState);
  }

  /**
   * Update document title
   */
  componentDidUpdate() {
    const { data } = this.props;
    if (document && data && data.title) document.title = data.title;
  }

  /**
   * Clean up history event listener
   */
  componentWillUnmount() {
    window.removeEventListener(EVENT_PUSH_SPA_STATE, this.pushSpaState);
    if (this.unlisten) this.unlisten();
  }

  /**
   * Render
   * @returns {JSX}
   */
  render() {
    const { history, children } = this.props;
    const { location } = this;
    return (
      <RouterContext.Provider value={{ history, location }}>
        {children}
      </RouterContext.Provider>
    );
  }
}

Router.propTypes = {
  baseName: PropTypes.string,
  beforeChange: PropTypes.func,
  children: PropTypes.node,
  data: PropTypes.object,
  history: PropTypes.object.isRequired,
};

Router.defaultProps = {
  baseName: '',
};

export default Router;
