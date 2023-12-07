import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { BLACK_GREY } from '@univision/fe-utilities/styled/constants';

import Icon from '@univision/fe-icons';
import Styles from './PrintComponent.styles';

const PaperClip = styled(Icon).attrs({ fill: BLACK_GREY, name: 'paperClip', size: 13 })`${Styles.paperClip}`;
const TitlePrint = styled.span.attrs({ className: 'uvs-font-a-regular' })`${Styles.titlePrint}`;
const TextPrint = styled.span.attrs({ className: 'uvs-font-a-regular' })`${Styles.textPrint}`;
const Wrapper = styled.div`${Styles.wrapper}`;

/**
 * Creates Print component
 * @param {string} firstName - users first name
 * @param {string} lastName - users last name
 * @param {string} email - users email
 * @param {string} phone - users phone
 * @param {string} resumeFileName - name of the uploaded file
 * @returns {JSX.Element}
 * @constructor
 */
const Print = ({
  firstName, lastName, email, phone, resumeFileName,
}) => {
  return (
    <Wrapper>
      <div>
        <TitlePrint>First Name:</TitlePrint>
        <TextPrint>{firstName}</TextPrint>
      </div>
      <div>
        <TitlePrint>Last Name:</TitlePrint>
        <TextPrint>{lastName}</TextPrint>
      </div>
      <div>
        <TitlePrint>Email:</TitlePrint>
        <TextPrint>{email}</TextPrint>
      </div>
      <div>
        <TitlePrint>Phone:</TitlePrint>
        <TextPrint>{phone}</TextPrint>
      </div>
      {resumeFileName && <TextPrint><PaperClip />{resumeFileName}</TextPrint>}
    </Wrapper>
  );
};

Print.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string,
  resumeFileName: PropTypes.string,
};

export default Print;
