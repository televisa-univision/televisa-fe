import {
  mediaPlayerPlayRadio,
  mediaPlayerCloseRadio,
} from './mediaplayer-actions';
import {
  MEDIAPLAYER_PLAY_RADIO,
  MEDIAPLAYER_CLOSE_RADIO,
} from './action-types';

describe('MediaPlayer actions', () => {
  it('should return expected action type', () => {
    expect(mediaPlayerPlayRadio({ abacastId: '1', stationTitle: 'title' })).toEqual({
      type: MEDIAPLAYER_PLAY_RADIO,
      radio: {
        abacastId: '1',
        stationTitle: 'title',
      },
    });
  });

  it('should return expected action type', () => {
    expect(mediaPlayerCloseRadio()).toEqual({
      type: MEDIAPLAYER_CLOSE_RADIO,
    });
  });
});
