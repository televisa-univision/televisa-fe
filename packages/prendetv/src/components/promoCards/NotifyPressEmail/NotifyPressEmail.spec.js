/**
 * @module PrendeTV Notify Press Email Specs
 */
import React from 'react';
import { mount, shallow } from 'enzyme';

import Subscribe from './index';

const simulate = {};

window.addEventListener = jest.fn((event, cb) => {
  simulate[event] = cb;
});
window.dataLayer = {
  push: jest.fn(),
};

const initalProps = {
  disabledForm: false,
  formPlaceholder: 'correo@server.com',
  headLine: 'headline',
  index: 1,
};

/**
 * @test {Subscribe}
 */
describe('Prende TV Notify Press Email test', () => {
  it('should render correctly', () => {
    const wrapper = shallow(
      <Subscribe {...initalProps} />
    );

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('NotifyPressEmail__Wrapper')).toHaveLength(1);
  });
  it('should render the iframe suscription correctly', () => {
    const wrapper = shallow(
      <Subscribe {...initalProps} />
    );

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('NotifyPressEmail__IframeContainer')).toHaveLength(1);
  });

  it('should render the iframe suscription correctly when the form is disabled', () => {
    const wrapper = shallow(
      <Subscribe index={0} headLine="title" disabledForm />
    );

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('NotifyPressEmail__IframeContainer')).toHaveLength(0);
  });

  it('should not track anything if the post message doesnt meet with the validations', () => {
    mount(
      <Subscribe {...initalProps} />
    );
    simulate.message({
      data: {
        type: 'wrong_type',
        subscriber_key: 'xxx@xxx.com',
        positionId: 'subscribe-ifr-1',
      },
    });
    expect(window.dataLayer.push).not.toBeCalled();
  });
  it('should track when the post message does meet with the requirements', () => {
    mount(
      <Subscribe index={0} headLine="title" />
    );
    simulate.message({
      data: {
        type: 'track_click_subscribe',
        subscriber_key: 'xxx@xxx.com',
        positionId: 'subscribe-ifr-0',
      },
    });
    expect(window.dataLayer.push).toBeCalledWith({
      event: 'newsletter_subscribe',
    });
  });
});
