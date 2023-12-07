/* eslint-disable no-underscore-dangle */
import comScoreManager from './comScoreManager';
import * as loadComScore from './comScoreLoader';

describe('comScoreManager load', () => {
  beforeEach(() => {
    delete window.COMSCORE;
  });
  it('should call the loader if the library is not loaded', () => {
    spyOn(loadComScore, 'default');
    comScoreManager.load();
    expect(loadComScore.default).toHaveBeenCalled();
  });
  it('should not call the loader and should trigger the beacon if the library is loaded', () => {
    window.COMSCORE = { beacon: jest.fn(() => true) };
    spyOn(loadComScore, 'default');
    spyOn(window, 'fetch');
    comScoreManager.load();
    expect(loadComScore.default).not.toHaveBeenCalled();
    expect(window.COMSCORE.beacon).toHaveBeenCalled();
    expect(window.fetch).toHaveBeenCalled();
  });
  it('should return false for unloaded SDK', () => {
    expect(comScoreManager.isLoaded()).toBe(false);
  });
  it('should return true for loaded SDK', () => {
    window.COMSCORE = {};
    expect(comScoreManager.isLoaded()).toBe(true);
  });
  it('should return true for standard tracking', () => {
    expect(comScoreManager.isStandardTracking('article')).toBe(true);
  });
  it('should not call beacon for undefined SDK', () => {
    window.COMSCORE = undefined;
    let called = false;
    if (comScoreManager.isLoaded()) {
      spyOn(window.COMSCORE, 'beacon').and.callFake(() => { called = true; });
    }
    comScoreManager.beacon();
    expect(called).toBe(false);
  });
  it('should call beacon and fetch pageview candidate', () => {
    window.COMSCORE = { beacon: () => { } };
    spyOn(window.COMSCORE, 'beacon').and.callThrough();
    spyOn(window, 'fetch');

    comScoreManager.beacon();
    expect(window.COMSCORE.beacon).toHaveBeenCalled();
    expect(window.fetch).toHaveBeenCalledWith('/proxy/api/cached/comscore-pageview');
  });
  it('should not call the loader and should trigger the beacon if the library is loaded for Vix pages', () => {
    window.__NEXT_DATA__ = {
      props: {
        pageProps: {
          initialState: {
            page: {
              site: 'zappeando',
            },
          },
        },
      },
    };
    window.COMSCORE = { beacon: jest.fn(() => true) };
    spyOn(loadComScore, 'default');
    spyOn(window, 'fetch');
    comScoreManager.load();
    expect(loadComScore.default).not.toHaveBeenCalled();
    expect(window.COMSCORE.beacon).toHaveBeenCalled();
    expect(window.fetch).toHaveBeenCalled();
  });
  it('load comscore-page when site are lasestrellas', () => {
    window.__NEXT_DATA__ = {
      props: {
        pageProps: {
          initialState: {
            page: {
              site: 'lasestrellas',
            },
          },
        },
      },
    };
    window.COMSCORE = { beacon: jest.fn(() => true) };
    spyOn(loadComScore, 'default');
    spyOn(window, 'fetch');
    comScoreManager.load();
    expect(loadComScore.default).not.toHaveBeenCalled();
    expect(window.COMSCORE.beacon).toHaveBeenCalled();
    expect(window.fetch).toHaveBeenCalled();
  });
  // Keeping it commented since no non-standard tracking for now
  // it('should return false for non-standard tracking', () => {
  //   expect(comScoreManager.isStandardTracking('video')).toBe(false);
  // });
});
