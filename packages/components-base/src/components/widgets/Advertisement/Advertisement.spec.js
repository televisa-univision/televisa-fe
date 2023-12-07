import React from 'react';
import ReactDOM from 'react-dom';

import * as AdTypes from '@univision/fe-commons/dist/utils/ads/ad-types';
import Advertisement from '.';

/** @test {Advertisement} */
describe('Advertisement ', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Advertisement settings={{ type: AdTypes.TOP_AD }} />, div);
  });
});
