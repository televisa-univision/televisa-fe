import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import PerformanceInfo from './PerformanceInfo';

jest.mock('../../../connected/PlayStationButton/PlayStationButton', () => 'PlayStationButton');

let props;
beforeEach(() => {
  props = {
    title: 'title',
    artist: 'artist',
    abacastId: '2135',
    playing: false,
    modifierClass: 'modifier',
    device: 'mobile',
  };
});
/** @test {PerformanceInfo} */
describe('PerformanceInfo ', () => {
  it('should render the component without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PerformanceInfo {...props} />, div);
  });
  it('should render the title', () => {
    const wrapper = shallow(<PerformanceInfo {...props} />);
    expect(wrapper.find('PerformanceInfo__Title').length).toBe(1);
  });
  it('should render the Artist', () => {
    const wrapper = shallow(<PerformanceInfo {...props} />);
    expect(wrapper.find('PerformanceInfo__Artist').length).toBe(1);
  });
  it('should render the stationLaunch', () => {
    const wrapper = mount(<PerformanceInfo {...props} />);
    expect(wrapper.find('StationLaunch').length).toBe(1);
  });
});
