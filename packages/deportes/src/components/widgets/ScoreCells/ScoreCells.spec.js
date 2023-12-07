import React from 'react';
import { shallow, mount } from 'enzyme';
import Loadable from 'react-loadable';
import Tracker from '@univision/fe-commons/dist/utils/tracking/tealium/Tracker';
import * as storeHelpers from '@univision/fe-commons/dist/store/storeHelpers';
import * as helpers from '@univision/fe-commons/dist/utils/helpers';
import { data } from '../../../utils/mocks/scorecells_v2.json';
import ScoreCells from '.';

jest.useFakeTimers();

const sponsor = {
  name: 'Walgreens',
  logo: 'http://diylogodesigns.com/blog/wp-content/uploads/2016/04/Coca-Cola-Logo-PNG.png',
  link: 'http://www.tudn.com/futbol',
  sponsorBy: 'Presentado por:',
};

const mockEvent = {
  preventDefault: jest.fn(),
  nativeEvent: {},
};
mockEvent.nativeEvent = mockEvent;
helpers.locationRedirect = jest.fn();

storeHelpers.getPageUrl = jest.fn();

describe('ScoreCells component tests', () => {
  let props;
  beforeEach(() => {
    props = { data: [...data] };
    helpers.locationRedirect.mockClear();
  });
  afterAll(() => {
    jest.clearAllTimers();
  });
  it('returns null if the component has no data', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const wrapper = shallow(<ScoreCells />);
    expect(wrapper.getElement()).toBe(null);
  });
  it('should load with breakpoint xxs', async () => {
    global.innerWidth = 320;
    const wrapper = mount(<ScoreCells {...props} />);
    await Loadable.preloadAll();
    wrapper.update();
    expect(wrapper.instance().constructor.currentBreakPoint).toEqual('xxs');
  });
  it('should load with breakpoint xs', async () => {
    global.innerWidth = 480;
    const wrapper = mount(<ScoreCells {...props} />);
    await Loadable.preloadAll();
    wrapper.update();
    expect(wrapper.instance().constructor.currentBreakPoint).toEqual('xs');
  });
  it('should load with breakpoint sm', async () => {
    global.innerWidth = 800;
    const wrapper = mount(<ScoreCells {...props} />);
    await Loadable.preloadAll();
    wrapper.update();
    expect(wrapper.instance().constructor.currentBreakPoint).toEqual('sm');
  });
  it('should load with breakpoint md', async () => {
    global.innerWidth = 1025;
    const wrapper = mount(<ScoreCells {...props} />);
    await Loadable.preloadAll();
    wrapper.update();
    expect(wrapper.instance().constructor.currentBreakPoint).toEqual('md');
  });
  it('should load with breakpoint lg', async () => {
    global.innerWidth = 1300;
    const wrapper = mount(<ScoreCells {...props} />);
    await Loadable.preloadAll();
    wrapper.update();
    expect(wrapper.instance().constructor.currentBreakPoint).toEqual('lg');
  });
  it('should load with breakpoint xl', async () => {
    global.innerWidth = 1500;
    const wrapper = mount(<ScoreCells {...props} />);
    await Loadable.preloadAll();
    wrapper.update();
    expect(wrapper.instance().constructor.currentBreakPoint).toEqual('xl');
  });
  it('should remove resize event listener on unmount', () => {
    global.removeEventListener = jest.fn();
    const wrapper = mount(<ScoreCells />);
    wrapper.unmount();
    expect(global.removeEventListener).toHaveBeenCalled();
  });
  it('should load with breakpoint md and sponsor', async () => {
    global.innerWidth = 1025;
    const wrapper = mount(<ScoreCells {...props} sponsor={sponsor} />);
    await Loadable.preloadAll();
    wrapper.update();
    expect(wrapper.find('.col-sm-3')).toHaveLength(1);
  });
  it('should load with breakpoint lg and sponsor', async () => {
    global.innerWidth = 1300;
    const props2 = {
      data: [data[0]],
    };
    const wrapper = mount(<ScoreCells {...props2} sponsor={sponsor} />);
    await Loadable.preloadAll();
    wrapper.update();
    expect(wrapper.find('.col-sm-3')).toHaveLength(1);
  });
  it('should load with only 8 items if data has 10 items in mobile', async () => {
    global.innerWidth = 1025;
    const props2 = {
      data: [data[1], data[2], data[3], data[4], data[5],
        data[1], data[2], data[3], data[4], data[5]],
    };
    const wrapper = mount(<ScoreCells {...props2} sponsor={sponsor} />);
    await Loadable.preloadAll();
    wrapper.update();
    expect(wrapper.find('ScoreCells__ScoreCellWrapperStyled')).toHaveLength(8);
  });
  it('should load with breakpoint sm and sponsor', async () => {
    global.innerWidth = 800;
    const props2 = {
      data: [data[0]],
    };
    const wrapper = mount(<ScoreCells {...props2} sponsor={sponsor} />);
    await Loadable.preloadAll();
    wrapper.update();
    expect(wrapper.find('.col-sm-3')).toHaveLength(1);
  });
  it('should load with breakpoint md, sponsor and one item', async () => {
    global.innerWidth = 1025;
    const props2 = {
      data: [data[0]],
    };
    const wrapper = mount(<ScoreCells {...props2} sponsor={sponsor} />);
    await Loadable.preloadAll();
    wrapper.update();
    expect(wrapper.find('.col-sm-3')).toHaveLength(1);
  });
  it('should load with breakpoint md, without sponsor and one item', async () => {
    global.innerWidth = 1025;
    const props2 = {
      data: [data[0]],
    };
    const wrapper = mount(<ScoreCells {...props2} />);
    await Loadable.preloadAll();
    wrapper.update();
    expect(wrapper.find('ScoreCells__ScoreCellWrapperStyled')).toHaveLength(1);
  });
  it('should load with breakpoint lg, without sponsor and one item', async () => {
    global.innerWidth = 1300;
    const props2 = {
      data: data.filter((a, b) => {
        if (b < 2) {
          return a;
        }

        return null;
      }),
    };
    const wrapper = mount(<ScoreCells {...props2} />);
    await Loadable.preloadAll();
    wrapper.update();
    expect(wrapper.find('ScoreCells__ScoreCellWrapperStyled')).toHaveLength(2);
  });
  it('should call the getScoreCells callback if the prop exists ', async () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const mockFn = jest.fn();
    global.innerWidth = 480;
    const wrapper = mount(<ScoreCells {...props} getScoreCells={mockFn} />);
    await Loadable.preloadAll();
    wrapper.update();
    jest.runOnlyPendingTimers();
    expect(mockFn).toHaveBeenCalledTimes(2);
  });
  it('should call the getScoreCells callback and called it every 90 sec if there is no live matches ', async () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const mockFn = jest.fn();
    global.innerWidth = 480;
    const props2 = {
      data: [data[0]],
    };
    const wrapper = mount(<ScoreCells {...props2} getScoreCells={mockFn} />);
    await Loadable.preloadAll();
    jest.runTimersToTime(90000);
    wrapper.update();
    expect(mockFn).toHaveBeenCalledTimes(2);
  });
  it('should call the getScoreCells callback at 90 sec and then after 30sec', async () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const mockFn = jest.fn();
    global.innerWidth = 480;
    const props2 = {
      data: [data[0]],
    };
    const wrapper = mount(<ScoreCells {...props2} getScoreCells={mockFn} />);
    await Loadable.preloadAll();
    jest.runTimersToTime(90000);
    wrapper.update();
    expect(mockFn).toHaveBeenCalledTimes(2);
    wrapper.setProps({
      data: [data[2]],
      getScoreCells: mockFn,
    });
    wrapper.update();
    jest.runTimersToTime(120000);
    expect(mockFn).toHaveBeenCalledTimes(4);
  });
  it('should not call the getScoreCells callback at 90 sec if no valid data and then after 30sec with valid live data', async () => {
    const mockFn = jest.fn();
    global.innerWidth = 480;
    const props2 = {
      data: [],
    };
    const wrapper = mount(<ScoreCells {...props2} getScoreCells={mockFn} />);
    await Loadable.preloadAll();
    jest.runTimersToTime(90000);
    wrapper.update();
    expect(mockFn).toHaveBeenCalledTimes(1);
    wrapper.setProps({
      data: [data[2]],
      getScoreCells: mockFn,
    });
    wrapper.update();
    jest.runTimersToTime(30000);
    expect(mockFn).toHaveBeenCalledTimes(2);
  });
  it('should call clearInterval on unmount when have active timer', async () => {
    const mockFn = jest.fn();
    const props2 = {
      data: [data[0]],
      getScoreCells: mockFn,
    };
    const wrapper = mount(<ScoreCells {...props2} />);
    await Loadable.preloadAll();
    clearInterval.mockClear();
    wrapper.unmount();
    expect(clearInterval).toHaveBeenCalledTimes(1);
  });
  it('should not render if getScoreCells exists but there is no data', async () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const mockFn = jest.fn();
    global.innerWidth = 480;
    const wrapper = shallow(<ScoreCells data={null} getScoreCells={mockFn} />);
    expect(wrapper.getElement()).toBe(null);
  });
  it('should return xs if global.windows does not exist', async () => {
    global.innerWidth = 1300;
    const props2 = {
      data: data.filter((a, b) => {
        if (b < 2) {
          return a;
        }

        return null;
      }),
    };
    const wrapper = mount(<ScoreCells {...props2} />);
    await Loadable.preloadAll();
    wrapper.update();
    const restoreGlobal = global.window;
    delete global.window;
    const currentBreapPoint = wrapper.instance().constructor.currentBreakPoint;
    expect(currentBreapPoint).toEqual('xxs');
    global.window = restoreGlobal;
  });
  it('should return md breakpoint', async () => {
    global.innerWidth = 1024;
    const wrapper = mount(<ScoreCells {...props} device="desktop" />);
    await Loadable.preloadAll();
    wrapper.update();
    const currentBreapPoint = wrapper.instance().constructor.currentBreakPoint;
    expect(currentBreapPoint).toEqual('md');
  });
  it('calls toggleShowAll when clicked', () => {
    global.innerWidth = 320;
    const wrapper = mount(<ScoreCells {...props} />);
    wrapper.instance().toggleShowAll();
    expect(wrapper.state('showAll')).toEqual(true);
    wrapper.instance().toggleShowAll();
    expect(wrapper.state('showAll')).toEqual(false);
  });
  it('should render rebrand version', () => {
    global.innerWidth = 1024;
    const rebrandProps = {
      ...props,
      device: 'desktop',
      widgetContext: {
        isWorldCupMVP: true,
      },
    };
    const wrapper = mount(<ScoreCells {...rebrandProps} />);
    expect(wrapper.find('ScoreCells__ScoreCardStyled')).toHaveLength(2);
  });
  it('should render rebrand version mobile', () => {
    global.innerWidth = 320;
    const rebrandProps = {
      ...props,
      device: 'mobile',
      widgetContext: {
        isWorldCupMVP: true,
      },
    };
    const wrapper = mount(<ScoreCells {...rebrandProps} />);
    expect(wrapper.find('ScoreCells__ScoreCardStyled')).toHaveLength(6);
  });
  it('should render rebrand version with marketOdds card', () => {
    global.innerWidth = 1024;
    const rebrandProps = {
      ...props,
      data: props.data.map(item => ({
        ...item,
        calienteMetadata: {
          isBetOpen: true,
        },
      })),
      device: 'desktop',
      widgetContext: {
        isWorldCupMVP: true,
      },
      userLocation: 'MX',
    };
    const wrapper = mount(<ScoreCells {...rebrandProps} />);
    expect(wrapper.find('ScoreCells__ScoreCardStyled')).toHaveLength(2);
    expect(wrapper.find('ScoreCells__CalienteCTAStyled')).toHaveLength(2);
  });
});

