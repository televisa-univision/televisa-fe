/**
 * Loads perfume.js package
 * @constructor
 */
export default function load() {
  return new Promise((resolve, reject) => {
    if (window.PERFUME) {
      return reject(new Error('Perfume.js is already initialized!'));
    }
    return import(/* webpackChunkName: "perfume.js" */ 'perfume.js').then((perfume) => {
      window.PERFUME = true;
      resolve(perfume.default);
    });
  });
}
