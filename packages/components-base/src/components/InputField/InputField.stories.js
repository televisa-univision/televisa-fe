/* eslint-disable require-jsdoc */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';

import InputField from '.';

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  margin: 0 auto;
  max-width: 480px;
`;

/**
 * Input container
 * @param {Object} props of the component
 * @returns {JSX}
 */
const InputWithContainer = (props) => {
  const { title, ...rest } = props;

  return (
    <Container>
      {title && <h3>{title}</h3>}
      <InputField {...rest} />
    </Container>
  );
};

storiesOf('Forms/InputField', module)
  .add('default', () => (
    <InputWithContainer
      id="test"
    />
  ))
  .add('/w label', () => (
    <InputWithContainer
      id="test"
      label="Label"
    />
  ))
  .add('/w placeholder', () => (
    <InputWithContainer
      id="test"
      label="Label"
      placeholder="Input here..."
    />
  ))
  .add('/w keyUp event', () => (
    <InputWithContainer
      id="test"
      label="Label"
      onKeyUp={e => action()(`input value: ${e.target.value}`)}
    />
  ))
  .add('invalid input', () => (
    <InputWithContainer
      id="test"
      label="Label"
      error="Error: invalid input"
    />
  ))
  .add('fake validation', () => {
    const FakeValidationInput = () => {
      const [error, setError] = useState(null);
      const handleOnKeyUp = (e) => {
        if (e.target.value === 'error') {
          setError('error was typed');
        }

        if (error && e.target.value !== 'error') {
          setError(null);
        }
      };

      return (
        <InputWithContainer
          id="test"
          label="fake validation"
          error={error}
          onKeyUp={handleOnKeyUp}
          title="Type error in the input to trigger error event"
        />
      );
    };

    return <FakeValidationInput />;
  })
  .add('password', () => (
    <InputWithContainer
      id="test"
      label="Password"
      type="password"
    />
  ))
  .add('custom width', () => (
    <InputWithContainer
      id="test"
      label="custom width"
      width="200px"
    />
  ))
  .add('search input', () => (
    <InputWithContainer
      id="test"
      type="search"
    />
  ));
