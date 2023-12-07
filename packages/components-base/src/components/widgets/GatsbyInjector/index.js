/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import loadGatsbyScript from '@univision/fe-commons/dist/utils/loaders/gatsby';
import { asDeferrer } from '@univision/fe-commons/dist/utils/deferrer';
import { hasKey, isValidString } from '@univision/fe-commons/dist/utils/helpers';

import Styles from './GatsbyInjector.scss';

/**
 * Gatsby component
 */
export default @asDeferrer class GatsbyInjector extends Component {
  /**
   * Setup the state
   */
  state = { visible: true, message: '' };

  elementNode = React.createRef();

  /**
   * initialize gatsby
   */
  componentDidMount() {
    const { params, path } = this.props;
    this.defer(() => {
      if (hasKey(this.elementNode, 'current')) {
        loadGatsbyScript()
          .then((GATSBY) => {
            // GATSBY need a path de `static.univision.com` for load the ExternalContent.
            // The parameters are optional. These params have a variation depending of the context:
            // 1. When the path is empty, means that this component is embedding from liveblog,
            // article, section and the path is included on the params that should be a String.
            // 2. When the path is not empty, means that this component is embedding from
            // Deportes widgets and the path should be a String and the params
            // should be a Object[] with the configuration.

            const uri = path || global.window.PARAM('path', params);
            const gatsbyIframe = GATSBY.init({ path: uri, id: global.window.__gatsby_guid() });
            GATSBY.iframe({
              data: gatsbyIframe,
              display: 'iframe',
              target: this.elementNode.current,
              params: isValidString(params) ? global.window.GET_PARAMS_FILTERED(params) : params,
            });
          })
          .catch((e) => {
            this.handleError(e);
          });
      }
    });
  }

  /**
   * Handle error if gatsby doesn't load
   * @param {string} e - error
   */
  handleError(e) {
    this.setState({
      visible: false,
      message: e && 'Error',
    });
  }

  /**
   * render
   * @returns {JSX} the gatsby component
   */
  render() {
    const { params, path, minHeight } = this.props;
    if (!path && !isValidString(params)) return null;
    const { visible, message } = this.state;
    return (
      <div className={`${Styles.container}`} style={minHeight && { minHeight }}>
        {visible && (
          <div
            ref={this.elementNode}
          />
        )}
        {!visible && <div className={Styles.error}>{message}</div>}
      </div>
    );
  }
}

/**
 * @param {string} params a string with all the parameters taken from static URL (GASTBY)
 * @param {array} params a array with parameters ordered in a specific array
 * @param {string} path the static URL with parameters (optional)
 * @param {string} minHeight min height for the fragment container
 */
GatsbyInjector.propTypes = {
  path: PropTypes.string,
  minHeight: PropTypes.string,
  params: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.PropTypes.arrayOf(
      PropTypes.shape({
        prop: PropTypes.string,
        value: PropTypes.string,
      })
    ),
  ]),
};
