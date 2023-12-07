import React from 'react';
import { shallow } from 'enzyme';
import { getPageComponent } from '../../../../utils/factories/pageFactory';

import ContentWrapper from '.';

jest.mock('../../../../utils/factories/pageFactory', () => ({
  getPageComponent: jest.fn(() => <h2>page component</h2>),
  getCurrentPageType: jest.fn(() => 'somepagetype'),
  mapPageTypeToBundleName: jest.fn(() => 'somemappedpagetype'),
}));

describe('ContentWrapper', () => {
  it('should render with the initial component', () => {
    const wrapper = shallow(<ContentWrapper data={{}} initialComponent={<div>Test</div>} />);
    expect(wrapper.text()).toBe('Test');
  });

  it('should render the content component', () => {
    getPageComponent.mockReturnValueOnce(<div>Component</div>);
    const wrapper = shallow(<ContentWrapper data={{}} />);
    expect(wrapper.text()).toBe('Component');
  });

  it('should render the error page component', () => {
    getPageComponent.mockReturnValueOnce(<div>Error Page Component</div>);
    const wrapper = shallow(<ContentWrapper
      data={{}}
      error={{
        message: 'error message',
      }}
    />);
    expect(wrapper.text()).toBe('Error Page Component');
  });

  it('should update only if there is a new page or error', () => {
    const wrapper = shallow(<ContentWrapper data={{ uri: '/test' }} error={undefined} initialComponent={<div>Test</div>} />);
    expect(wrapper.instance().shouldComponentUpdate({ data: { uri: '/test' } })).toBe(false);
    expect(wrapper.instance().shouldComponentUpdate({ data: { uri: '/test' }, pageCategory: 'new' })).toBe(true);
    expect(wrapper.instance().shouldComponentUpdate({ data: { uri: '/new' } })).toBe(true);
    expect(wrapper.instance().shouldComponentUpdate({ data: { uri: '/test' }, error: { message: 'error message' } })).toBe(true);
  });
});
