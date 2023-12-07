/**
 * @module PrendeTV Beta View Specs
 */
import React from 'react';
import ReactDOM from 'react-dom';

import Beta from '.';

/**
 * @test {PrendeTVBetaView}
 */
describe('PrendeTV View test', () => {
  it('should render correctly', () => {
    const div = document.createElement('div');

    ReactDOM.render(<Beta />, div);
  });
});
