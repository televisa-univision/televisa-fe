import React from 'react';
import { shallow, mount } from 'enzyme';
import * as storeHelpers from '@univision/fe-commons/dist/store/storeHelpers';
import leagueData from '../../../utils/mocks/competitions.json';
import ConfederationsData from '../../../utils/mocks/confederations.json';
import LeagueGrid from '.';

jest.useFakeTimers();
let props;
let props2;
beforeEach(() => {
  props = {
    title: 'Title',
    data: leagueData,
  };
  props2 = {
    title: 'Confederations',
    data: ConfederationsData,
  };
});

const newData = [{
  id: '1',
  name: 'Liga Mx',
  logo: 'https://cdn3.uvnimg.com/e6/21/35cf9f84468ca4b56f7cdf9234df/liga-mx-2x.png',
  url: 'https://www.univision.com/deportes/futbol/liga-mx-clausura',
  calreply: {
    href: '//univision.calreplyapp.com/ligamx',
    code: '!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(d.getElementById(id))return;js=d.createElement(s);js.id=id;js.src ="https://assets.calreplyapp.com/scripts/widget-loader.min.js";fjs.parentNode.insertBefore(js,fjs);}(document,"script", "calreply-wjs");',
  },
}];

storeHelpers.getDevice = jest.fn();

/** @test {LeagueGrid} */
describe('LeagueGrid ', () => {
  it('should render as expected', () => {
    const wrapper = shallow(<LeagueGrid {...props} />);
    expect(wrapper.find('div.uvs-widget').length).toBe(1);
  });
  it('should render with Calreply component', () => {
    const wrapper = shallow(<LeagueGrid title="title" type="bar" data={newData} />);
    expect(wrapper.find('CalReply')).toHaveLength(1);
  });
  it('should render empty div if no data is present', () => {
    const wrapper = shallow(<LeagueGrid title="title" data={[]} />);
    expect(wrapper.find('div').length).toBe(1);
  });
  it('should have tournament class if specified', () => {
    const wrapper = shallow(<LeagueGrid {...props} isTournamentGrid />);
    expect(wrapper.find('div.tournament').length).toBe(1);
  });
  it('it shows when mounted', () => {
    const wrapper = shallow(<LeagueGrid {...props} />);
    wrapper.instance().componentDidMount();
    expect(wrapper.instance().state).toBeDefined();
  });
  it('is visible changes state when called', () => {
    const wrapper = shallow(<LeagueGrid {...props} />);
    expect(wrapper.state('visible')).toEqual(1);
    wrapper.instance().setVisible();
    expect(wrapper.state('visible')).toEqual(1);
  });
  it('should call changeSelected when clicked', () => {
    const wrapper = shallow(<LeagueGrid {...props2} />);
    wrapper.instance().changeSelected(2);
    expect(wrapper.state('active')).toEqual(2);
  });
  it('should call changeSelected when clicked', () => {
    const wrapper = shallow(<LeagueGrid {...props2} />);
    wrapper.find('Button.navButton3').at(0).props().onPress();
    expect(wrapper.state('active')).toEqual(3);
  });
  it('should call window.gatsby_resize', () => {
    window.gatsby_resize = jest.fn();
    const wrapper = shallow(<LeagueGrid {...props2} />);
    wrapper.instance().resize();
    expect(window.gatsby_resize).toHaveBeenCalled();
  });
  it('should call resize when window.gatsby_resize is not defined', () => {
    const wrapper = mount(<LeagueGrid {...props2} />);
    const resizeSpy = jest.spyOn(wrapper.instance(), 'resize');
    wrapper.instance().changeSelected(2);
    expect(resizeSpy).not.toHaveBeenCalled();
    window.gatsby_resize = jest.fn();
    wrapper.instance().changeSelected(2);
    jest.runAllTimers();
    expect(resizeSpy).toHaveBeenCalled();
  });
  it('should clear the timeout when component unmounts', () => {
    const wrapper = mount(<LeagueGrid {...props2} />);
    const clearTimeoutSpy = jest.spyOn(window, 'clearTimeout');
    wrapper.instance().timeout = 1;
    wrapper.instance().componentWillUnmount();
    expect(clearTimeoutSpy).toHaveBeenCalledWith(1);
    clearTimeoutSpy.mockRestore();
  });
  it('should render as expected in mobile', () => {
    storeHelpers.getDevice.mockReturnValue('mobile');
    const wrapper = shallow(<LeagueGrid {...props} />);
    expect(wrapper.find('div.uvs-widget').length).toBe(1);
  });
});

describe('getDeviceConstant', () => {
  it('should return 2 if device is mobile', () => {
    expect(LeagueGrid.getDeviceConstant('mobile')).toEqual(2);
  });
  it('should return 3 if device is tablet', () => {
    expect(LeagueGrid.getDeviceConstant('tablet')).toEqual(3);
  });
  it('should return 4 if device is desktop', () => {
    expect(LeagueGrid.getDeviceConstant('desktop')).toEqual(4);
  });
});
