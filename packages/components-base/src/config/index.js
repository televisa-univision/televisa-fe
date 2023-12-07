export default {
  host: process.env.HOST || '127.0.0.1',
  port: process.env.PORT || 8080,
  devServerPort: process.env.DEV_SERVER_PORT || 8081,
  api: {
    endpoints: {
      page: '/web-api/content',
      layout: '/web-api/__PLACEHOLDER__',
    },
    // Mapping between the API syndicator and the web domain
    domains: {
      'syndicator.performance.univision.com': 'http://performance.univision.com',
      'syndicator.univision.com': 'http://www.univision.com',
    },
  },
  logFileLocation: process.env.LOGS_LOCATION,
  // Settings to preview content in the CMS.
  cmsPreview: {
    environments: {
      local: 'http://www.local.univision.com',
      development: 'http://debug:Xoong1ee@foundation.dev.y.univision.com',
      qa: 'http://debug:Xoong1ee@qa.x.univision.com',
      performance: 'http://syndicator.performance.univision.com',
      production: 'http://syndicator.univision.com',
    },
  },
  routes: {
    proxy: {
      cached: '/proxy/api/cached',
      uncached: '/proxy/api/uncached',
    },
  },
  twitter: {
    follow: 'https://twitter.com/intent/follow?original_referer=https%3A%2F%2Fdev.twitter.com%2Fweb%2Ffollow-button&ref_src=twsrc%5Etfw',
  },
  defaultTheme: {
    primary: '#3a3a3a',
    secondary: '#000000',
    alphaGradient: 'linear-gradient(to top, rgba(58, 58, 58, 0.95) 0%, rgba(58, 58, 58, 0) 50%)',
    solidGradient: 'linear-gradient(to bottom, #3a3a3a 0%, #000000 100%)',
  },
};
