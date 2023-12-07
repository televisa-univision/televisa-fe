import React from 'react';
import PropTypes from 'prop-types';

import Styles from './TestItem.scss';

/**
 * TestItem component
 * @param {*} props component
 * @returns {JSX}
 */
const TestItem = (props) => {
  const { numberId, isselected } = props;
  const className = isselected === 'true' ? Styles.selected : '';
  return (
    <div className={Styles.wrapper}>
      <div className={`${Styles.element} ${className}`} key={`test${numberId}`}>{numberId}</div>
    </div>
  );
};

TestItem.propTypes = {
  numberId: PropTypes.number,
  isselected: PropTypes.string,
};

TestItem.defaultProps = {
  numberId: 1,
  isselected: 'false',
};

export default TestItem;
