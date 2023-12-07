import React from 'react';
import { mount } from 'enzyme';
import NavigationTracker from '@univision/fe-commons/dist/utils/tracking/tealium/navigation/NavigationTracker';
import * as redux from 'react-redux';

import ButtonShowEventsVote from './ButtonShowEventsVote';
import ButtonShowEventsTickets from './ButtonShowEventsTickets';
import ShowEvents from './ShowEvents.json';
import ButtonShowEvents from '.';

redux.useSelector = jest.fn();

describe('ButtonShowEvents', () => {
  const props = ShowEvents;
  afterEach(() => {
    jest.clearAllMocks();
    window.dataLayer = undefined;
  });

  it('should not render buttons if the show has no data', () => {
    const wrapper = mount(<ButtonShowEvents />);
    expect(wrapper.find('ButtonShowEventsVote')).toHaveLength(0);
    expect(wrapper.find('ButtonShowEventsTickets')).toHaveLength(0);
  });

  it('default vote amas button', () => {
    const wrapper = mount(<ButtonShowEventsVote eventData={props['/shows/latin-american-music-awards']} />);
    expect(wrapper.find('ActionLink')).toBeDefined();
  });

  it('should track vote amas button when is clicked', () => {
    jest.spyOn(redux, 'useSelector').mockReturnValue({ domain: 'www.univison.com' });
    const wrapper = mount(<ButtonShowEventsVote eventData={props['/shows/latin-american-music-awards']} />);
    wrapper.find('ActionLink').simulate('click');
    expect(window.dataLayer).toBeDefined();
  });

  it('default tickets amas button', () => {
    const wrapper = mount(<ButtonShowEventsTickets eventData={props['/shows/latin-american-music-awards']} />);
    expect(wrapper.find('ActionLink')).toBeDefined();
  });

  it('should track tickets button when is clicked', () => {
    jest.spyOn(NavigationTracker, 'track');
    const wrapper = mount(<ButtonShowEventsTickets eventData={props['/shows/latin-american-music-awards']} />);
    wrapper.find('ActionLink').simulate('click');
    expect(window.dataLayer).toBeDefined();
  });

  it('should render all pln buttons', () => {
    const wrapper = mount(<ButtonShowEvents eventData={props['/shows/premio-lo-nuestro']} />);
    expect(wrapper.find('ButtonShowEventsVote')).toHaveLength(1);
    expect(wrapper.find('ButtonShowEventsTickets')).toHaveLength(1);
  });

  it('default vote pln button', () => {
    const wrapper = mount(<ButtonShowEventsVote eventData={props['/shows/premio-lo-nuestro']} />);
    expect(wrapper.find('ActionLink')).toBeDefined();
  });

  it('should track vote premio lo nuestro button when is clicked', () => {
    jest.spyOn(redux, 'useSelector').mockReturnValue({ domain: 'www.univison.com' });
    const wrapper = mount(<ButtonShowEventsVote eventData={props['/shows/premio-lo-nuestro']} />);
    wrapper.find('ActionLink').simulate('click');
    expect(window.dataLayer).toBeDefined();
  });

  it('default tickets pln button', () => {
    const wrapper = mount(<ButtonShowEventsTickets eventData={props['/shows/premio-lo-nuestro']} />);
    expect(wrapper.find('ActionLink')).toBeDefined();
  });

  it('should track tickets pln button when is clicked', () => {
    jest.spyOn(NavigationTracker, 'track');
    const wrapper = mount(<ButtonShowEventsTickets eventData={props['/shows/premio-lo-nuestro']} />);
    wrapper.find('ActionLink').simulate('click');
    expect(window.dataLayer).toBeDefined();
  });

  it('should render all pj buttons', () => {
    const wrapper = mount(<ButtonShowEvents eventData={props['/shows/premios-juventud']} />);
    expect(wrapper.find('ButtonShowEventsVote')).toHaveLength(1);
    expect(wrapper.find('ButtonShowEventsTickets')).toHaveLength(1);
  });

  it('default vote pj button', () => {
    const wrapper = mount(<ButtonShowEventsVote eventData={props['/shows/premios-juventud']} />);
    expect(wrapper.find('ActionLink')).toBeDefined();
  });

  it('should track vote pj button when is clicked', () => {
    jest.spyOn(redux, 'useSelector').mockReturnValue({ domain: 'www.univison.com' });
    const wrapper = mount(<ButtonShowEventsVote eventData={props['/shows/premios-juventud']} />);
    wrapper.find('ActionLink').simulate('click');
    expect(window.dataLayer).toBeDefined();
  });

  it('default tickets pj button', () => {
    const wrapper = mount(<ButtonShowEventsTickets eventData={props['/shows/premios-juventud']} />);
    expect(wrapper.find('ActionLink')).toBeDefined();
  });

  it('should track tickets pj button when is clicked', () => {
    jest.spyOn(NavigationTracker, 'track');
    const wrapper = mount(<ButtonShowEventsTickets eventData={props['/shows/premios-juventud']} />);
    wrapper.find('ActionLink').simulate('click');
    expect(window.dataLayer).toBeDefined();
  });
});
