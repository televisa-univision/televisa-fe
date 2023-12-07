import { hasKey, isValidObject, isValidArray } from '@univision/fe-commons/dist/utils/helpers';
import clientLogging from '@univision/fe-commons/dist/utils/logging/clientLogging';
import { getUTCDatetime } from '@univision/fe-commons/dist/utils/helpers/dateTimeUtils';

/**
 * Validate the current logger user has the age
 *  to watch the current livestream show
 * @returns {Object}
 */
const NeulionPlayerRatingValidator = () => {
  let timerId = null;
  let currentRating;

  return {
    /**
     * Get the current user tv show rating
     * @returns {Object}
     */
    getCurrentRating() {
      return currentRating;
    },

    /**
     * Return url for shows livestream by locale
     * @param {string} seoName - Current seoName by locale
     * @returns {string}
     */
    getNeulionUrl(seoName) {
      const currentDate = new Date();
      const stringDate = currentDate.toLocaleDateString('en-US',
        { year: 'numeric', month: '2-digit', day: '2-digit' });
      const formatDate = stringDate.replace(/(\w+)\/(\w+)\/(\w+)/, '$3/$1/$2');
      const baseUrl = 'https://neulionsmbnyc-a.akamaihd.net/u/univisionnow2/epg/export';
      return `${baseUrl}/${seoName}/${formatDate}.json`;
    },

    /**
     * Return shows data
     * @param {string} seoName - Current locale seo name
     * @returns {Promise}
     */
    async getShowsLivestreamData(seoName) {
      const fetchUrl = this.getNeulionUrl(seoName);
      try {
        const response = await fetch(fetchUrl);
        return response.json();
      } catch (e) {
        e.message = `Error fetching showslivesream: ${e.message}`;
        clientLogging(e);
        return null;
      }
    },

    /**
     * Return valid livestream shows with rating
     * @param {string} seoName - Current locale seo name
     * @returns {Object}
     */
    async getValidRatingLivestream(seoName) {
      const showResponse = await this.getShowsLivestreamData(seoName);
      const [{ channelId, items: showList = [] } = {}] = showResponse || [];
      const currentTime = getUTCDatetime(new Date());
      return showList.reduce((acc, {
        e: title, eua: endDate, r: rating, su: showDate,
      }, index) => {
        const time = new Date(showDate);
        if (currentTime < time) {
          if (!currentRating) {
            ({ r: currentRating = 'TV-Y' } = showList[index === 0 ? index : index - 1]);
          }
          if (rating) {
            acc.push({
              channelId, delay: time - currentTime, rating, title,
            });
          }
          if (endDate) {
            acc.push({ delay: new Date(endDate) - currentTime });
          }
        }
        return acc;
      }, []);
    },

    /**
     * Loop for each shows in livestream
     * @param {Array} showList - List of livestream shows
     * @param {function} fn - Callback function
     * @param {number} timeoutId timer id
     */
    recursiveShowValidation(showList, fn) {
      const [show] = showList || [];
      if (timerId) this.clearTimer();
      if (show) {
        const { delay, ...rest } = show;
        timerId = setTimeout(() => {
          fn(rest);
          this.recursiveShowValidation(showList.slice(1), fn);
        }, delay);
      }
    },

    /**
     * Execute rating validation - Tail call optimization
     * @param {Array} showList - List of livestream shows
     * @param {function} fn - Callback function
     */
    showLivestreamLoop(showList, fn) {
      this.recursiveShowValidation(showList, fn);
    },

    /**
     * Init the rating validation for livestream
     * @param {string} seoName - Current locale seo name
     * @param {string} nodeId - player instance id
     */
    async initLivestreamValidation(seoName, nodeId) {
      if (seoName) {
        const shows = await this.getValidRatingLivestream(seoName);
        if (isValidArray(shows)) {
          this.showLivestreamLoop(shows, (item) => {
            if (isValidObject(item)) {
              if (hasKey(global, 'window.FMG.trigger')) {
                global.window.FMG.trigger('mvpdCheckAuthorization', null, item, nodeId);
              }
            } else {
              currentRating = null;
              this.initLivestreamValidation(seoName, nodeId);
            }
          });
        }
      }
    },

    /**
     * Clear the current running timer when
     *  the component is unmounted
     */
    clearTimer() {
      if (timerId) {
        clearTimeout(timerId);
      }
    },
  };
};

export default NeulionPlayerRatingValidator();
