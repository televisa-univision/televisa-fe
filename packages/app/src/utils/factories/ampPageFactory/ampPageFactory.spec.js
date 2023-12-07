import React from 'react';
import { shallow } from 'enzyme';

import getPageComponent from '.';

jest.mock('../../../components/AMP/contentTypes/Article/ArticleBody');

describe('mapPageTypeToBundleName', () => {
  it('should return null if not have type data', () => {
    expect(getPageComponent()).toBeNull();
  });

  it('should return null if invalid data', () => {
    expect(getPageComponent({ type: 'test' })).toBeNull();
  });

  it('should return Article if valid data', () => {
    const Component = getPageComponent({ type: 'article' });

    const wrapper = shallow(<Component pageData={{}} />);

    expect(wrapper.find('article')).toBeDefined();
  });
});
