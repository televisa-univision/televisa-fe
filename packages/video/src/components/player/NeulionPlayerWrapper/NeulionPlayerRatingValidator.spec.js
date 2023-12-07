import * as clientLogging from '@univision/fe-commons/dist/utils/logging/clientLogging';
import * as dateTimeUtils from '@univision/fe-commons/dist/utils/helpers/dateTimeUtils';
import * as helpers from '@univision/fe-commons/dist/utils/helpers';
import RatingValidator from './NeulionPlayerRatingValidator';

describe('', () => {
  const NUELION_URL = 'https://neulionsmbnyc-a.akamaihd.net/u/univisionnow2/epg/export/univisionla/2020/10/10.json';
  const currentDate = '2020-10-10T08:00:00.000';
  const fetchData = [{
    channelId: 4,
    items: [{
      e: 'title 0',
      su: '2020-10-10T13:00:00.000',
    }, {
      e: 'title 1',
      su: '2020-10-10T14:00:00.000',
    }, {
      e: 'title 2',
      r: 'TV-14',
      su: '2020-10-10T15:00:00.000',
    }, {
      e: 'title 3',
      eua: '2020-10-10T16:00:00.000',
      r: 'TV-PG',
      su: '2020-10-10T17:00:00.000',
    }],
    seoName: 'univisionla',
  }];
  const errorFail = new Error('fail');
  const mockJson = Promise.resolve(fetchData);
  const mockFetch = Promise.resolve({ json: () => mockJson });
  const mockError = Promise.reject(errorFail);

  beforeAll(() => {
    global.Date = class extends Date {
      /**
       * constructor
       * @param {Object} date - Initial Date Value
       */
      constructor(date) {
        super(date || currentDate);
        this.timezoneOffset = 0;
      }

      /**
       * getTimezoneOffset
       * @returns {number}
       */
      getTimezoneOffset() {
        return this.timezoneOffset;
      }
    };
    jest.useFakeTimers();
  });

  describe('clearTimer', () => {
    it('should not clear the current timer when call `clearTimer`', () => {
      jest.spyOn(global, 'clearTimeout');
      RatingValidator.clearTimer();
      expect(global.clearTimeout).not.toBeCalled();
    });
  });

  describe('getLocalUrl', () => {
    it('should return a valid url for shows list', () => {
      const url = RatingValidator.getNeulionUrl('univisionla');
      expect(url).toEqual(NUELION_URL);
    });
  });

  describe('getShowsLivestreamData', () => {
    it('should return a valid show array', async () => {
      const fetchSpy = jest.spyOn(global, 'fetch').mockImplementation(() => mockFetch);
      const result = await RatingValidator.getShowsLivestreamData('univisionla');
      expect(fetchSpy).toBeCalledWith(NUELION_URL);
      expect(result[0].items).toHaveLength(4);
    });
    it('should return null if has a fetch error', async () => {
      const clientLoggingSpy = jest.spyOn(clientLogging, 'default').mockReturnValue(null);
      const fetchSpy = jest.spyOn(global, 'fetch').mockImplementation(() => mockError);
      const result = await RatingValidator.getShowsLivestreamData('univisionla');
      expect(fetchSpy).toBeCalledWith(NUELION_URL);
      expect(clientLoggingSpy).toHaveBeenCalledWith(errorFail);
      expect(result).toBeNull();
    });
  });

  describe('getValidRatingLivestream', () => {
    it('should return an empty array if fetch has an error', async () => {
      jest.spyOn(dateTimeUtils, 'getUTCDatetime').mockReturnValue(new Date('2020-10-10T08:00:00.000'));
      jest.spyOn(global, 'fetch').mockImplementation(() => mockError);
      const result = await RatingValidator.getValidRatingLivestream('univisionla');
      expect(result).toHaveLength(0);
    });
    it('should return two shows with rating', async () => {
      jest.spyOn(dateTimeUtils, 'getUTCDatetime').mockReturnValue(new Date('2020-10-10T08:00:00.000'));
      jest.spyOn(global, 'fetch').mockImplementation(() => mockFetch);
      const result = await RatingValidator.getValidRatingLivestream('univisionla');
      const ratingResult = result.filter(x => x.rating);
      expect(ratingResult).toHaveLength(2);
    });
    it('should set the current rating with the default rating', async () => {
      jest.spyOn(dateTimeUtils, 'getUTCDatetime').mockReturnValue(new Date('2020-10-10T15:00:00.000'));
      jest.spyOn(global, 'fetch').mockImplementation(() => mockFetch);
      await RatingValidator.getValidRatingLivestream('univisionla');
      expect(RatingValidator.getCurrentRating()).toEqual('TV-Y');
    });
  });

  describe('recursiveShowValidation', () => {
    it('should not call the callback if showList is null', () => {
      const fn = jest.fn();
      RatingValidator.recursiveShowValidation(null, fn);
      jest.runOnlyPendingTimers();
      expect(fn).not.toBeCalled();
    });
    it('should call the callback if showList has a valid show', () => {
      const fn = jest.fn();
      RatingValidator.recursiveShowValidation([{
        delay: 10, id: 0,
      }], fn);
      jest.runOnlyPendingTimers();
      expect(fn).toBeCalledWith({ id: 0 });
    });
  });

  describe('showLivestreamLoop', () => {
    it('should call the callback if showList has a valid show', () => {
      const fn = jest.fn();
      RatingValidator.showLivestreamLoop([{
        delay: 10, id: 0,
      }], fn);
      jest.runOnlyPendingTimers();
      expect(fn).toBeCalledWith({ id: 0 });
    });
  });

  describe('initLivestreamValidation', () => {
    it('should not execute the validation process if seoName is null', async () => {
      const getValidRatingLivestreamSpy = jest.spyOn(RatingValidator, 'getValidRatingLivestream');
      await RatingValidator.initLivestreamValidation(null, 'playerId');
      expect(getValidRatingLivestreamSpy).not.toBeCalled();
    });
    it('should not call `showLivestreamLoop` if `getValidRatingLivestream` doesn`t return a valid array', async () => {
      const showLivestreamLoopSpy = jest.spyOn(RatingValidator, 'showLivestreamLoop');
      jest.spyOn(helpers, 'isValidArray').mockReturnValueOnce(false);
      await RatingValidator.initLivestreamValidation('univisionla', 'playerId');
      expect(showLivestreamLoopSpy).not.toBeCalledWith([]);
    });
    it('should not trigger mvpd authorization if FMG is undefined', async () => {
      global.window.FMG = { trigger: jest.fn() };
      jest.spyOn(helpers, 'hasKey').mockReturnValueOnce(false);
      jest.spyOn(helpers, 'isValidArray').mockReturnValueOnce(true);
      jest.spyOn(helpers, 'isValidObject').mockReturnValueOnce(true);
      jest.spyOn(global, 'fetch').mockImplementation(() => mockFetch);
      jest.spyOn(RatingValidator, 'showLivestreamLoop').mockImplementationOnce((_, fn) => fn([]));
      await RatingValidator.initLivestreamValidation('univisionla', 'playerId');
      expect(global.window.FMG.trigger).not.toBeCalled();
    });
    it('should trigger mvpd authorization if FMG is defined', async () => {
      global.window.FMG = { trigger: jest.fn() };
      jest.spyOn(helpers, 'hasKey').mockReturnValueOnce(true);
      jest.spyOn(helpers, 'isValidArray').mockReturnValueOnce(true);
      jest.spyOn(helpers, 'isValidObject').mockReturnValueOnce(true);
      jest.spyOn(global, 'fetch').mockImplementation(() => mockFetch);
      jest.spyOn(RatingValidator, 'showLivestreamLoop').mockImplementationOnce((_, fn) => fn([]));
      await RatingValidator.initLivestreamValidation('univisionla', 'playerId');
      expect(global.window.FMG.trigger).toBeCalled();
    });
    it('should call two times initLivestreamValidation if it the last show', async () => {
      const initLivestreamValidationSpy = jest.spyOn(RatingValidator, 'initLivestreamValidation');
      jest.spyOn(helpers, 'isValidArray').mockReturnValueOnce(true);
      jest.spyOn(helpers, 'isValidObject').mockReturnValueOnce(false);
      jest.spyOn(global, 'fetch').mockImplementation(() => mockFetch);
      jest.spyOn(RatingValidator, 'showLivestreamLoop').mockImplementationOnce((_, fn) => fn([]));
      await RatingValidator.initLivestreamValidation('univisionla', 'playerId');
      expect(initLivestreamValidationSpy).toBeCalledTimes(2);
    });
  });

  describe('clearTimer', () => {
    it('should clear the current timer when call `clearTimer`', () => {
      const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout').mockImplementationOnce(() => {});
      RatingValidator.clearTimer();
      expect(clearTimeoutSpy).toBeCalled();
    });
  });
});
