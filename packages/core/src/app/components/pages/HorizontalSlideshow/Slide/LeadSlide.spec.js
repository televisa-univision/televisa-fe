import React from 'react';
import { shallow } from 'enzyme';
import LeadSlide from './LeadSlide';
import Styles from './LeadSlide.scss';

/** @test {Default} */
describe('LeadSlide', () => {
  it('should render a SlideHeader', () => {
    const wrapper = shallow(<LeadSlide />);
    expect(wrapper.find('SlideHeader')).toHaveLength(1);
  });

  it('should render the reaction status if available', () => {
    const wrapper = shallow(<LeadSlide reaction={{ test: 'TEST' }} />);
    expect(wrapper.find(`div.${Styles.reactionStatus}`).exists()).toBe(true);
  });

  it('should call renderSimpleStatus if available', () => {
    const mock = jest.fn();
    shallow(<LeadSlide renderSimpleStatus={mock} />);
    expect(mock).toHaveBeenCalledTimes(1);
  });
});
