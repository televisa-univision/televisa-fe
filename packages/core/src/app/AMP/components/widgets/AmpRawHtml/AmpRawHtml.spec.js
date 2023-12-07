import React from 'react';
import { shallow } from 'enzyme';

import AmpRawHtml from '.';

jest.mock('@univision/fe-commons/dist/utils/loaders/twitter', () => jest.fn());

describe('Quote tests', () => {
  it('renders the html', () => {
    const wrapper = shallow(<AmpRawHtml chunk={{ objectData: { html: '<div>Hello</div>' } }} />);
    expect(wrapper.html()).toContain('<div>Hello</div>');
  });

  it('renders the html for an external content', () => {
    const wrapper = shallow(<AmpRawHtml chunk={{ objectData: { responseData: { html: '<div>Hello</div>' } } }} />);
    expect(wrapper.html()).toContain('<div>Hello</div>');
  });

  it('renders the AMP script', () => {
    const wrapper = shallow(<AmpRawHtml />);
    expect(wrapper.html()).toContain('function resizeAmpIframe');
  });
});
