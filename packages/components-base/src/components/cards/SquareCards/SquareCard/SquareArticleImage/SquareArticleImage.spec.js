import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import {
  SMALL,
} from '@univision/fe-commons/dist/constants/cardSizes';

import data from '../__mocks__/squareCard.json';
import SquareArticleImage from '.';

const props = {
  image: data[0].image,
  isLiveblog: false,
  title: data[0].title,
  type: data[0].type,
  uri: data[0].uri,
};
const propsLiveblog = {
  image: data[1].image,
  isLiveblog: true,
  title: data[1].title,
  type: data[1].type,
  uri: data[1].uri,
};
describe('SquareArticleImage', () => {
  it('should render without crashing', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const div = document.createElement('div');
    ReactDOM.render(
      <SquareArticleImage />,
      div
    );
  });
  it('should render correctly with props for no liveblog', () => {
    const wrapper = mount(
      <SquareArticleImage
        size={SMALL}
        {...props}
      />
    );
    expect(wrapper.find('SquareArticleImage__SquareImageWrapper').prop('type')).toBe('article');
    expect(wrapper.find('SquareArticleImage__SquareImageWrapper').length).toBe(1);
    expect(wrapper.find('SquareArticleImage__SquareImageWrapper').prop('href')).toBe('https://www.tudn.com/futbol/la-mejor-atajada-jorge-campos-rechaza-al-coronavirus');
    expect(wrapper.find('SquareArticleImage__SquareImageWrapper')).toHaveStyleRule('width', '100%');
    expect(wrapper.find('SquareArticleImage__BackgroundOverlay').length).toBe(0);
    expect(wrapper.find('SquareArticleImage__Filter').length).toBe(1);
    expect(wrapper.find('PictureWrapper').length).toBe(1);
  });
  it('should render correctly with props for liveblog', () => {
    const wrapper = mount(
      <SquareArticleImage
        size={SMALL}
        {...propsLiveblog}
      />
    );
    expect(wrapper.find('SquareArticleImage__SquareImageWrapper').prop('type')).toBe('liveblog');
    expect(wrapper.find('SquareArticleImage__SquareImageWrapper').length).toBe(1);
    expect(wrapper.find('SquareArticleImage__SquareImageWrapper').prop('href')).toBe('https://www.tudn.com/futbol/liga-mx/eliga-mx-calendario-estadisticas-y-resultados-de-la-liga-virtual');
    expect(wrapper.find('SquareArticleImage__BackgroundOverlay').length).toBe(1);
    expect(wrapper.find('SquareArticleImage__Filter').length).toBe(0);
    expect(wrapper.find('PictureWrapper').length).toBe(1);
  });
});
