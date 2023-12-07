import React from 'react';
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import promiseMock from '@univision/fe-commons/dist/utils/jest/helpers';
import * as fetchApi from '@univision/fe-commons/dist/utils/api/fetchApi';
import { getScoreSoccerMatch, getPropsMatch } from './utils/helpers';
import dataScoreTeam from './__mocks__/dataScoreTeams.json';
import dataEventMatch from './__mocks__/eventMatch.json';
import dataMock from './__mocks__/singleWidget.json';
import SoccerMatchCard from './SoccermatchCard';

const store = configureStore();
describe('SingleWidget', () => {
  let sportApiSpy;
  beforeEach(() => {
    sportApiSpy = jest.spyOn(fetchApi, 'fetchSportApi');
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllTimers();
  });
  it('should return an object after a successful request', async () => {
    sportApiSpy.mockReturnValue(
      promiseMock({
        resolve: dataScoreTeam,
      })
    );
    jest.runAllTimers();
    const schedule = await getScoreSoccerMatch();
    expect(schedule).toEqual(
      expect.any(Object)
    );
  });
  it('should return an object after a successful request', async () => {
    sportApiSpy.mockReturnValue(
      promiseMock({
        resolve: dataScoreTeam,
      })
    );
    jest.runAllTimers();
    const schedule = await getScoreSoccerMatch();
    expect(schedule).toEqual(
      expect.any(Object)
    );
  });
  it('should return a null value after a failed request', async () => {
    sportApiSpy.mockReturnValue(
      promiseMock({
        reject: new Error(),
      })
    );
    jest.runAllTimers();
    const schedule = await getScoreSoccerMatch();
    expect(schedule).toEqual({});
  });
  it('should render single widget of type soccermatch with status post', () => {
    const currentWidget = dataMock.data.widgets[10];
    delete currentWidget.contents[0].image;

    const props = {
      device: 'desktop',
      singleWidgetData: [currentWidget.contents[9]],
      settings: currentWidget.settings,
      isLive247: false,
      forceMobile: true,
      league: {
        name: 'MLS',
      },
      statusMatch: 'EN JUEGO',
    };
    const scoreTeams = [
      {
        penalty: 0,
        score: 1,
      },
      {
        penalty: 0,
        score: 1,
      },
    ];
    React.useState = jest.fn().mockReturnValue([scoreTeams, []]);
    const wrapper = mount(
      <Provider store={store}>
        <SoccerMatchCard {...props} />
      </Provider>
    );
    expect(wrapper.find('SoccermatchCard__LinkTitleMatch')).toHaveLength(1);
  });
  it('should render single widget of type soccermatch with status previa', () => {
    const currentWidget = dataMock.data.widgets[10];
    delete currentWidget.contents[0].image;

    const props = {
      device: 'desktop',
      singleWidgetData: [currentWidget.contents[9]],
      settings: currentWidget.settings,
      isLive247: false,
      forceMobile: true,
      league: {
        name: 'MLS',
      },
    };
    const scoreTeams = [
      {
        penalty: 0,
        score: 1,
      },
      {
        penalty: 0,
        score: 1,
      },
    ];
    const matchSettings = {
      statusMatch: 'previa',
      hasLiveStream: true,
      hasBroadcastEvent: true,
      hasMcpLiveStreamId: true,
    };
    React.useState = jest.fn().mockReturnValue([scoreTeams, []]);
    React.useState = jest.fn().mockReturnValue([matchSettings, {}]);

    const wrapper = mount(
      <Provider store={store}>
        <SoccerMatchCard {...props} />
      </Provider>
    );
    expect(wrapper.find('SoccermatchCard__LinkTitleMatch')).toHaveLength(1);
  });
  it('should render single widget of type soccermatch with status live', () => {
    const currentWidget = dataMock.data.widgets[10];
    delete currentWidget.contents[0].image;

    const props = {
      device: 'desktop',
      singleWidgetData: [currentWidget.contents[9]],
      settings: currentWidget.settings,
      isLive247: false,
      forceMobile: true,
      league: {
        name: 'MLS',
      },
    };
    const scoreTeams = [
      {
        penalty: 0,
        score: 1,
      },
      {
        penalty: 0,
        score: 1,
      },
    ];
    const matchSettings = {
      statusMatch: 'live',
      hasLiveStream: true,
      hasBroadcastEvent: true,
      hasMcpLiveStreamId: true,
    };
    React.useState = jest.fn().mockReturnValue([scoreTeams, []]);
    React.useState = jest.fn().mockReturnValue([matchSettings, matchSettings]);

    const wrapper = mount(
      <Provider store={store}>
        <SoccerMatchCard {...props} />
      </Provider>
    );
    expect(wrapper.find('SoccermatchCard__LinkTitleMatch')).toHaveLength(1);
  });
  it('should return an object after a successful request events', async () => {
    const matchId = 2308579;
    sportApiSpy.mockReturnValue(
      promiseMock({
        resolve: dataEventMatch,
      })
    );
    jest.runAllTimers();
    const schedule = await getPropsMatch(matchId);
    expect(schedule).toEqual(
      expect.objectContaining({
        statusMatch: 'pre',
        hasLiveStream: true,
      })
    );
  });
  it('should return an object after a successful request events when the match does not exists', async () => {
    const matchId = 1;
    sportApiSpy.mockReturnValue(
      promiseMock({
        resolve: dataEventMatch,
      })
    );
    jest.runAllTimers();
    const schedule = await getPropsMatch(matchId);
    expect(schedule).toEqual(
      expect.objectContaining({
        statusMatch: 'pre',
        hasLiveStream: false,
      })
    );
  });
  it('should return a null value after a failed request for extractor', async () => {
    sportApiSpy.mockReturnValue(
      promiseMock({
        reject: new Error(),
      })
    );
    jest.runAllTimers();
    const schedule = await getPropsMatch();
    expect(schedule).toEqual({});
  });
  it('should return an object after a successful with post event status', async () => {
    const matchId = 2308561;
    sportApiSpy.mockReturnValue(
      promiseMock({
        resolve: dataEventMatch,
      })
    );
    jest.runAllTimers();
    const schedule = await getPropsMatch(matchId);
    expect(schedule).toEqual(
      expect.objectContaining({
        statusMatch: 'post',
      })
    );
  });
  it('should return an object after a successful with halted status', async () => {
    const matchId = 2308551;
    sportApiSpy.mockReturnValue(
      promiseMock({
        resolve: dataEventMatch,
      })
    );
    jest.runAllTimers();
    const schedule = await getPropsMatch(matchId);
    expect(schedule).toEqual(
      expect.objectContaining({
        statusMatch: 'post',
      })
    );
  });
  it('should return an object after a successful with delayed status', async () => {
    const matchId = 2308567;
    sportApiSpy.mockReturnValue(
      promiseMock({
        resolve: dataEventMatch,
      })
    );
    jest.runAllTimers();
    const schedule = await getPropsMatch(matchId);
    expect(schedule).toEqual(
      expect.objectContaining({
        statusMatch: 'live',
      })
    );
  });
  it('should return an object after a successful with mid event status', async () => {
    const matchId = 2308546;
    sportApiSpy.mockReturnValue(
      promiseMock({
        resolve: dataEventMatch,
      })
    );
    jest.runAllTimers();
    const schedule = await getPropsMatch(matchId);
    expect(schedule).toEqual(
      expect.objectContaining({
        statusMatch: 'live',
      })
    );
  });
  it('should return an object after a successful with intermission status', async () => {
    const matchId = 2308558;
    sportApiSpy.mockReturnValue(
      promiseMock({
        resolve: dataEventMatch,
      })
    );
    jest.runAllTimers();
    const schedule = await getPropsMatch(matchId);
    expect(schedule).toEqual(
      expect.objectContaining({
        statusMatch: 'live',
      })
    );
  });
});
