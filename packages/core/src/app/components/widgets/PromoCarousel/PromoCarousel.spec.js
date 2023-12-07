import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import PageApi from 'server/proxy/api/page/__mocks__/PageApi';
import PromoCarousel from './PromoCarousel';

/**
 * Mocked content items for test
 * @type {Array}
 */
let fourContentItems = [];

beforeAll(async (done) => {
  const payload = await PageApi.getPage('test');
  fourContentItems = payload.data.widgets[4].contents;
  done();
});

/** @test {PromoCarousel} */
describe('PromoCarousel Spec', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PromoCarousel content={fourContentItems} />, div);
  });

  it('should render right amount of content items', () => {
    const wrapper = shallow(<PromoCarousel content={fourContentItems} />);
    expect(wrapper.children().length).toBe(4);
  });
  it('should render the right type of component', () => {
    const wrapper = shallow(<PromoCarousel content={fourContentItems} />);
    expect(wrapper.children().find('PromoItem').length).toBe(4);
  });
});
