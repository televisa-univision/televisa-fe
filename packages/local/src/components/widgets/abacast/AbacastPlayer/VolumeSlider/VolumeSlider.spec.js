import React from 'react';
import { shallow } from 'enzyme';

import VolumeSlider from '.';
import Styles from './VolumeSlider.scss';

/** @test {VolumeSlider} */
describe('VolumeSlider', () => {
  it('renders the VolumeSlider', () => {
    const wrapper = shallow(<VolumeSlider volume={50} onChange={jest.fn()} />);
    expect(wrapper.find(`div.${Styles.volumeSlider}`));
  });

  it('handles click', () => {
    const stopPropagation = jest.fn();
    const wrapper = shallow(<VolumeSlider volume={50} onChange={jest.fn()} />);
    wrapper.instance().handleClick({ stopPropagation });
    expect(stopPropagation).toHaveBeenCalled();
  });
});
