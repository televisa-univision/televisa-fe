import React from 'react';
import { mount } from 'enzyme';

import loadCarSaverScript from '@univision/fe-commons/dist/utils/loaders/carsaver';
import CarSaver, { WIDGET_ID } from '.';

jest.mock('@univision/fe-commons/dist/utils/loaders/carsaver', () => jest.fn());

let props;
beforeEach(() => {
  props = {
    orientation: 'vertical',
  };
});

describe('CarSaver', () => {
  it('loads a div with the correct orientation class', () => {
    const wrapper = mount(<CarSaver {...props} />);
    expect(wrapper.find(`.${props.orientation}`)).toHaveLength(1);
    expect(loadCarSaverScript).toBeCalledWith(WIDGET_ID);
  });
});
