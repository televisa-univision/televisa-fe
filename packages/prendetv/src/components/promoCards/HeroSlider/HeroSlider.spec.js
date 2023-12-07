import React from 'react';
import { mount, shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';

import PrendeTVContext from '../../../context';
import { PRENDE_TV_LANDING } from '../../../constants';

import {
  mockImages, mockVideos, mockImagesAndVideos, mockOneSlide, mockTwoSlides,
} from './__mocks__/heroSliderMock';

import HeroSlider from '.';

const contextData = {
  lang: 'en',
  path: PRENDE_TV_LANDING,
  device: 'mobile',
};
const { Provider } = PrendeTVContext;
jest.useFakeTimers();

describe('Prende TV HeroSlider component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = '<body><div id="app-root"></div></body>';
  });
  it('should renders as expected (mobile)', () => {
    contextData.device = 'mobile';
    const selectedMock = mockImagesAndVideos;
    const imagesLength = selectedMock.items.filter(x => x.type === 'imagepromocard').length;
    const videosLength = selectedMock.items.filter(x => x.type === 'videopromocard').length;
    const wrapper = mount(
      <Provider value={contextData}>
        <HeroSlider {...selectedMock} />
      </Provider>
    );
    expect(wrapper.find('div.imageSlide')).toHaveLength(imagesLength);
    expect(wrapper.find('div.videoSlide')).toHaveLength(videosLength);
  });
  it('should renders as expected (desktop)', () => {
    contextData.device = 'desktop';
    const selectedMock = mockImagesAndVideos;
    const imagesLength = selectedMock.items.filter(x => x.type === 'imagepromocard').length;
    const videosLength = selectedMock.items.filter(x => x.type === 'videopromocard').length;
    const wrapper = mount(
      <Provider value={contextData}>
        <HeroSlider {...selectedMock} />
      </Provider>
    );
    expect(wrapper.find('div.imageSlide')).toHaveLength(imagesLength);
    expect(wrapper.find('div.videoSlide')).toHaveLength(videosLength);
  });
  it('should render as expected with just videos', () => {
    const selectedMock = mockVideos;
    const imagesLength = selectedMock.items.filter(x => x.type === 'imagepromocard').length;
    const videosLength = selectedMock.items.filter(x => x.type === 'videopromocard').length;
    const wrapper = mount(
      <Provider value={contextData}>
        <HeroSlider {...selectedMock} />
      </Provider>
    );
    expect(wrapper.find('div.imageSlide')).toHaveLength(imagesLength);
    expect(wrapper.find('div.videoSlide')).toHaveLength(videosLength);
  });
  it('should not load controls when just one slide', () => {
    const wrapper = mount(
      <HeroSlider {...mockOneSlide} />
    );
    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(wrapper.find({ active: true }).length).toEqual(1);
  });
  it('should trigger actions', () => {
    const wrapper = shallow(
      <HeroSlider {...mockTwoSlides} />
    );

    expect(wrapper.find({ active: true }).at(0).prop('slideId')).toEqual(0);

    wrapper.find('.next').at(0).prop('onClick')();
    expect(wrapper.find({ active: true }).at(0).prop('slideId')).toEqual(1);

    wrapper.find('.next').at(0).prop('onClick')();
    jest.advanceTimersByTime(500);
    expect(wrapper.find({ active: true }).at(0).prop('slideId')).toEqual(0);

    wrapper.find('.prev').at(0).prop('onClick')();
    expect(wrapper.find({ active: true }).at(0).prop('slideId')).toEqual(1);

    wrapper.find('.prev').at(0).prop('onClick')();
    expect(wrapper.find({ active: true }).at(0).prop('slideId')).toEqual(0);
  });
  it('should automatically change slides', () => {
    const wrapper = mount(
      <HeroSlider {...mockImages} />
    );
    act(() => {
      jest.runOnlyPendingTimers();
    });
    wrapper.update();
    expect(wrapper.find({ active: true }).at(0).prop('slideId')).not.toEqual(0);
  });
  it('should receive callback from video component', () => {
    const wrapper = shallow(
      <HeroSlider {...mockVideos} />
    );
    setTimeout(() => {
      wrapper.update();
      expect(wrapper.find({ active: true }).at(0).prop('slideId')).not.toEqual(0);
    }, 40000);
  });
});
