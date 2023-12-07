import nielsenManager from './nielsenManager';

const nielsenConfig = {
  appId: 12345,
  environment: 'dev',
  common: {
    section: 'article',
    vcid: 'c02',
    assetid: 54321,
  },
};
const sdkInstance = {
  ggInitialize() { },
  ggPM() { },
};

const sdk = {
  getInstance() {
    return sdkInstance;
  },
};

/** @test {nielsenManager} */
describe('nielsenManager', () => {
  it('should return empty setting map if config is undefined', () => {
    nielsenManager.load(undefined);
    expect(nielsenManager.getSettings()).toEqual({});
  });

  it('should enable debug with non-prod environment', () => {
    nielsenConfig.environment = 'dev';
    let isDebug = true;
    spyOn(sdkInstance, 'ggInitialize').and.callFake((params) => {
      isDebug = params.nol_sdkDebug === 'DEBUG';
    });
    nielsenManager.load(nielsenConfig);
    nielsenManager.initNielsen({
      sdk,
      reloaded: false,
    });
    expect(isDebug).toBe(true);
  });

  it('should not enable debug with prod environment', () => {
    nielsenConfig.environment = 'prod';
    let isDebug = true;

    spyOn(sdkInstance, 'ggInitialize').and.callFake((params) => {
      isDebug = params.nol_sdkDebug === 'DEBUG';
    });

    nielsenManager.load(nielsenConfig);
    nielsenManager.initNielsen({
      sdk,
      reloaded: false,
    });
    expect(isDebug).toBe(false);
  });

  it('should not initialize sdk if it was reloaded', () => {
    nielsenConfig.environment = 'dev';
    const ggInitializeSpy = spyOn(sdkInstance, 'ggInitialize');
    nielsenManager.load(nielsenConfig);
    nielsenManager.initNielsen({
      sdk,
      reloaded: true,
    });
    expect(ggInitializeSpy).not.toHaveBeenCalled();
  });

  it('should not proceed if the instance is not a function', () => {
    const test = nielsenManager.initNielsen({});
    expect(test).toBe(undefined);
  });
});
