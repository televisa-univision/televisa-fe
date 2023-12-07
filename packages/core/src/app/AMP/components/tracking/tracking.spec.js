import React from 'react';
import { shallow } from 'enzyme';
import Tracking from '.';

describe('Tracking', () => {
  it('should not render PageView nor Comscore for article enhancements requests', () => {
    const props = {
      requestParams: { articleRawHtml: true },
      pageData: {},
    };
    const wrapper = shallow(<Tracking {...props} />);
    expect(wrapper.find('PageView')).toHaveLength(0);
    expect(wrapper.find('Comscore')).toHaveLength(0);
  });

  it('should render PageView nor Comscore for amp pages', () => {
    const props = {
      requestParams: {},
      pageData: {},
    };
    const wrapper = shallow(<Tracking {...props} />);
    expect(wrapper.find('PageView')).toHaveLength(1);
    expect(wrapper.find('Comscore')).toHaveLength(1);
  });
});
