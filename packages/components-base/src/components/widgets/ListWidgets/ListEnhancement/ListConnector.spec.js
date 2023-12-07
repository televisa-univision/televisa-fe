import { areStatePropsEqual } from './ListConnector';

describe('ListConnector', () => {
  describe('areStatePropsEqual', () => {
    it('should return true', () => {
      expect(areStatePropsEqual(
        {
          currentPageUri: 'https://www.tudn.com/',
        },
        {
          currentPageUri: 'https://www.tudn.com/',
        }
      )).toBeTruthy();
    });

    it('should return false', () => {
      expect(areStatePropsEqual(
        {
          currentPageUri: 'url/test',
        },
        {
          currentPageUri: 'https://ww.tudn.com/testing',
        }
      )).toBeFalsy();
    });
  });
});
