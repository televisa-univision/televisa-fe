import getTestGroup from './testGroups';
import { UNIVISION_SITE, TUDN_SITE } from '../../../constants/sites';
import { CBP_ADS, PHASED_RELEASE_BASELINE } from '../../../constants/tracking';
import features from '../../../config/features';

describe('testGroup suite', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const pageData = {
    site: UNIVISION_SITE,
  };
  it('should return baseline test group', () => {
    process.env.APP_VERSION = undefined;
    expect(getTestGroup(pageData)).toBe(PHASED_RELEASE_BASELINE);
  });
  it('should return null outside of univision', () => {
    const tudnPageData = {
      site: TUDN_SITE,
    };
    process.env.APP_VERSION = undefined;
    expect(getTestGroup(tudnPageData)).toBe(null);
  });
  it('should return null outside of univision', () => {
    const tudnPageData = {
      site: TUDN_SITE,
    };
    process.env.APP_VERSION = undefined;
    expect(getTestGroup(tudnPageData)).toBe(null);
  });
  it('should return cbp when feature flag is enabled', () => {
    const cbpSpy = jest.spyOn(features.video, 'enableCbpAds').mockReturnValue(true);
    const testGroup = getTestGroup(pageData);
    expect(cbpSpy).toHaveBeenCalled();
    expect(testGroup).toBe(CBP_ADS);
  });
});
