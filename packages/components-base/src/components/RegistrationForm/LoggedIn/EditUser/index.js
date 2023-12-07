import React from 'react';
import styled from 'styled-components';

import useRegistrationTheme from '@univision/fe-commons/dist/hooks/useRegistrationTheme';
import localization from '@univision/fe-utilities/localization';

import InputField from '../../../InputField';
import Button from '../../Button';
import fields from './fields';
import Styles from './EditUser.styles';

const Wrapper = styled.div`
  ${Styles.wrapper}
`;
const InputItem = styled.div`
  ${Styles.inputItem}
`;
const LogOutButton = styled.button`
  ${Styles.logOutButton}
`;

/**
 * EditUser component
 * @returns {JSX}
 */
const EditUser = () => {
  const { gradient } = useRegistrationTheme();
  const renderFields = fields.map((item) => {
    const { key, ...rest } = item;

    return (
      <InputItem key={key}>
        <InputField {...rest} />
      </InputItem>
    );
  });

  return (
    <Wrapper>
      {renderFields}
      <InputItem>
        <Button label={localization.get('updateProfile')} gradient={gradient} />
      </InputItem>
      <LogOutButton className="uvs-font-c-regular">
        {localization.get('logOutSession')}
      </LogOutButton>
    </Wrapper>
  );
};

export default EditUser;
