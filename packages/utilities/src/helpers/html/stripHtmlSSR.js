/* eslint-disable no-param-reassign */
/**
 * @module helpers/html/stripHtmlSSR
 */

/**
 * forked version of the original: https://github.com/huang47/nodejs-html-truncate
 * We import the library directly due to this issue: https://github.com/huang47/nodejs-html-truncate/issues/24
 * Truncate HTML string and keep tag safe.
 * @method truncate
 * @param {string} string string needs to be truncated
 * @param {number} maxLength length of truncated string
 * @param {Object} options (optional)
 * @param {boolean} [options.keepImageTag] flag to specify if keep image tag, false by default
 * @param {boolean} [options.truncateLastWord] truncates last word, true by default
 * @param {number} [options.slop] tolerance when options.truncateLastWord is false before we give
 * upand just truncate at the maxLength position, 10 by default (but not greater than maxLength)
 * @param {boolean|String} [options.ellipsis] omission symbol for truncated string, '...' by default
 * @returns {string} truncated string
 */
export function truncate(string, maxLength, options) {
  let clonedOptions = { ...options };
  const EMPTY_OBJECT = {};
  const EMPTY_STRING = '';
  const DEFAULT_TRUNCATE_SYMBOL = '...';
  const DEFAULT_SLOP = maxLength < 10 ? maxLength : 10;
  const EXCLUDE_TAGS = ['img', 'br']; // non-closed tags
  const items = []; // stack for saving tags
  let total = 0; // record how many characters we traced so far
  let content = EMPTY_STRING; // truncated text storage
  const KEY_VALUE_REGEX = '([\\w|-]+\\s*=\\s*"[^"]*"\\s*)*';
  const IS_CLOSE_REGEX = '\\s*\\/?\\s*';
  const CLOSE_REGEX = '\\s*\\/\\s*';
  // eslint-disable-next-line prefer-template
  const SELF_CLOSE_REGEX = new RegExp('<\\/?\\w+\\s*' + KEY_VALUE_REGEX + CLOSE_REGEX + '>');
  // eslint-disable-next-line prefer-template
  const HTML_TAG_REGEX = new RegExp('<\\/?\\w+\\s*' + KEY_VALUE_REGEX + IS_CLOSE_REGEX + '>');
  // eslint-disable-next-line no-useless-escape
  const URL_REGEX = /(((ftp|https?):\/\/)[\-\w@:%_\+.~#?,&\/\/=]+)|((mailto:)?[_.\w\-]+@([\w][\w\-]+\.)+[a-zA-Z]{2,3})/g; // Simple regexp
  const IMAGE_TAG_REGEX = new RegExp(`<img\\s*${KEY_VALUE_REGEX}${IS_CLOSE_REGEX}>`);
  const WORD_BREAK_REGEX = new RegExp('\\W+', 'g');
  let matches = true;
  let result;
  let index;
  let tag;
  let selfClose;

  /**
   * Remove image tag
   *
   * @private
   * @method removeImageTag
   * @param {string} textToProcess not-yet-processed string
   * @returns {string} string without image tags
   */
  function removeImageTag(textToProcess) {
    const match = IMAGE_TAG_REGEX.exec(textToProcess);

    if (!match) {
      return textToProcess;
    }

    const matchIndex = match.index;
    const len = match[0].length;

    return textToProcess.substring(0, matchIndex) + textToProcess.substring(matchIndex + len);
  }

  /**
   * Dump all close tags and append to truncated content while reaching upperbound
   *
   * @private
   * @method dumpCloseTag
   * @param {string[]} tags a list of tags which should be closed
   * @returns {string} well-formatted html
   */
  function dumpCloseTag(tags) {
    let html = '';

    tags.reverse().forEach((currentTag) => {
      // dump non-excluded tags only
      if (EXCLUDE_TAGS.indexOf(currentTag) === -1) {
        html += `</${currentTag}>`;
      }
    });

    return html;
  }

  /**
   * Process tag string to get pure tag name
   *
   * @private
   * @method getTag
   * @param {string} stringTag original html
   * @returns {string} tag name
   */
  function getTag(stringTag) {
    let tailTag = stringTag.indexOf(' ');

    // we have to figure out how to handle non-well-formatted HTML case
    if (tailTag === -1) {
      tailTag = stringTag.indexOf('>');
      /* istanbul ignore next */
      if (tailTag === -1) {
        throw new Error(`HTML tag is not well-formed : ${stringTag}`);
      }
    }

    return stringTag.substring(1, tailTag);
  }

  /**
   * Get the end position for String#substring()
   *
   * If options.truncateLastWord is FALSE, we try to the end position up to
   * options.slop characters to avoid breaking in the middle of a word.
   *
   * @private
   * @method getEndPosition
   * @param {string} text original html
   * @param {number} tailPos (optional) provided to avoid extending the slop into trailing HTML tag
   * @returns {number} maxLength
   */
  function getEndPosition (text, tailPos) {
    const defaultPos = maxLength - total;
    let position = defaultPos;
    const isShort = defaultPos < clonedOptions.slop;
    const slopPos = isShort ? defaultPos : clonedOptions.slop - 1;
    let substr;
    const startSlice = isShort ? 0 : defaultPos - clonedOptions.slop;
    const endSlice = tailPos || (defaultPos + clonedOptions.slop);
    let endPositionResult;

    if (!clonedOptions.truncateLastWord) {
      substr = text.slice(startSlice, endSlice);

      if (tailPos && substr.length <= tailPos) {
        position = substr.length;
      } else {
        // eslint-disable-next-line no-cond-assign
        while ((endPositionResult = WORD_BREAK_REGEX.exec(substr)) !== null) {
          // a natural break position before the hard break position
          if (endPositionResult.index < slopPos) {
            position = defaultPos - (slopPos - endPositionResult.index);
            // keep seeking closer to the hard break position
            // unless a natural break is at position 0
            if (endPositionResult.index === 0 && defaultPos <= 1) break;
          } else if (endPositionResult.index === slopPos) {
            // a natural break position exactly at the hard break position
            position = defaultPos;
            break; // seek no more
          } else {
            // a natural break position after the hard break position
            position = defaultPos + (endPositionResult.index - slopPos);
            break; // seek no more
          }
        }
      }
      // eslint-disable-next-line no-plusplus
      if (text.charAt(position - 1).match(/\s$/)) position--;
    }
    return position;
  }

  /* istanbul ignore next */
  clonedOptions = clonedOptions || EMPTY_OBJECT;
  clonedOptions.ellipsis = (undefined !== clonedOptions.ellipsis)
    ? clonedOptions.ellipsis
    : DEFAULT_TRUNCATE_SYMBOL;
  clonedOptions.truncateLastWord = (undefined !== clonedOptions.truncateLastWord)
    ? clonedOptions.truncateLastWord : true;
  clonedOptions.slop = (undefined !== clonedOptions.slop) ? clonedOptions.slop : DEFAULT_SLOP;

  while (matches) {
    matches = HTML_TAG_REGEX.exec(string);

    if (!matches) {
      if (total >= maxLength) { break; }

      matches = URL_REGEX.exec(string);
      if (!matches || matches.index >= maxLength) {
        content += string.substring(0, getEndPosition(string));
        break;
      }

      while (matches) {
        const [firstMatch] = matches;
        result = firstMatch;
        index = matches.index;
        content += string.substring(0, (index + result.length) - total);
        string = string.substring(index + result.length);
        matches = URL_REGEX.exec(string);
      }
      break;
    }

    const [firstMarch] = matches;
    result = firstMarch;
    index = matches.index;

    if (total + index > maxLength) {
      // exceed given `maxLength`, dump everything to clear stack
      content += string.substring(0, getEndPosition(string, index));
      break;
    } else {
      total += index;
      content += string.substring(0, index);
    }

    if (result[1] === '/') {
      // move out open tag
      items.pop();
      selfClose = null;
    } else {
      selfClose = SELF_CLOSE_REGEX.exec(result);
      if (!selfClose) {
        tag = getTag(result);

        items.push(tag);
      }
    }

    if (selfClose) {
      content += selfClose[0];
    } else {
      content += result;
    }
    string = string.substring(index + result.length);
  }

  if (string.length > maxLength - total && clonedOptions.ellipsis) {
    content += clonedOptions.ellipsis;
  }
  content += dumpCloseTag(items);

  if (!clonedOptions.keepImageTag) {
    content = removeImageTag(content);
  }

  return content;
}

/**
 * truncates an html element by text length
 * compatible with SSR
 * @param {string} node HTML string element to strip
 * @param {number} length max text length
 * @param {Object} options passed to the truncate lib
 * @returns {string}
 */
export default function stripHtmlSSR(node, length = 100, options = { ellipsis: '' }) {
  return truncate(node, length, options);
}
