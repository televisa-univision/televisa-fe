/**
 * @module helpers/object/cleanObject
 */
import isValidObject from '../common/isValidObject';
import isValidArray from '../common/isValidArray';

/**
 * Helper to remove particular keys from objects
 * @param {(Object[]|Object)} contents - object or Array with the content
 * @param {string[]} removeKeys - keys to remove
 * @returns {(Object[]|Object)}
 */
export default function cleanObject(contents, removeKeys) {
  if (!isValidArray(removeKeys)) {
    return contents;
  }

  const self = {
    remove: (obj) => {
      if (!isValidObject(obj)) {
        return obj;
      }
      const newContent = {};
      const keys = Object.keys(obj);
      for (let i = 0, len = keys.length; i < len; i += 1) {
        const key = keys[i];
        if (!removeKeys.includes(key)) {
          newContent[key] = obj[key];
        }
      }
      return newContent;
    },
  };

  if (isValidArray(contents)) {
    return contents.map((obj) => {
      return self.remove(obj);
    });
  }
  return self.remove(contents);
}
