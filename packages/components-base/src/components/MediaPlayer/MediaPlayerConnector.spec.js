import { mapStateToProps, areStatePropsEqual } from './MediaPlayerConnector';

const mediaPlayerState = {
  mediaPlayer: undefined,
};

describe('MediaPlayerConnector', () => {
  describe('mapStateToProps', () => {
    it('should return radio and video state', () => {
      const state = mapStateToProps(mediaPlayerState);
      expect(state).toEqual(mediaPlayerState);
    });
  });

  describe('areStatePropsEqual', () => {
    it('should return true', () => {
      expect(areStatePropsEqual(
        {
          mediaPlayer: {
            radio: {
              stationTitle: '1',
            },
          },
        },
        {
          mediaPlayer: {
            radio: {
              stationTitle: '1',
            },
          },
        }
      )).toBeTruthy();
    });

    it('should return false', () => {
      expect(areStatePropsEqual(
        {
          mediaPlayer: {
            anchorPlayer: {
              stationTitle: 1,
            },
          },
        },
        {
          mediaPlayer: {
            anchorPlayer: {
              stationTitle: 2,
            },
          },
        }
      )).toBeFalsy();
    });
  });
});
