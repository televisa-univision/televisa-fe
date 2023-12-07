import React from 'react';
import { mount } from 'enzyme';

import PLAY_STATES from '@univision/fe-commons/dist/constants/radioPlayStates';
import OptionsList from '@univision/fe-components-base/dist/components/CardOptionsList';
import Icon from '@univision/fe-icons/dist/components/Icon';
import AudioMoreInfo from '.';
import AbacastPlayerContext from '../AbacastPlayerContext';
import { AudioTitleWrapper, AudioDetails } from './AudioMoreInfo.styles';

jest.mock('@univision/fe-commons/dist/store/storeHelpers', () => ({
  isDesktop: jest.fn().mockReturnValueOnce(true).mockImplementation(() => false),
}));

describe('AudioMoreInfo suite', () => {
  it('should assume is rendering in desktop and use the appropiate icon size', () => {
    const wrapper = mount(<AudioMoreInfo />);
    expect(wrapper.find(Icon).first().props()).toHaveProperty('size', 56);
  });

  it('should assume is rendering in mobile and use the appropiate icon size', () => {
    const wrapper = mount(<AudioMoreInfo />);
    expect(wrapper.find(Icon).first().props()).toHaveProperty('size', 49);
  });

  it('should render component by default', () => {
    const wrapper = mount(<AudioMoreInfo />);
    expect(wrapper.find('AudioMoreInfo').length).toBe(1);
    expect(wrapper.find(AudioTitleWrapper)).toHaveLength(1);
  });

  it('should clear eventListener on unmount', () => {
    spyOn(global, 'removeEventListener');
    const wrapper = mount(<AudioMoreInfo />);
    wrapper.unmount();
    expect(global.removeEventListener).toHaveBeenCalled();
  });

  it('should render streamloading if stream is loading', () => {
    const wrapper = mount(<AudioMoreInfo play={PLAY_STATES.LOADING} />);
    expect(wrapper.find('StreamLoading')).toHaveLength(1);
  });

  it('should not render streamloading if stream is not loading', () => {
    const wrapper = mount(<AudioMoreInfo play={PLAY_STATES.PLAY} />);
    expect(wrapper.find('StreamLoading')).toHaveLength(0);
  });

  it('should render AudioMoreInfo with position current updated in the context playerInstance', () => {
    const playerInstance = {
      player: {
        on: (event, cb) => {
          cb({
            duration: 100,
            position: 30,
          });
        },
        off: (event, cb) => {
          cb();
        },
        getDuration: jest.fn(() => 100),
      },
    };
    const wrapper = mount(
      <AbacastPlayerContext.Provider value={playerInstance}>
        <AudioMoreInfo description="description test" />
      </AbacastPlayerContext.Provider>
    );
    expect(wrapper.find(OptionsList).length).toBe(1);
    expect(wrapper.find(AudioDetails).text()).toEqual('description test');
  });
});
