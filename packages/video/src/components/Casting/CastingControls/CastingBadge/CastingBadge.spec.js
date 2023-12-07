import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import castingTypes from '../CastingControls.config';
import CastingBadge from '.';

describe('Casting Badge test suite', () => {
  it('renders without crashing', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const div = document.createElement('div');
    ReactDOM.render(
      <CastingBadge />,
      div
    );
  });
  it('should render as expected with type livestream', () => {
    const wrapper = mount(<CastingBadge type={castingTypes.LIVESTREAM} />);
    expect(wrapper.find('LabelBadge')).toHaveLength(1);
    expect(wrapper.find('Label').prop('text')).toBe('En vivo');
  });
  it('should render as expected with type livestream', () => {
    const wrapper = mount(<CastingBadge type={castingTypes.ADVERTISING} />);
    expect(wrapper.find('LabelBadge')).toHaveLength(1);
    expect(wrapper.find('Label').prop('text')).toBe('Publicidad');
  });
  it('should return null with other type', () => {
    const wrapper = mount(<CastingBadge type="other" />);
    expect(wrapper.find('LabelBadge__Wrapper')).toHaveLength(0);
    expect(wrapper).toEqual({});
  });
});
