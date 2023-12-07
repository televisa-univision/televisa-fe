/**
 * @module styled/mixins/linearGradient
 */

/**
 * Generates a linear-gradient for horizontal gradient
 * @param {string} direction - the gradient direction
 * @param {string} start - gradient start color
 * @param {string} end - gradient end color
 * @returns {string}
 */
export default function linearGradient({ direction = '229deg', start, end }) {
  return `linear-gradient(${direction}, ${start} 0%, ${end} 100%)`;
}
