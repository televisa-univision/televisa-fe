import { WHITE, BLACK } from '@univision/fe-commons/dist/utils/styled/constants';

/**
 * Return fill color for title and arrow
 * @param {string} name - title name
 * @returns {string}
 */
const getFillColor = (name) => {
  return (name === 'Impacto Social' || name === 'Primarias') ? BLACK : WHITE;
};

export default getFillColor;
