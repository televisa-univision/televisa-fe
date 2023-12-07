import React from 'react';
import { shallow } from 'enzyme';

import LisItemMetadata from '.';
import dataList from './__mocks__/dataListItem.json';

const props = {
  ...dataList,
};

/** @test {LisItemMetadata} */
describe('LisItemMetadata test', () => {
  it('should render all the metadata with lisItem', () => {
    const newProps = {
      page: {},
    };
    const wrapper = shallow(<LisItemMetadata {...newProps} />);
    expect(wrapper.find('script').isEmptyRender());
  });
  it('should render correctly of the Seo', () => {
    const wrapper = shallow(<LisItemMetadata {...props} />);
    const script = wrapper.find('script');
    expect(script).toHaveLength(1);
    expect(script.first().prop('breadcrumbList'));
  });
});
