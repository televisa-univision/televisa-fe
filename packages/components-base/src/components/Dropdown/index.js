import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from '@univision/fe-icons/dist/components/Icon';

import { GREY } from '@univision/fe-utilities/styled/constants';
import Styles from './Dropdown.scss';

/**
 * Dropdown
 * @param {Object} props the propTypes
 * @returns {JSX} the view
 */
const Dropdown = (props) => {
  const {
    options,
    className,
    iconFill,
    placeholder,
    ...rest
  } = props;

  return (
    <div className={Styles.dropdownWrapper}>
      <select className={classnames(Styles.dropdown, className)} {...rest}>
        {placeholder && <option value="" defaultValue>{placeholder}</option>}
        {options.map(({ name, value }) => (
          <option key={value} value={value}>{name}</option>
        ))}
      </select>
      <Icon name="arrowDown" size="small" className={Styles.arrow} fill={iconFill} />
    </div>
  );
};

export default Dropdown;

Dropdown.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  })).isRequired,
  className: PropTypes.string,
  iconFill: PropTypes.string,
  placeholder: PropTypes.string,
};

Dropdown.defaultProps = {
  iconFill: GREY,
};
