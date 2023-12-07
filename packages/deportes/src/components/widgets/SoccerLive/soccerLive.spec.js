import React from 'react';
import { shallow, mount } from 'enzyme';
import createTimer from '@univision/fe-commons/dist/utils/timer';

import * as redux from 'react-redux';
import * as selectors from '@univision/fe-commons/dist/store/selectors/page-selectors';
import SoccerLive from './index';
import ShowEndedMatchesButton from './ShowEndedMatchesButton';
import eventsGroupMock from './eventsGroupMock.json';
import SoccerLiveGroups from './SoccerLiveGroups';

let props;
const actions = {
  getAllEvents: jest.fn(),
};
const propsTest = {
  getAllEvents: () => {},
  eventGroups: eventsGroupMock,
  maxItemsReached: true,
  isWorldCupMVP: true,
  ready: true,
};
const mockEvent = {
  preventDefault: jest.fn(),
  nativeEvent: {},
};
mockEvent.nativeEvent = mockEvent;
describe('SoccerLiveRebrand tests', () => {
  const timer = {
    start: jest.fn(),
    stop: jest.fn(),
    cancel: jest.fn(),
  };
  beforeEach(() => {
    props = {
      getAllEvents: () => {},
      eventGroups: eventsGroupMock,
      maxItemsReached: false,
      isWorldCupMVP: true,
      ready: true,
    };
  });
  it('renders as expected', () => {
    const wrapper = shallow(<SoccerLive {...props} />);
    expect(wrapper.find(SoccerLive)).toBeDefined();
  });
  it('renders as expected with maxitemreached in true', () => {
    const wrapper = shallow(<SoccerLive {...propsTest} />);
    expect(wrapper.find(SoccerLive)).toBeDefined();
  });
  it('renders as expected with showEndedMatches in false', () => {
    const wrapper = shallow(<SoccerLive {...propsTest} />);
    wrapper.setState({ showEndedMatches: false });
    expect(wrapper.find(SoccerLive)).toBeDefined();
  });
  it('renders as expected with ended button ', () => {
    const wrapper = shallow(<SoccerLive {...propsTest} />);
    wrapper.setState({ showEndedMatches: false });
    expect(wrapper.find(SoccerLive)).toBeDefined();
    expect(wrapper.find('SoccerLiveGroups')).toBeDefined();
  });
  it('renders as expected with ready in false', () => {
    propsTest.ready = false;
    const wrapper = shallow(<SoccerLive {...propsTest} />);
    wrapper.setState({ showEndedMatches: false });
    expect(wrapper.find(SoccerLive)).toBeDefined();
  });
  it('renders as expected with showEndedMatches in true', () => {
    const wrapper = shallow(<SoccerLive {...props} />);
    wrapper.setState({ showEndedMatches: true });
    expect(wrapper.find(SoccerLive)).toBeDefined();
  });
  it('renders as expected with timer', () => {
    propsTest.ready = false;
    const wrapper = shallow(<SoccerLive {...propsTest} />);
    wrapper.instance().timer = createTimer(90, () => {});
    expect(wrapper.find(SoccerLive)).toBeDefined();
  });
  it('renders as expected with show ended in true', () => {
    const wrapper = shallow(
      <ShowEndedMatchesButton
        showEndedMatches
        onToogle={() => {}}
        isWorldCupMVP
        isTud
      />
    );
    expect(wrapper.find('ShowEndedMatchesButton')).toBeDefined();
  });
  it('renders as expected with isWorldCupMVP in false', () => {
    props.isWorldCupMVP = false;
    const wrapper = shallow(<SoccerLive {...props} />);
    expect(wrapper.find(SoccerLive)).toBeDefined();
  });
  it('renders as expected with isWorldCupMVP in true', () => {
    props.isWorldCupMVP = true;
    const wrapper = shallow(<SoccerLive {...props} />);
    expect(wrapper.find(SoccerLive)).toBeDefined();
  });
  it('renders as expected with isWorldCupMVP in true', () => {
    const propsSoccer = {
      getAllEvents: () => {},
      eventGroups: [],
      maxItemsReached: false,
      isWorldCupMVP: true,
      ready: true,
    };
    const wrapper = shallow(<SoccerLive {...propsSoccer} />);
    expect(wrapper.find(SoccerLive)).toBeDefined();
  });
  it('renders as expected with show ended in true', () => {
    const prropsSoccer = {
      eventsFilter: () => {},
      showEndedMatchesToogle: false,
      isWorldCupMVP: true,
    };
    const wrapper = shallow(
      <SoccerLiveGroups
        {...prropsSoccer}
      />
    );
    expect(wrapper.find('SoccerLiveGroups')).toBeDefined();
  });
  it('click on match event in soccer live', () => {
    jest.spyOn(redux, 'useSelector').mockImplementation(fn => fn());
    jest.spyOn(selectors, 'userLocationSelector').mockReturnValue('US');
    const wrapper = mount(
      <SoccerLive {...props} />
    );
    expect(wrapper.find('SoccerLive')).toHaveLength(1);
    expect(wrapper.find('SoccerLiveGroups')).toHaveLength(1);
    expect(wrapper.find('SoccerLiveEventGroup')).toHaveLength(3);
    expect(wrapper.find('MatchesEvents')).toHaveLength(3);
    wrapper.find('a').first().simulate('click');
  });
  it('click on match event in soccer live with atch without status', () => {
    jest.spyOn(redux, 'useSelector').mockImplementation(fn => fn());
    jest.spyOn(selectors, 'userLocationSelector').mockReturnValue('US');
    eventsGroupMock[0].events[0].status = null;
    props = {
      getAllEvents: () => {},
      eventGroups: eventsGroupMock,
      maxItemsReached: false,
      isWorldCupMVP: true,
      ready: true,
    };
    const wrapper = mount(
      <SoccerLive {...props} />
    );
    expect(wrapper.find('SoccerLive')).toHaveLength(1);
    expect(wrapper.find('SoccerLiveGroups')).toHaveLength(1);
    expect(wrapper.find('SoccerLiveEventGroup')).toHaveLength(3);
    expect(wrapper.find('MatchesEvents')).toHaveLength(3);
    wrapper.find('a').first().simulate('click');
  });
  it('click on match event in soccer live with atch without url', () => {
    jest.spyOn(redux, 'useSelector').mockImplementation(fn => fn());
    jest.spyOn(selectors, 'userLocationSelector').mockReturnValue('US');
    eventsGroupMock[0].events[0].url = undefined;
    props = {
      getAllEvents: () => {},
      eventGroups: eventsGroupMock,
      maxItemsReached: false,
      isWorldCupMVP: true,
      ready: true,
    };
    const wrapper = mount(
      <SoccerLive {...props} />
    );
    expect(wrapper.find('SoccerLive')).toHaveLength(1);
    expect(wrapper.find('SoccerLiveGroups')).toHaveLength(1);
    expect(wrapper.find('SoccerLiveEventGroup')).toHaveLength(3);
    expect(wrapper.find('MatchesEvents')).toHaveLength(3);
    wrapper.find('a').first().simulate('click');
  });
  it('click on match event in soccer live with atch without url and live', () => {
    jest.spyOn(redux, 'useSelector').mockImplementation(fn => fn());
    jest.spyOn(selectors, 'userLocationSelector').mockReturnValue('US');
    eventsGroupMock[0].events[0].url = undefined;
    eventsGroupMock[0].events[0].status = 'live';

    props = {
      getAllEvents: () => {},
      eventGroups: eventsGroupMock,
      maxItemsReached: false,
      isWorldCupMVP: true,
      ready: true,
    };
    const wrapper = mount(
      <SoccerLive {...props} />
    );
    expect(wrapper.find('SoccerLive')).toHaveLength(1);
    expect(wrapper.find('SoccerLiveGroups')).toHaveLength(1);
    expect(wrapper.find('SoccerLiveEventGroup')).toHaveLength(3);
    expect(wrapper.find('MatchesEvents')).toHaveLength(3);
    wrapper.find('a').first().simulate('click');
  });
  it('click on match event in soccer live with atch without url with isworldcup in false', () => {
    jest.spyOn(redux, 'useSelector').mockImplementation(fn => fn());
    jest.spyOn(selectors, 'userLocationSelector').mockReturnValue('US');
    eventsGroupMock[0].events[0].url = undefined;
    eventsGroupMock[0].events[0].status = 'live';

    props = {
      getAllEvents: () => {},
      eventGroups: eventsGroupMock,
      maxItemsReached: false,
      isWorldCupMVP: false,
      ready: true,
    };
    const wrapper = mount(
      <SoccerLive {...props} />
    );
    expect(wrapper.find('SoccerLive')).toHaveLength(1);
    expect(wrapper.find('SoccerLiveGroups')).toHaveLength(1);
    expect(wrapper.find('SoccerLiveEvents')).toHaveLength(3);
  });
  it('click on show ended games', () => {
    jest.spyOn(redux, 'useSelector').mockImplementation(fn => fn());
    jest.spyOn(selectors, 'userLocationSelector').mockReturnValue('US');
    eventsGroupMock[0].events[0].url = undefined;
    eventsGroupMock[0].events[0].status = 'live';

    props = {
      getAllEvents: actions.getAllEvents,
      eventGroups: eventsGroupMock,
      maxItemsReached: true,
      isWorldCupMVP: true,
      ready: true,
    };
    const wrapper = mount(
      <SoccerLive {...props} />
    );
    expect(wrapper.find('SoccerLive')).toHaveLength(1);
    expect(wrapper.find('SoccerLiveGroups')).toHaveLength(1);
    expect(wrapper.find('SoccerLiveEventGroup')).toHaveLength(3);
    expect(wrapper.find('ShowEndedMatchesButton')).toHaveLength(1);
    wrapper.find('button').first().simulate('click');
  });
  it('should clear the timer on unmount', () => {
    const wrapper = shallow(<SoccerLive {...props} />);
    const instance = wrapper.instance();
    instance.timer = timer;
    instance.componentWillUnmount();
    expect(instance.timer.cancel).toHaveBeenCalled();
  });
  it('call will unmount without timer', () => {
    const wrapper = shallow(<SoccerLive {...props} />);
    const instance = wrapper.instance();
    instance.timer = null;
    instance.componentWillUnmount();
    expect(instance.timer).toBe(null);
  });
  it('click on show ended games', () => {
    jest.spyOn(redux, 'useSelector').mockImplementation(fn => fn());
    jest.spyOn(selectors, 'userLocationSelector').mockReturnValue('US');
    eventsGroupMock[0].events[0].url = undefined;
    eventsGroupMock[0].events[0].status = 'live';

    props = {
      getAllEvents: null,
      eventGroups: eventsGroupMock,
      maxItemsReached: true,
      isWorldCupMVP: true,
      ready: true,
    };
    const wrapper = mount(
      <SoccerLive {...props} />
    );
    expect(wrapper.find('SoccerLive')).toHaveLength(1);
    expect(wrapper.find('SoccerLiveGroups')).toHaveLength(1);
    expect(wrapper.find('SoccerLiveEventGroup')).toHaveLength(3);
    expect(wrapper.find('ShowEndedMatchesButton')).toHaveLength(1);
    wrapper.find('button').first().simulate('click');
  });
});
