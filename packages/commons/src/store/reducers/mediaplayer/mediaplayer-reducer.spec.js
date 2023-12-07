import {
  MEDIAPLAYER_PLAY_RADIO,
  MEDIAPLAYER_CLOSE_RADIO,
} from '../../actions/mediaplayer/action-types';
import mediaPlayerReducer from './mediaplayer-reducer';

jest.mock('../../../utils/helpers', () => ({
  getKey: jest.fn(),
}));

const initialState = {
  radio: {
    abacastId: null,
    stationTitle: null,
  },
  videoPlaying: null,
};

const INVALID_ACTION = 'INVALID_ACTION';

describe('MediaPlayer reducer', () => {
  it('should return the initial state if the action is not valid', () => {
    expect(mediaPlayerReducer(initialState, INVALID_ACTION)).toEqual(initialState);
  });

  it('should return the right state for MEDIAPLAYER_PLAY_RADIO', () => {
    expect(mediaPlayerReducer(initialState, {
      type: MEDIAPLAYER_PLAY_RADIO,
      radio: {
        stationTitle: 'title',
      },
    })).toEqual({
      radio: {
        stationTitle: 'title',
      },
      videoPlaying: null,
    });
  });

  it('should return the right state for MEDIAPLAYER_CLOSE_RADIO', () => {
    expect(mediaPlayerReducer(initialState, {
      type: MEDIAPLAYER_CLOSE_RADIO,
    })).toEqual({
      radio: {
        image: null,
        logo: null,
        sharingOptions: null,
        socialNetworks: null,
        stationDescription: null,
        stationTitle: null,
        uri: null,
      },
      videoPlaying: null,
    });
  });
});
