import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ArchiveTitle from '.';

/**
 * Mock click event handler
 * @param {string} name - click name event
 * @param {Object} e - cliect event javascript
 */
const click = () => {
  action('a link was clicked')(true);
};

/**
 * Dummy card wrapper component
 * @param {Object} newProps - react component props
 * @returns {JSX}
 */
const Wrapper = (newProps) => {
  return (
    <div>
      <ArchiveTitle
        {...newProps}
        onClick={click}
      />
    </div>
  );
};

storiesOf('ArchivedSiteMap/ArchiveTitle', module)
  .add('With only main title', () => (
    <Wrapper
      mainLabel="Archivo"
    />
  ))
  .add('With main title and second title', () => (
    <Wrapper
      mainLabel="2020"
      secondLabel="ARCHIVO"
      isArrowActive
    />
  ))
  .add('With main title, second title and third title', () => (
    <Wrapper
      mainLabel="Enero"
      secondLabel="2020"
      thirdLabel="Parte 1"
      isArrowActive
    />
  ));
