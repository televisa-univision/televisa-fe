import gtmConfig from '../googleTagManager/gtmConfig';
import trackNextjsWebVitals, { fireWebVitalEvent } from '.';
import Tracker from '../tealium/Tracker';
import { waitForGtmDomReady } from '../gtmHelpers';
import {
  FID,
  NEXT_HYDRATION,
  NEXT_HYDRATION_FID_DIFF,
  NEXT_BEFORE_HYDRATION,
} from '../../../constants/tracking';

jest.mock('../gtmHelpers', () => ({
  waitForGtmDomReady: () => new Promise(resolve => resolve(true)),
}));

const trackerSpy = jest.spyOn(Tracker, 'fireEvent');
beforeEach(() => {
  trackerSpy.mockReset();
});

describe('trackHydrationTime', () => {
  it('should call fireEvent two times on hydration', () => {
    expect.assertions(1);
    trackNextjsWebVitals({ label: 'custom', name: 'Next.js-hydration' });
    return waitForGtmDomReady().then(() => expect(trackerSpy).toHaveBeenCalledTimes(2));
  });
  it('should call fireEvent two times on fid', () => {
    expect.assertions(1);
    trackNextjsWebVitals({ startTime: 500, name: FID });
    return waitForGtmDomReady().then(() => expect(trackerSpy).toHaveBeenCalledTimes(2));
  });
  it('should call fireEvent three times on fid', () => {
    window[gtmConfig.dataLayer] = [{
      [NEXT_HYDRATION_FID_DIFF]: 100,
    }];
    expect.assertions(1);
    trackNextjsWebVitals({ startTime: 500, name: FID });
    return waitForGtmDomReady().then(() => expect(trackerSpy).toHaveBeenCalledTimes(3));
  });
  it('should not call fireEvent is wrong metric', () => {
    expect.assertions(1);
    trackNextjsWebVitals({});
    return waitForGtmDomReady().then(() => expect(trackerSpy).toHaveBeenCalledTimes(0));
  });
  it('should add hydration difference to datalayer', () => {
    window[gtmConfig.dataLayer] = [{ a: 'b' }];
    fireWebVitalEvent({ startTime: 500, value: 200, name: NEXT_HYDRATION });
    expect(window[gtmConfig.dataLayer][0][NEXT_HYDRATION_FID_DIFF]).toBe(700);
  });
  it('should set didHappenedDuringHydration label when fid happens in hydration time', () => {
    window[gtmConfig.dataLayer] = [{
      [NEXT_BEFORE_HYDRATION]: 100,
      [NEXT_HYDRATION_FID_DIFF]: 200,
    }];
    expect.assertions(1);
    trackNextjsWebVitals({ startTime: 150, name: FID, value: 100 });
    return waitForGtmDomReady().then(() => expect(trackerSpy).toHaveBeenCalledTimes(3));
  });
});

describe('fireWebVitalEvent', () => {
  it('should not call call fireEvent if not metric match', () => {
    fireWebVitalEvent({ name: 'test' });
    expect(trackerSpy).toHaveBeenCalledTimes(0);
  });
});
