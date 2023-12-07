import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import mockApiData from 'server/proxy/api/page/__mocks__/mockPageApiData.json';
import TagItem from './TagItem';

/**
 * Mocked content items for test
 * @type {Array}
 */
let contentItems;

beforeAll(() => {
  /* eslint prefer-destructuring: ["error", {VariableDeclarator: {object: true}}] */
  contentItems = mockApiData.data.widgets[0].contents[0];
});

/** @test {TagItem} */
describe('TagItems Spec', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TagItem content={contentItems} />, div);
  });
  it('should render one PromoItem', () => {
    const wrapper = shallow(<TagItem content={contentItems} />);
    expect(wrapper.find('PromoItem').length).toBe(1);
  });
});
