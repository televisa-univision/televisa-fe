import React from 'react';
import ReactDOM from 'react-dom';

import data from '../__mocks__/squareCard.json';
import SquareHoroscope from '.';

const props = {
  ...data[23],
};

describe('SquareHoroscope test', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <SquareHoroscope
        {...props}
        {...props.horoscopeData}
        size="large"
      />,
      div
    );
  });
});
