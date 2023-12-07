import {
  getAllEvents,
  setDate,
  setChannel,
  setContent,
} from './all-actions';
import {
  TV_GUIDE_FETCH_ALL_EVENTS,
  TV_GUIDE_SET_DATE,
  TV_GUIDE_SET_CHANNEL,
  TV_GUIDE_SET_CONTENT_TYPE,
} from './action-tv-guide-types';

describe('tv guide actions', () => {
  it('should returns the right action', () => {
    const testPromise = new Promise((resolve, reject) => {
      resolve({ 'sports-content': 'abc' });
      reject(new Error('something bad happened'));
    });
    /**
     * Dummy action function
     * @returns {Object}
     */
    const action = () => ({
      type: 'test',
      payload: testPromise,
    });
    expect(getAllEvents()).toEqual({});
    expect(getAllEvents([action]).type).toBe(TV_GUIDE_FETCH_ALL_EVENTS);
    expect(setDate('myDate').type).toBe(TV_GUIDE_SET_DATE);
    expect(setChannel('myChannel').type).toBe(TV_GUIDE_SET_CHANNEL);
    expect(setContent('myContent').type).toBe(TV_GUIDE_SET_CONTENT_TYPE);
  });
});
