import * as helpers from '../../helpers';
import loadNielsen, { UVN_NIELSEN_LOADED } from './nielsenLoader';

describe('nielsenLoader', () => {
  afterEach(() => {
    window.NOLCMB = undefined;
    window[UVN_NIELSEN_LOADED] = false;
  });

  it('should load SDK with dev environment', (done) => {
    const env = 'dev';
    spyOn(helpers, 'getCurrentProtocol').and.returnValue('http:');
    loadNielsen(env)
      .then(() => {
        expect(typeof window.NOLCMB).toBe('object');
        expect(window[UVN_NIELSEN_LOADED]).toBe(true);
      })
      .catch(() => { fail(); });
    done();
  });

  it('should not load SDK if already loaded', (done) => {
    const env = 'dev';
    window.NOLCMB = {};
    window[UVN_NIELSEN_LOADED] = true;
    const spyProtocol = spyOn(helpers, 'getCurrentProtocol');
    loadNielsen(env)
      .then(() => {
        expect(spyProtocol).not.toHaveBeenCalled();
        expect(typeof window.NOLCMB).toBe('object');
        expect(window[UVN_NIELSEN_LOADED]).toBe(true);
      })
      .catch(() => { fail(); });
    done();
  });

  it('should load SDK with prod environment', (done) => {
    const env = 'prod';
    spyOn(helpers, 'getCurrentProtocol').and.returnValue('http:');
    loadNielsen(env)
      .then(() => {
        expect(typeof window.NOLCMB).toBe('object');
        expect(window[UVN_NIELSEN_LOADED]).toBe(true);
      })
      .catch(() => { fail(); });
    done();
  });

  it('should fail with unknown protocol', (done) => {
    const env = 'prod';
    spyOn(helpers, 'getCurrentProtocol').and.returnValue('about:');
    loadNielsen(env)
      .then(() => {
        expect(typeof window.NOLCMB).not.toBe('object');
        expect(window[UVN_NIELSEN_LOADED]).toBe(false);
      })
      .catch(() => { fail(); });
    done();
  });
});
