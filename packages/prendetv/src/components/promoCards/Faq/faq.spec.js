/**
 * @module PrendeTV FAQ Specs
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import Faq from './index';
import faqProps from './__mocks__/faq.json.js';

/**
 * @test {PrendeTVFAQPage}
 */
describe('FAQ Promo Card test', () => {
  it('should render correctly', () => {
    const div = document.createElement('div');

    ReactDOM.render(<Faq {...faqProps} />, div);
  });

  it('should scroll to the answer when click on a question', () => {
    const spyScrollTo = jest.fn();
    Object.defineProperty(global.window, 'scrollTo', { value: spyScrollTo });
    const wrapper = mount(<Faq {...faqProps} />);

    wrapper.find('Faq__Question').children().at(0).simulate('click');

    expect(spyScrollTo).toHaveBeenCalled();

    spyScrollTo.mockClear();
  });

  it('should scroll to the answer when click on a trending topic', () => {
    const spyScrollTo = jest.fn();
    Object.defineProperty(global.window, 'scrollTo', { value: spyScrollTo });
    const wrapper = mount(<Faq {...faqProps} />);

    wrapper.find('Faq__TrendingTopic').children().at(0).simulate('click');

    expect(spyScrollTo).toHaveBeenCalled();

    spyScrollTo.mockClear();
  });

  it('should scroll back to the top when clicking the Back to Top button', () => {
    const spyScrollTo = jest.fn();
    Object.defineProperty(global.window, 'scrollTo', { value: spyScrollTo });
    const wrapper = mount(<Faq {...faqProps} />);

    wrapper.find('Faq__BackToTop').simulate('click');

    expect(spyScrollTo).toHaveBeenCalled();

    spyScrollTo.mockClear();
  });
});
