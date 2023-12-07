import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import preloadAll from 'jest-next-dynamic';

import {
  LARGE, MEDIUM, SMALL,
} from '@univision/fe-commons/dist/constants/cardSizes';
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import PreviewVideoTracker from '@univision/fe-commons/dist/utils/tracking/tealium/video/PreviewVideoTracker';
import { DEPORTES_SCORE_CELLS } from '@univision/fe-commons/dist/constants/widgetTypes';
import VideoPlayer from '@univision/fe-video/dist/components/VideoPlayer';
import tudnTheme from '@univision/fe-commons/dist/themes/tudn';

import data from './__mocks__/squareCard.json';
import matchData from './SquareScoreCard/__mocks__/squareMatchCard.json';
import SquareCard from '.';

const store = configureStore();
const RECENT_POSTS_MOCK = ['Test', 'Test2', 'Test3'];
const extraData = { ...matchData.cell };
const widgetContext = {
  id: 2,
  matchId: '919268',
};
const pageDataScoreCells = {
  data: {
    widgets: [
      {
        id: 1,
        type: DEPORTES_SCORE_CELLS,
        extraData: [
          {
            ...matchData.cell,
          },
        ],
        settings: {
          uid: 1,
        },
      },
      {
        id: 2,
        type: 'Other Widget',
        settings: {
          uid: 2,
        },
        contents: [
          {
            uid: 1,
            matchId: 964763,
            extraData,
          },
        ],
      },
    ],
  },
};
const theme = tudnTheme();
// Mocks
jest.mock('@univision/fe-commons/dist/utils/api/fetchApi', () => ({
  fetchSportApi: jest.fn(() => Promise.resolve({})),
}));

/**
 * Create a new SquareCard
 * @param {Object} props - props
 * @param {function} createType - the creation type (mount/shallow)
 * @returns {JSX}
 */
const makeSquareCard = (props = {}, createType = shallow) => {
  const element = (
    <Provider store={store}>
      <SquareCard {...props} />
    </Provider>
  );
  return createType(element);
};

