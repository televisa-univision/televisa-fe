import React from 'react';
import { shallow, mount } from 'enzyme';
import Loadable from 'react-loadable';
import Tracker from '@univision/fe-commons/dist/utils/tracking/tealium/Tracker';
import * as storeHelpers from '@univision/fe-commons/dist/store/storeHelpers';
import * as helpers from '@univision/fe-commons/dist/utils/helpers';
import bracketsExtractor from '@univision/shared-components/dist/extractors/bracketsExtractor';
import tournamentData from '../../../../utils/mocks/tournamentCopaOro.json';
import tournamentUFC from '../../../../utils/mocks/tournamentUFC.json';
import Microdata from '../../../utils/Microdata';
import TournamentPhase from '.';

jest.useFakeTimers();

const propsRoundOf16 = {
  tournament: bracketsExtractor(tournamentUFC),
};

const propsQuarterFinals = {
  tournament: bracketsExtractor(tournamentData),
};

const mockEvent = {
  preventDefault: jest.fn(),
  nativeEvent: {},
};
mockEvent.nativeEvent = mockEvent;
helpers.locationRedirect = jest.fn();

storeHelpers.getDevice = jest.fn();
storeHelpers.getPageUrl = jest.fn();
storeHelpers.isTudnSite = jest.fn();

describe('TournamentPhase component tests', () => {
  beforeEach(() => {
    storeHelpers.getPageUrl.mockReturnValue('/deportes');
    storeHelpers.getDevice.mockReturnValue('mobile');
    storeHelpers.isTudnSite.mockReturnValue(true);
    helpers.locationRedirect.mockClear();
  });
  afterAll(() => {
    jest.clearAllTimers();
  });
  it('returns null if the component has no data', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const wrapper = shallow(<TournamentPhase />);
    expect(wrapper.getElement()).toBe(null);
  });
  it('renders empty phases if the component has no data', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const wrapper = mount(<TournamentPhase tournament={{
      roundOf16: [],
      quarterFinals: [],
      semiFinals: [],
      finals: [],
    }}
    />);
    expect(wrapper.find('TournamentPhase__PhaseStyled')).toHaveLength(7);
  });
  it('renders empty phases if the component has no data on mobile', () => {
    global.innerWidth = 320;
    const wrapper = mount(
      <TournamentPhase
        isMobile
        tournament={{
          roundOf16: [],
          quarterFinals: [],
          semiFinals: [],
          finals: [],
        }}
      />
    );
    expect(wrapper.find('TournamentPhase__PhaseStyled')).toHaveLength(4);
  });
  it('should load with breakpoint xxs from round of 16', async () => {
    global.innerWidth = 320;
    const wrapper = mount(<TournamentPhase {...propsRoundOf16} isMobile />);
    await Loadable.preloadAll();
    wrapper.update();
    expect(wrapper.instance().constructor.currentBreakPoint).toEqual('xxs');
  });
  it('should load with breakpoint xxs from quarter finals', async () => {
    global.innerWidth = 320;
    const wrapper = mount(<TournamentPhase {...propsQuarterFinals} isMobile />);
    await Loadable.preloadAll();
    wrapper.update();
    expect(wrapper.instance().constructor.currentBreakPoint).toEqual('xxs');
  });
  it('should load with breakpoint xs from round of 16', async () => {
    global.innerWidth = 480;
    const wrapper = mount(<TournamentPhase {...propsRoundOf16} active="phaseRoundOf16" isMobile />);
    await Loadable.preloadAll();
    wrapper.update();
    expect(wrapper.instance().constructor.currentBreakPoint).toEqual('xs');
  });
  it('should load with breakpoint xs from quarter finals', async () => {
    global.innerWidth = 480;
    const wrapper = mount(<TournamentPhase {...propsQuarterFinals} active="phaseFinal" isMobile />);
    await Loadable.preloadAll();
    wrapper.update();
    expect(wrapper.instance().constructor.currentBreakPoint).toEqual('xs');
  });
  it('should load with breakpoint sm form round of 16', async () => {
    global.innerWidth = 800;
    storeHelpers.getDevice.mockReturnValue('tablet');
    const wrapper = mount(<TournamentPhase {...propsRoundOf16} />);
    await Loadable.preloadAll();
    wrapper.update();
    expect(wrapper.instance().constructor.currentBreakPoint).toEqual('sm');
  });
  it('should load with breakpoint sm from quarter finals', async () => {
    global.innerWidth = 800;
    const wrapper = mount(<TournamentPhase {...propsQuarterFinals} />);
    await Loadable.preloadAll();
    wrapper.update();
    expect(wrapper.instance().constructor.currentBreakPoint).toEqual('sm');
  });
  it('should load with breakpoint md from round of 16', async () => {
    global.innerWidth = 1025;
    const wrapper = mount(<TournamentPhase {...propsRoundOf16} />);
    await Loadable.preloadAll();
    wrapper.update();
    expect(wrapper.instance().constructor.currentBreakPoint).toEqual('md');
  });
  it('should load with breakpoint md from quarter finals', async () => {
    global.innerWidth = 1025;
    const wrapper = mount(<TournamentPhase {...propsQuarterFinals} />);
    await Loadable.preloadAll();
    wrapper.update();
    expect(wrapper.instance().constructor.currentBreakPoint).toEqual('md');
  });
  it('should load with breakpoint lg from round of 16', async () => {
    global.innerWidth = 1300;
    const wrapper = mount(<TournamentPhase {...propsRoundOf16} />);
    await Loadable.preloadAll();
    wrapper.update();
    expect(wrapper.instance().constructor.currentBreakPoint).toEqual('lg');
  });
  it('should load with breakpoint lg from quarter finals', async () => {
    global.innerWidth = 1300;
    const wrapper = mount(<TournamentPhase {...propsQuarterFinals} />);
    await Loadable.preloadAll();
    wrapper.update();
    expect(wrapper.instance().constructor.currentBreakPoint).toEqual('lg');
  });
  it('should load with breakpoint xl', async () => {
    global.innerWidth = 1500;
    const wrapper = mount(<TournamentPhase {...propsRoundOf16} />);
    await Loadable.preloadAll();
    wrapper.update();
    expect(wrapper.instance().constructor.currentBreakPoint).toEqual('xl');
  });
});

