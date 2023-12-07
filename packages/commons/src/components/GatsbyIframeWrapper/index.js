import PropTypes from 'prop-types';
import React from 'react';
import { loadExternalScript } from '../../utils/helpers';
import Styles from './GatsbyIframeWrapper.scss';

/**
 * Gatsby Iframe wrapper component
 * @access public
 * @extends {React.Component}
 */
export default class GatsbyIframe extends React.Component {
  /**
   * Call displays methods after all ads got mounted
   */
  componentDidMount() {
    loadExternalScript({
      id: 'gastby-resize',
      src: 'https://static.univision.com/external-content/uvn-iframe-resize.js',
    });
  }

  /**
   * Component wrapper to sync ads status using {@link dfpManager}
   * @returns {JSX}
   */
  render() {
    const { children } = this.props;

    return (
      <div className={Styles.gatsby}>
        {children}
      </div>
    );
  }
}

/**
 * propTypes
 * @property {Array} children Children elements passed to this component
 */
GatsbyIframe.propTypes = {
  children: PropTypes.node,
};
