import React, { useContext, useRef } from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import preloadAll from 'jest-next-dynamic';

import configureStore from '@univision/fe-commons/dist/store/configureStore';
import { TUDN_SITE } from '@univision/fe-commons/dist/constants/sites';
import * as timer from '@univision/fe-commons/dist/utils/timer';
import * as widgetTypes from '@univision/fe-commons/dist/constants/widgetTypes';
import * as pageCategories from '@univision/fe-commons/dist/constants/pageCategories';
import navDefinitions from '@univision/fe-deportes/dist/utils/layoutWidgets/matchCenter/soccerMatchNavDefinitions';
import SoccerMatchNavContext from '@univision/fe-deportes/dist/components/base/SoccerMatchNav/SoccerMatchNavContext';
import features from '@univision/fe-commons/dist/config/features';
import isValidFunction from '@univision/fe-utilities/helpers/common/isValidFunction';

import SoccerMatchContainer from '.';

const store = configureStore();
const getStatus = jest.fn();
const widgets = [<div key="a">Hello!</div>];
const fullWidget = [
  <div key="0">
    <div data-widget-type="test1" className="widgets">
      Hello world
    </div>
  </div>,
  <div key="2">
    <div data-widget-type={widgetTypes.DEPORTES_GRID_SOCCER_MATCH_OPENING} className="widgets">
      Opening test
    </div>
  </div>,
  <span key="1" className="widgets">
    Test
  </span>,
];
const pageCategory = 'soccermatch-pre';
const pageData = {
  type: 'soccermatch',
  title: 'hello',
  primaryTopic: 'test',
  description: 'test',
  widgets: [
    {
      type: 'test1',
      settings: {
        uid: '1',
      },
    },
    {
      type: widgetTypes.DEPORTES_GRID_SOCCER_MATCH_OPENING,
      settings: {
        uid: '2',
      },
    },
    {
      settings: {
        uid: '3',
      },
    },
  ],
};
const navDefinitionsMock = {};
const navDefinitionsTypeGetterMock = jest.fn(() => {
  return navDefinitions.PREMATCH;
});
let refMock = {};

Object.defineProperty(navDefinitionsMock, 'PREMATCH', {
  get: navDefinitionsTypeGetterMock,
  configurable: true,
});

/**
 * Dummy child component
 * @returns {JXS}
 */
const CmpChildWidget = () => {
  const { setNavigationItem } = useContext(SoccerMatchNavContext);
  if (isValidFunction(setNavigationItem)) {
    setNavigationItem(navDefinitionsMock.PREMATCH);
    setNavigationItem(navDefinitionsMock.PREMATCH);
  }
  return (
    <div />
  );
};

/**
 * Wrapper SoccerMatchContainer for test
 * @param {Object} otherProps - to extend default props
 * @returns {JSX}
 */
function makeSoccerMatchContainer(otherProps) {
  const props = {
    pageData,
    parseWidgets: widgets,
    pageCategory: pageCategories.SOCCER_MATCH_POST,
    site: TUDN_SITE,
    ...otherProps,
  };
  return (
    <Provider store={store}>
      <SoccerMatchContainer {...props} />
    </Provider>
  );
}

/**
 * Helper to fire/wait promises
 * @returns {Promise}
 */
const flushPromises = () => new Promise(setImmediate);

jest.useFakeTimers();
jest.mock('@univision/fe-components-base/dist/components/widgets/VideoWithPlaylist');
jest.mock('../SoccerMatchHeader', () => (
  function SoccerMatchHeader() {
    return null;
  }
));
jest.mock('react', () => {
  const originReact = jest.requireActual('react');
  const mUseRef = jest.fn(() => ({ current: {} }));
  return {
    ...originReact,
    useRef: mUseRef,
  };
});

