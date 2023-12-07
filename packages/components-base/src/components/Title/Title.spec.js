import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import features from '@univision/fe-commons/dist/config/features';

import Title from '.';

features.content.hasEnhancement = jest.fn(() => true);

/** @test {Title} */
describe('Title ', () => {
  it('should render the component without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Title />, div);
  });

  it('should render the component with a text', () => {
    const wrapper = mount(<Title size="regular">hello</Title>);
    expect(wrapper.find('h3')).toHaveLength(1);
    expect(wrapper.text()).toBe('hello');
    expect(wrapper.find('Title__TitleStyled')).toHaveStyleRule('font-size', '1.25rem');
  });

  it('should render the component with default font', () => {
    const wrapper = mount(<Title>hello</Title>);
    expect(wrapper.text()).toBe('hello');
    expect(wrapper.find('Title__TitleStyled').prop('className')).toMatch('uvs-font-b-bold');
  });

  it('should render the component with custom font', () => {
    const wrapper = mount(<Title fontName="uvs-font-c-bold">hello</Title>);
    expect(wrapper.text()).toBe('hello');
    expect(wrapper.find('Title__TitleStyled').prop('className')).toMatch('uvs-font-c-bold');
  });

  it('should render with legacy font', () => {
    features.content.hasEnhancement.mockReturnValueOnce(false);
    const wrapper = mount(<Title>hello</Title>);
    expect(wrapper.text()).toBe('hello');
    expect(wrapper.find('Title__TitleStyled').prop('className')).toMatch('uvs-font-a-bold');
  });

  it('should render the component with another tag', () => {
    const wrapper = mount(<Title element="h6">hello h6</Title>);
    expect(wrapper.find('h3')).toHaveLength(0);
    expect(wrapper.find('h6')).toHaveLength(1);
    expect(wrapper.text()).toBe('hello h6');
  });

  it('should render the component with another size', () => {
    const wrapper = mount(<Title size="large">hello large</Title>);
    expect(wrapper.text()).toBe('hello large');
    expect(wrapper.find('Title__TitleStyled')).toHaveStyleRule('font-size', '1.5rem');
  });

  it('should render the title hidden for SEO friendly', () => {
    const wrapper = mount(<Title hidden>hello</Title>);
    expect(wrapper.props()).toHaveProperty('hidden', true);
    expect(wrapper.find('Title__TitleStyled')).toHaveStyleRule('height', '1px');
    expect(wrapper.find('Title__TitleStyled')).toHaveStyleRule('width', '1px');
  });

  it('should render the component for prop isWorldCupMVP is true', () => {
    const propsTest = {
      ctIsValid: true,
      isWorldCupMVP: true,
    };
    const wrapper = mount(<Title {...propsTest}>title mvp</Title>);
    expect(wrapper.find('Title__TitleStyledMVP')).toHaveLength(1);
    expect(wrapper.text()).toBe('title mvp');
  });
});
