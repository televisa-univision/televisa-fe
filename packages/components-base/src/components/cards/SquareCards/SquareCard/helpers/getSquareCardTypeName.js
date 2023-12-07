import isValidValue from '@univision/fe-utilities/helpers/common/isValidValue';

const CARD_VALUE = 'Card';

/**
 * Gets a normalized name from a card type to be used
 * for card theme and content options.
 * @param {string} squareCardType - card type to be converted
 * @returns {string}
 */
export default function getSquareCardTypeName({ squareCardType }) {
  if (!isValidValue(squareCardType)) {
    return null;
  }

  return squareCardType.replace(CARD_VALUE, '');
}
