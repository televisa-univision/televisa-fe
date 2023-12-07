import React from 'react';
import { shallow } from 'enzyme';

import AmpVideo from '.';

describe('AmpVideo', () => {
  it('should render OK with playerType=simple', () => {
    const props = {
      uri: 'https://www.univision.com/noticias/como-se-hace-un-impeachment-y-por-que-el-senado-tiene-la-clave-video/embed',
      title: 'title',
      image: {},
      mcpid: '123',
      playerType: 'simple',
    };
    const wrapper = shallow(<AmpVideo {...props} />);
    expect(wrapper.find('amp-iframe[title="title"]').length).toBe(1);
  });

  it('should render OK with playerType=playlist', () => {
    const props = {
      uri: 'https://www.univision.com/noticias/como-se-hace-un-impeachment-y-por-que-el-senado-tiene-la-clave-video/embed',
      title: 'title',
      image: {},
      mcpid: '123',
      playerType: 'playlist',
    };
    const wrapper = shallow(<AmpVideo {...props} />);
    expect(wrapper.find('amp-iframe[title="title"]').length).toBe(1);
  });

  it('should render OK with autoplay', () => {
    const props = {
      autoplay: true,
      uri: 'https://www.univision.com/noticias/como-se-hace-un-impeachment-y-por-que-el-senado-tiene-la-clave-video/embed',
      title: 'title',
      image: {},
      mcpid: '123',
      playerType: 'simple',
    };
    const wrapper = shallow(<AmpVideo {...props} />);
    expect(wrapper.find('amp-iframe[title="title"]').length).toBe(1);
  });

  it('should render OK when TUDN video', () => {
    const props = {
      autoplay: true,
      uri: 'https://www.tudn.com/futbol/mls/carlos-vela-manda-un-peligroso-centro-y-el-defensa-jackson-yueill-anota-en-su-propia-meta-video',
      title: 'title',
      image: {},
      mcpid: '123',
      playerType: 'simple',
      pageData: {
        isTudn: true,
      },
    };
    const wrapper = shallow(<AmpVideo {...props} />);
    expect(wrapper.find('amp-iframe[title="title"]').length).toBe(1);
  });
});
