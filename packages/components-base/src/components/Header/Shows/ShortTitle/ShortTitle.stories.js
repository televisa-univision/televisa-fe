import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';

import ShortTitle from '.';
import Styles from './ShortTitle.stories.scss';
import data from './__data__/mock.json';

/**
 * Wrapper component
 * @param {Object} children that will get displayed on the wrapper.
 * @returns {JSX}
 */
const Wrapper = ({ children }) => {
  return (
    <div className={Styles.wrapper}>
      {children}
    </div>
  );
};

Wrapper.propTypes = {
  children: PropTypes.array,
};

storiesOf('Layout/Header/Shows/ShortTitle', module)
  .add('El gordo y la flaca', () => {
    return (
      <Wrapper>
        <ShortTitle {...data.gordoflaca} />
      </Wrapper>
    );
  })
  .add('Al Punto', () => {
    return (
      <Wrapper>
        <ShortTitle {...data.alpunto} />
      </Wrapper>
    );
  });
