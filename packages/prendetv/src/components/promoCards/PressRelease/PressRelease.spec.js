/**
 * @module Press Release Promo Card tests
 */
import React from 'react';
import ReactDOM from 'react-dom';

import PressRelease from '.';
import mockData from './__mocks__/pressRelease.json';

/**
 * @test {Press Release Promo Card}
 */
describe('Prende TV Press Release Promo Card test', () => {
  it('should not break when the data is not present', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PressRelease />, div);
  });

  it('should render correctly', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PressRelease {...mockData} />, div);
  });
});
