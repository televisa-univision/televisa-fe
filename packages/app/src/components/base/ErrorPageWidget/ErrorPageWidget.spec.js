import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import fetch from '@univision/fe-commons/dist/utils/fetch';

import mockData from '../../../../__mocks__/tudnPageData.json';
import ErrorPageWidget from '.';

const pageData = mockData.data.page;
pageData.data.widgets = [pageData.data.widgets[0]];

fetch.setResponse({ res: pageData });

/** @test {ErrorPageWidget} */
describe('ErrorPageWidget test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ErrorPageWidget />, div);
  });

  it('should return null if no widgets available', () => {
    const wrapper = shallow(<ErrorPageWidget />);
    expect(wrapper.type()).toBe(null);
  });

  it('should render widgets if available', async () => {
    const promise = Promise.resolve();
    pageData.config = {
      syndicator: {
        content: 'https://uat2.x.univision.com/web-api/content',
      },
    };
    const wrapper = shallow(<ErrorPageWidget pageData={pageData} />);

    await promise;
    expect(fetch).toHaveBeenCalledWith('https://uat2.x.univision.com/web-api/content', {
      params: {
        url: 'https://www.univision.com/status-404-error',
      },
    });
    expect(wrapper.state().widgets).toHaveLength(1);
    expect(wrapper.find('div')).toHaveLength(1);
  });
});
