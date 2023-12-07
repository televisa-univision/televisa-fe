import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import { waitFor } from '@testing-library/react';
import shared from '../sharedTest';
import Icon from '../../index';

/**
 * Helper to fire/wait promises, we should waitFor from @testing-library/react
 * @returns {Promise}
 */
const flushPromises = () => new Promise(setImmediate);

const themes = {
  pink: {
    primary: '#B5008F',
    secondary: '#E41F7B',
  },
};

/** @test {Icon} */
describe('Icon on web', () => {
  shared();

  it('should render without crashing', async() => {
    const div = document.createElement('div');
    ReactDOM.render(<Icon name="timer" />, div);
    await flushPromises();
  });

  it('should render correctly the icon', async() => {
    const wrapper = mount(<Icon name="timer" />);
    await waitFor(() => expect(wrapper.find('svg')).toHaveLength(1));
    expect(wrapper.html()).toContain('<svg data-name="timer" width="32" height="32"></svg>');
  });

  it('should render empty with non-existent icon', async () => {
    const wrapper = mount(<Icon name="bad-non-existent-icon" />);
    await waitFor(() => expect(wrapper.find('svg')).toHaveLength(0));
  });

  it('should render correctly with string size', async () => {
    const wrapper = mount(<Icon name="timer" size="large" />);
    await waitFor(() => expect(wrapper.find('svg')).toHaveLength(1));
    expect(wrapper.props().size).toEqual('large');
    expect(wrapper.html()).toContain('<svg data-name="timer" width="50" height="50"></svg>');
  });

  it('should render correctly with custom size', async () => {
    const wrapper = mount(<Icon name="yellowCard" size={12} />);
    await waitFor(() => expect(wrapper.find('svg')).toHaveLength(1));
    expect(wrapper.props().size).toEqual(12);
    expect(wrapper.html()).toContain('<svg data-name="yellowCard" width="12" height="12"></svg>');
  });

  it('should render correctly with array size', async() => {
    const wrapper = mount(<Icon name="univision" size={[80, 19]} />);
    await waitFor(() => expect(wrapper.find('svg')).toHaveLength(1));
    expect(wrapper.props().size).toEqual([80, 19]);
  });

  it('should render correctly with theme', async () => {
    const wrapper = mount(<Icon name="clock" theme={themes.pink} />);
    await waitFor(() => expect(wrapper.find('svg')).toHaveLength(1));
    expect(wrapper.find(`[fill="${themes.pink.primary}"]`).length).toBeGreaterThan(0);
  });

  it('should render without linear gradient', async() => {
    const wrapper = mount(<Icon name="arizonaApp" removeGradient fill={themes.pink.primary} />);
    await waitFor(() => expect(wrapper.find('[name="arizonaApp"]')).toHaveLength(1));
    expect(wrapper.find('linearGradient')).toHaveLength(0);
  });

  it('should render with arizonaApp', async () => {
    const wrapper = mount(<Icon name="arizonaApp" fill={themes.pink.primary} />);
    await waitFor(() => expect(wrapper.find('svg')).toHaveLength(1));
    expect(wrapper.html()).toContain('arizonaApp');
  });

  it('should render fallback SVG on SSR', async() => {
    const wrapper = mount(<Icon name="alert" />);
    await waitFor(() => expect(wrapper.find('svg')).toHaveLength(1));
    expect(wrapper.html()).toContain('<svg data-name="alert"');
  });
});
