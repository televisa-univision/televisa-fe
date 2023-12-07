import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import castingTypes, { castingIcons } from '../CastingControls.config';
import ExtraControls from '.';

describe('Extra controls test suite', () => {
  it('renders without crashing', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const div = document.createElement('div');
    ReactDOM.render(
      <ExtraControls />,
      div
    );
  });
  it('should render as expected for Livestream type with captions callback', () => {
    const captions = jest.fn();
    const wrapper = mount(
      <ExtraControls
        captionsCallback={captions}
        type={castingTypes.LIVESTREAM}
        hasCaptions
      />
    );
    expect(wrapper.find('ExtraControls')).toHaveLength(1);
    expect(wrapper.find('CastingFixedButton')).toHaveLength(1);
    expect(wrapper.find('Icon')).toHaveLength(1);
    expect(wrapper.find('Icon').first().prop('name')).toBe(castingIcons.CLOSED_CAPTIONS);
    wrapper.find('CastingFixedButton').at(0).simulate('click', 'event');
    expect(captions).toBeCalled();
  });
  it('should not render captions button if no valid callback', () => {
    const wrapper = mount(
      <ExtraControls
        captionsCallback={null}
        type={castingTypes.LIVESTREAM}
        hasCaptions
      />
    );
    expect(wrapper.find('ExtraControls')).toHaveLength(1);
    expect(wrapper.find('CastingFixedButton')).toHaveLength(0);
    expect(wrapper.find('Icon')).toHaveLength(0);
  });
  it('should not render captions button if no captions available', () => {
    const wrapper = mount(
      <ExtraControls
        captionsCallback={jest.fn()}
        type={castingTypes.LIVESTREAM}
        hasCaptions={false}
      />
    );
    expect(wrapper.find('ExtraControls')).toHaveLength(1);
    expect(wrapper.find('CastingFixedButton')).toHaveLength(0);
    expect(wrapper.find('Icon')).toHaveLength(0);
  });
  it('should return null if no valid type with extra controls', () => {
    const wrapper = mount(<ExtraControls type={castingTypes.ADVERTISING} />);
    expect(wrapper).toEqual({});
  });
});
