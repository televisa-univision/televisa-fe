/**
 * @module PrendeTV Feature with headlines
 */
import React from 'react';
import { mount, shallow } from 'enzyme';
import Store from '@univision/fe-commons/dist/store/store';

import * as videoHelper from '@univision/fe-commons/dist/utils/video';
import PrendeTVContext from '../../context';
import { PRENDE_TV_LANDING } from '../../constants';

import videoMock from './__mocks__/videoMock';

import Video from '.';

const callToAction = {
  uid: '00000177-8bf8-d388-af7f-8bfb43b80001',
  type: 'externallink',
  uri: 'https://app.prende.tv',
  link: {
    href: 'https://app.prende.tv',
    target: '_blank',
    text: 'STREAM GRATIS',
  },
};

window.jwplayer = jest.fn();

jest.spyOn(window, 'jwplayer').mockReturnValue({
  setMute: jest.fn(),
  getMute: jest.fn(),
});

const contextData = {
  lang: 'en',
  path: PRENDE_TV_LANDING,
  device: 'mobile',
  page: {
    data: {
      type: 'marketingpage',
    },
    device: 'mobile',
  },
};

/**
 * @test {Video Component}
 */
describe('Prende TV Static Video component', () => {
  jest.useFakeTimers();
  beforeEach(() => {
    const observer = {
      observe: jest.fn(),
    };
    Object.defineProperty(window, 'MutationObserver', { value: jest.fn(() => observer) });
    Object.defineProperty(window, 'addEventListener', { value: jest.fn() });
    document.body.innerHTML = '';
    const div = document.createElement('div');
    div.setAttribute('innerHTML', 'app-root');
    document.body.appendChild(div);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render when lead is video', () => {
    const { Provider } = PrendeTVContext;
    const wrapper = shallow(
      <Provider value={contextData} store={Store}>
        <Video callToAction={callToAction} lead={videoMock} />
      </Provider>
    );
    expect(wrapper.find('Video')).toBeDefined();
  });
  it('should set on/off the audio player when click on the toggle audio', () => {
    const setMuteSpy = jest.spyOn(videoHelper, 'getPlayerInstance').mockReturnValue({
      setMute: jest.fn(),
    });
    const wrapper = shallow(
      <Video callToAction={callToAction} lead={videoMock} />
    );
    wrapper.find('Video__ToggleAudio').simulate('click');
    expect(setMuteSpy).toBeCalled();
  });
  it('should not break when the jwplayer doesnt exists', () => {
    jest.spyOn(window, 'jwplayer').mockReturnValue(null);
    const wrapper = shallow(
      <Video callToAction={callToAction} lead={videoMock} />
    );
    wrapper.find('Video__ToggleAudio').simulate('click');
    expect(wrapper.find('Video')).toBeDefined();
  });
  it('should set player instance callback', () => {
    const getPlayerInstanceSpy = jest.spyOn(videoHelper, 'getPlayerInstance').mockReturnValue({
      play: jest.fn(),
      stop: jest.fn(),
      on: jest.fn(),
    });
    mount(
      <Video
        callToAction={callToAction}
        lead={videoMock}
        active
        handleVideoCallback={jest.fn()}
      />
    );
    expect(getPlayerInstanceSpy).toHaveBeenCalledTimes(1);
  });
  it('should not call player instances methods when is not active', () => {
    const wrapper = mount(
      <Video
        callToAction={callToAction}
        lead={videoMock}
        handleVideoCallback={jest.fn}
      />
    );
    expect(wrapper.prop('active')).not.toBeDefined();
  });
  it('should not call player instances methods when there is not handleVideoCallback', () => {
    const wrapper = mount(
      <Video
        callToAction={callToAction}
        lead={videoMock}
        active
      />
    );
    expect(wrapper.prop('handleVideoCallback')).not.toBeDefined();
  });
  it('should not call player instances method if playerInstance is undefined', () => {
    const getPlayerInstanceSpy = jest.spyOn(videoHelper, 'getPlayerInstance').mockReturnValue(undefined);
    mount(
      <Video
        callToAction={callToAction}
        lead={videoMock}
        active
        handleVideoCallback={jest.fn}
      />
    );
    expect(getPlayerInstanceSpy).toHaveBeenCalledTimes(1);
  });
});
