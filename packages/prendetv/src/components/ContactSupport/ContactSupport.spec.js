/**
 * @module PrendeTV Contact Support Specs
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import ContactSupport from '.';
import { PRENDE_TV_CONTACT } from '../../constants';

/**
 * @test {PrendeTVContactSupport}
 */
describe('PrendeTV Contact Support test', () => {
  it('should render correctly', () => {
    const div = document.createElement('div');

    ReactDOM.render(<ContactSupport />, div);
  });

  it('should render a `mailto` if formPlaceholder is an email', () => {
    const email = 'support@prende.tv';
    const wrapper = mount(<ContactSupport headLine="Contact Us" formPlaceholder={email} />);

    expect(wrapper.find('ContactSupport__ContactSupportEmail a').prop('href')).toBe(`mailto:${email}`);
  });

  it('should render a link to the support page if formPlaceholder is not an email', () => {
    const wrapper = mount(<ContactSupport headLine="Contact Us" formPlaceholder="some text" />);

    expect(wrapper.find('ContactSupport__ContactSupportEmail a').prop('href')).toBe(PRENDE_TV_CONTACT);
  });
});
