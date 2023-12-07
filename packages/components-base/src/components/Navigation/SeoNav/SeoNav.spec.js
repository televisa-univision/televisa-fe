import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import SeoNav from '.';

describe('SeoNav Component', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SeoNav />, div);
  });

  it('should render the expected links', () => {
    const wrapper = mount(<SeoNav />);
    expect(wrapper.find('a')).toHaveLength(21);
    expect(wrapper.find('a[href="/carros"]')).toHaveLength(1);
    expect(wrapper.find('a[href="/delicioso"]')).toHaveLength(1);
    expect(wrapper.find('a[href="/futbol"]')).toHaveLength(1);
    expect(wrapper.find('a[href="/futbol/liga-mx"]')).toHaveLength(1);
    expect(wrapper.find('a[href="/futbol/uefa-champions-league"]')).toHaveLength(1);
    expect(wrapper.find('a[href="/boxeo"]')).toHaveLength(1);
    expect(wrapper.find('a[href="/futbol/resultados-y-estadisticas-futbol"]')).toHaveLength(1);
    expect(wrapper.find('a[href="/estilo-de-vida"]')).toHaveLength(1);
    expect(wrapper.find('a[href="/famosos"]')).toHaveLength(1);
    expect(wrapper.find('a[href="/horoscopos"]')).toHaveLength(1);
    expect(wrapper.find('a[href="/local"]')).toHaveLength(1);
    expect(wrapper.find('a[href="/noticias"]')).toHaveLength(1);
    expect(wrapper.find('a[href="/noticias/america-latina"]')).toHaveLength(1);
    expect(wrapper.find('a[href="/coronavirus"]')).toHaveLength(1);
    expect(wrapper.find('a[href="/noticias/estados-unidos"]')).toHaveLength(1);
    expect(wrapper.find('a[href="/univision-news"]')).toHaveLength(1);
    expect(wrapper.find('a[href="/noticias/politica"]')).toHaveLength(1);
    expect(wrapper.find('a[href="/noticias/inmigracion"]')).toHaveLength(1);
    expect(wrapper.find('a[href="/noticias/mundo"]')).toHaveLength(1);
    expect(wrapper.find('a[href="/radio"]')).toHaveLength(1);
  });
});
