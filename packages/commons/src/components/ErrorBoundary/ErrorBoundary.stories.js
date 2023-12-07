import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import ErrorBoundary from '.';

/**
 * MyBadComponent
 * @returns {JSX}
 */
const MyBadComponent = () => {
  const test = null;
  return (
    <h1>
      MyBadComponent Render:
      {test.foo}
    </h1>
  );
};

storiesOf('Helpers/ErrorBoundary', module).addDecorator(withInfo)
  .add('hide on error', () => (
    <div>
      <p>
        <code>MyBadComponent</code>
        {' '}
        throws an error on mount, which is caught by ErrorBoundary
      </p>
      <ErrorBoundary>
        <MyBadComponent />
      </ErrorBoundary>
    </div>
  ), {
    info: {
      text: 'ErrorBoundary catches the error and hides the offending compoennt',
    },
  })
  .add('render fallback UI', () => (
    <div>
      <p>
        <code>MyBadComponent</code>
        {' '}
        throws an error on mount, which is caught by ErrorBoundary
      </p>
      <ErrorBoundary fallbackRender={() => <div>Oops!</div>}>
        <MyBadComponent />
      </ErrorBoundary>
    </div>
  ), {
    info: {
      text: 'ErrorBoundary catches the error and renders `fallbackRender` function instead`',
    },
  });
