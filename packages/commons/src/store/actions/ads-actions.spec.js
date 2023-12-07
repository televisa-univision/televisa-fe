import * as Actions from './ads-actions';
import * as types from './action-types';
import * as AdTypes from '../../utils/ads/ad-types';

describe('Ads Actions tests', () => {
  it('initNowPlaying returns expected action type', () => {
    expect(Actions.shouldRefresh(true))
      .toEqual({
        type: types.SHOULD_AD_REFRESH,
        setting: true,
      });
  });
  it('hideAdByIds should return expected action type', () => {
    const ids = [AdTypes.SLIDESHOW_BOT_AD];
    expect(Actions.hideAdByIds(ids))
      .toEqual({
        type: types.HIDE_AD_BY_IDS,
        ids,
      });
  });
  it('insertTopAd returns expected action type', () => {
    expect(Actions.insertTopAd())
      .toEqual({
        type: types.INSERT_TOP_AD,
        from: null,
      });
  });
  it('should have insertTopAd return the correct from value', () => {
    expect(Actions.insertTopAd('SectionAd'))
      .toEqual({
        type: types.INSERT_TOP_AD,
        from: 'SectionAd',
      });
  });
  it('removeTopAd returns expected action type', () => {
    expect(Actions.removeTopAd())
      .toEqual({
        type: types.REMOVE_TOP_AD,
      });
  });
  it('should do a full reset of the ads slots if fullReset is true', () => {
    expect(Actions.resetSlots({ fullReset: true }))
      .toEqual({
        type: types.RESET_SLOTS,
        fullReset: true,
      });
  });

  it('should not do a full reset of the ads slots if fullReset is not true', () => {
    expect(Actions.resetSlots())
      .toEqual({
        type: types.RESET_SLOTS,
        fullReset: false,
      });
  });

  it('should update nativeAd isEmpty flag', () => {
    expect(Actions.updateNativeAdEmpty({ isEmpty: true }))
      .toEqual({
        type: types.UPDATE_NATIVE_AD_EMPTY,
        isEmpty: true,
      });
  });

  it('should increase ads count', () => {
    expect(Actions.increaseAdCount())
      .toEqual({
        type: types.INCREASE_AD_COUNT,
      });
  });
});
