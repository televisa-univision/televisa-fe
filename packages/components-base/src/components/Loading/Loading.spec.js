import React from 'react';
import { shallow } from 'enzyme';

import Description from '../Description';

import Loading from '.';

jest.mock('../Description', () => jest.fn());

let props;
beforeEach(() => {
  props = {
    theme: {},
    size: 'medium',
    label: 'label'
  };
});

describe('Loading', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<Loading {...props} />);
    expect(wrapper.find('.medium')).toHaveLength(1);
  });

  it('does not render Description if no label is set', () => {
    props.label = null;
    const wrapper = shallow(<Loading {...props} />);
    expect(wrapper.find(Description)).toHaveLength(0);
  });

  it('should render an image with the SVG', () => {
    const wrapper = shallow(<Loading {...props} svg />);
    expect(wrapper.find('img')).toHaveLength(1);
  });
});
