import React from 'react';
import ReactDOM from 'react-dom';

import RadioPerformance from './RadioPerformance';

jest.mock('../../../../assets/images/radio-default-360.jpg', () => jest.fn());
jest.mock('../../../../assets/images/sports-default-360.jpg', () => jest.fn());
jest.mock('../../../connected/PlayStationButton/PlayStationButton', () => 'PlayStationButton');

/** @test {RadioPerformance} */
describe('RadioPerformance', () => {
  let props;
  beforeEach(() => {
    props = {
      device: 'mobile',
      theme: {},
    };
  });

  it('should render the component without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<RadioPerformance {...props} />, div);
  });
});