describe('SquareCard component tests', () => {
  beforeAll(async () => {
    delete window.location;
    const location = new URL('https://www.univision.com');
    location.replace = jest.fn();
    window.location = location;

    await preloadAll();
  });
  it('renders without crashing', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <SquareCard />
      </Provider>,
      div
    );
  });
  it('returns null if the component has non supported content type', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const wrapper = makeSquareCard({ ...data[0], type: 'someType' }, shallow);
    expect(wrapper.find('SquareContent')).toHaveLength(0);
  });
  it('renders correctly with valid props for story Large', () => {
    const wrapper = makeSquareCard({ ...data[0], size: LARGE }, mount);
    expect(wrapper.find('SquareCard').prop('size')).toBe(LARGE);
  });
  it('renders correctly with valid props for story Medium', () => {
    const wrapper = makeSquareCard({ ...data[0], size: MEDIUM }, mount);
    expect(wrapper.find('SquareCard').prop('size')).toBe(MEDIUM);
  });
  it('renders correctly with valid props for story small', () => {
    const wrapper = makeSquareCard({ ...data[0], size: SMALL }, mount);
    expect(wrapper.find('SquareCard').prop('size')).toBe(SMALL);
  });
  it('renders correctly with isDark prop', () => {
    const wrapper = makeSquareCard({ ...data[0], size: LARGE, isDark: true }, mount);
    expect(wrapper.find('SquareCardSizer').prop('isDark')).toBe(true);
  });
  it('renders correctly with isDark prop coming from theme', () => {
    const themeDark = {
      card: {
        isDark: {
          default: true,
        },
      },
    };
    const wrapper = makeSquareCard({
      ...data[0], size: LARGE, isDark: false, theme: themeDark,
    }, mount);
    expect(wrapper.find('SquareContent').prop('isDark')).toBe(true);
  });
  it('renders correctly with liveblog props', () => {
    const wrapper = makeSquareCard({ ...data[1], size: MEDIUM, sharing: null }, mount);
    expect(wrapper.find('SquareLiveblogPosts')).toHaveLength(1);
    expect(wrapper.find('Label').prop('type')).toBe('liveblog');
  });
  it('renders correctly with liveblog props in dark mode', () => {
    const wrapper = makeSquareCard({ ...data[1], size: MEDIUM, isDark: true }, mount);
    expect(wrapper.find('SquareLiveblogPosts')).toHaveLength(1);
    expect(wrapper.find('SquareLiveblogPosts').prop('isDark')).toBeTruthy();
  });
  it('renders correctly with liveblog props on Large', () => {
    const wrapper = makeSquareCard({ ...data[1], size: LARGE }, mount);
    expect(wrapper.find('SquareLiveblogPosts')).toHaveLength(1);
    expect(wrapper.find('Label').prop('type')).toBe('liveblog');
    expect(wrapper.find('SquareLiveblogPosts').prop('size')).toBe(LARGE);
  });
  it('renders correctly with liveblog props on small', () => {
    const wrapper = makeSquareCard({ ...data[1], size: SMALL }, mount);
    expect(wrapper.find('SquareLiveblogPosts')).toHaveLength(1);
    expect(wrapper.find('SquareLiveblogPosts').prop('size')).toBe(SMALL);
  });
  it('renders correctly with liveblog with no posts', () => {
    const wrapper = makeSquareCard(
      {
        ...data[1],
        size: MEDIUM,
        recentTitledPosts: [],
        recentPostTitles: [],
      },
      mount
    );
    expect(wrapper.find('SquareLiveblogPosts')).toHaveLength(1);
  });
  it('renders correctly with liveblog with titled only posts', () => {
    const wrapper = makeSquareCard(
      {
        ...data[1],
        size: MEDIUM,
        recentTitledPosts: [],
        recentPostTitles: RECENT_POSTS_MOCK,
      },
      mount
    );
    expect(wrapper.find('SquareLiveblogPosts')).toHaveLength(1);
    expect(wrapper.find('SquareLiveblogPosts Link').first().prop('href')).toBe('');
    expect(wrapper.find('SquareLiveblogPosts Link span').first().text()).toBe('Test');
  });
  it('renders correctly with liveblog with empty posts', () => {
    const wrapper = makeSquareCard(
      {
        ...data[1],
        size: MEDIUM,
        recentTitledPosts: [],
        recentPostTitles: ['', 'Test1'],
      },
      mount
    );
    expect(wrapper.find('SquareLiveblogPosts')).toHaveLength(1);
  });
  it('renders correctly with opinion props', () => {
    const wrapper = makeSquareCard({ ...data[2], size: MEDIUM }, mount);
    expect(wrapper.find('SquareCTA')).toHaveLength(1);
    expect(wrapper.find('Label').prop('type')).toBe('opinion');
  });
  it('renders correctly with advertising', () => {
    const wrapper = makeSquareCard({ ...data[3], size: MEDIUM, type: 'advertising' }, mount);
    expect(wrapper.find('SquareCTA')).toHaveLength(1);
    expect(wrapper.find('Label').prop('type')).toBe('advertising');
  });
  it('renders correctly with advertising and with advertisement brand', () => {
    const wrapper = makeSquareCard({
      ...data[3], size: MEDIUM, type: 'advertising', advertisementBrand: 'Pepsi',
    }, mount);
    expect(wrapper.find('SquareCTA')).toHaveLength(1);
    expect(wrapper.find('Label').prop('type')).toBe('advertising');
    expect(wrapper.find('SquareCTA__PublishedWrapper a').text()).toBe('Por: Pepsi');
  });
  it('renders correctly with breaking news', () => {
    const wrapper = makeSquareCard({ ...data[3], size: MEDIUM, contentPriority: 'BREAKING_NEWS' }, mount);
    expect(wrapper.find('SquareCTA')).toHaveLength(1);
    expect(wrapper.find('Label').prop('type')).toBe('breakingNews');
  });
  it('renders correctly with valid props for slideshow Large', () => {
    const wrapper = makeSquareCard({ ...data[4], size: LARGE }, mount);
    expect(wrapper.find('SquareCard').prop('size')).toBe(LARGE);
    expect(wrapper.find('SquareCard').prop('type')).toBe('slideshow');
  });
  it('renders correctly with valid props for slideshow Medium', () => {
    const wrapper = makeSquareCard({ ...data[4], size: MEDIUM }, mount);
    expect(wrapper.find('SquareCard').prop('size')).toBe(MEDIUM);
  });
  it('renders correctly with valid props for slideshow small', () => {
    const wrapper = makeSquareCard({ ...data[4], size: SMALL }, mount);
    expect(wrapper.find('SquareCard').prop('size')).toBe(SMALL);
  });
  it('should not render card images if not present', () => {
    const wrapper = makeSquareCard({ ...data[4], size: SMALL, cardImages: [] }, mount);
    expect(wrapper.find('SquareCard').prop('size')).toBe(SMALL);
    expect(wrapper.find('SquareSlideshowGrid__ImageGridImage')).toHaveLength(0);
  });
  it('renders correctly with valid props for video preview Large', () => {
    const wrapper = makeSquareCard({ ...data[5], size: LARGE }, mount);
    expect(wrapper.find('SquareCard').prop('size')).toBe(LARGE);
    expect(wrapper.find('SquareCard').prop('type')).toBe('video');
  });
  it('renders correctly with valid props for video preview Medium', () => {
    const wrapper = makeSquareCard({ ...data[5], size: MEDIUM }, mount);
    expect(wrapper.find('SquareCard').prop('size')).toBe(MEDIUM);
  });
  it('renders correctly with valid props for video preview small', () => {
    const wrapper = makeSquareCard({ ...data[5], size: SMALL, theme }, mount);
    expect(wrapper.find('SquareCard').prop('size')).toBe(SMALL);
  });
  it('renders correctly with valid props for video preview with string image', () => {
    const wrapper = makeSquareCard({
      ...data[5], image: 'tudn.jpg', size: SMALL, theme,
    }, mount);
    expect(wrapper.find('SquareCard').prop('size')).toBe(SMALL);
  });
  it('renders correctly with valid props for inline video and dark theme', () => {
    const wrapper = makeSquareCard(
      {
        ...data[6],
        size: LARGE,
        isInlineVideo: true,
        theme: { card: { isDark: { video: true } } },
      }, mount
    );
    expect(wrapper.find('SquareCard').prop('size')).toBe(LARGE);
    expect(wrapper.find('SquareCard').prop('type')).toBe('video');
  });
  it('renders correctly with valid props for inline Medium', () => {
    const wrapper = makeSquareCard({ ...data[6], size: MEDIUM, isInlineVideo: true }, mount);
    expect(wrapper.find('SquareCard').prop('size')).toBe(MEDIUM);
  });
  it('renders correctly with valid props for inline video small', () => {
    const wrapper = makeSquareCard({ ...data[6], size: SMALL, isInlineVideo: true }, mount);
    expect(wrapper.find('SquareCard').prop('size')).toBe(SMALL);
  });
  it('renders correctly with valid props for inline Medium in dark mode', () => {
    const wrapper = makeSquareCard({
      ...data[6], size: MEDIUM, isInlineVideo: true, isDark: true,
    }, mount);
    expect(wrapper.find('SquareCard').prop('size')).toBe(MEDIUM);
    expect(wrapper.find('SquareVideoInline').prop('isDark')).toBeTruthy();
  });
  it('should update video title and link', () => {
    const wrapper = makeSquareCard({
      ...data[6], size: MEDIUM, isInlineVideo: true, isDark: true,
    }, mount);
    wrapper
      .find(VideoPlayer)
      .props()
      .onPlaylistItemChange({ link: 'https://test', title: 'Video 2' });
    wrapper.update();

    expect(wrapper.find('SquareVideoInline').find('Link').props().href).toEqual('https://test');
    expect(wrapper.find('SquareVideoInline').find('Link').props().children).toEqual('Video 2');
  });
  it('renders correctly with valid props for livestream video', () => {
    const wrapper = makeSquareCard({ ...data[7], size: LARGE }, mount);
    expect(wrapper.find('SquareCard').prop('size')).toBe(LARGE);
    expect(wrapper.find('SquareCard').prop('type')).toBe('livestream');
    expect(wrapper.find('SquareLivestream')).toHaveLength(1);
  });
  it('renders correctly with valid props for livestream Medium', () => {
    const wrapper = makeSquareCard({ ...data[7], size: MEDIUM }, mount);
    expect(wrapper.find('SquareCard').prop('size')).toBe(MEDIUM);
  });
  it('renders correctly with valid props for livestream small', () => {
    const wrapper = makeSquareCard({ ...data[7], size: SMALL }, mount);
    expect(wrapper.find('SquareCard').prop('size')).toBe(SMALL);
  });
  it('renders correctly with no active livestream', () => {
    const wrapper = makeSquareCard({
      ...data[7], size: SMALL, active: false, cardLabel: 'EN VIVO',
    }, mount);
    expect(wrapper.find('SquareCard').prop('size')).toBe(SMALL);
    expect(wrapper.find('SquareLivestream')).toHaveLength(1);
    expect(wrapper.find('SquareLivestream__LivestreamImageLink')).toHaveLength(1);
  });
  it('renders correctly with livestream active but as secondary content', () => {
    const wrapper = makeSquareCard({
      ...data[7], size: SMALL, active: true, isSecondaryContent: true,
    }, mount);
    expect(wrapper.find('SquareCard').prop('size')).toBe(SMALL);
    expect(wrapper.find('SquareLivestream')).toHaveLength(1);
    expect(wrapper.find('SquareLivestream__LivestreamImageLink')).toHaveLength(1);
  });
  it('renders correctly with no active livestream and without a badge', () => {
    const wrapper = makeSquareCard({
      ...data[7], size: SMALL, active: false, cardLabel: null,
    }, mount);
    expect(wrapper.find('SquareCard').prop('size')).toBe(SMALL);
    expect(wrapper.find('SquareLivestream')).toHaveLength(1);
  });
  it('renders correctly with valid props for soccer match', () => {
    store.dispatch(setPageData(pageDataScoreCells));
    const wrapper = makeSquareCard({
      ...data[10], size: LARGE, widgetContext,
    }, mount);
    expect(wrapper.find('SquareCard').prop('size')).toBe(LARGE);
    expect(wrapper.find('SquareCard').prop('type')).toBe('soccermatch');
    expect(wrapper.find('SquareScoreCard')).toHaveLength(1);
  });
  it('renders correctly with valid props for soccer match Medium', () => {
    store.dispatch(setPageData(pageDataScoreCells));
    const wrapper = makeSquareCard({
      ...data[10], size: MEDIUM, widgetContext,
    }, mount);
    expect(wrapper.find('SquareCard').prop('size')).toBe(MEDIUM);
  });
  it('renders correctly with valid props for soccer match small', () => {
    store.dispatch(setPageData(pageDataScoreCells));
    const wrapper = makeSquareCard({
      ...data[10], size: SMALL, widgetContext,
    }, mount);
    expect(wrapper.find('SquareCard').prop('size')).toBe(SMALL);
  });
  it('renders correctly with valid props for soccer match livestream type small', () => {
    store.dispatch(setPageData(pageDataScoreCells));
    const wrapper = makeSquareCard({
      ...data[11], size: LARGE, widgetContext,
    }, mount);
    expect(wrapper.find('SquareCard').prop('size')).toBe(LARGE);
    expect(wrapper.find('SquareCard').prop('type')).toBe('livestream');
    expect(wrapper.find('SquareScoreCard')).toHaveLength(1);
  });
  it('renders correctly with valid props for podcast episode Medium', () => {
    const wrapper = makeSquareCard({
      ...data[12], size: MEDIUM, widgetContext,
    }, mount);
    expect(wrapper.find('SquareCard').prop('size')).toBe(MEDIUM);
    expect(wrapper.find('SquareCard').prop('type')).toBe('audio');
    expect(wrapper.find('PodcastEpisodeCard')).toHaveLength(1);
  });
  it('renders correctly with valid props for podcast episode Medium for new episode', () => {
    const wrapper = makeSquareCard({
      ...data[12], size: MEDIUM, widgetContext, feedPubDate: new Date().getTime(),
    }, mount);
    expect(wrapper.find('SquareCard').prop('size')).toBe(MEDIUM);
    expect(wrapper.find('SquareCard').prop('type')).toBe('audio');
    expect(wrapper.find('PodcastEpisodeCard')).toHaveLength(1);
  });
  it('renders correctly with valid props for podcast episode small', () => {
    const wrapper = makeSquareCard({
      ...data[12], size: SMALL, widgetContext,
    }, mount);
    expect(wrapper.find('SquareCard').prop('size')).toBe(SMALL);
  });
  it('renders correctly with valid props for podcast episode small for new episode', () => {
    const wrapper = makeSquareCard({
      ...data[12], size: SMALL, widgetContext, feedPubDate: new Date().getTime(),
    }, mount);
    expect(wrapper.find('SquareCard').prop('size')).toBe(SMALL);
  });
  it('renders correctly with valid props for podcast series Medium', () => {
    const wrapper = makeSquareCard({
      ...data[13], size: MEDIUM, widgetContext, episodeCount: 10,
    }, mount);
    expect(wrapper.find('SquareCard').prop('size')).toBe(MEDIUM);
    expect(wrapper.find('SquareCard').prop('type')).toBe('podcastseries');
  });
  it('renders correctly with valid props for podcast series small', () => {
    const wrapper = makeSquareCard({
      ...data[13], size: SMALL, widgetContext,
    }, mount);
    expect(wrapper.find('SquareCard').prop('size')).toBe(SMALL);
  });
  it('renders correctly with valid props for radio station Medium', () => {
    const wrapper = makeSquareCard({
      ...data[15], size: MEDIUM, widgetContext,
    }, mount);
    expect(wrapper.find('SquareCard').prop('size')).toBe(MEDIUM);
    expect(wrapper.find('SquareCard').prop('type')).toBe('radiostation');
  });
  it('renders correctly with valid props for radio station small', () => {
    const wrapper = makeSquareCard({
      ...data[15], size: SMALL, widgetContext,
    }, mount);
    expect(wrapper.find('SquareCard').prop('size')).toBe(SMALL);
  });
  it('renders correctly with valid props for show', () => {
    const wrapper = makeSquareCard({
      ...data[9], size: LARGE, widgetContext,
    }, mount);
    expect(wrapper.find('SquareCard').prop('size')).toBe(LARGE);
    expect(wrapper.find('SquareCard').prop('type')).toBe('show');
    expect(wrapper.find('SquareShow')).toHaveLength(1);
  });
  it('renders correctly with valid props for show Medium', () => {
    const wrapper = makeSquareCard({
      ...data[9], size: MEDIUM, widgetContext,
    }, mount);
    expect(wrapper.find('SquareCard').prop('size')).toBe(MEDIUM);
  });
  it('renders correctly with valid props for show small', () => {
    const wrapper = makeSquareCard({
      ...data[9], size: SMALL, widgetContext,
    }, mount);
    expect(wrapper.find('SquareCard').prop('size')).toBe(SMALL);
  });
  it('renders correctly with valid props for person', () => {
    const wrapper = makeSquareCard({
      ...data[14], size: LARGE, widgetContext,
    }, mount);
    expect(wrapper.find('SquareCard').prop('size')).toBe(LARGE);
    expect(wrapper.find('SquareCard').prop('type')).toBe('person');
    expect(wrapper.find('SquarePerson')).toHaveLength(1);
  });
  it('renders correctly with valid props for person large dark', () => {
    const wrapper = makeSquareCard({
      ...data[14], size: LARGE, widgetContext, isDark: true, fullBio: null,
    }, mount);
    expect(wrapper.find('SquareCard').prop('size')).toBe(LARGE);
    expect(wrapper.find('SquareCard').prop('type')).toBe('person');
    expect(wrapper.find('SquarePerson')).toHaveLength(1);
  });
  it('renders correctly with valid props for person Medium', () => {
    const wrapper = makeSquareCard({
      ...data[14],
      size: MEDIUM,
      widgetContext,
      isDark: false,
      socialNetworks: {
        facebookUrl: null,
        twitterUrl: null,
        instagramUrl: null,
      },
    }, mount);
    expect(wrapper.find('SquareCard').prop('size')).toBe(MEDIUM);
  });
  it('renders correctly with valid props for person small', () => {
    store.dispatch(setPageData(pageDataScoreCells));
    const wrapper = makeSquareCard({
      ...data[14],
      size: SMALL,
      widgetContext,
      isDark: true,
      socialNetWorks: {},
    }, mount);
    expect(wrapper.find('SquareCard').prop('size')).toBe(SMALL);
  });
  it('renders correctly with valid props for section Large', () => {
    const wrapper = makeSquareCard({ ...data[16], size: LARGE }, mount);
    expect(wrapper.find('SquareCard').prop('size')).toBe(LARGE);
    expect(wrapper.find('SquareGeneric')).toHaveLength(1);
  });
  it('renders correctly with valid props for section Medium', () => {
    const wrapper = makeSquareCard({ ...data[16], size: MEDIUM }, mount);
    expect(wrapper.find('SquareCard').prop('size')).toBe(MEDIUM);
    expect(wrapper.find('SquareGeneric')).toHaveLength(1);
  });
  it('renders correctly with valid props for section small', () => {
    const wrapper = makeSquareCard({ ...data[16], size: SMALL }, mount);
    expect(wrapper.find('SquareCard').prop('size')).toBe(SMALL);
    expect(wrapper.find('SquareGeneric')).toHaveLength(1);
  });
  it('renders correctly with status loading', () => {
    const wrapper = makeSquareCard({ ...data[16], size: SMALL, status: 'loading' }, mount);
    expect(wrapper.find('SquareCard').prop('size')).toBe(SMALL);
    expect(wrapper.find('SquareCardLoading')).toHaveLength(1);
  });
  it('renders correctly with isDark prop', () => {
    const wrapper = makeSquareCard({ ...data[16], size: LARGE, isDark: true }, mount);
    expect(wrapper.find('SquareCardSizer').prop('isDark')).toBe(true);
    expect(wrapper.find('SquareGeneric')).toHaveLength(1);
  });
  it('renders correctly with valid props for external link Large', () => {
    const wrapper = makeSquareCard({ ...data[17], size: LARGE }, mount);
    expect(wrapper.find('SquareCard').prop('size')).toBe(LARGE);
    expect(wrapper.find('SquareExternalPromo')).toHaveLength(1);
  });
  it('renders correctly with valid props for external link Medium', () => {
    const wrapper = makeSquareCard({ ...data[18], size: MEDIUM }, mount);
    expect(wrapper.find('SquareCard').prop('size')).toBe(MEDIUM);
    expect(wrapper.find('SquareExternalPromo')).toHaveLength(1);
  });
  it('renders correctly with valid props for external link small', () => {
    const wrapper = makeSquareCard({ ...data[18], size: SMALL, schedule: null }, mount);
    expect(wrapper.find('SquareCard').prop('size')).toBe(SMALL);
    expect(wrapper.find('SquareExternalPromo')).toHaveLength(1);
  });
  it('renders correctly with isDark prop', () => {
    const wrapper = makeSquareCard({
      ...data[16], size: LARGE, isDark: true, feedConsumer: 'CONECTA',
    }, mount);
    expect(wrapper.find('SquareCardSizer').prop('isDark')).toBe(true);
    expect(wrapper.find('SquareGeneric')).toHaveLength(1);
  });
  it('renders correctly with valid props for external link with fallback image', () => {
    const wrapper = makeSquareCard(
      {
        ...data[22],
        size: SMALL,
        feedConsumer: 'CONECTA',
        schedule: {
          feedConsumer: null,
          image: {},
          schedules: [],
        },
      },
      mount
    );
    expect(wrapper.find('SquareCard').prop('size')).toBe(SMALL);
    expect(wrapper.find('SquareGeneric')).toHaveLength(1);
    expect(wrapper.find('SquareGeneric__PromoSchedule')).toHaveLength(1);
  });
  it('renders correctly with external promo content card', () => {
    const wrapper = makeSquareCard({ ...data[21], size: LARGE, isDark: true }, mount);
    expect(wrapper.find('SquareCardSizer').prop('isDark')).toBe(true);
    expect(wrapper.find('SquareCard').prop('type')).toBe('externalcontentpromo');
  });
  it('renders horoscope card', () => {
    const wrapper = makeSquareCard({ ...data[23], size: LARGE, isDark: true }, mount);
    expect(wrapper.find('SquareCardSizer').prop('isDark')).toBe(true);
    expect(wrapper.find('SquareCard').prop('type')).toBe('article');
  });
  it('renders correctly with valid props for soccer', () => {
    const wrapper = makeSquareCard({
      ...data[25],
    }, mount);
    expect(wrapper.find('SquareCard').prop('type')).toBe('soccerperson');
  });
});

describe('SquareCard tracking tests', () => {
  it('should track clicks for title on the Video preview Card - PreviewVideoTracker', () => {
    store.dispatch(setPageData({
      config: {
        deploy: { multiSite: true },
      },
      data: { type: 'section' },
    }));
    const trackerSpy = jest.spyOn(PreviewVideoTracker, 'track');
    const wrapper = mount(
      <Provider store={store}>
        <SquareCard {...data[5]} size={MEDIUM} isInlineVideo={false} />
      </Provider>
    );
    wrapper.find(`SquareVideo a[href="${data[5].uri}"]`).first().simulate('click');

    expect(wrapper.find('SquareVideo')).toHaveLength(1);
    expect(trackerSpy).toHaveBeenLastCalledWith(expect.any(Function), {
      cardType: 'VideoCard2 preview - Square',
      title: data[5].title.toLowerCase(),
      trackEvent: 'click',
      uid: data[5].uid,
      widgetContext: {},
    });
  });
});
