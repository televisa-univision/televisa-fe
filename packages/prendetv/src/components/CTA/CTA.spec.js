/**
 * @module PrendeTV Call To Action test
 */
import React from 'react';
import { shallow } from 'enzyme';
import ReactDOM from 'react-dom';

import * as helpers from '@univision/fe-commons/dist/utils/helpers';

import * as prendeHelpers from '../../utils';
import CTA from '.';

helpers.setCookie = jest.fn();
prendeHelpers.setContentTracking = jest.fn();

const props = {
  href: 'https://app.prende.tv',
  target: '_blank',
  text: 'Click here',
};

/**
 * @test {Call to Action}
 */
describe('Prende TV Static Call To Action test', () => {
  it('should render correctly in the DOM', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CTA />, div);
  });
  it('should render correctly', () => {
    const wrapper = shallow(<CTA {...props} />);

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('CTA__Link')).toBeDefined();
  });
  it('should call content tracking and set cookie', () => {
    const wrapper = shallow(<CTA {...props} />);
    wrapper.find('CTA__Link').at(0).simulate('click');
    expect(prendeHelpers.setContentTracking).toHaveBeenCalledTimes(1);
    expect(helpers.setCookie).toHaveBeenCalledTimes(1);
  });
});
