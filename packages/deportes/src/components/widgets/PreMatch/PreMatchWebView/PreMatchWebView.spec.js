import React from 'react';
import { shallow } from 'enzyme';

import PreMatchWebView from '.';
import data from '../../../../utils/mocks/prematch.json';

jest.mock('../../../utils/SportApiProvider', () => jest.fn());

describe('PreMatch Web View tests', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<PreMatchWebView eventId="944683" />);
    expect(wrapper.find('.uvs-widget')).toHaveLength(1);
  });
  it('renders empty div if no event id is passed', () => {
    const wrapper = shallow(<PreMatchWebView />);
    expect(wrapper.find('div')).toHaveLength(0);
  });
  it('should render PreMatch', () => {
    const wrapper = shallow(<PreMatchWebView eventId="944683" match="true" />);
    const callBackWrapper = shallow(wrapper.instance().renderPreMatch(data));
    expect(callBackWrapper.find('MatchInfoCards').length).toBe(1);
  });
  it('it shows when mounted', () => {
    const wrapper = shallow(<PreMatchWebView eventId="944683" />);
    wrapper.instance().componentDidMount();
    expect(wrapper.instance().state).toBeDefined();
  });
  it('is visible changes state when called', () => {
    const wrapper = shallow(<PreMatchWebView eventId="944683" />);
    expect(wrapper.state('visible')).toEqual(true);
    wrapper.instance().setVisible();
    expect(wrapper.state('visible')).toEqual(true);
  });
});
