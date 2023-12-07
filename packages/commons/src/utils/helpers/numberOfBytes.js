/**
 * Count the number of bytes in the text using utf-8
 * @param {string} text text to count
 * @returns {number} b number of bytes
 */
function countUtf8Bytes(text = '') {
  let b = 0;
  let i = 0;
  let c;
  // eslint-disable-next-line no-bitwise,no-nested-ternary,no-plusplus,no-cond-assign
  for (;c = text.charCodeAt(i++); b += c >> 11 ? 3 : (c >> 7 ? 2 : 1));
  return b;
}

const encodes = {
  'utf-8': countUtf8Bytes,
};

/**
 * Count the number of bytes in the text
 * @param {string} text text to count
 * @param {string} encode encode used in the text
 * @returns {number} b number of bytes
 */
export default function numberOfBytes (text, encode = 'utf-8') {
  const selectedEncode = encode.toLowerCase();
  if (encodes[selectedEncode]) {
    return encodes[selectedEncode](text);
  }
  return null;
}
