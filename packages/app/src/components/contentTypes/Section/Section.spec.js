import React from 'react';
import { shallow } from 'enzyme';
import preloadAll from 'jest-next-dynamic';

import mockData from '../../../../__mocks__/uvnPageData.json';
import Section from '.';

/**
 * @test {Section}
 */
describe('Section test', () => {
  beforeAll(async () => {
    await preloadAll();
  });

  it('should render several widgets and ads', () => {
    const wrapper = shallow(<Section pageData={mockData.data.page} />);
    expect(wrapper.find('.widget')).toHaveLength(15);
    expect(wrapper.find('div[data-widget-type="Advertisement"]')).toHaveLength(6);
    expect(wrapper.find('Connect(GlobalWidget)')).toHaveLength(1);
  });
  it('should retun null if data is not provided', () => {
    const wrapper = shallow(<Section pageData={null} />);
    expect(wrapper).toEqual({});
  });
  it('should call widgetModifier if valid', () => {
    const widgetsModifierMock = jest.fn();
    shallow(<Section
      widgetsModifier={widgetsModifierMock}
      pageData={mockData.data.page}
    />);
    expect(widgetsModifierMock).toHaveBeenCalled();
  });
  it('should render primary topic', () => {
    const pageData = { ...mockData.data.page };
    delete pageData.data.title;
    pageData.data.primaryTopic = 'Topic title';
    const wrapper = shallow(<Section pageData={pageData} />);
    expect(wrapper.find('Topic title')).toBeDefined();
  });
});
