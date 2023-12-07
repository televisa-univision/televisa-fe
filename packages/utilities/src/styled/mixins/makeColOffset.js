/**
 * @module styled/mixins/makeColOffset
 */

/**
 * Simple margin applicator, but can take args, so it cuts down on code size
 * @param {string} margin - amount of margin to apply
 * @param {string} direction - of margin (top/right/bottom/left)
 * @returns {string}
 */
function makeMargin(margin, direction) {
  return `margin-${direction}: ${margin};`;
}

/**
 * Generates col offset for the element
 * @param {number} size - the size of the offset
 * @param {Object} options - extra options
 * @returns {string}
 */
export default function makeColOffset(size, { breakpoint, rtl = false, marginDirection = 'left' } = {}) {
  const margin = `${size > 0 ? (size / 12) * 100 : 0}%`;
  const direction = rtl ? 'right' : marginDirection;

  if (breakpoint) {
    return `
      @media (min-width: ${breakpoint}) {
        ${makeMargin(margin, direction)}
      }
    `;
  }

  return `${makeMargin(margin, direction)}`;
}
