/**
 * @module helpers/common/isEqual
 */

/**
 * Performs comparison between two values to determine if they are
 * equivalent, if 'partial' is true performs compare no deep in objects/arrays.
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} shallow If true make a non-deep comparison in objects/arrays.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
export default function isEqual(value, other, shallow = false) {
  const dateTag = '[object Date]';
  const errorTag = '[object Error]';
  const self = {
    // For similar behavior of _.eq
    equal: (valA, valB) => {
      if (valA === valB) {
        return true;
      }
      return (
        typeof valA === 'number'
        && Number.isNaN(valA)
        && typeof valB === 'number'
        && Number.isNaN(valB)
      );
    },
    getTag: (valA, valB) => {
      const tagA = Object.prototype.toString.call(valA);
      const tagB = Object.prototype.toString.call(valB);
      if (tagA !== tagB) {
        return false;
      }
      return tagA;
    },
    equalByTag: (valA, valB) => {
      const tag = self.getTag(valA, valB);
      if (!tag) {
        return false;
      }
      switch (tag) {
        case dateTag:
          // Coerce dates to milliseconds.
          // Invalid dates are coerced to `NaN`.
          return self.equal(+valA, +valB);
        case errorTag:
          return valA.name === valB.name && valA.message === valB.message;
        default:
          return true;
      }
    },
  };

  /* eslint-disable no-else-return */
  if (self.equal(value, other)) {
    return true;
  } else if (!self.equalByTag(value, other)) {
    return false;
  } else if (
    value == null
    || other == null
    || typeof value !== 'object'
    || typeof other !== 'object'
  ) {
    return false;
  }

  const keysValue = Object.keys(value);
  const keysOther = Object.keys(other);

  if (keysValue.length !== keysOther.length) {
    return false;
  }

  for (let i = 0; i < keysValue.length; i += 1) {
    if (!Object.prototype.hasOwnProperty.call(other, keysValue[i])) {
      return false;
    }
    const valA = value[keysValue[i]];
    const valB = other[keysValue[i]];

    if (!self.equalByTag(valA, valB)) {
      return false;
    } else if (!shallow && typeof valA === 'object' && typeof valB === 'object') {
      if (!isEqual(valA, valB, shallow)) {
        return false;
      }
    } else if (!self.equal(valA, valB)) {
      return false;
    }
  }
  return true;
}
