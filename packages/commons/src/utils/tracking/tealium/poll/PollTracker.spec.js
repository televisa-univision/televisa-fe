import gtmManager from '../../googleTagManager/gtmManager';
import PollTracker from './PollTracker';

describe('PollTracker', () => {
  const dataLayer = gtmManager.getDataLayer();
  it('should handle the submission event', () => {
    PollTracker.track(PollTracker.events.submission, { type: 'test' });
    expect(dataLayer[dataLayer.length - 1]).toEqual({
      event: 'poll submission',
      poll_type: 'test'
    });
  });

  it('should ignore unknown events', () => {
    const { length } = dataLayer;
    PollTracker.track('random event', {});
    expect(dataLayer.length).toBe(length);
  });
});
