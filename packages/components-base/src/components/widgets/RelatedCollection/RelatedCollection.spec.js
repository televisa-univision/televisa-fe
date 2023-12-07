import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from '@univision/fe-commons/dist/store/configureStore';
import features from '@univision/fe-commons/dist/config/features';

import data from './__mocks__/RelatedCollection.json';
import RelatedCollection from '.';

const store = configureStore();

describe('Related Collection', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    const el = (<RelatedCollection />);
    ReactDOM.render(el, div);
  });

  it('should render component', () => {
    const wrapper = mount(
      <Provider store={store}>
        <RelatedCollection {...data} hierarchy={[{ uri: '/famosos' }]} />
      </Provider>
    );

    expect(wrapper.find('RelatedCollection')).toHaveLength(1);
  });

  it('should render correctly with 3 cards', () => {
    const wrapper = mount(
      <Provider store={store}>
        <RelatedCollection
          {...data}
          contents={[
            data.contents[0],
            data.contents[1],
            data.contents[2],
            data.contents[3],
          ]}
          device="desktop"
        />
      </Provider>
    );
    expect(wrapper.find('RelatedCollection__CardsWrapper')).toHaveLength(1);
  });

  it('should render a custom title', () => {
    const customTitle = {
      href: '/famosos',
      target: '_blank',
    };
    const wrapper = mount(
      <Provider store={store}>
        <RelatedCollection
          {...data}
          device="desktop"
          titleLink={customTitle}
          title="Custom title"
        />
      </Provider>
    );
    expect(wrapper.find('RelatedCollection__TitleLink Link a').text()).toEqual('Custom title');
  });

  it('should have isWorldCupMVP ', () => {
    features.deportes.isWorldCupMVP = jest.fn(() => true);

    const wrapper = mount(
      <Provider store={store}>
        <RelatedCollection
          {...data}
          device="desktop"
        />
      </Provider>
    );
    expect(wrapper.find('RelatedCollection__TitleLink').prop('isWorldCupMVP')).toBe(true);
  });
  it('should have the correct size if isWorldCupMVP true ', () => {
    features.deportes.isWorldCupMVP = jest.fn(() => true);

    const wrapper = mount(
      <Provider store={store}>
        <RelatedCollection
          {...data}
          device="desktop"
        />
      </Provider>
    );
    const titlelink = wrapper.find('RelatedCollection__Title').getDOMNode();

    expect(getComputedStyle(titlelink).getPropertyValue('font-size')).toBe('1.125rem');
  });
  it('should TitleLink have isWorldCupMVP true ', () => {
    features.deportes.isWorldCupMVP = jest.fn(() => true);

    const wrapper = mount(
      <Provider store={store}>
        <RelatedCollection
          {...data}
          device="desktop"
          hierarchy={[{ uri: '/famosos' }]}
        />
      </Provider>
    );
    const titlelink = wrapper.find('RelatedCollection__TitleLink');

    expect(titlelink.prop('isWorldCupMVP')).toBe(true);
  });
});
