/**
 * @module helpers/content/isWebPSupported
 */
import isClientSide from '../common/isClientSide';

/**
 * Checks if webp is supported in the current client browser
 * @returns {Promise} Returns the promise that checks if webp is supported.
 */
export default async function isWebPSupported() {
  if (!isClientSide()) return Promise.resolve(false);

  return new Promise((resolve) => {
    const image = new Image();
    image.onerror = () => {
      return resolve(false);
    };
    image.onload = () => {
      return resolve(image.width === 1);
    };
    image.src = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=';
  });
}
