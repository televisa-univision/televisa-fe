import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import * as localActions from '@univision/fe-commons/dist/store/actions/local/local-actions';
import dataCollector from './dataCollector';

jest.mock('@univision/fe-commons/dist/utils/api/request', () => jest.fn());
const data = {
  widgets: [
    { type: 'DeportesGridSoccerMatchesResultsandCalendar' },
    { type: 'DeportesGridSoccerMatchStats' },
    { type: 'DeportesCardSoccerMatchScorecells' },
    { type: 'DeportesGridSoccerStandings' },
  ],
};

describe('dataCollector getWidgetsActions', () => {
  jest.mock('@univision/fe-deportes/dist/utils/helpers/actionsMap', () => ({
    DeportesGridSoccerMatchesResultsandCalendar: {
      action() {
        return () => {};
      },
      extractor() {},
    },
    DeportesGridSoccerMatchStats: {
      action() {
        return () => {};
      },
      extractor() {},
    },
    DeportesCardSoccerMatchScorecells: {
      action() {
        return () => {};
      },
      extractor() {},
    },
    DeportesGridSoccerStandings: {
      action() {
        return () => {};
      },
      extractor() {},
    },
  }));
  it('should return an array with max length 3', () => {
    Store.dispatch(setPageData({ data }));
    expect(dataCollector.getWidgetsActions(Store).length).toBe(3);
  });
  it('should return an empry array if wrong data', () => {
    Store.dispatch(setPageData({ data: { } }));
    expect(dataCollector.getWidgetsActions(Store).length).toBe(0);
  });
  it('should return an empry array if not right widget type', () => {
    Store.dispatch(setPageData({ data: { widgets: ['a', 'b', 'c'] } }));
    expect(dataCollector.getWidgetsActions(Store).length).toBe(0);
  });
});

describe('dataCollector extendData', () => {
  const page = {
    data: {
      soccerCompetitionSeason: {
        soccerCompetition: {},
      },
    },
  };

  it('should return the same data object when pageCategory is empty', () => {
    Store.dispatch(setPageData(page));
    dataCollector.extendData(Store, '');
    expect(Store.getState().page.data).toBe(page.data);
  });

  it('should return data with widgets array', () => {
    const dispatchSpy = jest.spyOn(Store, 'dispatch');
    dataCollector.extendData(Store, 'soccercompetition-posiciones');
    expect(dispatchSpy).toHaveBeenCalled();
    dispatchSpy.mockRestore();
  });

  it('should dispatch actions for local actionsMap if is not isAmp page', () => {
    const dispatchSpy = jest.spyOn(Store, 'dispatch');
    dataCollector.extendData(Store, 'local-tv');
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    dispatchSpy.mockRestore();
  });

  it('should no dispatch actions for local actionsMap if isAmp page', () => {
    const fetchSpy = jest.spyOn(localActions, 'fetchWeatherData');
    Store.dispatch(setPageData({ isAmp: true }));
    dataCollector.extendData(Store, 'local-tv');
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});
