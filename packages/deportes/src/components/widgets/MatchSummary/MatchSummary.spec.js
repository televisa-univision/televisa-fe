import React from 'react';
import { shallow, mount } from 'enzyme';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import matchSummaryExtractor from '@univision/shared-components/dist/extractors/summaryMatchExtractor';
import {
  cloneDeep,
} from '@univision/fe-commons/dist/utils/helpers';
import lineupResponse from '../../../utils/mocks/lineup.json';
import MatchSummary from '.';

const props = {
  data: matchSummaryExtractor(lineupResponse),
};
const simulate = {};
const mockEvent = {
  preventDefault: jest.fn(),
  nativeEvent: {},
};
window.addEventListener = jest.fn((event, cb) => {
  simulate[event] = cb;
});
mockEvent.nativeEvent = mockEvent;

jest.mock('../../base/StatWrapper', () => 'StatWrapper');

describe('MatchSummary component tests', () => {
  it('returns null if the component has no data', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const wrapper = shallow(<MatchSummary />);
    expect(wrapper.getElement()).toBe(null);
  });
  it('should render with data', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const wrapper = shallow(<MatchSummary {...props} />);
    expect(wrapper.find(MatchSummary)).toBeDefined();
  });
  it('should renders ad type from widget settings', () => {
    const settings = {
      widgetAd: {
        type: 'Ad Test',
      },
    };
    const wrapper = shallow(<MatchSummary {...props} settings={settings} />);
    expect(wrapper.find('.uvs-ad-widget')).toHaveLength(1);
  });
  it('should render with abbreviated names in a lower breakpoint', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    global.innerWidth = 320;
    Store.dispatch(setPageData({
      device: 'desktop',
    }));
    const wrapper = shallow(<MatchSummary {...props} />);
    const MatchSummaryComponent = wrapper.find('SummaryMatch');
    expect(MatchSummaryComponent.props().isAbbreviated).toBeTruthy();
  });
  it('should render with font at medium size in bp >= 1024', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    global.innerWidth = 1024;
    Store.dispatch(setPageData({
      device: 'desktop',
    }));
    const wrapper = shallow(<MatchSummary {...props} />);
    const MatchSummaryComponent = wrapper.find('SummaryMatch');
    expect(MatchSummaryComponent.props().size).toEqual('medium');
  });
  it('should render with font at large size in bp > 1280', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    global.innerWidth = 1281;
    Store.dispatch(setPageData({
      device: 'desktop',
    }));
    const wrapper = shallow(<MatchSummary {...props} />);
    const MatchSummaryComponent = wrapper.find('SummaryMatch');
    expect(MatchSummaryComponent.props().size).toEqual('medium');
  });
  it('should render with small size if window does not exist', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const restoreGlobal = global.window;
    delete global.window;
    const wrapper = shallow(<MatchSummary {...props} />);
    wrapper.update();
    const MatchSummaryComponent = wrapper.find('SummaryMatch');
    expect(MatchSummaryComponent.props().size).toEqual('small');
    global.window = restoreGlobal;
  });
  it('should call getSummary when there is new data', () => {
    const mockFn = jest.fn();
    shallow(<MatchSummary {...props} getSummary={mockFn} />);
    expect(mockFn).toHaveBeenCalled();
  });
  it('should clear the timer interval before unmounting the component', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    global.clearInterval = jest.fn();
    const mockFn = jest.fn();
    const wrapper = shallow(<MatchSummary {...props} getSummary={mockFn} />);
    wrapper.instance().componentWillUnmount();
    expect(global.clearInterval).toHaveBeenCalled();
  });
  it('should not clear the timer interval before unmounting when it was not created', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    global.clearInterval = jest.fn();
    const mockFn = jest.fn();
    const wrapper = shallow(<MatchSummary {...props} getSummary={mockFn} />);
    wrapper.instance().timer = null;
    wrapper.instance().componentWillUnmount();
    expect(global.clearInterval).toHaveBeenCalledTimes(0);
  });
  it('should show summary highlight when event is pressed for home team', () => {
    const wrapper = mount(<MatchSummary {...props} />);
    expect(wrapper.state('activeHighlight')).toEqual(null);
    wrapper.find('TouchableOpacity').at(0).props().onPress(mockEvent);
    expect(wrapper.state('activeHighlight')).toEqual({
      actionName: 'playerSubstitution',
      hasTime: true,
      id: 'a.1845449444',
      isFirstPen: false,
      minute: '31',
      ownGoal: false,
      periodTime: 1,
      tagName: 'Kevin Escamilla',
      tagNameII: 'Mauro Formica',
    });
    wrapper.update();
    expect(wrapper.find('SummaryHighlight')).toHaveLength(1);
    expect(wrapper.state('activeTeam')).toEqual('home');
  });
  it('should show summary highlight when event is pressed for away team', () => {
    const data2 = cloneDeep(props.data);
    const data3 = Object.assign({}, data2, {
      homeData: [],
    });
    const wrapper = mount(<MatchSummary data={data3} />);
    expect(wrapper.state('activeHighlight')).toEqual(null);
    wrapper.find('TouchableOpacity').at(0).props().onPress(mockEvent);
    expect(wrapper.state('activeHighlight')).toEqual({
      actionName: 'yellowCard',
      hasTime: true,
      id: 'a.1928812276',
      isFirstPen: false,
      minute: '32',
      ownGoal: false,
      periodTime: 1,
      tagName: 'Ánderson Santamaría',
    });
    wrapper.update();
    expect(wrapper.find('SummaryHighlight')).toHaveLength(1);
    expect(wrapper.state('activeTeam')).toEqual('away');
  });
  it('should not update state if no homeData or awayData available', () => {
    const data2 = cloneDeep(props.data);
    const data3 = Object.assign({}, data2, {
      homeData: [], awayData: [],
    });
    const wrapper = mount(<MatchSummary data={data3} />);
    expect(wrapper.state('activeHighlight')).toEqual(null);
    wrapper.instance().highlightHandler(mockEvent, '1', 'home');
    expect(wrapper.state('activeTeam')).toEqual(null);
    expect(wrapper.state('activeHighlight')).toEqual(null);
  });
  it('should render with correct period from timeline data', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const wrapper = shallow(<MatchSummary {...props} />);
    expect(wrapper.find('SummaryMatch').props().period).toBe('2');
  });
  it('should render correct period  with no timeline data', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    props.data.timelineData = [];
    const wrapper = shallow(<MatchSummary {...props} />);
    expect(wrapper.find('SummaryMatch').props().period).toBe('1');
  });
  it('should have prop isWorldCupMvp into WidgetTitle', () => {
    const wrap = shallow(<MatchSummary {...props} widgetContext={{ isWorldCupMVP: true }} />);
    expect(wrap.find('WidgetTitle').prop('isLowerCase')).toBe(true);
  });
  it('should have FALSE prop isWorldCupMvp into WidgetTitle', () => {
    const wra = shallow(<MatchSummary {...props} widgetContext={{ isWorldCupMVP: false }} />);
    expect(wra.find('WidgetTitle').prop('isLowerCase')).toBe(false);
  });
});
