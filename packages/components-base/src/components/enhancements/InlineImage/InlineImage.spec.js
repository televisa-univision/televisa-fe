import React from 'react';
import { shallow, mount } from 'enzyme';

import Picture from '../../Picture';

import InlineImage from '.';

let props;
let propsVerticalImage;
beforeEach(() => {
  props = {
    renditions: {},
    caption: 'caption',
    credit: 'credit',
  };
  propsVerticalImage = {
    ...props,
    enhancementData: { verticalImage: true },
  };
});

describe('InlineImage tests', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<InlineImage {...props} />);
    expect(wrapper.find(Picture)).toHaveLength(1);
  });

  it('renders vertical image as expected', () => {
    const wrapper = shallow(<InlineImage {...propsVerticalImage} />);
    expect(wrapper.find(Picture)).toHaveLength(1);
  });

  it('should not render caption when is not supplied', () => {
    const wrapper = mount(<InlineImage {...props} caption={null} />);
    expect(wrapper.find('CaptionWrapper__InlineCaption')).toHaveLength(0);
  });

  it('should renders caption when supplied', () => {
    const wrapper = mount(<InlineImage {...props} />);
    expect(wrapper.find('CaptionWrapper__InlineCaption')).toHaveLength(1);
  });

  it('should renders FullWidth caption when supplied', () => {
    const wrapper = mount(<InlineImage {...props} isLead fullWidth />);
    expect(wrapper.find('CaptionWrapper__FullWidthWrapper')).toHaveLength(1);
  });

  it('adds .withCaption class', () => {
    props.caption = '';
    const wrapper = shallow(<InlineImage {...props} />);
    expect(wrapper.find('.withCaption')).toHaveLength(0);
    wrapper.setProps({ caption: 'a caption' });
    expect(wrapper.find('.withCaption')).toHaveLength(1);
  });

  it('adds pull left/right class', () => {
    props.alignment = 'right';
    const wrapper = shallow(<InlineImage {...props} />);
    expect(wrapper.find('.right')).toHaveLength(1);
  });
});
