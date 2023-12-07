/**
 * @module PrendeTV Logo Specs
 */
import React from 'react';
import ReactDOM from 'react-dom';

import Logo from '.';

/**
 * @test {Logo}
 */
describe('Prende TV Static Logo test', () => {
  it('should render correctly in the DOM', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Logo />, div);
  });
});
