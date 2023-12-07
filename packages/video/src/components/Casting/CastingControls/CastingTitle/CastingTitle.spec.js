import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import castingTypes from '../CastingControls.config';
import CastingTitle from '.';

const props = {
  title: 'Machester United espera la visita del Bayern  en Champions League',
  type: '',
  advertisementUrl: 'www.tudn.com',
  adDuration: '30',
  currentAd: '1',
  isMobile: false,
  totalAds: '4',
};

describe('Casting Title test suite', () => {
  it('renders without crashing', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const div = document.createElement('div');
    ReactDOM.render(
      <CastingTitle />,
      div
    );
  });
  it('should render casting title  as expected', () => {
    const wrapper = mount(<CastingTitle {...props} />);
    expect(wrapper.find('CastingTitle__TitleWrapper')).toHaveLength(1);
    expect(wrapper.find('CastingTitle__AdCopy')).toHaveLength(0);
    expect(wrapper.find('CastingTitle__TitleCap')).toHaveLength(0);
    expect(wrapper.find('CastingTitle__TitleContent')).toHaveLength(1);
    expect(wrapper.find('CastingTitle__TitleMarquee').first().text()).toEqual(props.title);
    expect(wrapper.find('Link')).toHaveLength(0);
  });
  it('should render casting title  as expected in mobile', () => {
    const wrapper = mount(
      <CastingTitle
        {...props}
        isMobile
        type={castingTypes.LIVESTREAM}
      />
    );
    expect(wrapper.find('CastingBadge')).toHaveLength(1);
    expect(wrapper.find('LabelBadge')).toHaveLength(1);
    expect(wrapper.find('Label').prop('text')).toBe('En vivo');
    expect(wrapper.find('CastingTitle__TitleWrapper')).toHaveLength(1);
    expect(wrapper.find('CastingTitle__AdCopy')).toHaveLength(0);
    expect(wrapper.find('CastingTitle__TitleCap')).toHaveLength(2);
    expect(wrapper.find('CastingTitle__TitleContent')).toHaveLength(1);
    expect(wrapper.find('CastingTitle__TitleMarquee').first().text()).toEqual(props.title);
    expect(wrapper.find('CastingTitle__TitleMarquee'))
      .toHaveStyleRule('animation', 'jXyTRH 10s linear infinite');
  });
  it('should render as expected for advertisement', () => {
    const wrapper = mount(
      <CastingTitle
        {...props}
        type={castingTypes.ADVERTISING}
      />
    );
    expect(wrapper.find('CastingTitle__TitleWrapper')).toHaveLength(1);
    expect(wrapper.find('CastingTitle__AdCopy')).toHaveLength(1);
    expect(wrapper.find('CastingTitle__AdCopy').first().text()).toEqual('Anuncio 1 de 4 : (30)');
    expect(wrapper.find('Link')).toHaveLength(1);
    expect(wrapper.find('Link').prop('href')).toBe('www.tudn.com');
    expect(wrapper.find('Link a').first().text()).toBe('Más Información');
  });
  it('should not render ad duration for advertisement if not provided', () => {
    const wrapper = mount(
      <CastingTitle
        {...props}
        type={castingTypes.ADVERTISING}
        adDuration={null}
      />
    );
    expect(wrapper.find('CastingTitle__TitleWrapper')).toHaveLength(1);
    expect(wrapper.find('CastingTitle__AdCopy')).toHaveLength(1);
    expect(wrapper.find('CastingTitle__AdCopy').first().text()).toEqual('Anuncio 1 de 4');
  });
  it('should not render current ad or total ads if not provided', () => {
    const wrapper = mount(
      <CastingTitle
        {...props}
        type={castingTypes.ADVERTISING}
        adDuration={null}
        currentAd={null}
      />
    );
    expect(wrapper.find('CastingTitle__TitleWrapper')).toHaveLength(1);
    expect(wrapper.find('CastingTitle__AdCopy')).toHaveLength(1);
    expect(wrapper.find('CastingTitle__AdCopy').first().text()).toEqual('Anuncio ');
  });
  it('should render advertisement as expected in mobile', () => {
    const wrapper = mount(
      <CastingTitle
        {...props}
        type={castingTypes.ADVERTISING}
        isMobile
      />
    );
    expect(wrapper.find('CastingBadge')).toHaveLength(1);
    expect(wrapper.find('LabelBadge')).toHaveLength(1);
    expect(wrapper.find('Label').prop('text')).toBe('Publicidad');
    expect(wrapper.find('CastingTitle__AdCopy')).toHaveLength(1);
    expect(wrapper.find('CastingTitle__AdCopy').first().text()).toEqual('1 de 4 : (30)');
  });
  it('should return null when no title is provided', () => {
    const wrapper = mount(<CastingTitle title={null} />);
    expect(wrapper).toEqual({});
  });
});
