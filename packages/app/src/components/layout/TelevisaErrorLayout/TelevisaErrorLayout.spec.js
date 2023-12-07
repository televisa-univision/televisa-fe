/* eslint-disable no-restricted-imports */
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';

import configureStore from '@univision/fe-commons/dist/store/configureStore';
import TelevisaErrorLayout from '.';

const store = configureStore();

/**
 * WrapperComponent
 * @prop {children} component children
 * @returns {JSX}
 */
const WrapperComponent = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

WrapperComponent.propTypes = {
  children: PropTypes.node,
};

/** @test {ErrorLayout} */
describe('ErrorLayout test', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<WrapperComponent><TelevisaErrorLayout /></WrapperComponent>, div);
  });

  it('should render default layout and statusCode', () => {
    const wrapper = mount(<WrapperComponent><TelevisaErrorLayout /></WrapperComponent>);

    expect(wrapper.find('TelevisaErrorLayout__TitleStyled')).toHaveLength(1);
    expect(wrapper.find('TelevisaErrorLayout__TitleStyled').at(0).text()).toEqual('Ups, pagina no encontrada');
    expect(wrapper.find('TelevisaErrorLayout__SubTitleStyled')).toHaveLength(1);
    expect(wrapper.find('TelevisaErrorLayout__SubTitleStyled').text()).toEqual('La página que estás buscando probablemente ya no existe o está temporalmente deshabilitada');
    expect(wrapper.find('TelevisaErrorLayout__TextStyled').text()).toEqual('Error 404');
  });

  it('should render layout and title for statusCode 500', () => {
    const wrapper = mount(
      <WrapperComponent><TelevisaErrorLayout statusCode={500} /></WrapperComponent>,
    );

    expect(wrapper.find('TelevisaErrorLayout__TitleStyled')).toHaveLength(1);
    expect(wrapper.find('TelevisaErrorLayout__TitleStyled').at(0).text()).toEqual('Esta página no está disponible temporalmente.');
    expect(wrapper.find('TelevisaErrorLayout__SubTitleStyled')).toHaveLength(1);
    expect(wrapper.find('TelevisaErrorLayout__SubTitleStyled').text()).toEqual('Lamentamos los inconvenientes, nuestro equipo está trabajando rápidamente para corregirla.');
    expect(wrapper.find('TelevisaErrorLayout__TextStyled').text()).toEqual('Error 500');
  });

  it('should render layout with children', () => {
    const wrapper = shallow(<WrapperComponent><TelevisaErrorLayout><div className="childEl" /></TelevisaErrorLayout></WrapperComponent>);

    expect(wrapper.find('.childEl')).toHaveLength(1);
  });
});
