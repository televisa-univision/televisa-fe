import PropTypes from 'prop-types';
import React from 'react';
import Styles from './LongformWrapper.scss';
import FullWidth from '../FullWidth';

/**
 * Longform Widget wrapper component
 * @param {Node} children prop Children elements passed to this component
 * @returns {JSX}
 */
const LongformWrapper = ({ children }) => {
  return (
    <FullWidth className={Styles.longformFullWidth}>
      <div className={Styles.longformWrapper}>
        <div className={`uvs-container ${Styles.longformContainer}`}>
          {children}
        </div>
      </div>
    </FullWidth>
  );
};

/**
 * propTypes
 * @property {Array} children Children elements passed to this component
 */
LongformWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LongformWrapper;