/** @test {SoccerMatchContainer} */
describe('SoccerMatchContainer Spec', () => {
  beforeAll(async () => {
    await preloadAll();
  });

  beforeEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
    refMock = {
      current: {
        navAccumulator: {},
        navDebounce: null,
        timer: null,
      },
    };
    useRef.mockReturnValueOnce(refMock);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should render SoccerMatchContainer component by default', () => {
    const createTimerSpy = jest.spyOn(timer, 'default');
    const props = {
      pageWidgets: fullWidget,
      pageCategory,
      getStatus,
    };
    const wrapper = mount(makeSoccerMatchContainer(props));

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('SoccerMatchHeader')).toHaveLength(1);
    expect(wrapper.find('SoccerMatchContent')).toHaveLength(1);
    expect(createTimerSpy).toHaveBeenCalledWith(30, expect.any(Function));
    jest.runOnlyPendingTimers();
    expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 1000);
  });

  it('should not create interval on update', () => {
    const createTimerSpy = jest.spyOn(timer, 'default');
    const props = {
      pageWidgets: fullWidget,
      pageCategory,
      getStatus,
    };
    const wrapper = mount(makeSoccerMatchContainer(props));

    expect(createTimerSpy).toHaveBeenCalledWith(30, expect.any(Function));
    createTimerSpy.mockClear();
    wrapper.setProps({ pageCategory: pageCategories.SOCCER_MATCH_PRE });
    wrapper.update();
    expect(createTimerSpy).not.toHaveBeenCalled();
  });

  it('should create interval on update with valid timer', () => {
    const mRef = { current: { timer: {} } };
    useRef.mockReturnValueOnce(mRef);
    const createTimerSpy = jest.spyOn(timer, 'default');
    const props = {
      pageWidgets: fullWidget,
      pageCategory,
      getStatus,
    };
    mount(makeSoccerMatchContainer(props));
    expect(createTimerSpy).toHaveBeenCalledWith(30, expect.any(Function));
    createTimerSpy.mockClear();
  });

  it('should render SoccerMatchContainer with default title', () => {
    const props = {
      parseWidgets: fullWidget,
    };
    const wrapper = mount(makeSoccerMatchContainer(props));
    expect(wrapper.find('SoccerMatchContent__TitleStyled').text()).toBe('hello');
  });

  it('should render without widgets', () => {
    const props = {
      pageData,
      pageCategory: pageCategories.SOCCER_MATCH_PRE,
      parseWidgets: [],
    };
    const wrapper = mount(makeSoccerMatchContainer(props));

    expect(wrapper.find('SoccerMatchContainer__SeparatorStyled')).toHaveLength(1);
  });

  it('should render global widgets', () => {
    const props = {
      pageData: {
        ...pageData,
        globalWidgets: [{
          type: 'testglobal',
          id: '000005',
          contents: [],
          settings: {
            uid: '000005',
          },
        }],
      },
      pageCategory: pageCategories.SOCCER_MATCH_PRE,
      parseWidgets: fullWidget,
    };
    const wrapper = mount(makeSoccerMatchContainer(props));

    expect(wrapper.find('GlobalWidget__GlobalWidgetContainer')).toHaveLength(1);
  });

  it('should render without page data', () => {
    const props = {
      pageData: null,
      pageCategory: pageCategories.SOCCER_MATCH_PRE,
      parseWidgets: fullWidget,
    };
    const wrapper = mount(makeSoccerMatchContainer(props));

    expect(wrapper.find('SoccerMatchContainer__SeparatorStyled')).toHaveLength(1);
  });

  it('should render with video widget', () => {
    jest.spyOn(features.content, 'hasEnhancement').mockImplementation(() => false);
    const mRef = {
      current: {
        nodeId: 1, metadata: {}, isMultiTab: false, placeHolderId: 1,
      },
    };
    useRef.mockReturnValue(mRef);
    const props = {
      pageData: {
        vixUsExternalLink: 'test',
        playlist: { videos: [{ mcpid: 1 }] },
        matchId: 23,
        soccerMatchStatus: 'FULL',
        liveStreamEnabled: true,
        soccerCompetitionSeason: {
          soccerCompetition: {
            league: {
              coverage: 'Performance',
            },
          },
        },
        tracking: {
          tealium: {
            data: {
              title: 'title',
            },
          },
        },
      },
      pageCategory: pageCategories.SOCCER_MATCH_POST,
      parseWidgets: fullWidget,
    };
    const wrapper = mount(makeSoccerMatchContainer(props));
    expect(wrapper.find('#AllVideoPlaylistVideo')).toHaveLength(1);
  });

  it('should render with video widget with vix external link', () => {
    jest.spyOn(features.content, 'hasEnhancement').mockImplementation(() => false);
    const mRef = {
      current: {
        nodeId: 1, metadata: {}, isMultiTab: false, placeHolderId: 1,
      },
    };
    useRef.mockReturnValue(mRef);
    const props = {
      pageData: {
        vixMxExternalLink: 'test',
        playlist: { videos: [{ mcpid: 1 }] },
        matchId: 23,
        soccerMatchStatus: 'FULL',
        liveStreamEnabled: true,
        soccerCompetitionSeason: {
          soccerCompetition: {
            league: {
              coverage: 'Performance',
            },
          },
        },
        tracking: {
          tealium: {
            data: {
              title: 'title',
            },
          },
        },
      },
      pageCategory: pageCategories.SOCCER_MATCH_POST,
      parseWidgets: fullWidget,
      userLocation: 'MX',
    };
    const wrapper = mount(makeSoccerMatchContainer(props));
    expect(wrapper.find('#AllVideoPlaylistVideo')).toHaveLength(1);
  });

  it('should render the custom title if title is not part of description', () => {
    const props = {
      pageData: { ...pageData, description: 'hello world', title: 'abc' },
      pageCategory: pageCategories.SOCCER_MATCH_PRE,
    };
    const wrapper = mount(makeSoccerMatchContainer(props));

    expect(wrapper.find('SoccerMatchContent__TitleStyled').text()).toBe('abc');
  });

  it('should not render the custom title if title is part of description', () => {
    const props = {
      pageData: { ...pageData, description: 'hello world', title: 'world' },
      pageCategory: pageCategories.SOCCER_MATCH_PRE,
    };
    const wrapper = mount(makeSoccerMatchContainer(props));

    expect(wrapper.find('SoccerMatchContent__TitleStyled')).toHaveLength(0);
  });

  it('should not call status if post match', () => {
    const props = {
      widgets,
      pageCategory: pageCategories.SOCCER_MATCH_POST,
      pageData,
      getStatus,
    };
    mount(makeSoccerMatchContainer(props));

    expect(getStatus).not.toHaveBeenCalled();
  });

  it('should maybeCallMatchStatus not call getStatus is not a function', () => {
    mount(makeSoccerMatchContainer());

    expect(getStatus).not.toHaveBeenCalled();
  });

  it('should call clear interval on unmount if have timer', () => {
    const props = {
      pageCategory: pageCategories.SOCCER_MATCH_MID,
    };
    const createTimerSpy = jest.spyOn(timer, 'default');
    const wrapper = mount(makeSoccerMatchContainer(props));

    expect(createTimerSpy).toHaveBeenCalledWith(90, expect.any(Function));
    wrapper.unmount();
    expect(clearInterval).toHaveBeenCalled();
  });

  it('should not call clear interval on unmount if not was created', () => {
    const props = {
      pageCategory: pageCategories.SOCCER_MATCH_POST,
    };
    const createTimerSpy = jest.spyOn(timer, 'default');
    const wrapper = mount(makeSoccerMatchContainer(props));

    expect(createTimerSpy).not.toHaveBeenCalled();
    wrapper.unmount();
    expect(clearInterval).not.toHaveBeenCalled();
  });

  it('should end interval after calling maybeCallMatchStatus from mid to post game', () => {
    const props = {
      getStatus,
      pageData,
      parseWidgets: widgets,
      pageCategory: pageCategories.SOCCER_MATCH_MID,
    };
    const createTimerSpy = jest.spyOn(timer, 'default');
    const wrapper = mount(<SoccerMatchContainer {...props} />);

    wrapper.setProps({
      pageCategory: pageCategories.SOCCER_MATCH_POST,
    });
    wrapper.update();
    jest.advanceTimersByTime(90 * 1000);

    expect(createTimerSpy).toHaveBeenCalledWith(90, expect.any(Function));
    expect(getStatus).toHaveBeenCalledTimes(1);
    expect(clearInterval).toHaveBeenCalled();
  });

  it('should not set interval after calling maybeCallMatchStatus on post game', () => {
    const props = {
      getStatus,
      pageData,
      parseWidgets: widgets,
      pageCategory: pageCategories.SOCCER_MATCH_POST,
    };
    const createTimerSpy = jest.spyOn(timer, 'default');
    mount(<SoccerMatchContainer {...props} />);

    jest.advanceTimersByTime(90 * 1000);

    expect(createTimerSpy).not.toHaveBeenCalledWith(90, expect.any(Function));
    expect(getStatus).not.toHaveBeenCalledTimes(1);
  });

  it('should not render with live stream video if no match id and no stream id and Basic coverage', () => {
    const props = {
      pageData: {
        matchId: null,
        soccerMatchStatus: 'LIVE',
        liveStreamEnabled: true,
        soccerCompetitionSeason: {
          soccerCompetition: {
            league: {
              coverage: 'Basic',
            },
          },
        },
        tracking: {
          tealium: {
            data: {
              title: 'title',
            },
          },
        },
      },
      pageCategory: pageCategories.SOCCER_MATCH_MID,
      parseWidgets: fullWidget,
    };
    const wrapper = mount(makeSoccerMatchContainer(props));

    expect(wrapper.find('#AllVideoPlaylistVideo')).toHaveLength(0);
  });

  it('should not render video player for non opta games if match is pre and no stream id and has livestream', () => {
    const props = {
      pageData: {
        matchId: null,
        soccerMatchStatus: 'PREMATCH',
        liveStreamEnabled: true,
        soccerCompetitionSeason: {
          soccerCompetition: {
            league: {
              coverage: 'Basic',
            },
          },
        },
        tracking: {
          tealium: {
            data: {
              title: 'title',
            },
          },
        },
      },
      pageCategory: pageCategories.SOCCER_MATCH_PRE,
      parseWidgets: fullWidget,
    };
    const wrapper = mount(makeSoccerMatchContainer(props));
    expect(wrapper.find('#AllVideoPlaylistVideo')).toHaveLength(0);
  });

  it('should not render video player for non opta games if match is in post', () => {
    const props = {
      pageData: {
        matchId: null,
        soccerMatchStatus: 'FULL',
        liveStreamEnabled: true,
        soccerCompetitionSeason: {
          soccerCompetition: {
            league: {
              coverage: 'Basic',
            },
          },
        },
        tracking: {
          tealium: {
            data: {
              title: 'title',
            },
          },
        },
      },
      pageCategory: pageCategories.SOCCER_MATCH_POST,
      parseWidgets: fullWidget,
    };
    const wrapper = mount(makeSoccerMatchContainer(props));

    expect(wrapper.find('#AllVideoPlaylistVideo')).toHaveLength(0);
  });

  it('should not render video player for Basic opta games if match is in post', () => {
    const props = {
      pageData: {
        matchId: 23,
        soccerMatchStatus: 'FULL',
        liveStreamEnabled: true,
        soccerCompetitionSeason: {
          soccerCompetition: {
            league: {
              coverage: 'Basic',
            },
          },
        },
      },
      pageCategory: pageCategories.SOCCER_MATCH_POST,
      parseWidgets: fullWidget,
    };
    const wrapper = mount(makeSoccerMatchContainer(props));

    expect(wrapper.find('#AllVideoPlaylistVideo')).toHaveLength(0);
  });

  it('should render video player for Basic games if match is in post and is broadcast event', () => {
    features.deportes.isWorldCupMVP = jest.fn(() => true);

    const props = {
      userLocation: 'MX',
      pageData: {
        userLocation: 'MX',
        broadcastEvent: {
          playerState: 'ON',
        },
        matchId: 23,
        soccerMatchStatus: 'FULL',
        liveStreamEnabled: true,
        soccerCompetitionSeason: {
          soccerCompetition: {
            league: {
              coverage: 'Basic',
            },
          },
        },
      },
      pageCategory: pageCategories.SOCCER_MATCH_POST,
      parseWidgets: fullWidget,
    };
    const wrapper = mount(makeSoccerMatchContainer(props));

    expect(wrapper.find('#AllVideoPlaylistVideo')).toHaveLength(1);
  });

  it('should render video player if is US, has streamId and is not post match', () => {
    features.deportes.isWorldCupMVP = jest.fn(() => true);

    const props = {
      userLocation: 'US',
      pageData: {
        userLocation: 'US',
        broadcastEvent: null,
        streamId: 123,
        matchId: 23,
        soccerMatchStatus: 'ON',
        liveStreamEnabled: true,
        soccerCompetitionSeason: {
          soccerCompetition: {
            league: {
              coverage: 'Basic',
            },
          },
        },
      },
      pageCategory: pageCategories.SOCCER_MATCH_PRE,
      parseWidgets: fullWidget,
    };
    const wrapper = mount(makeSoccerMatchContainer(props));

    expect(wrapper.find('#AllVideoPlaylistVideo')).toHaveLength(1);
  });

  it('should not render video player if is MX and no broadcast event', () => {
    features.deportes.isWorldCupMVP = jest.fn(() => true);

    const props = {
      userLocation: 'MX',
      pageData: {
        userLocation: 'MX',
        broadcastEvent: null,
        matchId: 23,
        soccerMatchStatus: 'FULL',
        liveStreamEnabled: true,
        soccerCompetitionSeason: {
          soccerCompetition: {
            league: {
              coverage: 'Basic',
            },
          },
        },
      },
      pageCategory: pageCategories.SOCCER_MATCH_POST,
      parseWidgets: fullWidget,
    };
    const wrapper = mount(makeSoccerMatchContainer(props));

    expect(wrapper.find('#AllVideoPlaylistVideo')).toHaveLength(0);
  });

  it('should not render video player if is US and no opta id', () => {
    features.deportes.isWorldCupMVP = jest.fn(() => true);

    const props = {
      userLocation: 'US',
      pageData: {
        userLocation: 'US',
        broadcastEvent: null,
        matchId: 23,
        soccerMatchStatus: 'FULL',
        liveStreamEnabled: true,
        soccerCompetitionSeason: {
          soccerCompetition: {
            league: {
              coverage: 'Basic',
            },
          },
        },
      },
      pageCategory: pageCategories.SOCCER_MATCH_MID,
      parseWidgets: fullWidget,
    };
    const wrapper = mount(makeSoccerMatchContainer(props));

    expect(wrapper.find('#AllVideoPlaylistVideo')).toHaveLength(0);
  });

  it('should set navigation item unique values and fire one set state', () => {
    jest.spyOn(features.content, 'hasEnhancement').mockImplementation(() => false);
    useRef.mockReturnValueOnce(refMock);
    const props = {
      parseWidgets: [<CmpChildWidget key="1" />],
    };
    const wrapper = mount(makeSoccerMatchContainer(props));
    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(wrapper.find('SoccerMatchContent')).toHaveLength(1);
    expect(navDefinitionsTypeGetterMock).toHaveBeenCalled();
    expect(refMock.current).toHaveProperty('navAccumulator', {
      [navDefinitions.PREMATCH.type]: navDefinitions.PREMATCH,
    });
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 2000);
  });

  it('should not set navigation if feature flag is enabled', () => {
    const props = {
      parseWidgets: [<CmpChildWidget key="1" />],
      hideMatchCenterNav: true,
    };
    const wrapper = mount(makeSoccerMatchContainer(props));
    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(wrapper.find('SoccerMatchContent')).toHaveLength(1);
    expect(navDefinitionsTypeGetterMock).not.toHaveBeenCalled();
    expect(refMock.current).toHaveProperty('navAccumulator', {});
    expect(setTimeout).not.toHaveBeenCalled();
  });

  it('should not navigation if already exist and not fire timeout', () => {
    jest.spyOn(features.content, 'hasEnhancement').mockImplementation(() => false);
    refMock.current.navDebounce = 123;
    useRef.mockReset();
    useRef.mockReturnValueOnce(refMock);
    const props = {
      parseWidgets: [<CmpChildWidget key="1" />],
    };
    const wrapper = mount(makeSoccerMatchContainer(props));

    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(wrapper.find('SoccerMatchContent')).toHaveLength(1);
    expect(navDefinitionsTypeGetterMock).toHaveBeenCalled();
    expect(refMock.current).toHaveProperty('navAccumulator', {
      [navDefinitions.PREMATCH.type]: navDefinitions.PREMATCH,
    });
    expect(setTimeout).not.toHaveBeenCalled();
  });

  it('should render SoccerMatchContent with video cuepoints data', async() => {
    useRef.mockReturnValueOnce(refMock);
    const props = {
      pageWidgets: fullWidget,
      pageCategory,
      getStatus,
      commentaryEvents: [
        {
          iconName: 'timer',
          key: 'a.2245805423',
          period: '1',
          sort: '0',
          summary: 'Empieza primera parte.',
          time: '0',
          title: 'game-start',
        },
        {},
      ],
    };
    const wrapper = mount(makeSoccerMatchContainer(props));
    await act(async() => {
      await flushPromises();
      wrapper.update();
    });

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('SoccerMatchContent')).toHaveLength(1);
    expect(wrapper.find('SoccerMatchContent').prop('videoCuepoints')).toEqual([expect.objectContaining({
      actionId: '2245805423',
      period: '1',
      seconds: 0,
      icon: expect.stringContaining('<svg height="24" width="24" viewBox="0 0 256 256"><g fill="none" fill-rule="evenodd"><circle stroke="#000000" stroke-width="9.0066"'),
    })]);
  });

  it('should render SoccerMatchContent with video cuepoints data wthe filtering not allowed period time', async() => {
    useRef.mockReturnValueOnce(refMock);
    const props = {
      pageWidgets: fullWidget,
      pageCategory,
      getStatus,
      commentaryEvents: [
        {
          iconName: 'timer',
          key: 'a.2245805423',
          period: '1',
          sort: '0',
          summary: 'Empieza primera parte.',
          time: '0',
          title: 'game-start',
        },
        {
          iconName: 'missedPenalty',
          key: 'a.2232674297',
          period: '4',
          summary: 'Empieza Penaltis Serbia 1, Scotland 1',
          time: '',
          title: 'penalty',
        },
      ],
    };
    const wrapper = mount(makeSoccerMatchContainer(props));
    await act(async() => {
      await flushPromises();
      wrapper.update();
    });

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('SoccerMatchContent')).toHaveLength(1);
    expect(wrapper.find('SoccerMatchContent').prop('videoCuepoints')).toEqual([expect.objectContaining({
      actionId: '2245805423',
      period: '1',
      seconds: 0,
      icon: expect.any(String),
    })]);
  });

  it('should render SoccerMatchContent without video cuepoints data it not found events', async() => {
    useRef.mockReturnValueOnce(refMock);
    const props = {
      pageWidgets: fullWidget,
      pageCategory,
      getStatus,
    };
    const wrapper = mount(makeSoccerMatchContainer(props));
    await act(async() => {
      await flushPromises();
      wrapper.update();
    });

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('SoccerMatchContent')).toHaveLength(1);
    expect(wrapper.find('SoccerMatchContent').prop('videoCuepoints')).toEqual([]);
  });

  it('should render SoccerMatchContent with video cuepoints filtered by valid type', async() => {
    useRef.mockReturnValueOnce(refMock);
    const props = {
      pageWidgets: fullWidget,
      pageCategory,
      getStatus,
      commentaryEvents: [
        {
          iconName: 'offPost',
          key: 'a.2245805423',
          period: '1',
          sort: '25',
          summary: 'Remate rechazado! directo al travesaño',
          time: '25',
          title: 'off-post',
        },
        {
          iconName: 'shoot',
          key: 'a.2232674297',
          period: '24',
          summary: 'Disparo de Chicharito',
          time: '24',
          title: 'shot',
        },
        {
          iconName: 'yellowCard',
          key: 'a.2282675697',
          period: '23',
          summary: 'Tarjeta amarilla',
          time: '23',
          title: 'yellow-card',
        },
      ],
    };
    const wrapper = mount(makeSoccerMatchContainer(props));
    await act(async() => {
      await flushPromises();
      wrapper.update();
    });

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('SoccerMatchContent')).toHaveLength(1);
    expect(wrapper.find('SoccerMatchContent').prop('videoCuepoints')).toEqual([expect.objectContaining({
      actionId: '2245805423',
      period: '1',
      seconds: 1500,
      icon: expect.any(String),
    })]);
  });
  it('should render mcp stream end and start times from extra data', async() => {
    useRef.mockReturnValueOnce(refMock);
    const props = {
      pageWidgets: fullWidget,
      pageCategory,
      getStatus,
      pageData: {
        type: 'soccermatch',
        title: 'hello',
        primaryTopic: 'test',
        description: 'test',
        widgets: [
          {
            type: 'test1',
            settings: {
              uid: '1',
            },
          },
          {
            type: widgetTypes.DEPORTES_GRID_SOCCER_MATCH_OPENING,
            settings: {
              uid: '2',
            },
            extraData: {
              mcpStreamStartTime: '21:00',
              mcpStreamEndTime: '22:00',
            },
          },
          {
            settings: {
              uid: '3',
            },
          },
        ],
      },
    };
    const wrapper = mount(makeSoccerMatchContainer(props));
    await act(async() => {
      await flushPromises();
      wrapper.update();
    });

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('SoccerMatchContent')).toHaveLength(1);
    expect(wrapper.find('SoccerMatchContent').prop('videoSettings')).toEqual(expect.objectContaining({
      settings: expect.objectContaining({
        settings: expect.objectContaining({
          livestream: expect.objectContaining({
            streamStartTime: '21:00',
            streamEndTime: '22:00',
          }),
        }),
      }),
    }));
  });
});
