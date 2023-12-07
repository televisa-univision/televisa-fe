import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';

import mockApiData from 'server/proxy/api/page/__mocks__/mockPageApiData.json';
import FourItems from './FourItems';

/**
 * Mocked content items for test
 * @type {Array}
 */
let contentItems;

beforeAll(() => {
  contentItems = mockApiData.data.widgets[0].contents;
});

/** @test {FourItems} */
describe('FourItems Spec', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<FourItems content={contentItems} />, div);
  });
  it('should render eight PromoItem component, four for each device', () => {
    const wrapper = shallow(<FourItems content={contentItems} />);
    expect(wrapper.find('PromoItem').length).toBe(8);
  });
  it('should show topicbar', () => {
    const wrapper = mount(<FourItems content={contentItems} settings={{ title: 'Hello' }} />);
    expect(wrapper.find('TopicBar').length).toBe(1);
  });
  it('should render an empty div if content is anything other than an array', () => {
    const wrapper = shallow(<FourItems content={[]} />);
    expect(wrapper.find('.uvs-widget').exists()).toBe(false);
  });
});
