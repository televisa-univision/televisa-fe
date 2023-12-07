import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import isValidFunction from '@univision/fe-utilities/helpers/common/isValidFunction';
import { TORCH_RED } from '@univision/fe-utilities/styled/constants';
import Icon from '@univision/fe-icons/dist/components/Icon';

import Styles from './InputField.styles';

const Wrapper = styled.div`
  ${Styles.wrapper}
`;
const Input = styled.input`
  ${Styles.input}
`;
const Label = styled.label`
  ${Styles.label}
`;
const Message = styled.div`
  ${Styles.message}
`;
const IconWrapper = styled.div`
  ${Styles.iconWrapper}
`;

/**
 * InputField component
 * @param {Object} props - props of the component
 * @property {string} props.className - custom class name
 * @property {string} props.error - error message to be displayed
 * @property {string} props.id - id property of the field
 * @property {Function} props.iconClickHandler - callback for the icon click
 * @property {string} props.label - label of the input field
 * @property {string} props.name - name of the input field
 * @property {Function} props.onBlur - callback for the onBlur event
 * @property {Function} props.onChange - callback for the onChange event
 * @property {Function} props.onKeyUp - callback for the onKeyUp event
 * @property {string} props.placeholder - placeholder for the input
 * @property {int} props.tabIndex - tabIndex property for the input
 * @property {string} props.type - type of input (text, tel, email, password)
 * @property {string} props.value - value of the input field
 * @property {string} props.width - width of input element
 * @returns {JSX}
 */
const InputField = ({
  className,
  error,
  id,
  iconClickHandler,
  label,
  name,
  onBlur,
  onChange,
  onFocus,
  onKeyUp,
  placeholder,
  tabIndex,
  type,
  value,
  width,
}) => {
  const primaryColor = error ? TORCH_RED : null;

  /**
 * Icon wrapper to be reused for customizations.
 * @returns {JSX}
 */
  const renderIcon = () => {
    if (!error && type !== 'search') return null;

    const nameIcon = error ? 'errorInput' : 'search';

    return (
      <IconWrapper
        isTouchable={isValidFunction(iconClickHandler)}
        onClick={iconClickHandler}
      >
        <Icon name={nameIcon} size="small" />
      </IconWrapper>
    );
  };

  return (
    <Wrapper width={width} className={className}>
      {label && (
        <Label
          className="uvs-font-c-regular"
          htmlFor={id}
          primaryColor={primaryColor}
        >
          {label}
        </Label>
      )}
      <Input
        className="uvs-font-a-light"
        id={id}
        name={name}
        onKeyUp={isValidFunction(onKeyUp) ? onKeyUp : undefined}
        placeholder={placeholder}
        primaryColor={primaryColor}
        tabIndex={tabIndex}
        type={type}
        onBlur={onBlur}
        onFocus={onFocus}
        value={value}
        onChange={onChange}
      />
      {error && (
        <Message className="uvs-font-c-regular">{error}</Message>
      )}
      {renderIcon()}
    </Wrapper>
  );
};

InputField.propTypes = {
  error: PropTypes.string,
  id: PropTypes.string.isRequired,
  iconClickHandler: PropTypes.func,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onKeyUp: PropTypes.func,
  placeholder: PropTypes.string,
  tabIndex: PropTypes.number,
  type: PropTypes.oneOf(['text', 'password', 'num', 'email', 'search']),
  width: PropTypes.string,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  value: PropTypes.string,
  className: PropTypes.string,
};

InputField.defaultProps = {
  type: 'text',
  tabIndex: 0,
  width: '100%',
};

export default InputField;
