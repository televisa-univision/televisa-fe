import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from '@univision/fe-commons/dist/store/configureStore';
import features from '@univision/fe-commons/dist/config/features';

import mockData from '../__mocks__/listContent.json';
import ListContainer from '.';

const store = configureStore();
const props = {
  content: mockData.content,
  currentPageUri: 'https://performance.univision.com',
  pageLimit: 6,
  theme: {
    primary: '#000000',
    secondary: '#000000',
    listCardWidgetButtonBackgroundColor: '#000000',
  },
  widgetContext: {
    title: 'MÁS NOTICIAS',
    name: 'List widget2',
    type: 'Card',
    widgetType: 'ListWidget',
  },
};

/** @test {ListContainer} */
describe('List container test', () => {
  it('should render the see more button with width auto for mobile and MVP flag', () => {
    features.deportes.isWorldCupMVP = jest.fn(() => true);

    const wrapper = mount(
      <Provider store={store}>
        <ListContainer
          {...props}
          device="mobile"
        />
      </Provider>
    );
    expect(wrapper.find('ListContainer')).toHaveLength(1);
    expect(wrapper.find('ListCards')).toHaveLength(1);
    expect(wrapper.find('ListContainer__ButtonWrapperStyled')).toHaveLength(1);
    expect(wrapper.find('ListContainer__ButtonWrapperStyled')).toHaveStyleRule(
      'height',
      '48px'
    );
    expect(wrapper.find('ListContainer__ButtonWrapperStyled')).toHaveStyleRule(
      'width',
      'auto'
    );
  });
  it('should render correct styles if isWorldCupMVP is false', () => {
    features.deportes.isWorldCupMVP = jest.fn(() => false);

    const wrapper = mount(
      <Provider store={store}>
        <ListContainer
          {...props}
          device="mobile"
        />
      </Provider>
    );
    expect(wrapper.find('ListContainer__ButtonWrapperStyled')).toHaveStyleRule(
      'padding',
      '0'
    );
  });
});
