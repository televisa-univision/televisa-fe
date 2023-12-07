import React from 'react';
import { shallow } from 'enzyme';

import Tabs from '.';

describe('Tabs test', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <Tabs>
        <div>Test</div>
        <div>Test 2</div>
      </Tabs>
    );
  });

  it('should render Tabs component', () => {
    expect(wrapper.length).toBe(1);
    expect(wrapper.state('activeTab')).toBe(0);
  });

  it('should render Tabs component', () => {
    expect(wrapper.children().length).toBe(2);
  });

  it('should update active tab', () => {
    wrapper.instance().onClickTabItem(1)();
    expect(wrapper.state('activeTab')).toBe(1);
  });

  it('should update active tab on Button click', () => {
    wrapper.find('Button').first().simulate('click');
    expect(wrapper.state('activeTab')).toBe(0);
    wrapper.find('Button').last().simulate('click');
    expect(wrapper.state('activeTab')).toBe(1);
  });

  it('should call onTabChange if available', () => {
    const props = { onTabChange: jest.fn() };
    wrapper = shallow(
      <Tabs {...props}>
        <div>Test</div>
        <div>Test 2</div>
      </Tabs>
    );
    wrapper.instance().onClickTabItem(1)();
    expect(props.onTabChange).toBeCalled();
  });

  it('should fallback to tab 0 when given tab is not available', () => {
    const props = { startTab: 3 };
    wrapper = shallow(
      <Tabs {...props}>
        <div>Test</div>
        <div>Test 2</div>
      </Tabs>
    );

    expect(wrapper.state().activeTab).toBe(0);
  });

  it('should hide first tab', () => {
    const props = { startTab: 3, hideFirstTab: true };
    wrapper = shallow(
      <Tabs {...props}>
        <div>Test</div>
        <div>Test 2</div>
      </Tabs>
    );

    expect(wrapper.state().activeTab).toBe(0);
  });
});
