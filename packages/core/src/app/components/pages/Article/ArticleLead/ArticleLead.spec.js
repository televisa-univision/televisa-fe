import React from 'react';
import Loadable from 'react-loadable';
import { shallow } from 'enzyme';

import Store from '@univision/fe-commons/dist/store/store';
import setPageData, { setPreLoadableComponents } from '@univision/fe-commons/dist/store/actions/page-actions';

import VideoPlayer from '@univision/fe-video/dist/components/VideoPlayer';
import LiveStreamEnhancement from '@univision/fe-video/dist/components/enhancements/LiveStream';
import InlineImage from '@univision/fe-components-base/dist/components/enhancements/InlineImage';

import ArticleLead, { getLoadableArticleLead } from './ArticleLead';

jest.mock('react-lazyload', () => jest.fn(props => <div>{props.children}</div>));
jest.mock('@univision/fe-commons/dist/components/LazyLoad', () => jest.fn(props => <div>{props.children()}</div>));
jest.mock('@univision/fe-video/dist', () => ({
  __esModule: true,
  default: <div />,
}));
jest.mock('components/pages/HorizontalSlideshow/SlideshowWrapper', () => jest.fn());

Store.dispatch(setPageData({ requestParams: {} }));

let props;
beforeEach(() => {
  props = {
    lead: {
      type: 'image',
      renditions: {
        original: {
          href: 'image.jpg',
        },
      },
    },
  };
});

describe('ArticleBody tests', () => {
  it('renders as expected', async () => {
    const wrapper = shallow(<ArticleLead {...props} />);
    await Loadable.preloadAll();
    expect(wrapper.children().dive().dive().type()).toBe(InlineImage);
  });

  it('does not render children for unknown lead types', () => {
    props.lead.type = 'unknown';
    const wrapper = shallow(<ArticleLead {...props} />);
    expect(wrapper.children()).toHaveLength(0);
  });

  it('handles video leads', async () => {
    props.lead.type = 'video';
    const wrapper = shallow(<ArticleLead {...props} />);
    await Loadable.preloadAll();
    expect(
      wrapper
        .children()
        .children()
        .dive()
        .dive()
        .type()
    ).toBe(VideoPlayer);
  });

  it('handles video leads with autoplay on, when is first article', async () => {
    props.lead.type = 'video';
    props.articleDepth = 1;
    const wrapper = shallow(<ArticleLead {...props} />);
    await Loadable.preloadAll();
    expect(wrapper.children().children().children().props().autoplay).toBe(true);
  });

  it('handles video leads with autoplay off, when is not first article', async () => {
    props.lead.type = 'video';
    props.articleDepth = 2;
    const wrapper = shallow(<ArticleLead {...props} />);
    await Loadable.preloadAll();
    expect(wrapper.children().children().children().props().autoplay).toBe(false);
  });

  it('should handles livestream leads', async () => {
    props.lead.type = 'livestream';
    const wrapper = shallow(<ArticleLead {...props} />);
    await Loadable.preloadAll();
    expect(
      wrapper
        .children()
        .children()
        .dive()
        .dive()
        .type()
    ).toBe(LiveStreamEnhancement);
  });

  it('should handles playlist leads', async () => {
    Store.dispatch(setPageData({
      requestParams: {},
      data: {
        videoLeadRelatedContent: [{ mcpid: 123 }, { mcpid: 345 }],
      },
    }));

    props.lead.type = 'video';
    const wrapper = shallow(<ArticleLead {...props} />);
    await Loadable.preloadAll();
    expect(
      wrapper
        .children()
        .children()
        .dive()
        .dive()
        .find('Connect(VideoWithPlaylistComponent)')
    ).toHaveLength(1);
  });

  it('should handle slideshow leads with client-side lazy loading', async () => {
    props.lead.type = 'slideshow';
    props.lead.slides = [{ image: {} }];
    const wrapper = shallow(<ArticleLead {...props} />);
    await Loadable.preloadAll();
    expect(wrapper
      .children()
      .children()
      .dive()
      .find('SlideshowWrapper'));
  });

  it('should handle slideshow leads with server-side lazy loading', async () => {
    props.lead.type = 'slideshow';
    props.lead.slides = null;
    const wrapper = shallow(<ArticleLead {...props} />);
    await Loadable.preloadAll();
    expect(wrapper
      .children().dive()
      .children().children()
      .dive()
      .find('SlideshowWrapper'));
  });

  it('handles null leads', async () => {
    props.lead = null;
    const wrapper = shallow(<ArticleLead {...props} />);
    await Loadable.preloadAll();
    expect(wrapper.getElement()).toBe(null);
  });

  it('handles default null leads', async () => {
    const lead = getLoadableArticleLead();
    expect(lead).toEqual(null);
  });

  it('handles leads from store', async () => {
    props.lead.type = 'slideshow';
    Store.dispatch(setPreLoadableComponents({ articleLead: getLoadableArticleLead(props.lead) }));
    const wrapper = shallow(<ArticleLead {...props} />);
    await Loadable.preloadAll();
    expect(wrapper
      .children().dive()
      .children().children()
      .dive()
      .find('SlideshowWrapper'));
  });

  it('handles null leads from store', async () => {
    props.lead = null;
    Store.dispatch(setPreLoadableComponents({ articleLead: getLoadableArticleLead(props.lead) }));
    const wrapper = shallow(<ArticleLead {...props} />);
    await Loadable.preloadAll();
    expect(wrapper.getElement()).toBe(null);
  });
});
