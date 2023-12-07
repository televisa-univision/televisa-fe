/* eslint-disable import/prefer-default-export */

/**
 * Gets event register for locking vertical scroll when swiping horizontally
 * on sliders/carousels.
 * https://github.com/akiran/react-slick/issues/1240#issuecomment-396484553
 * @returns {Object}
 */
export const getSliderScrollLockRegister = () => {
  let firstClientX;
  let clientX;

  /**
   * Prevents scrolling vertically while already scrolling horizontally on
   * slider components.
   * @param {Object} e window event
   * @returns {boolean | void}
   */
  const preventTouch = (e) => {
    const minValue = 5; // threshold

    clientX = e.touches[0].clientX - firstClientX;

    // Vertical scrolling will be locked when user starts swiping
    // horizontally.
    if (Math.abs(clientX) > minValue) {
      e.preventDefault();
      e.returnValue = false;

      return false;
    }

    return undefined;
  };

  /**
   * Updates the firstClientX
   * @param {Object} e window event
   */
  const touchStart = (e) => {
    firstClientX = e.touches[0].clientX;
  };

  return function registerSliderScrollLockHandlers(ref) {
    if (ref.current) {
      ref.current.addEventListener('touchstart', touchStart);
      ref.current.addEventListener('touchmove', preventTouch, {
        passive: false,
      });
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener('touchstart', touchStart);
        ref.current.removeEventListener('touchmove', preventTouch, {
          passive: false,
        });
      }
    };
  };
};
