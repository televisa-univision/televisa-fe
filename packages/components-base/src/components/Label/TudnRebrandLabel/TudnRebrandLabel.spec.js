import React from 'react';
import { mount } from 'enzyme';

import { rem } from '@univision/fe-commons/dist/utils/styled/mixins';
import {
  BREAKING_NEWS,
  LIVEBLOG,
} from './constants';
import TudnRebrandLabel from '.';

describe('TudnRebrandLabel suite', () => {
  it('should return null', () => {
    const wrapper = mount(<TudnRebrandLabel />);
    expect(wrapper.find('.TudnRebrandLabel__LabelWrapper')).toHaveLength(0);
  });

  it('should render a label', () => {
    const wrapper = mount(<TudnRebrandLabel text="test" />);
    expect(wrapper.find('TudnRebrandLabel__LabelWrapper')).toHaveLength(1);
    expect(wrapper.find('TudnRebrandLabel__LabelText')).toHaveLength(1);
  });

  it('should forcefully render BREAKING_NEWS as type if label is `Última hora`', () => {
    const wrapper = mount(<TudnRebrandLabel text="Última hora" type={BREAKING_NEWS} />);
    expect(wrapper.find('TudnRebrandLabel__LabelWrapper')).toHaveLength(1);
    expect(wrapper.find('TudnRebrandLabel__LabelText')).toHaveLength(1);
    expect(wrapper.find('TudnRebrandLabel__LabelWrapper').prop('type')).toEqual(BREAKING_NEWS);
  });

  it('should render an LIVEBLOG label', () => {
    const wrapper = mount(<TudnRebrandLabel text="test" type={LIVEBLOG} />);
    expect(wrapper.find('TudnRebrandLabel__LabelWrapper')).toHaveLength(1);
    expect(wrapper.find('TudnRebrandLabel__LabelText')).toHaveLength(1);
  });

  it('should render in small size', () => {
    const wrapper = mount(<TudnRebrandLabel text="test" hasLiveIcon smallSize type={LIVEBLOG} />);
    expect(wrapper.find('TudnRebrandLabel__LabelWrapper')).toHaveStyleRule('height', '20px');
    expect(wrapper.find('TudnRebrandLabel__LabelText')).toHaveStyleRule('font-size', rem(8));
  });
});
