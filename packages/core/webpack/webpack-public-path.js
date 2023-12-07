if (process.env.NODE_ENV === 'production') {
  /**
   * Default assets path for production node envs
   * @type {string}
   */
  const assetsPathFragment = '/assets/';
  let cdnUrl = process.env.CDN_URL_OVERRIDE || process.env.CDN_URL;

  /**
   * Concat the cdnUrl to the asset path for prod environments
   */
  if (typeof cdnUrl !== 'undefined') {
    __webpack_public_path__ = `${cdnUrl}${assetsPathFragment}`;
  } else {
    __webpack_public_path__ = assetsPathFragment;
  }
}
