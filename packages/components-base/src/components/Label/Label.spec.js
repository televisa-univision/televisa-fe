import React from 'react';
import { mount } from 'enzyme';

import { rem } from '@univision/fe-commons/dist/utils/styled/mixins';
import labelTypes from '@univision/fe-commons/dist/constants/labelTypes';
import Label from '.';

describe('Label suite', () => {
  it('should render a label', () => {
    const wrapper = mount(<Label label="test" />);
    expect(wrapper.find('Label__LabelWrapper')).toHaveLength(1);
    expect(wrapper.find('Label__LabelText')).toHaveLength(1);
  });

  it('should forcefully render BREAKING_NEWS as type if label is `Última hora`', () => {
    const wrapper = mount(<Label label="Última hora" type={labelTypes.ADVERTISING} />);
    expect(wrapper.find('Label__LabelWrapper')).toHaveLength(1);
    expect(wrapper.find('Label__LabelText')).toHaveLength(1);
    expect(wrapper.find('Label__LabelWrapper').prop('type')).toEqual(labelTypes.BREAKING_NEWS);
  });

  it('should render an advertising label', () => {
    const wrapper = mount(<Label label="test" type={labelTypes.ADVERTISING} />);
    expect(wrapper.find('Label__LabelWrapper')).toHaveLength(1);
    expect(wrapper.find('Label__LabelText')).toHaveLength(1);
  });

  it('should render in small size', () => {
    const wrapper = mount(<Label label="test" hasLiveIcon smallSize />);
    expect(wrapper.find('Label__LabelWrapper')).toHaveStyleRule('height', '18px');
    expect(wrapper.find('Label__LabelWrapper')).toHaveStyleRule('padding-left', '4px');
    expect(wrapper.find('Label__LabelWrapper')).toHaveStyleRule('padding-right', '4px');
    expect(wrapper.find('Label__LabelText')).toHaveStyleRule('font-size', rem(8));
  });
});
