/**
 * @module PrendeTV Product Link Specs
 */
import React from 'react';
import ReactDOM from 'react-dom';

import ProductLink from '.';

/**
 * @test {ProductLink}
 */
describe('ProductLinks component', () => {
  it('should render correctly in the DOM', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ProductLink />, div);
  });

  it('should render correctly in the DOM vertically', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ProductLink vertical />, div);
  });
});
