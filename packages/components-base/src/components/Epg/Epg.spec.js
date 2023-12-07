import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import * as helpers from '@univision/fe-commons/dist/utils/video';

import mockData from './__mocks__/epg.json';
import Epg from '.';

jest.useFakeTimers('modern');

const { digitalChannelSchedule } = mockData.contents[0];

/** @test {Epg} */
describe('Epg Spec', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(React.createElement(Epg), div);
  });
  it('should render correctly', () => {
    const wrapper = mount(<Epg digitalChannelSchedule={digitalChannelSchedule} />);
    expect(wrapper.find('Epg')).toHaveLength(1);
  });
  it('should call getEPGSchedule after one minute', () => {
    const trackSchedule = jest.spyOn(helpers, 'getEPGSchedule');
    const wrapper = mount(<Epg digitalChannelSchedule={digitalChannelSchedule} />);

    expect(trackSchedule).toHaveBeenCalledTimes(2);

    act(() => {
      jest.runTimersToTime(62000);
    });

    wrapper.update();

    expect(trackSchedule).toHaveBeenCalledTimes(4);
  });
  it('should render correctly in anchor mode', () => {
    const wrapper = mount(<Epg digitalChannelSchedule={digitalChannelSchedule} isAnchor />);
    expect(wrapper.find('.carousel').first().prop('itemsToBeDisplayedDefault')).toEqual(3);
  });
});
