import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';

import ThemeProvider from '.';

const props = {
  children: <p>foo</p>,
  theme: { foo: 'bar' },
};

/** @test {ThemeProvider} */
describe('ThemeProvider test', () => {
  it('should render the theme provider without crashing', async() => {
    const div = document.createElement('div');
    ReactDOM.render(<ThemeProvider />, div);
  });

  it('should render correctly', async() => {
    const wrapper = mount(<ThemeProvider {...props} />);
    await expect(wrapper.find(ThemeProvider).exists()).toBe(true);
  });

  it('should not render the theme provider', async() => {
    const newProps = {
      ...props,
      theme: null,
    };
    const wrapper = shallow(<ThemeProvider {...newProps} />);
    expect(wrapper.find('ThemeProvider')).toHaveLength(0);
  });
});