describe('Tournament phase tealium and micro data', () => {
  beforeEach(() => {
    storeHelpers.getPageUrl.mockReturnValue('/deportes');
    storeHelpers.getDevice.mockReturnValue('mobile');
    helpers.locationRedirect.mockClear();
  });
  afterAll(() => {
    jest.clearAllTimers();
  });
  it('should takes the away image when the home image does not exist',
    async() => {
      console.error = jest.fn(); // eslint-disable-line no-console
      propsRoundOf16.tournament.roundOf16[0].home.imageURI = null;
      const wrapper = mount(<TournamentPhase {...propsRoundOf16} />);
      await Loadable.preloadAll();
      wrapper.update();
      const microDataComponentImage = wrapper.find('Microdata').first()
        .props().data.image;
      expect(microDataComponentImage)
        .toEqual(
          'https://cdn7.uvnimg.com/univision-media/image/upload/v1539092993/prod/sports/teams_logos/14.png'
        );
    });

  it('should call tracker when score cell is clicked on mobile', async () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const trackerSpy = jest.spyOn(Tracker, 'fireEvent');
    global.innerWidth = 320;
    const wrapper = mount(<TournamentPhase {...propsRoundOf16} isMobile />);
    await Loadable.preloadAll();
    wrapper.update();
    const scoreCard = wrapper.find('ScoreCell').first();
    scoreCard.props().onPress(mockEvent);
    jest.runOnlyPendingTimers();

    expect(trackerSpy).toHaveBeenLastCalledWith(expect.any(Object));
    expect(helpers.locationRedirect).toBeCalledWith('/futbol/uefa-champions-league/fc-bayern-munchen-vs-liverpool-uefa-champions-league-2019-03-13');
  });

  it('should call tracker when score cell is clicked on desktop', async () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    storeHelpers.getDevice.mockReturnValue('desktop');
    const trackerSpy = jest.spyOn(Tracker, 'fireEvent');
    global.innerWidth = 500;
    const wrapper = mount(<TournamentPhase {...propsRoundOf16} />);
    await Loadable.preloadAll();
    wrapper.update();
    const scoreCard = wrapper.find('ScoreCell').first();
    scoreCard.props().onPress(mockEvent);
    jest.runOnlyPendingTimers();

    expect(trackerSpy).toHaveBeenLastCalledWith(expect.any(Object));
  });

  it('should return null for onPress function if score cell has no url', async () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    storeHelpers.getDevice.mockReturnValue('desktop');
    global.innerWidth = 1440;
    propsRoundOf16.tournament.roundOf16[0].url = null;
    const wrapper = mount(<TournamentPhase {...propsRoundOf16} />);
    await Loadable.preloadAll();
    wrapper.update();
    const scoreCard = wrapper.find('ScoreCell').first();
    jest.runOnlyPendingTimers();
    expect(scoreCard.props().onPress).toBe(null);
  });

  it('get Micro data should handle gracefully with with null props',
    async() => {
      console.error = jest.fn(); // eslint-disable-line no-console
      expect(TournamentPhase.getMicroData(null)).toEqual(<Microdata data={{}} />);
    });
});
