import React from 'react';
import Link from '@univision/fe-components-base/dist/components/Link';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import Style from './style.scss';
import Styles from './QuickApply.styles';
import { apploiUrl } from '../constants';

const Checkbox = styled.span`${Styles.checkbox}`;
const CheckboxInput = styled.input.attrs({ type: 'checkbox' })`${Styles.checkboxInput}`;
const CheckboxWrapper = styled.label`${Styles.checkboxWrapper}`;
const InputWrapper = styled.label`${Styles.inputWrapper}`;
const TermsText = styled.label.attrs({ className: 'uvs-font-a-light' })`${Styles.termsText}`;

/**
 * Checkbox component
 * @param {bool} checked - is checkbox checked
 * @param {string} language - language which the page is displayed, english or spanish
 * @param {string} name - element name
 * @param {Function} onChange - handle input on change event
 * @returns {JSX}
 */
const CheckboxComponent = ({
  checked, language, name, onChange,
}) => {
  /**
   * Get Link component
   * @param {string} text - link lable
   * @param {string} url - url's path
   * @returns {JSX.Element}
   */
  const getLink = (text, url) => {
    const label = localization.get(text, { language });
    return <Link href={`${apploiUrl}/${url}/`} target="_blank">{label}</Link>;
  };

  return (
    <CheckboxWrapper>
      <InputWrapper className={Style.checkboxWrapper}>
        <CheckboxInput onChange={onChange} checked={checked} name={name} />
        <Checkbox className={Style.checkbox} />
      </InputWrapper>
      <TermsText>
        {localization.get('agree', { language })} {getLink('termsConditions', 'terms-conditions')}{', '}
        {getLink('cookies', 'cookie-policy')} {localization.get('and', { language })} {getLink('registrationTermsPolicy', 'privacy_policy')}
      </TermsText>
    </CheckboxWrapper>
  );
};

CheckboxComponent.propTypes = {
  checked: PropTypes.bool,
  name: PropTypes.string,
  language: PropTypes.oneOf(['en', 'es']),
  onChange: PropTypes.func.isRequired,
};

export default CheckboxComponent;
