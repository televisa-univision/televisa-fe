import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import {
  MEDIUM,
} from '@univision/fe-commons/dist/constants/cardSizes';
import configureStore from '@univision/fe-commons/dist/store/configureStore';

import data from '../__mocks__/squareCard';
import SquareRadio from '.';

const store = configureStore();

describe('SquareRadio', () => {
  it('should render without crashing', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <SquareRadio />
      </Provider>,
      div
    );
  });
  it('renders correctly with valid props', () => {
    const wrapper = mount(
      <Provider store={store}>
        <SquareRadio
          {...data[15]}
          size={MEDIUM}
        />
      </Provider>
    );
    expect(wrapper.find('SquareRadio__Wrapper')).toHaveLength(1);
    expect(wrapper.find('BackgroundImage')).toHaveLength(1);
    expect(wrapper.find('SquareRadio__RadioLabel')).toHaveLength(1);
    expect(wrapper.find('SquareRadio__TitleStyled')).toHaveLength(1);
    expect(wrapper.find('SquareRadio__RadioDescription')).toHaveLength(1);
    expect(wrapper.find('SquareRadio__RadioMedia')).toHaveLength(1);
    expect(wrapper.find('SquareRadio__RadioLogo')).toHaveLength(1);
    expect(wrapper.find('PlayStationButtonComponent')).toHaveLength(1);
    expect(wrapper.find('SquareRadio__RadioCTA')).toHaveLength(1);
    expect(wrapper.find('SquareRadio__Wrapper').prop('size')).toBe(MEDIUM);
    expect(wrapper.find('SquareRadio__TitleStyled Link').text()).toBe('Recuerdo 96.1');
  });
});
