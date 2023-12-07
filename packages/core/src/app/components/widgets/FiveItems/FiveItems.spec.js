import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import mockApiData from 'server/proxy/api/page/__mocks__/mockPageApiData.json';
import FiveItems from './FiveItems';

/**
 * Mocked content items for test
 * @type {Array}
 */
let contentItems;

beforeAll(() => {
  contentItems = mockApiData.data.widgets[0].contents;
});

/** @test {FiveItems} */
describe('FiveItems Spec', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<FiveItems content={contentItems} />, div);
  });
  it('should render two rows', () => {
    const wrapper = shallow(<FiveItems content={contentItems} />);
    expect(wrapper.find('.row').length).toBe(2);
  });
  it('should render two columns on the first row', () => {
    const wrapper = shallow(<FiveItems content={contentItems} />);
    expect(wrapper.find('.row').first().find('.col-md').length).toBe(2);
  });
  it('should render two columns on the second row', () => {
    const wrapper = shallow(<FiveItems content={contentItems} />);
    expect(wrapper.find('.row').at(1).find('.col-md-6').length).toBe(4);
  });
  it('should render an empty div if content is anything other than an array', () => {
    // Suppress console errors for this test as we're passing in props that violate the prop types
    /* eslint-disable no-console */
    console.error = jest.fn();
    const obj = {};
    const wrapper = shallow(<FiveItems content={obj} />);
    expect(wrapper.find('.uvs-widget').exists()).toBe(false);
  });
});
