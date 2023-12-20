import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';
import * as helpers from '@univision/fe-commons/dist/utils/helpers';
import oneTrustManager from '@univision/fe-commons/dist/utils/onetrust/oneTrustManager';

import PageHead from '.';

import mockState from '../../../../__mocks__/tudnPageData.json';

const pageData = mockState.data.page;
helpers.getCookie = jest.fn().mockReturnValue('OptanonWrapper=test');
oneTrustManager.getCookieActiveGroups = jest.fn();
oneTrustManager.setPageSection = jest.fn();

/**
 * @test {PageHead}
 */
describe('PageHead test', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PageHead pageData={pageData} />, div);
  });

  it('should render without crashing and with onetrust', () => {
    oneTrustManager.allowOneTrust = jest.fn().mockReturnValue(true);
    const div = document.createElement('div');
    ReactDOM.render(<PageHead pageData={pageData} />, div);
  });

  it('should render with onetrust categories set by cookies', () => {
    global.window.OnetrustActiveGroups = undefined;
    helpers.getCookie = jest.fn().mockReturnValue('OptanonWrapper=test');
    const div = document.createElement('div');
    ReactDOM.render(<PageHead pageData={pageData} />, div);
  });

  it('should render with onetrust categories set by cookies but script did not load values in time', () => {
    global.window.OnetrustActiveGroups = ',,';
    helpers.getCookie = jest.fn().mockReturnValue('OptanonWrapper=test');
    const div = document.createElement('div');
    ReactDOM.render(<PageHead pageData={pageData} />, div);
    global.window.OnetrustActiveGroups = undefined;
  });

  it('should render with onetrust categories set by script loading in time', () => {
    global.window.OnetrustActiveGroups = ',C0001,C0002,';
    helpers.getCookie = jest.fn().mockReturnValue('OptanonWrapper=test');
    const div = document.createElement('div');
    ReactDOM.render(<PageHead pageData={pageData} />, div);
    global.window.OnetrustActiveGroups = undefined;
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
    const wrapper = mount(<PageHead pageData={{ ...pageData, isAmp: true }} />);
    expect(wrapper.find('script')).toHaveLength(0);
  });
});
