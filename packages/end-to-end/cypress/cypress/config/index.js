module.exports = Object.freeze({
  DESKTOP: 'desktop',
  DESKTOP_AGENT: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36',
  DESKTOP_SIZE: {
    viewportWidth: 1280,
    viewportHeight: 900,
  },
  DESKTOP_TEST_FILE: '**/*.e2e.+(desktop.*|js)',
  MOBILE: 'mobile',
  MOBILE_ANDROID_AGENT: 'Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Mobile Safari/537.3',
  MOBILE_SIZE: {
    viewportWidth: 414,
    viewportHeight: 731,
  },
  MOBILE_TEST_FILE: '**/*.e2e.+(mobile.*|js)',
});
