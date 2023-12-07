import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';

import Button from '.';

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 410px;
`;

const BUTTON_LABEL = 'Iniciar Sesión';
const FACEBOOK_LOGIN = 'Ingresar con Facebook';
const TUDN_GRADIENT = {
  end: '#079F70',
  start: '#007350',
};

storiesOf('RegistrationForm/Button', module)
  .addDecorator(fn => <Wrapper>{fn()}</Wrapper>)
  .add('default', () => <Button label={BUTTON_LABEL} />)
  .add('disabled', () => <Button label={BUTTON_LABEL} disabled />)
  .add('with onClick', () => <Button label={BUTTON_LABEL} onClick={action('click')} />)
  .add('with Icon', () => <Button label={FACEBOOK_LOGIN} icon="facebookRegistration" />)
  .add('rounded', () => <Button label={FACEBOOK_LOGIN} icon="facebookRegistration" isRounded />)
  .add('solid background', () => <Button label={BUTTON_LABEL} backgroundColor="#2B4B82" />)
  .add('gradient background', () => <Button label={BUTTON_LABEL} gradient={TUDN_GRADIENT} />)
  .add('rounded solid background', () => (
    <Button label={FACEBOOK_LOGIN} backgroundColor="#2B4B82" icon="facebookRegistration" isRounded />
  ))
  .add('rounded gradient background', () => (
    <Button label={BUTTON_LABEL} isRounded gradient={TUDN_GRADIENT} />
  ));
