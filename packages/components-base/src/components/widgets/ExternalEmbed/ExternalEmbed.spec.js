import { shallow, mount } from 'enzyme';
import React from 'react';

import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';

import ExternalEmbed from '.';

describe('ExternalEmbed', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.restoreAllMocks();
  });
  it('should return null if setting is not defined', () => {
    const wrapper = shallow(<ExternalEmbed settings={null} />);
    expect(wrapper.getElement()).toBe(null);
  });

  it('should render the GatsbyInjector by default', () => {
    Store.dispatch(setPageData({
      navigationCount: 1,
    }));
    const lazyLoadUrl = 'https://static.univision.com/external-content/embed.js?target=div&path=%2Ffragments%2Fentretenimiento%2Fbanner-newsletter%2Fv2.html&display=iframe&rev=2&display=iframe';
    const wrapper = mount(<ExternalEmbed settings={{ html: '<p>hey</p>', display: 'iframe', lazyLoadUrl }} />);
    jest.runAllTimers();
    expect(wrapper.find('ExternalEmbed')).toHaveLength(1);
  });
});
