import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import CaptionWrapper from './CaptionWrapper';

let props;
beforeEach(() => {
  props = {
    renditions: {},
    caption: 'caption',
    credit: 'credit',
  };
});

describe('CaptionWrapper', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CaptionWrapper {...props} />, div);
  });

  it('should not render the CaptionWrapper if caption was not passed', () => {
    props.fullWidth = true;
    props.isLead = true;
    const wrapper = mount(<CaptionWrapper {...props} caption={null} />);
    expect(wrapper.find('CaptionWrapper__FullWidthWrapper')).toHaveLength(0);
    expect(wrapper.find('CaptionWrapper__OuterCaption')).toHaveLength(0);
    expect(wrapper.find('CaptionWrapper__InlineCaption')).toHaveLength(0);
  });

  it('adds fullwidth wrapper if fullwidth and isLead', () => {
    props.fullWidth = true;
    props.isLead = true;
    const wrapper = mount(<CaptionWrapper {...props} />);
    expect(wrapper.find('CaptionWrapper__FullWidthWrapper')).toHaveLength(1);
    expect(wrapper.find('CaptionWrapper__OuterCaption')).toHaveLength(1);
    expect(wrapper.find('CaptionWrapper__InlineCaption')).toHaveLength(1);
  });

  it('shouldnt adds fullwidth wrapper when is not Lead', () => {
    props.fullWidth = true;
    props.isLead = false;
    const wrapper = mount(<CaptionWrapper {...props} />);
    expect(wrapper.find('CaptionWrapper__FullWidthWrapper')).toHaveLength(0);
    expect(wrapper.find('CaptionWrapper__OuterCaption')).toHaveLength(1);
    expect(wrapper.find('CaptionWrapper__InlineCaption')).toHaveLength(1);
  });
});
