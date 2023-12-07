import React from 'react';
import { shallow } from 'enzyme';

import AmpVideo from './AmpVideo';

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
});
