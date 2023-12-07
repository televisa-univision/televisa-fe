import deepFreeze from 'deep-freeze';
import * as Selector from './video-pip-selectors';

const state = {
  videoPip: {
    placeholderId: 1,
    anchored: false,
    status: 'stop',
  },
};

deepFreeze(state);

describe('video-pip-selectors', () => {
  describe('videoPiPSelector', () => {
    it('should return the corresponding values', () => {
      expect(Selector.videoPiPSelector(state)).toEqual(state.videoPip);
    });
  });
  describe('videoPiPAnchored', () => {
    it('should return the corresponding values', () => {
      expect(Selector.videoPiPAnchored(state)).toEqual(false);
    });
  });
  describe('videoPiPPlaceholderId', () => {
    it('should return the corresponding values', () => {
      expect(Selector.videoPiPPlaceholderId(state)).toEqual(1);
    });
  });
  describe('videoPiPStatus', () => {
    it('should return the corresponding values', () => {
      expect(Selector.videoPiPStatus(state)).toEqual('stop');
    });
  });
});
