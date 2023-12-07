import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import { shallow } from 'enzyme';

import Store from '@univision/fe-commons/dist/store/store';
import SocialTracker from '@univision/fe-commons/dist/utils/tracking/tealium/social/SocialTracker';
import InlineImage from '@univision/fe-components-base/dist/components/enhancements/InlineImage';
import Video from '@univision/fe-video/dist/components/VideoPlayer';
import LiveStreamEnhancement from '@univision/fe-video/dist/components/enhancements/LiveStream';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import {
  Opening, getDescription, getLoadableLiveblogLead, mapStateToProps,
} from './LiveBlogOpening';

Store.dispatch(setPageData({ requestParams: {} }));

/** @test {Header} */
describe('Header Spec', () => {
  const props = {
    title: 'test',
    description: 'Description',
    displayLeadMedia: true,
    linkableBulletedDescription: [],
    richTextDescription: [],
    hideLabel: false,
  };

  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Opening {...props} />, div);
  });

  it('should include authors and tempAuthors', () => {
    const wrapper = shallow(<Opening {...props} authors={[{ uid: '1abc' }]} tempAuthors={[{ uid: '2bcd' }]} />);
    expect(wrapper.find('Meta').prop('authors')[0].uid).toEqual('1abc');
    expect(wrapper.find('Meta').prop('tempAuthors')[0].uid).toEqual('2bcd');
  });

  it('should render a regular description', () => {
    const res = getDescription({ description: 'hello' });
    expect(res).toEqual('hello');
  });

  it('should render a rich description', () => {
    const res = getDescription({ description: 'hello', richTextDescription: ['teststring'] });
    expect(res[0].props.dangerouslySetInnerHTML).toBeDefined();
  });

  it('should render a bulleted description', () => {
    const res = getDescription({
      description: 'hello',
      linkableBulletedDescription: [{ text: 'teststring' }],
      richTextDescription: ['dontrender'],
    });
    expect(res.type).toEqual('ul');
  });

  it('should render a linkable bulleted description', () => {
    const res = getDescription({
      description: 'hello',
      linkableBulletedDescription: [{ link: 'teststring' }],
      richTextDescription: ['dontrender'],
    });
    const wrapper = shallow(res);
    expect(wrapper.find('Link')).toHaveLength(1);
  });

  it('tracks ShareBar clicks', async () => {
    spyOn(SocialTracker, 'track');
    const wrapper = shallow(<Opening {...props} />);
    await Loadable.preloadAll();
    wrapper
      .find('LoadableComponent')
      .dive()
      .simulate('click', 'facebook');
    expect(SocialTracker.track).toBeCalled();
  });

  it('should return image lead', async () => {
    const lead = getLoadableLiveblogLead({ type: 'image' });
    await Loadable.preloadAll();
    const wrapper = shallow(lead);
    expect(wrapper
      .find('LoadableComponent')
      .dive()
      .type()).toBe(InlineImage);
  });

  it('should return video lead', async () => {
    const lead = getLoadableLiveblogLead({ type: 'video' });
    await Loadable.preloadAll();
    const wrapper = shallow(lead);
    expect(wrapper
      .find('LoadableComponent')
      .dive()
      .type()).toBe(Video);
  });

  it('should return LiveStream lead', async () => {
    const lead = getLoadableLiveblogLead({ type: 'livestream' });
    await Loadable.preloadAll();
    const wrapper = shallow(lead);
    expect(wrapper
      .find('LoadableComponent')
      .dive()
      .type()).toBe(LiveStreamEnhancement);
  });

  it('should return null for unknown lead type', async () => {
    const lead = getLoadableLiveblogLead({ type: 'random' });
    expect(lead).toBe(null);
  });

  it('should map the store state to props', () => {
    const state = {
      liveBlog: {
        displayLeadMedia: true,
      },
    };
    expect(mapStateToProps(state, {})).toEqual(state.liveBlog);
  });
});
