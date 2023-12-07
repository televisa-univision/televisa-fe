/**
 * !!!!!!! WARNING !!!!!!!
 * DO NOT PUT ANYTHING IN THIS FILE THAT YOU DO NOT WANT EXPOSED
 * ON THE CLIENT. EG, NO PASSWORDS, API KEYS, OR SECRET SAUCE RECIPES.
 */
export default {
  api: {
    endpoints: {
      ampIframe: 'https://static.univision.com/amp/amp-iframe-html.htm?url=',
      ampIframeRawHtml: 'https://cdn4.uvnimg.com/10/ad/3066c9494574a515a4292ac5a0db/amp-iframe-html.html?url=',
    },
  },
  routes: {
    proxy: {
      cached: '/proxy/api/cached',
      uncached: '/proxy/api/uncached',
    },
  },
  features: {
    section: {
      seoContentItemsCount: 35,
    },
  },
  videoHub: {
    prod: {
      env: 'prod',
      profile: '778f185e-177d-4b8a-82ce-d7d3518120cc',
    },
    test: {
      env: 'qa',
      profile: 'bbe0d1ef-c85d-4c3c-80a0-f10fdacee9f8',
    },
  },
};
