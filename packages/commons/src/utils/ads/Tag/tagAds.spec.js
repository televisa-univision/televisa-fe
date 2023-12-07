import React from 'react';
import { mount } from 'enzyme';

import tagAds from './tagAds';

const widgets = [
  <div key="a" />,
  <div key="b" />,
  <div key="c" />,
  <div key="d" />,
  <div key="e" />,
  <div key="f" />,
  <div key="g" />
];

describe('tag page full width insert ads', () => {
  it('should return DFPAd component every 5 widgets', () => {
    const wrapper = mount(<div>{tagAds.injectFullWidthAds({ widgets })}</div>);
    expect(wrapper.find('DPFAd')).toBeDefined();
  });
  it(' should return DFPAd component every 1 widgets', () => {
    /* eslint-disable react/jsx-closing-tag-location */
    const wrapper = mount(<div>
      {tagAds.injectFullWidthAds({ widgets, injectEvery: 1, numberOfAds: 1 })}
    </div>);
    expect(wrapper.find('DPFAd')).toBeDefined();
  });
  it('should return the same argument if is not array', () => {
    expect(tagAds.injectFullWidthAds('a')).toEqual([]);
  });
});
