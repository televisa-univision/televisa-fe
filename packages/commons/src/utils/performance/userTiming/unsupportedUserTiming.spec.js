import { getKey } from '../../helpers';

describe('User Timing unsupported', () => {
  let userTiming;

  beforeAll(() => {
    delete window.performance;
  });

  it('should not defined the user timing', async () => {
    const userTiimingModule = await import('.');
    userTiming = getKey(userTiimingModule, 'default', userTiimingModule);
    userTiming().init();
    userTiming().finish();
    expect(userTiming.toString()).toMatch('timingMark');
  });
});
