import React from 'react';
import { shallow } from 'enzyme';

import RadioShow from './RadioShow';

jest.mock('../../compound/StationLaunch/StationLaunch', () => jest.fn());
jest.mock('../../compound/sliders/RadioShowSlider/RadioShowSlider', () => jest.fn());

/** @test {RadioShow} */
describe('RadioShow', () => {
  let props;
  beforeEach(() => {
    props = {
      content: [],
      settings: {
        radioStation: {
          abacast: {
            id: '123',
          }
        }
      },
    };
  });

  it('renders as expected', () => {
    const wrapper = shallow(<RadioShow {...props} />);
    expect(wrapper.find('.container')).toHaveLength(1);
  });
});
