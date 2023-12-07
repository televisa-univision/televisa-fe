import React from 'react';
import { shallow } from 'enzyme';
import Clickable from '@univision/fe-components-base/dist/components/Clickable';
import SocialTracker from '@univision/fe-commons/dist/utils/tracking/tealium/social/SocialTracker';
import Meta from '@univision/fe-components-base/dist/components/Meta/Meta';
import Sidebar from '.';
import Styles from './Sidebar.scss';

jest.mock('@univision/fe-commons/dist/store/store', () => {
  const state = {
    page: {
      device: 'desktop',
    },
    dfpAds: {
      hideAds: [],
    },
  };
  return {
    getState: jest.fn(() => state),
  };
});

/** @test {Sidebar} */
describe('Sidebar', () => {
  const props = {
    status: {
      running: false,
      progress: 0,
    },
    actions: {
      togglePlaying: null,
      onShareClick: jest.fn(),
      goToNextSlide: jest.fn(),
    },
    meta: {
      source: 'test',
    },
    reaction: {
      slideshowId: '123',
    },
    shareData: {
      title: 'foo',
      primaryTag: {},
      uid: 'hello-7-0',
    },
    hideAds: [],
    device: 'desktop',
  };

  const reactionProps = {
    slideshowId: '123',
    pollQuestion: 'test',
    activeSlideId: '123',
    autoSlideChangeTime: 12,
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<Sidebar {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('should show the pollQuestion if reaction have it', () => {
    const wrapper = shallow(<Sidebar {...props} reaction={reactionProps} activeSlideId="123" activeSlideNumber={1} />);
    expect(wrapper.find(`div.${Styles.pollQuestion}`)).toHaveLength(1);
  });

  it('should show the pollQuestionOverride if reaction exists and it has pollQuestionOverride', () => {
    const wrapper = shallow(<Sidebar {...props} reaction={reactionProps} activeSlideNumber={1} activeSlideId="123" pollQuestionOverride="Poll Question Override" />);
    expect(wrapper.find(`div.${Styles.pollQuestion}`).text()).toEqual('Poll Question Override');
  });

  it('should show the Clickable component if activeSlideNumber is 0', () => {
    const wrapper = shallow(<Sidebar {...props} activeSlideNumber={0} />);
    expect(wrapper.find(Clickable)).toHaveLength(1);
    wrapper.find(Clickable).simulate('click');
  });

  it('should show the Meta component if activeSlideNumber is 0 and device is desktop', () => {
    const wrapper = shallow(<Sidebar {...props} activeSlideNumber={0} />);
    expect(wrapper.find(Meta)).toHaveLength(1);
  });

  it('should show the Meta component if there is a sponsor and device is desktop', () => {
    const sponsor = {
      name: 'Sponsor Title',
      link: 'https://www.test.com/',
      logo: 'https://www.test.com/imagen.png',
    };
    const wrapper = shallow(<Sidebar {...props} activeSlideNumber={0} sponsor={sponsor} />);
    expect(wrapper.find(Meta)).toHaveLength(1);
  });

  it('should add the captionContainer style if hasActiveSlideNumber and hideCaption is false', () => {
    const wrapper = shallow(<Sidebar {...props} activeSlideNumber={0} activeSlideCaption="test desc" />);
    expect(wrapper.find(`div.${Styles.captionContainer}`)).toHaveLength(1);
  });

  it('should track ShareBar clicks', () => {
    spyOn(SocialTracker, 'track');
    const wrapper = shallow(<Sidebar {...props} reaction={null} activeSlideNumber={1} />);
    wrapper.find('ShareBar').simulate('click', 'facebook');
    expect(SocialTracker.track).toBeCalled();
  });
});
