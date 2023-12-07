import { hasKey, isValidArray } from '@univision/fe-commons/dist/utils/helpers';

/**
 * Returns true if the article chunk represents a RawHtml.
 * @param {Object} chunk Article chunk
 * @returns {*|boolean}
 */
export function isRawHtml(chunk) {
  return hasKey(chunk, 'objectData.type') && chunk.objectData.type === 'rawhtml';
}

/**
   * Merges contiguous RawHtml to render a single iframe.
   * @param {Array} bodyArray Article chunks
   * @returns {Array}
   */
export function mergeRawHtmls(bodyArray) {
  let articleChunks = [];
  if (isValidArray(bodyArray)) {
    let nextChunk;
    articleChunks = bodyArray.slice(0, bodyArray.length);
    articleChunks.forEach((currentChunk, index) => {
      nextChunk = bodyArray[index + 1];
      if (isRawHtml(currentChunk) && isRawHtml(nextChunk)) {
        articleChunks[index].skip = true;
        nextChunk.objectData.html = `${currentChunk.objectData.html} ${nextChunk.objectData.html}`;
      }
    });
  }
  return articleChunks;
}

/**
 * Returns true if the article chunk represents a list item enhancement.
 * @param {Object} chunk Article chunk
 * @returns {boolean}
 */
export function isListItemEnhancement(chunk) {
  return hasKey(chunk, 'objectData.type') && chunk.objectData.type === 'listitem';
}
