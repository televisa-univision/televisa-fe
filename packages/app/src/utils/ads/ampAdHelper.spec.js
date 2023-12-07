import { shallow } from 'enzyme';

import * as AdTypes from '@univision/fe-commons/dist/utils/ads/ad-types';
import adHelper from './ampAdHelper';

describe('adHelper getSettings', () => {
  const settings = {
    desktopSettings: {
      sizes: [
        {
          width: 728,
          height: 90,
        },
      ],
      disableRefresh: true,
      position: 'MID',
    },
    tabletSettings: null,
    mobileSettings: {
      sizes: [
        {
          width: 300,
          height: 250,
        },
        {
          width: 320,
          height: 50,
        },
      ],
      position: 'MID',
    },
  };

  it('should return a valid object with right settings', () => {
    expect(Object.keys(adHelper.getSettings(settings)).length).toBeGreaterThan(0);
  });
  it('should return null if null settings', () => {
    expect(adHelper.getSettings(null)).toEqual(null);
  });
  it('should have targeting settings', () => {
    const mobileSettings = {
      mobileSettings: {
        sizes: [
          {
            width: 728,
            height: 90,
          },
        ],
      },
      targeting: {
        tag: ['test', 'local'],
        contenttype: 'article',
        vertical: 'noticias',
      },
      contentSpecificSettings: {
        type: 'article',
      },
    };
    const output = JSON.parse(adHelper.getSettings(mobileSettings).json);
    expect(output.targeting.tag).toEqual('test,local');
    expect(output.targeting.vertical).toEqual('noticias');
  });
});

describe('adHelper getAd', () => {
  it('should return amp-ad', () => {
    const wrapper = shallow(adHelper.getAd(AdTypes.TOP_AD));
    expect(wrapper.find('amp-ad').length).toBe(1);
  });
  it('should return null for invalid type', () => {
    expect(adHelper.getAd('RANDOM_TYPE')).toBe(null);
  });
  it('should override size for third slide', () => {
    const wrapper = shallow(adHelper.getAd(AdTypes.SLIDESHOW_INLINE_AD, { idx: 3 }));
    expect(wrapper.find('amp-ad').getElement().props.width).toBe(300);
    expect(wrapper.find('amp-ad').getElement().props.height).toBe(250);
  });
});
