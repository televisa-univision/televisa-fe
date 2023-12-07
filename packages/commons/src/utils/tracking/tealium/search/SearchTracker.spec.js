import gtmManager from '../../googleTagManager/gtmManager';
import SearchTracker from './SearchTracker';

let data;
beforeEach(() => {
  data = {
    searchTerm: 'Noticias',
    hasResults: 'true',
    page: 1,
    count: 1200,
    filters: {
      type: 'all',
      date: 'today',
    },
  };
});

describe('SearchTracker', () => {
  const dataLayer = gtmManager.getDataLayer();
  it('ignores unknown events', () => {
    const { length } = dataLayer;
    SearchTracker.track('unknown', data);
    expect(dataLayer.length).toBe(length);
  });

  it('tracks "userSearch" events', () => {
    data.scrollingCount = 1;
    SearchTracker.track(SearchTracker.events.userSearch, data);
    expect(dataLayer[dataLayer.length - 1].event).toBe('user search');
  });
});
