import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import ErrorLayout from '.';

/** @test {ErrorLayout} */
describe('ErrorLayout test', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ErrorLayout />, div);
  });

  it('should render default layout and statusCode', () => {
    const wrapper = shallow(<ErrorLayout />);

    expect(wrapper.find('ErrorLayout__TitleStyled')).toHaveLength(1);
    expect(wrapper.find('ErrorLayout__TitleStyled').at(0).text()).toEqual('¡Página No Encontrada!');
    expect(wrapper.find('ErrorLayout__SubTitleStyled')).toHaveLength(2);
    expect(wrapper.find('ErrorLayout__SubTitleStyled').at(0).text()).toEqual('Lo sentimos, parece que hemos perdido esta página, pero no queremos perderte.');
    expect(wrapper.find('ErrorLayout__SubTitleStyled').at(1).text()).toEqual('Explorar contenido de otras secciones:');
  });

  it('should render layout and title for statusCode 500', () => {
    const wrapper = shallow(<ErrorLayout statusCode="500" />);

    expect(wrapper.find('ErrorLayout__TitleStyled')).toHaveLength(1);
    expect(wrapper.find('ErrorLayout__TitleStyled').at(0).text()).toEqual('Esta página no está disponible temporalmente.');
    expect(wrapper.find('ErrorLayout__SubTitleStyled')).toHaveLength(2);
    expect(wrapper.find('ErrorLayout__SubTitleStyled').at(0).text()).toEqual('Lamentamos los inconvenientes, nuestro equipo está trabajando rápidamente para corregirla.');
    expect(wrapper.find('ErrorLayout__SubTitleStyled').at(1).text()).toEqual('Por favor intente nuevamente en algunos minutos.');
  });

  it('should render layout with children', () => {
    const wrapper = shallow(<ErrorLayout><div className="childEl" /></ErrorLayout>);

    expect(wrapper.find('.childEl')).toHaveLength(1);
  });
});
