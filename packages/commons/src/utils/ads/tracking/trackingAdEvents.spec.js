import SportsTracker from '../../tracking/tealium/sports/SportsTracker';
import * as storeHelpers from '../../../store/storeHelpers';

import trackingAdEvents from './trackingAdEvents';

describe('trackingAdEvents suite', () => {
  beforeAll(() => {
    storeHelpers.getPageData = jest.fn();
    storeHelpers.getContentType = jest.fn();
  });
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should not call any event by default', () => {
    const trackSpy = jest.spyOn(SportsTracker, 'track');
    trackingAdEvents();
    expect(trackSpy).not.toHaveBeenCalled();
  });
  it('should not call any event if contentType not present on the list', () => {
    const trackSpy = jest.spyOn(SportsTracker, 'track');
    storeHelpers.getContentType.mockReturnValue('section');
    trackingAdEvents('value');
    expect(trackSpy).not.toHaveBeenCalled();
  });
  it('should call Soccermatch when content type soccermatch', () => {
    const trackSpy = jest.spyOn(SportsTracker, 'track');
    storeHelpers.getContentType.mockReturnValue('soccermatch');
    trackingAdEvents('1');
    expect(trackSpy).toHaveBeenCalled();
  });
});
