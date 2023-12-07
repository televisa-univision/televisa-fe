import React from 'react';
import PropTypes from 'prop-types';

import Styles from './Alert.scss';

/**
 * Alert content placeholder
 * @params {Object} props - props that component will receive
 * @params {function} props.close - Callback to allow the popup to close
 * @returns {JSX}
 */
const Alert = ({ close }) => (
  <div className={Styles.box}>
    <button className={Styles.close} onClick={close}>Close</button>
    This is just a sample alert pop up
  </div>
);

Alert.propTypes = {
  close: PropTypes.func,
};

export default Alert;
