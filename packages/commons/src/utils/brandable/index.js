// eslint-disable-next-line import/no-cycle
import {
  getKey,
  isInArray,
  getSocialNetworks,
  toRelativeUrl,
} from '../helpers';

import types from './types.json';

/**
 * Represents the Brandable obejct.
 */
class Brandable {
  /**
   * Set up the initial data
   * @param {Object} pageData from API
   */
  constructor(pageData) {
    this.pageData = pageData || {};
    this.types = Object.values(types);
  }

  /**
   * Returns the brandable image
   * @returns {Object} Image in web-api format
   */
  get image() {
    return getKey(this.pageData, 'brandable.image',
      getKey(this.pageData, 'sourceStation.image',
        getKey(this.data, 'image')));
  }

  /**
   * Returns the title
   * @returns {string}
   */
  get title() {
    return getKey(this.pageData, 'brandable.title')
      || getKey(this.pageData, 'sourceStation.title')
      || getKey(this.data, 'title');
  }

  /**
   * Returns the short title
   * @returns {string}
   */
  get shortTitle() {
    return getKey(this.pageData, 'brandable.shortTitle',
      getKey(this.pageData, 'sourceStation.shortTitle',
        getKey(this.pageData, 'primaryTag.title', getKey(this.data, 'title'))));
  }

  /**
   * Returns the type of the current Brandable.
   * The possible values are listed in {@link Brandable#types}.
   * @returns {string}
   */
  get type() {
    let type = Object
      .keys(getKey(this, 'pageData', {}).brandable || {})
      .find(k => isInArray(k, this.types));

    if (!type) {
      type = Object
        .keys(getKey(this, 'pageData', {}))
        .find(k => isInArray(k, this.types));
    }

    return type;
  }

  /**
   * Returns the URI
   * @returns {string}
   */
  get uri() {
    return toRelativeUrl(getKey(this.data, 'uri', getKey(this.pageData, 'brandable.uri')));
  }

  /**
   * Returns an array with the social networks.
   * @returns {[{name: string, href: string}]}
   */
  get socialNetworks() {
    switch (this.type) {
      case types.show:
        if (this.data.socialNetworks && !Array.isArray(this.data.socialNetworks)) {
          return getSocialNetworks(this.data, ['facebook', 'twitter', 'instagram', 'youTube']);
        }
        return getKey(this.data, 'socialNetworks', getKey(this, 'pageData.socialNetworks'));
      default:
        return getKey(this.data, 'socialNetworks', getKey(this, 'pageData.socialNetworks'));
    }
  }

  /**
   * Returns the zip code.
   */
  get zipCode() {
    return getKey(this.data, 'localMarket.zipCodes[0]');
  }

  /**
   * Returns the local market links for the footer.
   * @returns {[{title: string, links: [{text: string, link: string }] }]}
   */
  get localMarketFooter() {
    return getKey(this.pageData, 'brandable.localMarketFooter',
      getKey(this.data, 'localMarketFooter'));
  }

  /**
   * Returns the tvStation represented by this brandable if any
   * @returns {Object}
   */
  get tvStation() {
    return getKey(this.pageData, 'brandable.tvStation', this.data);
  }

  /**
   * Returns the logo to use in the header
   * @returns {{image: {renditions: []}}}
   */
  get headerLogo() {
    switch (this.type) {
      case types.radio:
        return getKey(this.data, 'alternativeLogo.renditions.original.href');
      case types.show:
        return getKey(this.data, 'headerLogo.original.href',
          getKey(this.data, 'headerLogo.renditions.original.href'));
      case types.tv:
        return getKey(this.data, 'headerLogo.renditions.original.href',
          getKey(this.data, 'logo.renditions.original.href'));
      default:
        return null;
    }
  }

  /**
   * Returns the related stations
   */
  get relatedStations() {
    return getKey(this.pageData, 'sourceStation.relatedStations',
      getKey(this.data, 'relatedStations'));
  }

  /**
   * Returns the source station
   */
  get sourceStation() {
    return getKey(this.pageData, 'sourceStation',
      getKey(this.pageData, this.type));
  }

  /**
   * Returns the source station
   */
  get sourceStationImage() {
    return getKey(this, 'sourceStation.image.renditions.original.href');
  }

  /**
   * Returns the object associated to the current Brandable.
   * The possible types are listed in {@link Brandable#types}.
   * @returns {Object}
   */
  get data() {
    return getKey(this.pageData, `brandable.${this.type}`,
      getKey(this.pageData, 'sourceStation',
        getKey(this.pageData, this.type)));
  }

  /**
   * Returns true if brand type is not defined
   * meaning the page is not branded
   * @returns {bool}
   */
  get isBranded() {
    return getKey(this, 'type');
  }
}

export default Brandable;
