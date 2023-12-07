import React from 'react';
import { shallow } from 'enzyme';

import { Caption, Credit } from './InlineImage.styles';
import FullWidth from '../../../../FullWidth/FullWidth.styles';
import InlineImage from '.';

let props;
beforeEach(() => {
  props = {
    renditions: {},
    caption: 'caption',
    credit: 'credit',
  };
});

describe('InlineImage tests', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<InlineImage {...props} />);
    expect(wrapper.find('amp-img')).toHaveLength(1);
  });

  it('should render caption', () => {
    const wrapper = shallow(<InlineImage {...props} />);
    expect(wrapper.find(Caption)).toHaveLength(1);
    expect(wrapper.find(Credit)).toHaveLength(1);
  });

  it('should not render caption', () => {
    const wrapper = shallow(<InlineImage {...props} caption={null} credit={null} />);
    expect(wrapper.find(Caption)).toHaveLength(0);
    expect(wrapper.find(Credit)).toHaveLength(0);
  });

  it('adds fullwidth wrapper if fullwidth and isLead', () => {
    props.fullWidth = true;
    props.isLead = true;
    const wrapper = shallow(<InlineImage {...props} />);
    expect(wrapper.find(FullWidth)).toHaveLength(1);
  });
});
