import React from 'react';
import { shallow } from 'enzyme';
import { cloneDeep } from '@univision/fe-commons/dist/utils/helpers';
import PageView from './PageView';

describe('PageView', () => {
  const pageData = {
    uri: '/test/tracking',
    title: 'Testing',
    analyticsData: {
      web: {
        common: {
          content_type: 'content type',
          primary_tag: 'primary tag',
          word_count: 'word count',
          pub_name: 'publisher name',
          content_author: 'content author',
          publish_user: 'publish user',
          website: 'website',
          permalink: 'https://www.univision.com/test/tracking',
          section_level1: 'parent topic',
          section_full_hierarchy: ['parent tag', 'child tag'],
          uci_division: 'uci division',
          content_id: '123456789',
          content_modified_date: 'content modified date',
          content_created_date: 'content created date',
          network_name: 'Univision',
          embedded_items: ['embed item'],
          all_tags: ['tag1', 'tag2'],
          environment_name: 'prod',
          seo_optimized: 'true',
        },
      },
    },
  };

  const expected = {
    vars: { account: 'UA-81851967-8' },
    extraUrlParams: {
      cd15: 'Testing',
      cd16: 'content type',
      cd27: 'primary tag',
      cd30: 'word count',
      cd31: 'publisher name',
      cd33: 'content author',
      cd34: 'publish user',
      cd40: 'https://www.univision.com/test/tracking',
      cd5: 'parent topic',
      cd46: 'parent tag,child tag',
      cd109: 'Google AMP',
      cd2: 'uci division',
      cd3: '123456789',
      cd12: 'content modified date',
      cd13: 'content created date',
      cd20: 'Univision',
      cd35: ['embed item'],
      cd36: 'tag1,tag2',
      cd60: 'prod',
      cd74: 'tag1',
      cd89: 'true',
    },
    triggers: {
      trackPageviewWithAmpdocUrl: {
        on: 'visible',
        request: 'pageview',
        vars: {
          title: 'Testing',
        },
        ampdocUrl: 'https://www.univision.com/amp/test/tracking',
      },
    },
  };

  it('should render the tracking for dev environment', () => {
    const wrapper = shallow(<PageView pageData={pageData} />);
    // eslint-disable-next-line no-underscore-dangle
    const tracking = JSON.parse(wrapper.children().prop('dangerouslySetInnerHTML').__html);
    expect(tracking).toEqual(expected);
  });

  it('should fallback to analytics data for environment', () => {
    const fallbackValue = {
      ...pageData,
      analyticsData: {
        web: {},
      },
      tracking: {
        analytics: {
          data: {
            environment_name: 'dev',
          },
        },
      },
    };
    const wrapper = shallow(<PageView pageData={fallbackValue} />);
    // eslint-disable-next-line no-underscore-dangle
    const tracking = JSON.parse(wrapper.children().prop('dangerouslySetInnerHTML').__html);
    expect(tracking.extraUrlParams.cd60).toEqual('dev');
  });

  it('should render an empty object if there\'s no data', () => {
    const wrapper = shallow(<PageView pageData={{}} />);
    // eslint-disable-next-line no-underscore-dangle
    const tracking = JSON.parse(wrapper.children().prop('dangerouslySetInnerHTML').__html);
    expect(tracking).toEqual({});
  });

  it('should return and empty ampdocUrl if the permalink is not set', () => {
    const pageDataWithoutPermalink = cloneDeep(pageData);
    pageDataWithoutPermalink.analyticsData.web.common.permalink = null;
    const wrapper = shallow(<PageView pageData={pageDataWithoutPermalink} />);
    // eslint-disable-next-line no-underscore-dangle
    const tracking = JSON.parse(wrapper.children().prop('dangerouslySetInnerHTML').__html);
    expect(tracking.triggers.trackPageviewWithAmpdocUrl.ampdocUrl).toEqual('');
  });

  it('should render the tracking for prod environment', () => {
    expected.vars.account = 'UA-81851967-1';
    const wrapper = shallow(<PageView pageData={pageData} config={{ deploy: { env: 'production' } }} />);
    // eslint-disable-next-line no-underscore-dangle
    const tracking = JSON.parse(wrapper.children().prop('dangerouslySetInnerHTML').__html);
    expect(tracking).toEqual(expected);
  });
});