describe('ScoreCell tealium and micro data', () => {
  let props;
  beforeEach(() => {
    props = { data: [...data] };
    helpers.locationRedirect.mockClear();
  });
  afterAll(() => {
    jest.clearAllTimers();
  });
  it('should takes the away image when the home image does not exist',
    async() => {
      console.error = jest.fn(); // eslint-disable-line no-console
      const props2 = {
        data: data.filter((a, b) => {
          if (b === 0) {
            return Object.assign(a, { home: { imageURI: null, abbreviatedName: 'test' } });
          }

          return null;
        }),
      };
      console.error = jest.fn(); // eslint-disable-line no-console
      const wrapper = mount(<ScoreCells {...props2} />);
      await Loadable.preloadAll();
      wrapper.update();
      const microDataComponentImage = wrapper.find('Microdata')
        .props().data.image;
      expect(microDataComponentImage)
        .toEqual(
          'http://cdn7.uvnimg.com/univision-media/image/upload/v1/prod/sports/teams_logos/1283'
        );
    });

  it('should call when ver resumen is clicked on mobile location MX', async () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const trackerSpy = jest.spyOn(Tracker, 'fireEvent');
    global.innerWidth = 320;
    const props2 = {
      data: [data[0]],
    };
    const wrapper = mount(<ScoreCells {...props2} />);
    await Loadable.preloadAll();
    wrapper.update();
    const scoreCard = wrapper.find('ScoreCell').first();
    scoreCard.props().onPress(mockEvent);
    jest.runOnlyPendingTimers();

    expect(trackerSpy).toHaveBeenLastCalledWith(expect.any(Object));
    expect(helpers.locationRedirect).toBeCalledWith('/');
  });

  it('should call when ver resumen is clicked on mobile', async () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const trackerSpy = jest.spyOn(Tracker, 'fireEvent');
    global.innerWidth = 320;
    const props2 = {
      data: [data[0]],
      userLocation: 'MX',
    };
    const wrapper = mount(<ScoreCells {...props2} />);
    await Loadable.preloadAll();
    wrapper.update();
    const scoreCard = wrapper.find('ScoreCell').first();
    scoreCard.props().onPress(mockEvent);
    jest.runOnlyPendingTimers();

    expect(trackerSpy).toHaveBeenLastCalledWith(expect.any(Object));
    expect(helpers.locationRedirect).toBeCalledWith('/');
  });

  it('should call when the live button is clicked on mobile', async () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const trackerSpy = jest.spyOn(Tracker, 'fireEvent');
    global.innerWidth = 320;
    const props2 = {
      data: [data[2]],
    };
    const wrapper = mount(<ScoreCells {...props2} />);
    await Loadable.preloadAll();
    wrapper.update();
    const scoreCard = wrapper.find('ScoreCell').first();
    scoreCard.props().onPress(mockEvent);
    jest.runOnlyPendingTimers();

    expect(trackerSpy).toHaveBeenLastCalledWith(expect.any(Object));
    expect(helpers.locationRedirect).toBeCalledWith('/');
  });

  it('should call when the ver previa button is clicked on mobile', async () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const trackerSpy = jest.spyOn(Tracker, 'fireEvent');
    global.innerWidth = 320;
    const props2 = {
      data: [data[4]],
    };
    const wrapper = mount(<ScoreCells {...props2} />);
    await Loadable.preloadAll();
    wrapper.update();
    const scoreCard = wrapper.find('ScoreCells__ScoreCellStyled').first();
    scoreCard.props().onPress(mockEvent);
    jest.runOnlyPendingTimers();

    expect(trackerSpy).toHaveBeenLastCalledWith(expect.any(Object));
    expect(helpers.locationRedirect).toBeCalledWith('/');
  });

  it('should call when ver resumen is clicked on desktop', async () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const trackerSpy = jest.spyOn(Tracker, 'fireEvent');
    global.innerWidth = 500;
    const props2 = {
      data: [data[0]],
      device: 'desktop',
    };
    const wrapper = mount(<ScoreCells {...props2} />);
    await Loadable.preloadAll();
    wrapper.update();
    const scoreCard = wrapper.find('ScoreCells__ScoreCellStyled').first();
    scoreCard.props().onPress(mockEvent);
    jest.runOnlyPendingTimers();

    expect(trackerSpy).toHaveBeenLastCalledWith(expect.any(Object));
  });

  it('should call when ver resumen is clicked on desktop location MX', async () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const trackerSpy = jest.spyOn(Tracker, 'fireEvent');
    global.innerWidth = 500;
    const props2 = {
      data: [data[0]],
      device: 'desktop',
      userLocation: 'MX',
    };
    const wrapper = mount(<ScoreCells {...props2} />);
    await Loadable.preloadAll();
    wrapper.update();
    const scoreCard = wrapper.find('ScoreCells__ScoreCellStyled').first();
    scoreCard.props().onPress(mockEvent);
    jest.runOnlyPendingTimers();

    expect(trackerSpy).toHaveBeenLastCalledWith(expect.any(Object));
  });

  it('should call when the ad is clicked', async () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const trackerSpy = jest.spyOn(Tracker, 'fireEvent');
    global.innerWidth = 500;
    const wrapper = mount(<ScoreCells {...props} sponsor={sponsor} />);
    await Loadable.preloadAll();
    wrapper.update();
    const sponsorElement = wrapper.find('Sponsor');
    sponsorElement.props().onClick(mockEvent);
    expect(trackerSpy).toHaveBeenLastCalledWith(expect.any(Object));
  });

  it('should call showAllHandler when see All is clicked', async () => {
    const restoreGlobal = global.window;
    delete global.window;
    global.window = {
      location: {},
      addEventListener: jest.fn(),
    };
    console.error = jest.fn(); // eslint-disable-line no-console
    const trackerSpy = jest.spyOn(Tracker, 'fireEvent');
    global.innerWidth = 500;
    const wrapper = shallow(<ScoreCells {...props} />);
    await Loadable.preloadAll();
    wrapper.update();
    const scoreCard = wrapper.find('ScoreCells__SeeAllTudnStyled').first();
    scoreCard.props().onPress(mockEvent);
    jest.runOnlyPendingTimers();

    expect(trackerSpy).toHaveBeenLastCalledWith(expect.any(Object));
    expect(helpers.locationRedirect).toBeCalledWith('/futbol/partidos-de-futbol-para-hoy-en-vivo');
    global.window = restoreGlobal;
  });
  it('should sort with highlighted competitions if available', async () => {
    const wrapper = mount(<ScoreCells
      {...props}
      settings={
        {
          highlightedCompetitionSeasons: [
            {
              seasonId: '2018',
              soccerCompetition: {
                name: 'MLS',
                id: '98',
              },
            },
          ],
        }}
    />);
    await Loadable.preloadAll();
    wrapper.update();
    expect(wrapper.find('ScoreCells__ScoreCellWrapperStyled')).toHaveLength(6);
  });
  it('should render correctly if highlighted competitions not in score cells games', async () => {
    const props2 = {
      data: [data[0], data[1]],
    };
    const wrapper = mount(<ScoreCells
      {...props2}
      settings={
        {
          highlightedCompetitionSeasons: [
            {
              seasonId: '2018',
              soccerCompetition: {
                name: 'MLS',
                id: '98',
              },
            },
          ],
        }}
    />);
    await Loadable.preloadAll();
    wrapper.update();
    expect(wrapper.find('ScoreCells__ScoreCellWrapperStyled')).toHaveLength(2);
  });
});

