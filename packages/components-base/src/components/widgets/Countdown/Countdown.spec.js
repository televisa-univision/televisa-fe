import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';

import Countdown from './Countdown';
import mockSettings from './__mocks__/settings.json';

jest.useFakeTimers();

let props;

/** @test {Countdown} */
describe('Countdown', () => {
  beforeEach(() => {
    props = {
      settings: mockSettings,
    };
  });

  it('should renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Countdown {...props} />, div);
  });

  it('should render empty if not have valid settings', () => {
    const wrapper = mount(<Countdown settings={null} />);
    expect(wrapper.find('Countdown__Container')).toHaveLength(0);
  });

  it('should render correctly with background', () => {
    props.settings.background = mockSettings.background;
    const wrapper = mount(<Countdown {...props} />);
    expect(wrapper.find('Countdown__Container')).toHaveStyleRule('background-image', 'url(https://st1.uvnimg.com/93/e2/4f447b9749a48819de461f000618/back-2x.jpg)');
  });

  it('should render timer container', () => {
    const wrapper = shallow(<Countdown {...props} />);
    wrapper.setState({ active: true });
    expect(wrapper.find('Countdown__Timer')).toHaveLength(1);
  });

  it('should not render timer container is active state is false', () => {
    const wrapper = shallow(<Countdown {...props} />);
    wrapper.setState({ active: false });
    expect(wrapper.find('Countdown__Timer')).toHaveLength(0);
  });

  it('should render a Countdown Logo', () => {
    const wrapper = shallow(<Countdown {...props} />);
    wrapper.setState({ active: true });
    expect(wrapper.find('CountdownLogo')).toHaveLength(1);
  });

  it('should render a Sponsor', () => {
    const wrapper = mount(<Countdown {...props} />);
    expect(wrapper.find('Sponsor')).toHaveLength(1);
  });

  it('should not render a Sponsor if it is not provided', () => {
    props.settings.sponsor = null;
    const wrapper = mount(<Countdown settings={props} />);
    expect(wrapper.find('Sponsor')).toHaveLength(0);
  });

  it('should not render a logo if it is not provided', () => {
    props.settings.logo = null;
    const wrapper = shallow(<Countdown settings={props} />);
    expect(wrapper.find('CountdownLogo')).toHaveLength(0);
  });

  it('should not render CalReply if it is not provided', () => {
    props.settings.externalWidgets = null;
    const wrapper = mount(<Countdown settings={props} />);
    expect(wrapper.find('Countdown__CalReplyStyled')).toHaveLength(0);
  });

  it('should render start lead text', () => {
    const wrapper = mount(<Countdown {...props} />);
    wrapper.setState({ active: true });
    const container = wrapper.find('Countdown__TimerTitle');
    expect(container.text()).toBe('Faltan:');
  });

  it('should render end lead text', () => {
    const wrapper = mount(<Countdown {...props} />);
    wrapper.setState({ active: false });
    const container = wrapper.find('Countdown__TimerTitle');
    expect(container.text()).toBe('Time Over');
  });

  it('should renders the time remaining as expected', () => {
    const wrapper = shallow(<Countdown {...props} />);
    wrapper.setState({
      eventDate: new Date(props.settings.date),
      todayDate: new Date(),
    });
    expect(wrapper.find('CountdownItem')).toBeDefined();
  });

  it('should init the timer on Mount', () => {
    const wrapper = mount(<Countdown {...props} />);
    expect(wrapper.instance().timer).toBeDefined();
  });

  it('should cancel the time on Unmount', () => {
    const wrapper = mount(<Countdown {...props} />);
    const timerCancelSpy = jest.spyOn(wrapper.instance().timer, 'cancel');
    wrapper.unmount();
    expect(timerCancelSpy).toHaveBeenCalledTimes(1);
  });

  it('should not cancel the timer on Unmount if was previously canceled', () => {
    const wrapper = mount(<Countdown {...props} />);
    const timerCancelSpy = jest.spyOn(wrapper.instance().timer, 'cancel');
    wrapper.setState({
      eventDate: new Date(props.settings.date),
      todayDate: new Date('2020-08-08T21:00:54-04:00'),
    });
    jest.runTimersToTime(1000);
    expect(timerCancelSpy).toHaveBeenCalledTimes(1);
    expect(wrapper.instance().timer).toBeNull();

    timerCancelSpy.mockClear();
    wrapper.unmount();
    expect(timerCancelSpy).toHaveBeenCalledTimes(0);
  });

  it('should update time state when countdown gets called', () => {
    const eventDate = new Date('2018-08-09T21:00:54-04:00');
    const mockDateToday = new Date('2018-08-09T20:00:54-04:00');
    const realDate = Date;
    global.Date = jest.fn(() => mockDateToday);
    global.Date.now = jest.fn(() => mockDateToday.getTime());

    const wrapper = mount(<Countdown {...props} />);
    const time = [];
    wrapper.setState({
      eventDate,
      todayDate: mockDateToday,
    });
    jest.runTimersToTime(1000);
    expect(wrapper.state('time')).not.toBe(time);
    expect(wrapper.state('active')).toBe(true);

    global.Date = realDate;
  });

  it('should return time ramaining as 00 if event date has passed', () => {
    const wrapper = mount(<Countdown {...props} />);
    const timerCancelSpy = jest.spyOn(wrapper.instance().timer, 'cancel');
    const time = [
      { number: '00', title: 'Días' },
      { number: '00', title: 'Hrs' },
      { number: '00', title: 'Mins' },
      { number: '00', title: 'Segs' },
    ];
    wrapper.setState({
      eventDate: new Date(props.settings.date),
      todayDate: new Date('2020-08-08T21:00:54-04:00'),
    });
    jest.runTimersToTime(1000);
    expect(timerCancelSpy).toHaveBeenCalled();
    expect(wrapper.state('time')).toEqual(time);
    expect(wrapper.state('active')).toBeFalsy();
  });

  it('should return time ramaining as 00 if days, hours, mins, seconds left are same', () => {
    const now = new Date();
    props.settings.date = now.toISOString();
    const wrapper = mount(<Countdown {...props} />);
    const time = [
      { number: '00', title: 'Días' },
      { number: '00', title: 'Hrs' },
      { number: '00', title: 'Mins' },
      { number: '00', title: 'Segs' },
    ];
    expect(wrapper.state('time')).toEqual(time);
    expect(wrapper.state('active')).toBeFalsy();
  });

  it('should calls countdown after 1 second when component mounts', () => {
    const countDownSpy = jest.spyOn(Countdown.prototype, 'countDown');
    mount(<Countdown {...props} />);
    expect(countDownSpy).not.toHaveBeenCalled();
    jest.runTimersToTime(1000);
    expect(countDownSpy).toHaveBeenCalledTimes(1);
  });
});
