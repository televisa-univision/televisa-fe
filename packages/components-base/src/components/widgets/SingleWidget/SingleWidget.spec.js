import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import * as hooks from 'react-redux';
import { Provider } from 'react-redux';

import {
  PRENDETV_24_7,
  EPG_TUDN_MX_URL,
  TUDN_CARD_MOBILE_BG,
  BACKGROUND_24_7,
} from '@univision/fe-commons/dist/constants/urls';
import VideoPlayer from '@univision/fe-video/dist/components/VideoPlayer';
import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';

import configureStore from '@univision/fe-commons/dist/store/configureStore';
import {
  LIVE_BLOG,
} from '@univision/fe-commons/dist/constants/contentTypes.json';
import dataMock from './__mocks__/singleWidget.json';
import SingleWidget from '.';

jest.mock('react-lazyload', () => jest.fn(props => <div>{props.children}</div>));

const store = configureStore();

describe('SingleWidget', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><SingleWidget /></Provider>, div);
  });

  it('should render single widget of type article - desktop', () => {
    const currentWidget = dataMock.data.widgets[1];

    const props = {
      device: 'desktop',
      cardData: [null, currentWidget.contents[0]],
      settings: currentWidget.settings,
    };
    const wrapper = mount(
      <Provider store={store}>
        <SingleWidget {...props} />
      </Provider>
    );

    const { type, children } = wrapper.find('SingleWidget__LinkTitle').props();
    expect(type).toBe('article');
    expect(children).toBe('Biden pide al Congreso extender la moratoria a los desalojos porque un fallo del Supremo no da opción a su gobierno');
  });

  it('should render single widget of type article - desktop in black theme', () => {
    const currentWidget = dataMock.data.widgets[2];

    const props = {
      device: 'desktop',
      theme: { isDark: true },
      isLive247: true,
      cardData: [null, currentWidget.contents[0]],
      settings: currentWidget.settings,
    };

    const wrapper = mount(
      <Provider store={store}>
        <SingleWidget {...props} />
      </Provider>
    );

    const { type, children } = wrapper.find('SingleWidget__LinkTitle').props();
    expect(type).toBe('liveblog');
    expect(children).toBe('Últimas noticias del coronavirus: Biden busca reimpulsar la vacunación con nuevas medidas');
  });

  it('should render single widget of type article - desktop in default theme', () => {
    const currentWidget = dataMock.data.widgets[2];

    const props = {
      device: 'desktop',
      theme: { isDark: false },
      isLive247: true,
      cardData: [null, currentWidget.contents[0]],
      settings: currentWidget.settings,
    };

    const wrapper = mount(
      <Provider store={store}>
        <SingleWidget {...props} />
      </Provider>
    );

    const { type, children } = wrapper.find('SingleWidget__LinkTitle').props();
    expect(type).toBe('liveblog');
    expect(children).toBe('Últimas noticias del coronavirus: Biden busca reimpulsar la vacunación con nuevas medidas');
  });

  it('should fallback to default object if settings is not set', () => {
    const currentWidget = dataMock.data.widgets[1];

    const props = {
      device: 'desktop',
      cardData: [null, currentWidget.contents[0]],
      settings: null,
    };
    const wrapper = mount(
      <Provider store={store}>
        <SingleWidget {...props} />
      </Provider>
    );

    expect(wrapper.find('WidgetTitle').first().prop('title')).toBeUndefined();
  });

  it('should call widget tracking when its clicked', () => {
    spyOn(WidgetTracker, 'track');
    const currentWidget = dataMock.data.widgets[1];
    const props = {
      device: 'desktop',
      cardData: [null, currentWidget.contents[0]],
      settings: currentWidget.settings,
    };

    const widgetContext = {
      test: 'foo',
    };
    const {
      type: contentType, title: contentTitle, uid: contentUid,
    } = currentWidget.contents[0];
    const expectedCall = {
      target: 'content',
      contentTitle,
      contentType,
      contentUid,
      widgetContext,
    };
    const wrapper = mount(
      <Provider store={store}>
        <SingleWidget widgetContext={widgetContext} {...props} />
      </Provider>
    );
    const linkTitle = wrapper.find('SingleWidget__MainWrapper Link').first();
    linkTitle.simulate('click');
    expect(WidgetTracker.track).toHaveBeenLastCalledWith(expect.any(Function), expectedCall);
  });

  it('should render single widget of type article - mobile', () => {
    const currentWidget = dataMock.data.widgets[1];

    const props = {
      device: 'mobile',
      cardData: [null, currentWidget.contents[0]],
      settings: currentWidget.settings,
    };
    const wrapper = mount(
      <Provider store={store}>
        <SingleWidget {...props} />
      </Provider>
    );

    const { type, children } = wrapper.find('SingleWidget__LinkTitle').props();
    expect(type).toBe('article');
    expect(children).toBe('Biden pide al Congreso extender la moratoria a los desalojos porque un fallo del Supremo no da opción a su gobierno');
  });

  it('should render single widget of type article with related flavor - desktop ', () => {
    const currentWidget = dataMock.data.widgets[0];

    const props = {
      device: 'desktop',
      cardData: [null, currentWidget.contents[0]],
      settings: currentWidget.settings,
    };
    const wrapper = mount(
      <Provider store={store}>
        <SingleWidget {...props} />
      </Provider>
    );

    const { type, children } = wrapper.find('SingleWidget__LinkTitle').props();
    expect(type).toBe('article');
    expect(children).toBe('Nueva ola pandémica frena planes para detener deportaciones aceleradas en la frontera');

    const { articles } = wrapper.find('RelatedArticleCollection').props();
    expect(articles.length).toBe(2);

    const { cardLabel, contentPriority } = wrapper.find('SingleWidget__SquareBadgeWrapper').props();
    expect(cardLabel).toBe('ÚLTIMA HORA');
    expect(contentPriority).toBe('BREAKING_NEWS');
  });

  it('should render single widget of type article with related flavor - mobile ', () => {
    const currentWidget = dataMock.data.widgets[0];

    const props = {
      device: 'mobile',
      cardData: [null, currentWidget.contents[0]],
      settings: currentWidget.settings,
      type: LIVE_BLOG,
    };
    const wrapper = mount(
      <Provider store={store}>
        <SingleWidget {...props} />
      </Provider>
    );

    const { type, children } = wrapper.find('SingleWidget__LinkTitle').props();
    expect(type).toBe('article');
    expect(children).toBe('Nueva ola pandémica frena planes para detener deportaciones aceleradas en la frontera');

    const { articles } = wrapper.find('RelatedArticleCollection').props();
    expect(articles.length).toBe(1);
  });

  it('should render single widget of type article with related flavor - desktop ', () => {
    const currentWidget = dataMock.data.widgets[0];

    const props = {
      device: 'desktop',
      cardData: [null, currentWidget.contents[0]],
      settings: currentWidget.settings,
    };
    const wrapper = mount(
      <Provider store={store}>
        <SingleWidget {...props} />
      </Provider>
    );

    const { type, children } = wrapper.find('SingleWidget__LinkTitle').props();
    expect(type).toBe('article');
    expect(children).toBe('Nueva ola pandémica frena planes para detener deportaciones aceleradas en la frontera');

    const { articles } = wrapper.find('RelatedArticleCollection').props();
    expect(articles.length).toBe(2);
  });

  it('should render single widget of type liveblog - desktop ', () => {
    const currentWidget = dataMock.data.widgets[2];

    const props = {
      device: 'desktop',
      cardData: [null, currentWidget.contents[0]],
      settings: currentWidget.settings,
    };
    const wrapper = mount(
      <Provider store={store}>
        <SingleWidget {...props} />
      </Provider>
    );

    const { type, children } = wrapper.find('SingleWidget__LinkTitle').props();
    expect(type).toBe('liveblog');
    expect(children).toBe('Últimas noticias del coronavirus: Biden busca reimpulsar la vacunación con nuevas medidas');

    const {
      recentPostTitles,
      recentTitledPosts,
      size,
    } = wrapper.find('SingleWidget__SquareLiveblogPostsWrapper').props();
    expect(recentPostTitles.length).toBe(3);
    expect(recentTitledPosts.length).toBe(3);
    expect(size).toBe('large');

    const { cardLabel } = wrapper.find('SingleWidget__SquareBadgeWrapper').props();
    expect(cardLabel).toBe('LIVEBLOG');
  });

  it('should render single widget of type liveblog - mobile ', () => {
    const currentWidget = dataMock.data.widgets[2];

    const props = {
      device: 'mobile',
      cardData: [null, currentWidget.contents[0]],
      settings: currentWidget.settings,
    };
    const wrapper = mount(
      <Provider store={store}>
        <SingleWidget {...props} />
      </Provider>
    );

    const { type, children } = wrapper.find('SingleWidget__LinkTitle').props();
    expect(type).toBe('liveblog');
    expect(children).toBe('Últimas noticias del coronavirus: Biden busca reimpulsar la vacunación con nuevas medidas');

    const {
      recentPostTitles,
      recentTitledPosts,
      size,
    } = wrapper.find('SingleWidget__SquareLiveblogPostsWrapper').props();
    expect(recentPostTitles.length).toBe(3);
    expect(recentTitledPosts.length).toBe(3);
    expect(size).toBe('medium');
  });

  it('should render single widget of type section ', () => {
    const currentWidget = dataMock.data.widgets[3];

    const props = {
      device: 'desktop',
      cardData: [null, currentWidget.contents[0]],
      settings: currentWidget.settings,
    };
    const wrapper = mount(
      <Provider store={store}>
        <SingleWidget {...props} />
      </Provider>
    );

    const { type, children } = wrapper.find('SingleWidget__LinkTitle').props();
    expect(type).toBe('section');
    expect(children).toBe('Uforia Nation en las Mañanas');
  });

  it('should render single widget of type external content promo ', () => {
    const currentWidget = dataMock.data.widgets[4];

    const props = {
      device: 'desktop',
      cardData: [null, currentWidget.contents[0]],
      settings: currentWidget.settings,
    };
    const wrapper = mount(
      <Provider store={store}>
        <SingleWidget {...props} />
      </Provider>
    );

    const { type, children } = wrapper.find('SingleWidget__LinkTitle').props();
    expect(type).toBe('externalcontentpromo');
    expect(children).toBe('Podcast Premio Lo Nuestro 2020');
  });

  it('should render single widget of type external content promo - mobile', () => {
    const currentWidget = dataMock.data.widgets[4];

    const props = {
      device: 'mobile',
      cardData: [null, currentWidget.contents[0]],
      settings: currentWidget.settings,
    };
    const wrapper = mount(
      <Provider store={store}>
        <SingleWidget {...props} />
      </Provider>
    );

    const { type, children } = wrapper.find('SingleWidget__LinkTitle').props();
    expect(type).toBe('externalcontentpromo');
    expect(children).toBe('Podcast Premio Lo Nuestro 2020');
  });

  it('should render single widget of type video ', () => {
    const currentWidget = dataMock.data.widgets[5];

    const props = {
      device: 'desktop',
      cardData: [null, currentWidget.contents[0]],
      settings: currentWidget.settings,
    };
    const wrapper = mount(
      <Provider store={store}>
        <SingleWidget {...props} />
      </Provider>
    );

    const { type, children } = wrapper.find('SingleWidget__LinkTitle').props();
    expect(type).toBe('video');
    expect(children).toBe('La historia de los hermanos fallecidos que encontraron abrazados bajo escombros en México');

    const { mcpid } = wrapper.find(VideoPlayer).props();
    expect(mcpid).toBe('3372866');
  });

  it('should render single widget of type video - mobile', () => {
    const currentWidget = dataMock.data.widgets[5];

    const props = {
      device: 'mobile',
      cardData: [null, currentWidget.contents[0]],
      settings: currentWidget.settings,
    };
    const wrapper = mount(
      <Provider store={store}>
        <SingleWidget {...props} />
      </Provider>
    );

    const { type, children } = wrapper.find('SingleWidget__LinkTitle').props();
    expect(type).toBe('video');
    expect(children).toBe('La historia de los hermanos fallecidos que encontraron abrazados bajo escombros en México');

    const { mcpid } = wrapper.find(VideoPlayer).props();
    expect(mcpid).toBe('3372866');
  });

  it('should render single widget of type livestream ', () => {
    const currentWidget = dataMock.data.widgets[6];
    delete currentWidget.contents[0].image;

    const props = {
      device: 'desktop',
      cardData: [null, currentWidget.contents[0]],
      settings: currentWidget.settings,
    };

    const wrapper = mount(
      <Provider store={store}>
        <SingleWidget {...props} />
      </Provider>
    );

    const { type, children } = wrapper.find('SingleWidget__LinkTitle').props();
    expect(type).toBe('livestream');
    expect(children).toBe('La historia de los hermanos fallecidos que encontraron abrazados bajo escombros en México');

    const { streamId } = wrapper.find('LiveStream').props();
    expect(streamId).toBe('univision-tudn');
  });

  it('should render single widget of type vixplayer ', () => {
    const currentWidget = dataMock.data.widgets[8];
    delete currentWidget.contents[0].image;

    const props = {
      device: 'desktop',
      cardData: [null, currentWidget.contents[0]],
      settings: currentWidget.settings,
    };

    const wrapper = mount(
      <Provider store={store}>
        <SingleWidget {...props} />
      </Provider>
    );

    const { type, children } = wrapper.find('SingleWidget__LinkTitle').props();
    expect(type).toBe('vixplayer');
    expect(children).toBe('La historia de los hermanos fallecidos que encontraron abrazados bajo escombros en México');
    expect(wrapper.find('iframe')).toHaveLength(1);
  });

  it('should not render single widget of type vixplayer ', () => {
    const currentWidget = dataMock.data.widgets[8];
    delete currentWidget.contents[0].image;

    const props = {
      device: 'desktop',
      cardData: [null, currentWidget.contents[0]],
      settings: currentWidget.settings,
    };

    const wrapper = mount(
      <Provider store={store}>
        <SingleWidget {...props} />
      </Provider>
    );

    const { type, children } = wrapper.find('SingleWidget__LinkTitle').props();
    expect(type).toBe('vixplayer');
    expect(children).toBe('La historia de los hermanos fallecidos que encontraron abrazados bajo escombros en México');
    expect(wrapper.find('iframe')).toHaveLength(1);
  });

  it('should render tudn logo - mobile', () => {
    const currentWidget = dataMock.data.widgets[8];
    delete currentWidget.contents[0].image;

    const props = {
      device: 'mobile',
      isLive247: true,
      cardData: [null, currentWidget.contents[0]],
      settings: currentWidget.settings,
      isTudn: true,
    };

    const wrapper = mount(
      <Provider store={store}>
        <SingleWidget {...props} />
      </Provider>
    );

    const tudnIcon = wrapper.find('Icon').first().props();
    expect(tudnIcon.name).toBe('tudn');
    const titleLabel = wrapper.find('SingleWidget__TitleLabel').getDOMNode();
    expect(
      getComputedStyle(titleLabel).getPropertyValue('background')
    ).toBe(`url(${TUDN_CARD_MOBILE_BG}) no-repeat`);
  });

  it('should render univision logo', () => {
    const currentWidget = dataMock.data.widgets[8];
    delete currentWidget.contents[0].image;

    const props = {
      device: 'desktop',
      isLive247: true,
      cardData: [null, currentWidget.contents[0]],
      settings: currentWidget.settings,
      isTudn: false,
    };

    const wrapper = mount(
      <Provider store={store}>
        <SingleWidget {...props} />
      </Provider>
    );

    const tudnIcon = wrapper.find('Icon').first().props();
    expect(tudnIcon.name).toBe('live247');
    const titleLabel = wrapper.find('SingleWidget__TitleLabel').getDOMNode();
    expect(
      getComputedStyle(titleLabel).getPropertyValue('background')
    ).toBe(`url(${BACKGROUND_24_7}) no-repeat`);
  });

  it('should render single widget of type livestream with 24/7 flavor', () => {
    const currentWidget = dataMock.data.widgets[6];
    delete currentWidget.contents[0].image;

    const props = {
      device: 'desktop',
      cardData: [null, currentWidget.contents[0]],
      settings: currentWidget.settings,
      isLive247: true,
      forceMobile: true,
    };

    const wrapper = mount(
      <Provider store={store}>
        <SingleWidget {...props} />
      </Provider>
    );

    const { streamId } = wrapper.find('LiveStream').props();
    expect(streamId).toBe('univision-tudn');
  });

  it('should render single widget of type livestream with 24/7 flavor', () => {
    const currentWidget = dataMock.data.widgets[6];
    delete currentWidget.contents[0].image;

    const props = {
      device: 'desktop',
      cardData: [null, currentWidget.contents[0]],
      settings: currentWidget.settings,
      isLive247: true,
      forceMobile: false,
    };

    const wrapper = mount(
      <Provider store={store}>
        <SingleWidget {...props} />
      </Provider>
    );

    const { streamId } = wrapper.find('LiveStream').props();
    expect(streamId).toBe('univision-tudn');
  });

  it('should render single widget of type livestream with vix logo', () => {
    const currentWidget = dataMock.data.widgets[6];
    delete currentWidget.contents[0].image;

    const props = {
      device: 'desktop',
      cardData: [null, currentWidget.contents[0]],
      settings: currentWidget.settings,
      isLive247: true,
      isVixEnabled: true,
      forceMobile: false,
    };

    const wrapper = mount(
      <Provider store={store}>
        <SingleWidget {...props} />
      </Provider>
    );

    const { streamId } = wrapper.find('LiveStream').props();
    expect(streamId).toBe('univision-tudn');

    expect(
      wrapper.find('SingleWidget__LiveTextWrapper')
        .find('Icon')
        .at(0)
        .prop('name')
    ).toBe('avPlay');

    expect(
      wrapper.find('SingleWidget__LiveTextWrapper')
        .find('Icon')
        .at(1)
        .prop('name')
    ).toBe('vix');
  });

  it('should call widget tracking when its clicked', () => {
    spyOn(WidgetTracker, 'track');
    const currentWidget = dataMock.data.widgets[6];
    delete currentWidget.contents[0].image;

    const props = {
      device: 'desktop',
      cardData: [null, currentWidget.contents[0]],
      settings: currentWidget.settings,
      isLive247: true,
      forceMobile: false,
    };

    const widgetContext = {
      test: 'foo',
    };
    const {
      type: contentType, title: contentTitle, uid: contentUid,
    } = currentWidget.contents[0];

    const expectedCall = {
      target: 'prendetv_cta_external',
      contentTitle,
      contentUid,
      contentType,
      widgetContext,
      extraData: {
        destination_url: `${PRENDETV_24_7}247_videoplaylist`,
      },
      eventLabel: 'Video_Player_Banner',
    };
    const wrapper = mount(
      <Provider store={store}>
        <SingleWidget widgetContext={widgetContext} {...props} />
      </Provider>
    );
    const linkTitle = wrapper.find('SingleWidget__LiveTextWrapper a');
    linkTitle.simulate('click');
    expect(WidgetTracker.track).toHaveBeenLastCalledWith(expect.any(Function), expectedCall);
  });

  it('should render single widget of type video with fallback', () => {
    const currentWidget = dataMock.data.widgets[7];

    const props = {
      device: 'desktop',
      cardData: [null, currentWidget.contents[0]],
      settings: currentWidget.settings,
      widgetContext: {
        isWorldCupMVP: true,
      },
    };
    const wrapper = mount(
      <Provider store={store}>
        <SingleWidget {...props} />
      </Provider>
    );

    const { type, children } = wrapper.find('SingleWidget__LinkTitle').props();
    expect(type).toBe('video');
    expect(children).toBe('Familia hispana busca repatriar cuerpo de joven asesinado en Mendota');

    const { mcpid } = wrapper.find(VideoPlayer).props();
    expect(mcpid).toBe('781457');
  });

  it('should call widget tracking with video fallback data when its clicked', () => {
    spyOn(WidgetTracker, 'track');
    const currentWidget = dataMock.data.widgets[7];
    const props = {
      device: 'desktop',
      cardData: [null, currentWidget.contents[0]],
      settings: currentWidget.settings,
    };

    const widgetContext = {
      test: 'foo',
      isWorldCupMVP: true,
    };
    const {
      type: contentType, title: contentTitle, uid: contentUid,
    } = currentWidget.contents[0].videoFallback;
    const expectedCall = {
      target: 'content',
      contentTitle,
      contentType,
      contentUid,
      widgetContext,
    };
    const wrapper = mount(
      <Provider store={store}>
        <SingleWidget widgetContext={widgetContext} {...props} />
      </Provider>
    );
    const linkTitle = wrapper.find('SingleWidget__LinkTitle Link').first();
    linkTitle.simulate('click');
    expect(WidgetTracker.track).toHaveBeenLastCalledWith(expect.any(Function), expectedCall);
  });
  it('should render single widget of type soccermatch', () => {
    const currentWidget = dataMock.data.widgets[9];
    delete currentWidget.contents[0].image;

    const props = {
      device: 'desktop',
      cardData: [null, currentWidget.contents[0]],
      settings: currentWidget.settings,
      isLive247: false,
      forceMobile: true,
    };

    const wrapper = mount(
      <Provider store={store}>
        <SingleWidget {...props} />
      </Provider>
    );

    const { type } = wrapper.find('SoccermatchCard__LinkTitleMatch').props();
    expect(type).toBe('soccermatch');
  });
  it('should render single widget of type soccermatch with status post', () => {
    const currentWidget = dataMock.data.widgets[10];
    delete currentWidget.contents[0].image;

    const props = {
      device: 'desktop',
      cardData: [null, currentWidget.contents[0]],
      settings: currentWidget.settings,
      isLive247: false,
      forceMobile: true,
    };

    const wrapper = mount(
      <Provider store={store}>
        <SingleWidget {...props} />
      </Provider>
    );

    const { type } = wrapper.find('SoccermatchCard__LinkTitleMatch').props();
    expect(type).toBe('soccermatch');
  });
  it('should render single widget of type soccermatch with status post', () => {
    const currentWidget = dataMock.data.widgets[10];
    delete currentWidget.contents[0].image;

    const props = {
      device: 'desktop',
      cardData: [null, currentWidget.contents[0]],
      settings: currentWidget.settings,
      isLive247: false,
      forceMobile: true,
    };

    const wrapper = mount(
      <Provider store={store}>
        <SingleWidget {...props} />
      </Provider>
    );
    const { type } = wrapper.find('SoccermatchCard__LinkTitleMatch').props();
    expect(type).toBe('soccermatch');
  });
  it('should have isWorldCupMVP into singleWidget', () => {
    const currentWidget = dataMock.data.widgets[2];

    const props = {
      device: 'desktop',
      cardData: [null, currentWidget.contents[0]],
      settings: currentWidget.settings,
    };

    const widgetContext = {
      test: 'foo',
      isWorldCupMVP: true,
    };

    const wrapper = mount(
      <Provider store={store}>
        <SingleWidget widgetContext={widgetContext} {...props} />
      </Provider>
    );
    expect(wrapper.find('SingleWidget__LastUpdateLabel').prop('isWorldCupMVP')).toBe(true);
  });
});

