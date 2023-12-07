import React from 'react';
import { shallow } from 'enzyme';

import mockPageData from '../../../../__mocks__/uvnPageData.json';
import showMockPageData from '../../../../__mocks__/uvnShowPageData.json';

import UvnLayout from '.';

let mockData;
// Mocks
/**
 * @test {UvnLayout}
 */
describe('UvnLayout test', () => {
  beforeEach(() => {
    mockData = { ...mockPageData };
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should render correctly', () => {
    const wrapper = shallow(
      <UvnLayout pageData={mockData}>
        <div className="children">Layout</div>
      </UvnLayout>,
    );

    expect(wrapper).toBeDefined();
    expect(wrapper.find('PageWrapper')).toHaveLength(1);
    expect(wrapper.find('.children').text()).toBe('Layout');
  });

  it('should render ShowHeader when sectionType = show', () => {
    const wrapper = shallow(
      <UvnLayout pageData={showMockPageData}>
        <div className="children">Layout</div>
      </UvnLayout>,
    );
    expect(wrapper.find('ShowHeader')).toHaveLength(1);
  });
});
