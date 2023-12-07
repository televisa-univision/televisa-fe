/**
 * @module PrendeTV Contact Support
 */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import isValidEmail from '@univision/fe-utilities/helpers/url/isValidEmail';

import { PRENDE_TV_CONTACT } from '../../constants';
import Styles from './ContactSupport.styles';

const ContactSupportEmail = styled.div`${Styles.contactSupportEmail}`;
const ContactSupportLabel = styled.div`${Styles.contactSupportLabel}`;
const ContactSupportWrapper = styled.section`${Styles.contactSupportWrapper}`;

/**
 * PrendeTV Contact Support Component
 * @param {Object} props - initial props
 * @property {string} props.formPlaceholder - email or placeholder text.
 * @property {string} props.headLine - message title
 * @returns {JSX.Element}
 */
const ContactSupport = ({
  formPlaceholder,
  headLine,
}) => (
  <ContactSupportWrapper>
    <ContactSupportLabel>{headLine}</ContactSupportLabel>

    <ContactSupportEmail>
      <a
        href={isValidEmail(formPlaceholder) ? `mailto:${formPlaceholder}` : PRENDE_TV_CONTACT}
        rel="noopener noreferrer"
      >
        {formPlaceholder}
      </a>
    </ContactSupportEmail>
  </ContactSupportWrapper>
);

ContactSupport.propTypes = {
  formPlaceholder: PropTypes.string,
  headLine: PropTypes.string,
};

export default ContactSupport;
