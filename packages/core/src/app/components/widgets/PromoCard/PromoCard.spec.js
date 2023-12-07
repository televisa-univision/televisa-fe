import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import PageApi from 'server/proxy/api/page/__mocks__/PageApi';
import PromoCard from './PromoCard';

/**
 * Mocked content items for test
 * @type {Array}
 */
let contentItems = [];

beforeAll(async (done) => {
  const payload = await PageApi.getPage('test');
  contentItems = payload.data.widgets[31].contents;
  done();
});

/** @test {PromoCard} */
describe('PromoCard Spec', () => {
  it('should renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PromoCard content={contentItems} />, div);
  });
  it('should render a AltoImpactoOpening', () => {
    const wrapper = shallow(<PromoCard content={contentItems} />);
    expect(wrapper.find('GradientBox').length).toBe(2);
  });
  it('should render empty div if content is []', () => {
    const wrapper = shallow(<PromoCard content={[]} />);
    expect(wrapper.contains(<div />)).toBe(false);
  });
  it('should render an empty div if content is anything other than an array', () => {
    // Suppress console errors for this test as we're passing in props that violate the prop types
    /* eslint-disable no-console */
    console.error = jest.fn();
    const obj = {};
    const wrapper = shallow(<PromoCard content={obj} />);
    expect(wrapper.find('div.promoCardList').exists()).toBe(false);
  });
});
