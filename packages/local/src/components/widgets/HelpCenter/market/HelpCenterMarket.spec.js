import React from 'react';
import { mount } from 'enzyme';
import Dropdown from '@univision/fe-components-base/dist/components/Dropdown';

import HelpCenterMarket from '.';

let selectedCity;
let setSelectedCity;
beforeAll(() => {
  setSelectedCity = (e) => {
    selectedCity = e.target;
    return selectedCity;
  };
});

describe('Help center market', () => {
  it('renders without crashing', () => {
    const wrapper = mount(<HelpCenterMarket />);
    expect(wrapper.isEmptyRender()).toBe(false);
  });
  it('Render Dropdown', () => {
    const wrapper = mount(<HelpCenterMarket />);
    wrapper.find(Dropdown).simulate('click');
    expect(wrapper.find(Dropdown).length).toBeGreaterThan(0);
  });
  it('Change city', () => {
    const wrapper = mount(
      <HelpCenterMarket setSelectedCity={setSelectedCity} selectedCity={selectedCity} />
    );
    wrapper.find(Dropdown).find('select').simulate('change', { target: { value: '0' } });
    expect(wrapper.find(Dropdown)).toBeTruthy();
  });
});
