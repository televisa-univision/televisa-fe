import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import * as storeHelpers from '@univision/fe-commons/dist/store/storeHelpers';

import Head from './Head';

/**
 * Mock of the webpack bundle's assets object
 * @type {{javascript: {main: string}, styles: {main: string}}}
 */
const assets = {
  styles: 'section.css',
  javascript: 'section.js',
};

const initialState = {
  data: {
    config: {
      deploy: {
        env: 'production',
      },
    },
    title: 'test',
    uri: 'http://www.univision.com',
    type: 'article',
    metaTagData: {
      settings: null,
      googlePlus: {},
      openGraph: {},
      twitter: {
        card: 'summary_large_image',
        title: 'América derrota a Santos 3-2 en un entretenido partido amistoso',
        description: 'Diego Lainez se estrenó como goleador en el primer equipo del América y con golazos de Díaz y Quintero, derrotaron a los Guerreros en Denver.',
        creator: null,
        imageUrl: 'https://cdn3.uvnimg.com/81/61/89ef862c42169aa11a85aa337eef/debc4jsumaawm62.jpg',
      },
      facebook: {
        pages: '259955926518,173155703431,174725429795,130815470261839',
      },
      extras: [],
      additionalSeoKeywords: [],
    },
    seo: {
      title: 'América derrota a Santos 3-2 en un entretenido partido amistoso - Univision',
      description: 'Diego Lainez se estrenó como goleador en el primer equipo del América y con golazos de Díaz y Quintero, derrotaron a los Guerreros en Denver.',
      keywords: [],
      robots: [],
    },
  },
};
/** @test {Head} */
describe('Head Spec', () => {
  beforeAll(() => {
    storeHelpers.isVerticalHome = jest.fn();
    storeHelpers.getPageData = jest.fn();
  });

  it('should render without crashing', () => {
    const div = document.createElement('div');
    console.error = jest.fn(); // eslint-disable-line no-console
    ReactDOM.render(<Head initialState={initialState} assets={assets} />, div);
  });

  it('should fallback to regular title if seo.title doesnt exist', () => {
    const state = {
      data: {
        ...initialState.data,
        seo: {
          ...initialState.data.seo,
          title: null,
        },
      },
    };
    const wrapper = shallow(<Head initialState={state} />);
    expect(wrapper.find('title').text()).toEqual(initialState.data.title);
  });

  it('should render search title if type is portalsearchpage', () => {
    const state = {
      data: {
        ...initialState.data,
        type: 'portalsearchpage',
      },
    };
    const wrapper = shallow(<Head initialState={state} />);
    expect(wrapper.find('title').text()).toEqual('Últimos articulos, noticias, galerias y videos | Univision');
  });

  it('should render search title if type is portalsearchpage and there is a query', () => {
    const state = {
      requestParams: { q: 'test' },
      data: {
        ...initialState.data,
        type: 'portalsearchpage',
      },
    };
    const wrapper = shallow(<Head initialState={state} />);
    expect(wrapper.find('title').text()).toEqual('Test: Últimas noticias para Test. | Univision');
  });
});
