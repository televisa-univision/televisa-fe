import Store from '../../store/store';
import { getBPFieldValue } from '../../store/storeHelpers';
import { getCurrentBreakPoint, isValidFunction } from '../helpers';

/**
 * Expose share user breakpoint
 * based on this breakpoint definition
 *   xxs: 0,
 *   xs: 480px,
 *   sm: 768px,
 *   md: 1024px,
 *   lg: 1280px,
 *   xl: 1440px
 */
class Breakpoint {
  /**
   * Class constructor based on media queries values
   * @param {string} value assigned with css
   * @constructor
   */
  constructor(value) {
    this.value = value;
  }

  /**
   * get breakpoint value
   * @returns {string}
   */
  getValue() {
    return this.getField('size');
  }

  /**
   * get breakpoint width
   * @returns {string}
   */
  getWidth() {
    return this.getField('width');
  }

  /**
   * device mapping based on breakpoint value
   * @param {sring} value breakpoint value
   * @returns {string}
   */
  getDevice() {
    return this.getField('device');
  }

  /**
   * Get BreakPoint field value
   * @param {sring} field breakpoint value
   * @returns {Object}
   */
  getField(field) {
    if (isValidFunction(getBPFieldValue) && !this.value) {
      return getBPFieldValue(Store)(field);
    }
    return this.getDefault(field);
  }

  /**
   * Get default or stored breakPoint value
   * @param {sring} field breakpoint value
   * @returns {Object}
   */
  getDefault(field) {
    const obj = {};
    const value = (
      [obj.size, obj.width, obj.device] = getCurrentBreakPoint(this.value), obj)[field];
    return value;
  }
}

export default new Breakpoint();
