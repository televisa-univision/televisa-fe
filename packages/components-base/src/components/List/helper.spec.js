import types from '@univision/fe-commons/dist/constants/labelTypes';
import { getType } from './helper';

describe('Helper', () => {
  describe('getType', () => {
    it('should return (DESTACADO) type', () => {
      expect(getType('DESTACADO')).toEqual(types.STORYTELLING);
    });
    it('should return (ÚLTIMA HORA) type', () => {
      expect(getType('ÚLTIMA HORA')).toEqual(types.BREAKING_NEWS);
    });
    it('should return (EN VIVO) type', () => {
      expect(getType('EN VIVO')).toEqual(types.LIVE);
    });
    it('should return (Empty) type', () => {
      expect(getType('')).toEqual('');
    });
  });
});
