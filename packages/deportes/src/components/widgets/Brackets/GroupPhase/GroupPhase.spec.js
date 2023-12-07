import React from 'react';
import { shallow, mount } from 'enzyme';
import Loadable from 'react-loadable';
import standingsExtractor from '@univision/shared-components/dist/extractors/standingsExtractor';
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import Tracker from '@univision/fe-commons/dist/utils/tracking/tealium/Tracker';
import groupstandings from '../../../../utils/mocks/groupStandings.json';
import standingsData from '../../../../utils/mocks/standingsBrackets.json';
import standing from '../../../../utils/mocks/standings.json';
import GroupPhase from '.';

const store = configureStore();
const goldCupStanding = standingsExtractor(standingsData);
const groupStanding = standingsExtractor(groupstandings);
const dataStandings = standingsExtractor(standing);
const props = {
  data: groupStanding,
  leagueId: '5',
};

const singleProps = {
  data: dataStandings,
  leagueId: '385',
};

const fourStandings = {
  data: goldCupStanding,
  leagueId: '380',
};
const emptyProps = {
  data: {
    sections: [],
  },
};

jest.useFakeTimers();

describe('GroupPhase tests', () => {
  it('renders as expected', () => {
    const wrapper = mount(<GroupPhase {...props} />);
    expect(wrapper.find('GroupPhase__Wrapper')).toHaveLength(1);
  });
  it('renders as expected with single data standings', () => {
    const wrapper = mount(<GroupPhase {...singleProps} />);
    expect(wrapper.find('GroupPhase__Wrapper')).toHaveLength(1);
  });
  it('returns null if the standings data has no sections', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const wrapper = shallow(<GroupPhase {...emptyProps} />);
    expect(wrapper.getElement()).toBe(null);
  });
  it('should trigger active tab', async () => {
    jest.spyOn(GroupPhase.prototype, 'toggleActiveTab');
    const wrapper = mount(<GroupPhase {...props} />);
    await Loadable.preloadAll();
    wrapper.update();
    jest.runAllTimers();
    wrapper.update();
    const slider = wrapper.find('Slider').instance();
    jest.spyOn(slider, 'slickGoTo');
    const button = wrapper.find('GroupPhase__NavStyled').find('Button').at(1);
    button.props().onPress();
    expect(GroupPhase.prototype.toggleActiveTab).toHaveBeenCalledTimes(1);
    expect(slider.slickGoTo).toHaveBeenCalledTimes(1);
  });
  it('should trigger active tab but do not call slick to go if the ref does not exist', async () => {
    const wrapper = mount(<GroupPhase {...props} />);
    await Loadable.preloadAll();
    wrapper.update();
    const slider = wrapper.find('Slider').instance();
    jest.spyOn(slider, 'slickGoTo');
    wrapper.instance().slider.current = null;
    wrapper.instance().componentDidUpdate();
    expect(slider.slickGoTo).toHaveBeenCalledTimes(0);
  });
  it('should call when a swipe is made in mobile to change  standings cards', async () => {
    const trackerSpy = spyOn(Tracker, 'fireEvent');
    store.dispatch(setPageData({
      device: 'mobile',
    }));
    const wrapper = mount(<GroupPhase {...props} />);
    await Loadable.preloadAll();
    wrapper.update();
    const slider = wrapper.find('CoreSlider').at(1);
    slider.props().settings.onSwipe();
    expect(trackerSpy).toHaveBeenLastCalledWith(expect.any(Object));
  });
  it('should call when a swipe is made in desktop to change standings cards', async () => {
    const trackerSpy = spyOn(Tracker, 'fireEvent');
    store.dispatch(setPageData({
      device: 'desktop',
    }));
    const wrapper = mount(<GroupPhase {...props} />);
    await Loadable.preloadAll();
    wrapper.update();
    const slider = wrapper.find('CoreSlider');
    slider.props().settings.onSwipe();
    expect(trackerSpy).toHaveBeenLastCalledWith(expect.any(Object));
  });
  it('should call tracker when group nav is tap', async () => {
    const trackerSpy = spyOn(Tracker, 'fireEvent');
    const wrapper = mount(<GroupPhase {...props} />);
    await Loadable.preloadAll();
    wrapper.update();
    const standingGroup = wrapper.find('GroupPhase__NavStyled').find('Button').at(1);
    standingGroup.props().onPress();
    // animation timer
    jest.runTimersToTime(500);
    expect(trackerSpy).toHaveBeenLastCalledWith(expect.any(Object));
  });
  it('should get slidesToShow for 768 and smaller views', async () => {
    global.innerWidth = 780;
    const expectedValue = 1;
    expect(GroupPhase.slidesToShow(0)).toEqual(expectedValue);
  });
  it('should get slidesToShow for 1024 view', () => {
    global.innerWidth = 1024;
    const expectedValue = 2;
    expect(GroupPhase.slidesToShow(0)).toEqual(expectedValue);
  });
  it('should get slidesToShow for 1280 view', () => {
    global.innerWidth = 1280;
    const expectedValue = 4;
    expect(GroupPhase.slidesToShow(0)).toEqual(expectedValue);
  });
  it('should get slidesToShow for 1280 view and with skinOffset', () => {
    global.innerWidth = 1280;
    const expectedValue = 2;
    expect(GroupPhase.slidesToShow(1)).toEqual(expectedValue);
  });
  it('renders as expected with skinOffset and small tournament standings', () => {
    const wrapper = mount(<GroupPhase {...fourStandings} skinOffset={1} />);
    expect(wrapper.find('GroupPhase__NavStyled')).toHaveLength(1);
  });
  it('renders as expected with small tournament standings', () => {
    const wrapper = mount(<GroupPhase {...fourStandings} />);
    expect(wrapper.find('GroupPhase__NavStyled').prop('hide')).toBe(true);
  });
});
