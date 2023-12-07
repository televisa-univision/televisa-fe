import getEventName, { getProgress } from './analyticsHelpers';

describe('Analytics helpers', () => {
  it('getEventName', () => {
    expect(getEventName('BREAK_CLIP_STARTED', { index: 1 })).toBe('video_ad_start_p1');
    expect(getEventName('MEDIA_FINISHED')).toBe('video_complete');
  });
  it('get progress', () => {
    expect(getProgress(25, 100)).toBe(25);
    expect(getProgress(-1, 100)).toBe(-1);
    expect(getProgress(30, 100)).toBe(-1);
  });
});
