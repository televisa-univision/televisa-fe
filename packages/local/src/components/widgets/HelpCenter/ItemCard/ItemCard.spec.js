import React from 'react';
import { mount } from 'enzyme';
import ItemCard from '.';
import mockData from '../mockData';

let data;
let defaultLogo;
beforeEach(() => {
  const { contents } = mockData.data.widgets[1];
  data = contents;
  defaultLogo = '';
});

describe('ItemCard', () => {
  it('renders without crashing', () => {
    const wrapper = mount(<ItemCard {...data[0]} />);
    expect(wrapper.isEmptyRender()).toBe(false);
  });

  it('renders in dark mode', () => {
    const wrapper = mount(<ItemCard {...data[0]} isDark />);
    expect(wrapper.isEmptyRender()).toBe(false);
  });

  it('should not have avatar item if logo not available', () => {
    const wrapper = mount(<ItemCard {...data[0]} logo={defaultLogo} />);
    expect(wrapper.find('ItemCard__AvatarItem')).toHaveLength(1);
  });

  it('should have avatar item if logo available', () => {
    const wrapper = mount(<ItemCard {...data[0]} isDark />);
    expect(wrapper.find('ItemCard__AvatarItem')).toHaveLength(1);
  });

  it('should not have avatar item if logo not available', () => {
    const wrapper = mount(<ItemCard {...data[0]} logo={null} />);
    expect(wrapper.find('ItemCard__AvatarItem')).toHaveLength(1);
  });

  it('should call trackEvent on click', () => {
    const mockCallBack = jest.fn();
    const wrapper = mount(<ItemCard {...data[0]} index={0} trackEvent={mockCallBack} />);
    wrapper.simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });

  it('should not call invalid trackEvent on click', () => {
    const mockCallBack = jest.fn();
    const wrapper = mount(<ItemCard {...data[0]} index={0} trackEvent={null} />);
    wrapper.simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(0);
  });
});
