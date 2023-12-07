import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';

import Tracker from '@univision/fe-commons/dist/utils/tracking/tealium/Tracker';
import squadExtractor from '@univision/shared-components/dist/extractors/squadExtractor';
import squadMock from '../../../utils/mocks/squad.json';
import Squad from '.';

const getEventsMock = jest.fn();

const squadData = squadExtractor(squadMock);
const mockEvent = {
  preventDefault: jest.fn(),
  nativeEvent: {},
};
mockEvent.nativeEvent = mockEvent;
jest.useFakeTimers();

/** @test {Squad} */
describe('Squad ', () => {
  beforeEach(() => {
    getEventsMock.mockClear();
  });

  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Squad />, div);
  });

  it('should render roster list', () => {
    const wrapper = shallow(<Squad roster={{ data: squadData }} />);
    expect(wrapper.find('SquadLayout')).toHaveLength(1);
  });

  it('returns null if the squad data is empty', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const wrapper = shallow(<Squad roster={{ data: [] }} />);
    expect(wrapper.getElement()).toBeNull();
  });

  it('should call functions', () => {
    mount(<Squad
      roster={{ data: squadData }}
      getSquad={getEventsMock}
    />);
    expect(getEventsMock).toBeCalled();
  });

  it('should call player tracker with correct event', () => {
    const trackerSpy = jest.spyOn(Tracker, 'fireEvent');
    const wrapper = mount(<Squad roster={{ data: squadData }} getSquad={getEventsMock} />);
    wrapper.find('Link').first().simulate('click', mockEvent);
    jest.runOnlyPendingTimers();
    expect(trackerSpy).toHaveBeenLastCalledWith(expect.objectContaining({
      event: 'engagement',
      event_action: 'Plantel_playerclick',
    }));

    trackerSpy.mockRestore();
  });
});
