import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';

import getTimeLeft from '@univision/fe-utilities/helpers/date/getTimeLeft';
import props from './__mocks__/countdown.json';

import Countdown from '.';

jest.mock('@univision/fe-utilities/helpers/date/getTimeLeft', () => jest.fn());
jest.useFakeTimers();
const eventDate = '2019-07-06T20:00:54-04:00';

/** @test {Countdown} */
describe('Countdown ', () => {
  it('should render the component without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Countdown />, div);
  });
  it('should render timerOverLeadText when the time expires', () => {
    getTimeLeft.mockReturnValue(0);
    const wrapper = mount(<Countdown {...props} date={eventDate} />);

    expect(wrapper.find('Countdown__TimerTitle').text()).toEqual(props.timerOverLeadText);
  });
  it('should render timerOverLeadText when the time expires', () => {
    getTimeLeft.mockReturnValue(98640000);
    const wrapper = mount(<Countdown {...props} date={eventDate} />);
    act(() => {
      jest.runTimersToTime(2000);
    });
    wrapper.update();
    expect(wrapper.find('CountdownItem').first().text()).toEqual('01Días');

    getTimeLeft.mockReturnValue(0);
    act(() => {
      jest.runTimersToTime(2000);
    });
    wrapper.update();

    expect(wrapper.find('Countdown__TimerTitle').text()).toEqual(props.timerOverLeadText);
  });
});
