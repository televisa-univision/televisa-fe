import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import ShareBar from '.';
import { ShareLink } from './ShareBar.styles';

describe('ShareBar', () => {
  const props = {
    sharingOptions: {
      facebook: {
        url: 'http://uni.vi/hLSQ102ir9',
        title: 'Salomon Kalou es anunciado como refuerzo del Botafogo',
        description: 'El conjunto brasileño hizo oficial la llegada del atacante marfileño.',
        imageUrl: 'https://st1.uvnimg.com/16/93/31cc23524927ad4efb27dee81d55/4ddf4c3c8f96410091ba368ff0868489',
      },
      twitter: {
        url: 'http://uni.vi/hLSQ102ir',
        title: 'Salomon Kalou es anunciado como refuerzo del Botafogo',
        description: 'El conjunto brasileño hizo oficial la llegada del atacante marfileño.',
        imageUrl: 'https://st1.uvnimg.com/16/93/31cc23524927ad4efb27dee81d55/4ddf4c3c8f96410091ba368ff0868489',
      },
      whatsapp: {
        url: 'http://uni.vi/hLSQ102i',
        title: 'Salomon Kalou es anunciado como refuerzo del Botafogo',
        description: 'El conjunto brasileño hizo oficial la llegada del atacante marfileño.',
        imageUrl: 'https://st1.uvnimg.com/16/93/31cc23524927ad4efb27dee81d55/4ddf4c3c8f96410091ba368ff0868489',
      },
      mail: {
        url: 'http://uni.vi/hLSQ102',
        title: 'Salomon Kalou es anunciado como refuerzo del Botafogo',
        description: 'El conjunto brasileño hizo oficial la llegada del atacante marfileño.',
        imageUrl: 'https://st1.uvnimg.com/16/93/31cc23524927ad4efb27dee81d55/4ddf4c3c8f96410091ba368ff0868489',
      },
    },
  };
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ShareBar {...props} />, div);
  });

  it('should render televisa styles', () => {
    const forTelevisa = { ...props, siteName: 'lasestrellas' };
    const wrapper = mount(<ShareBar {...forTelevisa} />);
    expect(wrapper.find('a').exists()).toBe(true);
  });
});

describe('ShareBarStyles', () => {
  it('should render ShareLink with background color', () => {
    const theme = {
      ampShareLinkBackgroundColor: 'red',
    };
    const wrapper = mount(<ShareLink theme={theme} />);
    expect(wrapper.find('a').getDOMNode()).toHaveStyleRule('background', 'red');
  });
});
