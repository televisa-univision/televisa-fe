import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import mockData from '../../../../../__mocks__/tudnPageData.json';
import ServerContent from '.';

const { widgets } = mockData.data.page.data;

/**
 * @test {ServerContent}
 */
describe('ServerContent test', () => {
  it('should renders as expected', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ServerContent device="desktop" widgets={widgets} />, div);
  });

  it('should not render component after mount', () => {
    const otherWidget = { contents: [], settings: { lazyLoaded: false } };
    const wrapper = mount(
      <ServerContent device="desktop" widgets={[otherWidget, ...widgets]} />,
    );

    expect(wrapper.find('div')).toHaveLength(0);
  });
});
