import React from 'react';
import { mount } from 'enzyme';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';

import CardsCta from '.';

const props = {
  label: 'Ver más',
  seeMoreLink: {
    href: 'http://univision.com',
    target: '_blank',
  },
};

describe('CardsCta suite', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CardsCta />, div);
  });
  it('should not render if seeMoreLink is empty', () => {
    const wrapper = mount(<CardsCta />);
    expect(wrapper.find('CardsCta__Cta')).toHaveLength(0);
  });
  it('should not render if seeMoreLink uri is empty', () => {
    const newProps = {
      ...props,
      seeMoreLink: {
        href: null,
      },
    };
    const wrapper = mount(<CardsCta {...newProps} />);
    expect(wrapper.find('CardsCta__Cta')).toHaveLength(0);
  });
  it('should render if no theme provider is available', () => {
    const wrapper = mount(<CardsCta {...props} />);
    expect(wrapper.find('CardsCta__Cta')).toHaveLength(1);
  });
  it('should render with the gradient in theme provider', () => {
    const wrapper = mount(
      <ThemeProvider theme={{ exposedNavGradient: '#000' }}>
        <CardsCta {...props} />
      </ThemeProvider>
    );
    expect(wrapper.find('CardsCta__Cta')).toHaveLength(1);
    expect(wrapper.find('CardsCta__Cta')).toHaveStyleRule('background', '#000');
  });
});
