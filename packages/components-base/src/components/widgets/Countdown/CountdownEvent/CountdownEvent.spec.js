import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';

import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import Store from '@univision/fe-commons/dist/store/store';
import features from '@univision/fe-commons/dist/config/features';
import CountdownEvent from '.';
import mockSettings from '../__mocks__/settings.json';

let props;

/** @test {CountdownEvent} */
describe('CountdownEvent ', () => {
  beforeEach(() => {
    props = {
      link: mockSettings.eventLink,
      date: mockSettings.date,
      hasBg: false,
      isMobile: false,
      soccerMatch: mockSettings.soccerMatch,
      titleSettings: {
        title: 'Event Title',
      },
    };
  });
  it('should render the component without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CountdownEvent {...props} />, div);
  });
  it('should render as link container', () => {
    const wrapper = mount(<CountdownEvent {...props} />);
    expect(wrapper.find('a')).toHaveLength(1);
    expect(wrapper.find('CountdownEvent__EventContainer')).toHaveLength(1);
  });
  it('should not render as link container if no have link data', () => {
    const wrapper = mount(<CountdownEvent {...props} link={{ href: null }} />);
    expect(wrapper.find('a')).toHaveLength(0);
    expect(wrapper.find('CountdownEvent__EventContainer span')).toHaveLength(2);
  });
  it('should render the soccer teams when have match data', () => {
    const wrapper = shallow(<CountdownEvent {...props} />);
    expect(wrapper.find('Team')).toHaveLength(2);
  });
  it('should render the soccer teams when have match data in abbreviated names', () => {
    const data = { ...props, isMobile: true };
    const wrapper = shallow(<CountdownEvent {...data} />);
    expect(wrapper.find('Team')).toHaveLength(2);
    expect(wrapper.find({ isAbbreviated: true })).toHaveLength(2);
  });
  it('should render only the title when not have soccer match data', () => {
    const wrapper = shallow(<CountdownEvent {...props} soccerMatch={null} />);
    expect(wrapper.find('Team')).toHaveLength(0);
    expect(wrapper.find('CountdownEvent__TopicBarStyled')).toHaveLength(1);
  });
  it('should render the topic bar with dark variant when the background is present', () => {
    props.hasBg = true;
    const wrapper = shallow(<CountdownEvent {...props} soccerMatch={null} />);
    expect(wrapper.find('CountdownEvent__TopicBarStyled').props().variant).toEqual('dark');
  });
});
describe('Countdown tracking', () => {
  it('should track clicks on the Countdown', () => {
    const wrapper = shallow(
      <CountdownEvent
        {...props}
        widgetContext={{ type: 'test' }}
      />
    );
    Store.dispatch(setPageData({ data: { type: 'section' } }));
    const trackerSpy = jest.spyOn(WidgetTracker, 'track');
    wrapper.find('CountdownEvent__EventContainer').simulate('click');
    expect(trackerSpy).toHaveBeenLastCalledWith(
      expect.any(Function),
      {
        target: 'content',
        widgetContext: { type: 'test' },
      }
    );
  });
  it('should have isWorldCupMVP to be true', () => {
    features.deportes.isWorldCupMVP = jest.fn(() => true);
    const wrapper = mount(<CountdownEvent {...props} />);
    const match = wrapper.find('CountdownEvent__Match');
    expect(match.prop('isWorldCupMVP')).toBe(true);
  });
  it('should have isWorldCupMVP to be true', () => {
    features.deportes.isWorldCupMVP = jest.fn(() => true);
    const wrapper = mount(<CountdownEvent {...props} />);
    const match = wrapper.find('CountdownEvent__Match');
    expect(match.prop('isWorldCupMVP')).toBe(true);
  });
});
