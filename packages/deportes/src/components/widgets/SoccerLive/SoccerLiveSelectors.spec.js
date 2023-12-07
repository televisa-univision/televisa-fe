import selectSoccerLiveEvenData from './SoccerLiveSelector';

/**
 * Create a mock state with a give
 * @param {Object} widget - the soccer events list
 * @access private
 * @returns {string}
 */
const createState = widget => ({
  page: {
    data: {
      widgets: [widget],
    },
  },
});

describe('SoccerLive selector', () => {
  it('Groups elements by date', () => {
    const widget = {
      settings: { uid: 1 },
      extraData: {
        events: [
          {
            date: '2019-07-15T13:24:02.818Z',
          },
          {
            date: '2019-07-16T13:24:02.818Z',
          },
          {
            date: '2019-07-16T13:24:02.818Z',
          },
        ],
      },
    };
    const state = createState(widget);
    const { eventGroups } = selectSoccerLiveEvenData(1, state);
    expect(eventGroups.length).toBe(2);
    expect(eventGroups[0].date).toBe('2019-07-15T13:24:02.818Z');
    expect(eventGroups[1].date).toBe('2019-07-16T13:24:02.818Z');
  });

  it('returns an empty array if widget is not defined ', () => {
    const state = createState(null);
    const { eventGroups } = selectSoccerLiveEvenData(1, state);
    expect(eventGroups).toEqual([]);
  });

  it('discards event if it has not date', () => {
    const widget = {
      settings: { uid: 1 },
      extraData: {
        events: [
          {
            date: '2019-07-15T13:24:02.818Z',
          },
          {
            date: '2019-07-16T13:24:02.818Z',
          },
          {},
        ],
      },
    };
    const state = createState(widget);
    const { eventGroups } = selectSoccerLiveEvenData(1, state);
    expect(eventGroups.length).toBe(2);
  });
});
