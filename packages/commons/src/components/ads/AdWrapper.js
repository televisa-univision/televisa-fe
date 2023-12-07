import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import localization from '../../utils/localization/LocalizationManager';

import Styles from './AdWrapper.scss';

/**
 * Ad wrapper component
 * @param {Object} props the component props
 * @returns {JSX}
 */
const AdWrapper = ({ className, hasBg, children }) => {
  return (
    <div className={classnames(Styles.wrapper, className, { [Styles.stripedBg]: hasBg })}>
      <span className={Styles.label}>{localization.get('advertisement')}</span>
      {children}
    </div>
  );
};

/**
 * propTypes
 * @property {node} children
 */
AdWrapper.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  hasBg: PropTypes.bool,
};

AdWrapper.defaultProps = {
  hasBg: true,
};

export default AdWrapper;
