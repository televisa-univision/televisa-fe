import React from 'react';
import { shallow, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import { TUDN_SITE } from '@univision/fe-commons/src/constants/sites';

import PageHead from '.';

import mockState from '../../../../__mocks__/tudnPageData.json';

const pageData = mockState.data.page;

/**
 * Wait for async behaviours to finish
 * @param {Object} wrapper component
 * @param {function} _actions any actions to be triggered
 * @returns {Promise<void>}
 */
const actions = async (wrapper, _actions) => {
  await act(async () => {
    await (new Promise(resolve => setTimeout(resolve, 0)));
    if (_actions) _actions();
    wrapper.update();
  });
};

/**
 * @test {PageHead}
 */
describe('PageHead test', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should render without crashing', () => {
    const wrapper = shallow(<PageHead pageData={pageData} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('should fallback to regular title if seo.title doesnt exist', () => {
    const state = {
      data: {
        ...pageData.data,
        seo: {
          ...pageData.data.seo,
          title: null,
        },
      },
    };
    const wrapper = shallow(<PageHead pageData={state} />);
    expect(wrapper.find('title').text()).toEqual(pageData.data.title);
  });

  it('should render search title if type is portalsearchpage', () => {
    const state = {
      data: {
        ...pageData.data,
        type: 'portalsearchpage',
      },
    };
    const wrapper = shallow(<PageHead pageData={state} />);
    expect(wrapper.find('title').text()).toEqual('Últimos articulos, noticias, galerias y videos | Univision');
  });

  it('should render search title if type is portalsearchpage and there is a query', () => {
    const state = {
      requestParams: { q: 'test' },
      data: {
        ...pageData.data,
        type: 'portalsearchpage',
      },
    };
    const wrapper = shallow(<PageHead pageData={state} />);
    expect(wrapper.find('title').text()).toEqual('Test: Últimas noticias para Test. | Univision');
  });

  it('should not render chartbeat if amp page', () => {
    const wrapper = shallow(<PageHead pageData={{ ...pageData, isAmp: true }} />);
    expect(wrapper.find('script')).toHaveLength(0);
  });

  it('should render GTM Header if test page', () => {
    const wrapper = shallow(<PageHead pageData={{ ...pageData, env: 'test' }} />);
    expect(wrapper.find('Head')).toHaveLength(1);
  });

  it('should set _sf_async_config.domain to tudn.com if TUDN_SITE', async () => {
    const wrapper = mount(<PageHead pageData={{ ...pageData, isAmp: false, site: TUDN_SITE }} />);

    await actions(wrapper);

    wrapper.update();

    expect(wrapper.find('Head')).toHaveLength(1);
    // eslint-disable-next-line no-underscore-dangle
    expect(window._sf_async_config.domain).toBe('tudn.com');
  });

  it('should run useEffect and check isAmp is true', async () => {
    const wrapper = mount(<PageHead pageData={{ ...pageData, isAmp: true, site: TUDN_SITE }} />);

    await actions(wrapper);

    wrapper.update();

    expect(wrapper.find('Head')).toHaveLength(1);
    expect(wrapper.find('script')).toHaveLength(0);
  });
});