describe('ScoreCells - filterDataByStatus', () => {
  it('should return an empty array by default', () => {
    const cellData = ScoreCells.filterDataByStatus();
    expect(cellData).toEqual([]);
  });
  it('should return sorted array by status only', () => {
    const cells = [{ status: 'post' }, { status: 'pre' }, { status: 'live' }];
    const cellData = ScoreCells.filterDataByStatus(cells);
    expect(cellData).toHaveLength(3);
    expect(cellData[0].status).toBe('live');
    expect(cellData[1].status).toBe('pre');
    expect(cellData[2].status).toEqual('post');
  });
  it('should sort by sortingOrder and then by status', () => {
    const cells = [
      { status: 'pre', leagueKey: 'A' },
      { status: 'post', leagueKey: 'A' },
      { status: 'pre', leagueKey: 'B' },
      { status: 'post', leagueKey: 'B' },
    ];
    const sortingOrder = ['B', 'A'];
    const cellData = ScoreCells.filterDataByStatus(cells, sortingOrder);
    expect(cellData).toHaveLength(4);
    expect(cellData[0].status).toBe('pre');
    expect(cellData[0].leagueKey).toBe('B');
    expect(cellData[1].status).toBe('pre');
    expect(cellData[1].leagueKey).toBe('A');
  });
  it('should sort by status even if status are not mapped', () => {
    const cells = [
      { status: 'post' },
      { status: 'pre' },
      { status: 'live' },
      { status: 'test' },
      { status: 'cancelled' },
    ];
    const cellData = ScoreCells.filterDataByStatus(cells);
    expect(cellData[0].status).toBe('live');
    expect(cellData[3].status).toBe('test');
    expect(cellData[4].status).toBe('cancelled');
  });
  it('should sort even if keys dont exist in sortingOrder', () => {
    const cells = [
      { status: 'pre', leagueKey: 'D' },
      { status: 'post', leagueKey: 'D' },
      { status: 'pre', leagueKey: 'C' },
      { status: 'post', leagueKey: 'C' },
      { status: 'pre', leagueKey: 'A' },
      { status: 'post', leagueKey: 'A' },
      { status: 'pre', leagueKey: 'B' },
      { status: 'post', leagueKey: 'B' },
    ];
    const sortingOrder = ['B', 'A'];
    const cellData = ScoreCells.filterDataByStatus(cells, sortingOrder);

    expect(cellData).toHaveLength(8);
    expect(cellData[0].status).toBe('pre');
    expect(cellData[0].leagueKey).toBe('B');
    expect(cellData[1].status).toBe('pre');
    expect(cellData[1].leagueKey).toBe('A');
    expect(cellData[2].status).toBe('pre');
  });
});

describe('ScoreCells - trackCalienteCta', () => {
  const card = {
    key: '1',
  };
  const originalWindow = global.window;

  afterEach(() => {
    jest.restoreAllMocks();
    global.window = originalWindow;
  });

  it('should call SportsTracker', () => {
    global.window.location.href = 'https://www.tudn.com';
    const trackerSpy = jest.spyOn(Tracker, 'fireEvent');
    const trackCaliente = ScoreCells.trackCalienteCta(card);
    trackCaliente();
    expect(trackerSpy).toHaveBeenCalled();
  });
});
