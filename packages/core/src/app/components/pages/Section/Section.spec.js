import React from 'react';
import Loadable from 'react-loadable';
import { shallow, mount } from 'enzyme';

import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import ThemeProvider from '@univision/fe-commons/dist/components/ThemeProvider';
import features from '@univision/fe-commons/dist/config/features';
import Section from './Section';
import Styles from './Section.scss';
import refreshableHelper from './refreshableHelper';

jest.mock('@univision/fe-commons/dist/config/features', () => ({
  shows: {
    showsRedesign: jest.fn(() => false),
  },
  shouldPersonalize: jest.fn(() => false),
  section: {
    refreshable: jest.fn(() => false),
  },
  widgets: {
    stickyCTA: {
      active: jest.fn(() => true),
    },
  },
  content: {
    isSensitive: jest.fn(() => false),
  },
  header: {
    hideHeaderFooter: jest.fn(() => false),
  },
  video: {
    isSingleVideoInstance: jest.fn(() => false),
  },
  smartBanner: {
    smartBannerEnabled: jest.fn(() => true),
  },
}));

jest.mock('./refreshableHelper', () => jest.fn(() => false));

const widgets = [
  <div className="cont" key="0">
    Hello World!
  </div>,
  <div className="cont" key="1">
    Hello World!
  </div>,
  <div className="cont" key="2">
    Hello World!
  </div>,
  <div className="cont" key="3">
    Hello World!
  </div>,
  <div className="cont" key="4">
    Hello World!
  </div>,
];

/** @test {Section} */
describe('Section Spec', () => {
  const testWidget = [<div key="0">Hello World!</div>, <span key="1">Test</span>];
  it('should render the main div', async () => {
    Store.dispatch(setPageData({ data: { title: 'test' } }));
    const wrapper = shallow(<Section widgets={testWidget} />);
    await Loadable.preloadAll();
    expect(wrapper.find('div.app-container')).toBeDefined();
  });

  it('should render in dark when is show', () => {
    features.shows.showsRedesign.mockReturnValueOnce(true);
    const data = { data: { uri: 'univision.com/shows' }, pageCategory: 'show' };
    Store.dispatch(setPageData(data));
    const wrapper = shallow(<Section widgets={testWidget} />);
    expect(wrapper.find(ThemeProvider).children().first().hasClass(Styles.dark)).toBeTruthy();
  });

  it('should show a hidden h1 if primary topic exist', () => {
    const dataWithTopic = {
      data: {
        primaryTopic: 'Hello World',
        widgets: [{ a: 'b' }, { a: 'b' }, { a: 'b' }, { a: 'b' }, { a: 'b' }, { a: 'b' }],
      },
    };
    Store.dispatch(setPageData(dataWithTopic));
    const wrapper = shallow(<Section widgets={widgets} />);
    expect(wrapper.find('Title').prop('hidden')).toBe(true);
  });

  it('should wrap in Refreshable if flag is active', () => {
    refreshableHelper.mockReturnValueOnce(true);
    features.section.refreshable.mockReturnValueOnce(true);
    const wrapper = shallow(<Section widgets={widgets} />);
    expect(wrapper.find('Refreshable')).toHaveLength(1);
  });

  it('should render OpeningWidgetController when localMarket is present', async () => {
    Store.dispatch(setPageData({
      data: {
        uri: 'test/tiempo',
        tvStation: {
          uri: 'test',
        },
      },
    }));

    const wrapper = mount(<Section widgets={widgets} />);
    await Loadable.preloadAll();
    wrapper.update();
    expect(wrapper.find('OpeningWidgetController')).toBeDefined();
  });
});
