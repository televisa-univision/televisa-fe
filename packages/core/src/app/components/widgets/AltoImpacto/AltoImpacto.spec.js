import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import PageApi from 'server/proxy/api/page/__mocks__/PageApi';
import AltoImpacto from './AltoImpacto';
/**
 * Mocked content items for test
 * @type {Array}
 */
let contentItems = [];

beforeAll(async (done) => {
  const payload = await PageApi.getPage('test');
  contentItems = payload.data.widgets[30].contents;
  done();
});

/** @test {AltoImpacto} */
describe('AltoImpacto ', () => {
  it('should render the component without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AltoImpacto content={contentItems} />, div);
  });

  it('should render an empty div if content is anything other than an array', () => {
    // Suppress console errors for this test as we're passing in props that violate the prop types
    /* eslint-disable no-console */
    console.error = jest.fn();
    const obj = {};
    const wrapper = shallow(<AltoImpacto content={obj} />);
    expect(wrapper.find('div.altoImpacto').exists()).toBe(false);
  });

  it('should render a GradientBox', () => {
    const wrapper = shallow(<AltoImpacto content={contentItems} />);
    expect(wrapper.find('GradientBox').length).toBe(1);
  });

  it('should render empty div if content is []', () => {
    const wrapper = shallow(<AltoImpacto content={[]} />);
    expect(wrapper.getElement()).toBe(null);
  });
});
