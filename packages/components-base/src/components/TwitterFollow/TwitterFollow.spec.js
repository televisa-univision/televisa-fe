import React from 'react';
import { shallow } from 'enzyme';
import Button from '../Button';
import TwitterFollow from '.';

jest.mock('../Button', () => jest.fn());

describe('Twitter Follow Tests', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<TwitterFollow twitterUrl="https://twitter.com/nuriapuntonet" />);
    expect(wrapper.find(Button).length).toBe(1);
  });
  it('openFollowWindow when button is clicked', () => {
    const open = jest.fn();
    const wrapper = shallow(<TwitterFollow twitterUrl="https://twitter.com/nuriapuntonet" />);
    wrapper.instance().openFollowWindow = open;
    wrapper.find(Button).simulate('click');
    expect(open).toHaveBeenCalled();
  });
  it('opens new window with the profileFollowPage function', () => {
    global.window.open = jest.fn();
    const wrapper = shallow(<TwitterFollow twitterUrl="https://twitter.com/nuriapuntonet" />);
    wrapper.instance().openFollowWindow();
    expect(global.window.open.mock.calls[0][0]).toEqual('https://twitter.com/intent/follow?original_referer=https%3A%2F%2Fdev.twitter.com%2Fweb%2Ffollow-button&ref_src=twsrc%5Etfw&screen_name=nuriapuntonet&tw_p=followbutton');
    expect(global.window.open.mock.calls[0][1]).toEqual('_blank');
  });
});
