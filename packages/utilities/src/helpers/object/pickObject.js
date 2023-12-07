/**
 * @module helpers/object/pickObject
 */
import isValidObject from '../common/isValidObject';
import isValidArray from '../common/isValidArray';

/**
 * Helper to keep particular keys from objects
 * @param {(Object[]|Object)} contents - object or Array with the content
 * @param {string[]} keepKeys - keys to keep all the rest will be ignored
 * @returns {(Object[]|Object)}
 */
export default function pickObject(contents, keepKeys) {
  if (!isValidArray(keepKeys)) {
    return contents;
  }

  const self = {
    pick: (obj) => {
      if (!isValidObject(obj)) {
        return obj;
      }
      const newContent = {};
      const keys = Object.keys(obj);
      for (let i = 0, len = keys.length; i < len; i += 1) {
        const key = keys[i];
        const value = obj[key];

        if (keepKeys.includes(key)) {
          newContent[key] = value;
        } else if (isValidObject(value) || isValidArray(value)) {
          newContent[key] = pickObject(value, keepKeys);
        }
      }
      return newContent;
    },
  };

  if (isValidArray(contents)) {
    return contents.map((obj) => {
      return self.pick(obj);
    });
  }
  return self.pick(contents);
}
