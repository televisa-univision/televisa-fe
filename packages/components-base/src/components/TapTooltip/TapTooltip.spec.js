import React from 'react';
import ReactDOM from 'react-dom';

import TapTooltip from '.';

/** @test {TapTooltip} */
describe('TapTooltip', () => {
  test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TapTooltip />, div);
  });
});
