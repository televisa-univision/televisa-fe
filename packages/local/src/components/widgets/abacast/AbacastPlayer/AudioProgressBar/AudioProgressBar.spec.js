import React from 'react';
import { mount } from 'enzyme';

import AudioProgressBar from '.';
import AbacastPlayerContext from '../AbacastPlayerContext';

describe('AudioProgressBar', () => {
  it('should render component by default', () => {
    const wrapper = mount(<AudioProgressBar onChange={jest.fn()} />);
    expect(wrapper.find('ProgressBar').length).toBe(1);
  });

  it('should clear eventListener on unmount', () => {
    spyOn(global, 'removeEventListener');
    const wrapper = mount(<AudioProgressBar onChange={jest.fn()} />);
    wrapper.unmount();
    expect(global.removeEventListener).toHaveBeenCalled();
  });

  it('should render ProgressBar with percent current updated in the context playerInstance', () => {
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
      },
    };
    const wrapper = mount(
      <AbacastPlayerContext.Provider value={playerInstance}>
        <AudioProgressBar onChange={jest.fn()} />
      </AbacastPlayerContext.Provider>
    );
    expect(wrapper.find('ProgressBar').props().percent).toBe(30);
  });

  it('should call handleClick on click event', () => {
    const stopPropagation = jest.fn();
    const wrapper = mount(<AudioProgressBar onChange={jest.fn()} />);
    wrapper.simulate('click', { stopPropagation });
    expect(stopPropagation).toHaveBeenCalled();
  });

  describe('AudioProgressBar component', () => {
    it('should call player.off when unmounting', () => {
      const mockPlayer = {
        getDuration: jest.fn(),
        getPosition: jest.fn(),
        on: jest.fn(),
        off: jest.fn(),
      };

      const playerInstance = {
        player: mockPlayer,
      };

      const wrapper = mount(
        <AbacastPlayerContext.Provider value={playerInstance}>
          <AudioProgressBar />
        </AbacastPlayerContext.Provider>
      );

      wrapper.unmount();

      expect(mockPlayer.off).toHaveBeenCalledWith('time', expect.any(Function));
    });
  });
});
