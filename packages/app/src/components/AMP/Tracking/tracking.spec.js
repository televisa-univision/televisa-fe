import React from 'react';
import { shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Tracking from '.';

describe('Tracking', () => {
  it('should not render PageView nor Comscore for article enhancements requests', async () => {
    const props = {
      requestParams: { articleRawHtml: true },
      pageData: {},
    };
    const wrapper = shallow(<Tracking {...props} />);

    await act(async () => {
      await new Promise(resolve => setImmediate(resolve));
    });

    wrapper.update();
    expect(wrapper.find('PageView')).toHaveLength(0);
    expect(wrapper.find('Comscore')).toHaveLength(0);
  });

  it('should render PageView nor Comscore for amp pages', async () => {
    const props = {
      requestParams: {},
      pageData: {},
    };
    const wrapper = shallow(<Tracking {...props} />);

    await act(async () => {
      await new Promise(resolve => setImmediate(resolve));
    });

    expect(wrapper.find('PageView')).toHaveLength(1);
    expect(wrapper.find('Comscore')).toHaveLength(1);
  });
});
