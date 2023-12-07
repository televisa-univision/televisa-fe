/* eslint-disable no-underscore-dangle */
import * as helpers from '../../helpers';
import loadComScore from './comScoreLoader';

describe('comScoreLoader', () => {
  it('should load SDK', (done) => {
    window.COMSCORE = undefined;
    spyOn(helpers, 'getCurrentProtocol').and.returnValue('http:');
    loadComScore(() => { return {}; }, true)
      .then(() => {
        expect(typeof window.COMSCORE).toBe('object');
      })
      .catch(() => { fail(); });
    done();
  });

  it('should not load SDK if already set and it should call beacon to emulate first page load', (done) => {
    window.COMSCORE = {
      beacon: jest.fn(),
    };
    const spyProtocol = spyOn(helpers, 'getCurrentProtocol');
    loadComScore(() => { return {}; }, true)
      .then(() => {
        expect(spyProtocol).not.toHaveBeenCalled();
        expect(typeof window.COMSCORE).toBe('object');
      })
      .catch(() => { fail(); });
    done();
  });

  it('should push config to _comscore array for standard tracking', (done) => {
    window.COMSCORE = undefined;
    spyOn(helpers, 'getCurrentProtocol').and.returnValue('http:');
    window._comscore = [];
    let pushed = false;
    spyOn(window._comscore, 'push').and.callFake(() => {
      pushed = true;
    });
    loadComScore(() => { return {}; }, true)
      .then(() => {
        expect(pushed).toBe(true);
      })
      .catch(() => { fail(); });
    done();
  });

  it('should load SDK https', (done) => {
    window.COMSCORE = undefined;
    spyOn(helpers, 'getCurrentProtocol').and.returnValue('https:');
    loadComScore(() => { return {}; }, false)
      .then(() => {
        expect(typeof window.COMSCORE).toBe('object');
      })
      .catch(() => { fail(); });
    done();
  });

  it('should reject with unknown protocol', (done) => {
    spyOn(helpers, 'getCurrentProtocol').and.returnValue('about:');
    loadComScore(() => { return {}; }, false)
      .then(() => {
        fail();
      })
      .catch(() => { expect(true).toBe(true); });
    done();
  });
});