describe('tests for single widget tracking on TUDN', () => {
  let mockUseSelector;
  beforeEach(() => {
    mockUseSelector = jest.spyOn(hooks, 'useSelector');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call widget tracking when its clicked on MX and TUDN', () => {
    mockUseSelector.mockImplementationOnce(() => 'MX');
    spyOn(WidgetTracker, 'track');
    const currentWidget = dataMock.data.widgets[6];
    delete currentWidget.contents[0].image;

    const props = {
      isTudn: true,
      isLive247: true,
      device: 'desktop',
      forceMobile: false,
      settings: currentWidget.settings,
      cardData: [null, currentWidget.contents[0]],
    };

    const widgetContext = { test: 'foo' };

    const {
      uid: contentUid,
      type: contentType,
      title: contentTitle,
    } = currentWidget.contents[0];

    const expectedCall = {
      contentUid,
      contentType,
      contentTitle,
      widgetContext,
      target: 'prendetv_cta_external',
      extraData: {
        destination_url: EPG_TUDN_MX_URL,
      },
      eventLabel: 'Video_Player_Banner',
    };
    const wrapper = mount(
      <Provider store={store}>
        <SingleWidget widgetContext={widgetContext} {...props} />
      </Provider>
    );
    const linkTitle = wrapper.find('SingleWidget__LiveTextWrapper a');
    linkTitle.simulate('click');
    expect(WidgetTracker.track).toHaveBeenLastCalledWith(expect.any(Function), expectedCall);
  });
});
