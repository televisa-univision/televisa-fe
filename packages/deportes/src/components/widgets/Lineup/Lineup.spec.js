import React from 'react';
import { shallow, mount } from 'enzyme';
import Tracker from '@univision/fe-commons/dist/utils/tracking/tealium/Tracker';
import lineupExtractor from '@univision/shared-components/dist/extractors/lineupExtractor';

import SoccerMatchNavContext from '../../base/SoccerMatchNav/SoccerMatchNavContext';
import data from '../../../utils/mocks/lineup.json';
import Lineup from '.';

jest.useFakeTimers();
let props;
let liveProps;
let propsError;
beforeEach(() => {
  props = {
    data: lineupExtractor(data),
    active: false,
    getLineup: () => {},
  };
  liveProps = {
    data: lineupExtractor(data),
    active: true,
    getLineup: () => {},
  };
  propsError = {
    data: { error: true },
    active: true,
  };
});

const mockEvent = {
  preventDefault: jest.fn(),
  nativeEvent: {},
};
mockEvent.nativeEvent = mockEvent;

describe('Lineup tests', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<Lineup {...props} />);
    expect(wrapper.find('.uvs-widget')).toHaveLength(1);
  });
  it('should renders ad type from widget settings', () => {
    const settings = {
      widgetAd: {
        type: 'Ad Test',
      },
    };
    const wrapper = shallow(<Lineup {...props} settings={settings} />);
    expect(wrapper.find('.uvs-ad-widget')).toHaveLength(1);
  });
  it('calls getLineup when it mounts', () => {
    const getLine = jest.fn();
    const wrapper = shallow(<Lineup getLineup={getLine} data={lineupExtractor(data)} />);
    wrapper.instance().componentDidMount();
    expect(getLine).toHaveBeenCalled();
  });
  it('renders not render error message if error received', () => {
    const wrapper = shallow(<Lineup {...propsError} />);
    expect(wrapper.find('Lineup__NoInfoStyled')).toHaveLength(0);
  });
  it('should init a timer on Mount', () => {
    const wrapper = shallow(<Lineup {...props} />);
    wrapper.instance().componentDidMount();
    expect(wrapper.instance().timer).toBeDefined();
  });
  it('calls update after 60 seconds when component mounts if is active event', () => {
    const wrapper = shallow(<Lineup {...liveProps} />);
    const timeTest = jest.fn();
    wrapper.instance().updateLineup = timeTest;
    wrapper.instance().componentDidMount();
    expect(timeTest).not.toBeCalled();
    jest.runTimersToTime(60000);
    expect(timeTest).toBeCalled();
  });
  it('calls timer cancel on unmount', () => {
    const wrapper = shallow(<Lineup {...liveProps} />);
    const timeTest = jest.fn();
    wrapper.instance().timer.cancel = timeTest;
    wrapper.instance().componentWillUnmount();
    expect(timeTest).toBeCalled();
  });
  it('should call onActiveIndexChange and track event in mobile', () => {
    global.innerWidth = 320;
    const trackerSpy = jest.spyOn(Tracker, 'fireEvent');
    const wrapper = mount(<Lineup {...liveProps} />);
    const showAllHandlerSpy = jest.spyOn(wrapper.instance(), 'onActiveIndexChange');
    wrapper.find('LineupButton').at(0).props().onPress();
    jest.runOnlyPendingTimers();

    expect(showAllHandlerSpy).toEqual(expect.any(Function));
    expect(trackerSpy).toHaveBeenLastCalledWith(expect.any(Object));
    showAllHandlerSpy.mockRestore();
  });
  it('should register nav item if have context and available data', () => {
    const setNavigationItemMock = jest.fn();
    const wrapper = mount(
      <SoccerMatchNavContext.Provider value={{ setNavigationItem: setNavigationItemMock }}>
        <Lineup {...props} />
      </SoccerMatchNavContext.Provider>
    );

    expect(wrapper.find('.uvs-widget')).toHaveLength(1);
    expect(setNavigationItemMock).toHaveBeenCalledTimes(1);
  });
  it('should call player tracker with correct event', () => {
    const trackerSpy = jest.spyOn(Tracker, 'fireEvent');
    const wrapper = mount(<Lineup {...liveProps} />);
    wrapper.find('Link').last().simulate('click', mockEvent);
    jest.runOnlyPendingTimers();
    expect(trackerSpy).toHaveBeenLastCalledWith(expect.objectContaining({
      event: 'engagement',
      event_action: 'lineup_playerclick',
    }));

    trackerSpy.mockRestore();
  });
});
