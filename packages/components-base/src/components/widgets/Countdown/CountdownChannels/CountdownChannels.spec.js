import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import features from '@univision/fe-commons/dist/config/features';

import CountdownChannels from '.';

let props;

/** @test {CountdownChannels} */
describe('CountdownChannels ', () => {
  beforeEach(() => {
    props = {
      hasBg: false,
      isMobile: false,
      channels: ['univision'],
    };
  });
  it('should render the component without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CountdownChannels {...props} />, div);
  });
  it('should render correctly the channels when have tv coverage data', () => {
    const wrapper = mount(<CountdownChannels {...props} />);
    expect(wrapper.find('span')).toHaveLength(1);
    expect(wrapper.find('CountdownChannels__ChannelLogosStyled')).toHaveLength(1);
  });
  it('shouldn´t render the channels when doesn`t have tv coverage data', () => {
    const wrapper = mount(<CountdownChannels />);
    expect(wrapper.find('span')).toHaveLength(0);
    expect(wrapper.find('CountdownChannels__ChannelLogosStyled')).toHaveLength(0);
  });
  it('should have isWorldCupMVP and to be true', () => {
    features.deportes.isWorldCupMVP = jest.fn(() => true);
    const wrapper = mount(<CountdownChannels {...props} />);
    const dateText = wrapper.find('CountdownChannels__DateText');
    expect(dateText.prop('isWorldCupMVP')).toBe(true);
  });
});
