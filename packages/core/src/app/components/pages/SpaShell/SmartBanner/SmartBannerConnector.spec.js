import * as smartApp from '@univision/fe-commons/dist/utils/smartapp';
import { mapStateToProps, areStatePropsEqual } from './SmartBannerConnector';

const smartBannerState = {
  appId: 1,
};

describe('SmartBannerConnector test', () => {
  describe('mapStateToProps', () => {
    it('should return smartBanner state', () => {
      smartApp.getSmartBannerData = jest.fn(() => smartBannerState);
      const state = mapStateToProps(smartBannerState);
      expect(state).toEqual(smartBannerState);
    });
  });

  describe('areStatePropsEqual', () => {
    it('should return false if preev and next props are difereents', () => {
      expect(areStatePropsEqual({ appId: 0 }, { appId: 1 })).toBe(false);
    });

    it('should return true if preev and next props are equals', () => {
      expect(areStatePropsEqual({ appId: 0 }, { appId: 0 })).toBe(true);
    });
  });
});
