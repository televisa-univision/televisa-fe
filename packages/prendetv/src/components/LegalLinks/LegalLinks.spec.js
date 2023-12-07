/**
 * @module PrendeTV Legal Links Specs
 */
import React from 'react';
import ReactDOM from 'react-dom';

import LegalLinks from '.';

/**
 * @test {LegalLinks}
 */
describe('LegalLinks component', () => {
  it('should render correctly in the DOM', () => {
    const div = document.createElement('div');
    ReactDOM.render(<LegalLinks />, div);
  });

  it('should render correctly in the DOM vertically', () => {
    const div = document.createElement('div');
    ReactDOM.render(<LegalLinks vertical />, div);
  });
});
