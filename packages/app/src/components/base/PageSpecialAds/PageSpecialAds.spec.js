import React from 'react';
import { shallow, mount } from 'enzyme';
import * as redux from 'react-redux';
import * as contentTypes from '@univision/fe-commons/dist/constants/contentTypes.json';
import * as selectors from '@univision/fe-commons/dist/store/selectors/page-selectors';

import PageSpecialAds from '.';

/**
 * @test {PageWrapper}
 */
describe('PageSpecialAds', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(redux, 'useSelector').mockImplementation(fn => fn());
    jest.spyOn(selectors, 'userLocationSelector').mockReturnValue('US');
    jest.spyOn(selectors, 'siteSelector').mockReturnValue('univision');
  });
  it('should render Teads ad on article for TUDN and MX users only', () => {
    jest.spyOn(selectors, 'userLocationSelector').mockReturnValue('MX');
    jest.spyOn(selectors, 'siteSelector').mockReturnValue('tudn');
    const wrapper = mount(<PageSpecialAds contentType={contentTypes.ARTICLE} />);
    expect(wrapper.find('_class').at(3).props().position).toBe('inline_teads');
  });
  it('should render Custom Offering Ads 1x1, 1x2 and 1x5 on article', () => {
    const wrapper = shallow(<PageSpecialAds contentType={contentTypes.SECTION} />);
    expect(wrapper.find('_class').at(0).props().position).toBe('CUSTOM');
    expect(wrapper.find('_class').at(1).props().position).toBe('CUSTOM');
    expect(wrapper.find('_class').at(2).props().position).toBe('CUSTOM');
  });
  it('should render Custom Offering Ads 1x1, 1x2 and 1x5 in other content types', () => {
    const wrapper = shallow(<PageSpecialAds contentType={contentTypes.VIDEO} />);
    expect(wrapper.find('_class')).toHaveLength(3);
  });
  it('should render null in articleType equal list', () => {
    const wrapper = shallow(<PageSpecialAds articleType="list" />);
    expect(wrapper.find('_class')).toHaveLength(0);
  });
});
