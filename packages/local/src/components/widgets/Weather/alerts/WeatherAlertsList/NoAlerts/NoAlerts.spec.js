import React from 'react';
import { mount } from 'enzyme';
import NoAlerts, { Info, CheckWeather } from '.';

describe('Weather Alerts No Alerts', () => {
  it('should render with data', async () => {
    const uri = '/local/san-francisco-kdtv';
    const wrapper = mount(
      <NoAlerts uri={uri} />
    );
    expect(wrapper.find(NoAlerts)).toHaveLength(1);
    expect(wrapper.find(Info)).toHaveLength(1);
    expect(wrapper.find(CheckWeather)).toHaveLength(1);
    expect(wrapper.find(CheckWeather).props().href).toEqual(`${uri}/tiempo`);
  });
});
