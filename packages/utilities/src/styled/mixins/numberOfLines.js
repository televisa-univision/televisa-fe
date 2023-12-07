/**
 * Sets the number of lines to display with ellipsis
 * @param {number} lines - number of lines to display
 * @returns {string}
 *
 * @module styled/mixins/numberOfLines
 */
export default function numberOfLines(lines) {
  return `
    -webkit-box-orient: vertical;
    -webkit-line-clamp: ${lines};
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
  `;
}
