import appConfig from 'app/config';
import { WEATHER_CLIENT_ID } from '@univision/fe-commons/dist/constants/weather';

export default {
  host: process.env.HOST || '127.0.0.1',
  port: process.env.PORT || 8080,
  devServerPort: process.env.DEV_SERVER_PORT || 8081,
  logFileLocation: process.env.LOGS_LOCATION,
  api: {
    endpoints: {
      page: '/web-api/content',
      layout: '/web-api/__PLACEHOLDER__',
      poll: ({
        slideshowId,
        slideId,
        option,
        readOnly,
        webAppPoll,
      }) => `/poll-api/?slideshowId=${slideshowId}&slideId=${slideId}&option=${option}&readOnly=${readOnly}&webAppPoll=${webAppPoll}`,
      weather: {
        current: {
          zipcode: (zipCode, languageCode = 'en-US', countryCode = 'US') => `https://api.weather.com/v1/location/${zipCode}:4:${countryCode}/observations.json?language=${languageCode}&units=e`,
          geocode: (geocode, languageCode = 'en-US') => `https://api.weather.com/v1/geocode/${geocode.split(',').join('/')}/observations.json?language=${languageCode}&units=e&apiKey=${process.env.WEATHER_API_KEY}`,
        },
        hourly: {
          zipcode: (zipCode, hours, languageCode = 'en-US', countryCode = 'US') => `https://api.weather.com/v3/wx/forecast/hourly/${hours}?postalKey=${zipCode}:${countryCode}&units=e&language=${languageCode}&format=json`,
          geocode: (days, geocode, languageCode = 'en-US') => `https://api.weather.com/v3/wx/forecast/hourly/${days}/custom?geocode=${geocode}&format=json&units=e&language=${languageCode}&clientId=${WEATHER_CLIENT_ID}&apiKey=${process.env.WEATHER_API_KEY}`,
        },
        daily: {
          zipcode: (zipCode, days, languageCode = 'en-US', countryCode = 'US') => `https://api.weather.com/v3/wx/forecast/daily/${days}?postalKey=${zipCode}:${countryCode}&units=e&language=${languageCode}&format=json`,
          geocode: (days, languageCode, geocode) => `https://api.weather.com/v3/wx/forecast/daily/${days}/custom?geocode=${geocode}&format=json&units=e&language=${languageCode || 'en-US'}&apiKey=${process.env.WEATHER_API_KEY}&clientId=${WEATHER_CLIENT_ID}`,
        },
        alerts: {
          headline: {
            geocode: (geocode, languageCode = 'en-US') => `https://api.weather.com/v3/alerts/headlines?geocode=${geocode}&language=${languageCode}&format=json`,
            country: (countryCode, languageCode = 'en-US') => `https://api.weather.com/v3/alerts/headlines?countryCode=${countryCode}&language=${languageCode}&format=json`,
          },
          details: (detailsKey, languageCode = 'en-US') => `https://api.weather.com/v3/alerts/detail?alertId=${detailsKey}&language=${languageCode}&format=json`,
        },
        searchLocation: {
          geocode: (geoCode, languageCode = 'en-US') => `https://api.weather.com/v3/location/point?geocode=${geoCode}&language=${languageCode}&format=json`,
          locid: (locId, languageCode = 'en-US') => `https://api.weather.com/v3/location/point?locid=${locId}:1:US&language=${languageCode}&format=json`,
          postalkey: (postalKey, languageCode = 'en-US') => `https://api.weather.com/v3/location/point?postalKey=${postalKey}:US&language=${languageCode}&format=json`,
          cityname: (cityName, languageCode) => `https://api.weather.com/v3/location/search?query=${cityName}&locationType=locale&language=${languageCode}&format=json`,
        },
      },
    },
    // Mapping between the API syndicator and the web domain
    domains: {
      'syndicator.performance.univision.com': 'http://performance.univision.com',
      'syndicator.univision.com': 'https://www.univision.com',
    },
  },
  // Settings to preview content in the CMS.
  cmsPreview: {
    environments: {
      local: 'http://www.local.univision.com',
      development: 'http://debug:eb889b7f1a0195f83c5ac682d7149826@qa3.uvn.psdops.com',
      integration: 'http://debug:eb889b7f1a0195f83c5ac682d7149826@qa3.uvn.psdops.com',
      qa: 'http://debug:eb889b7f1a0195f83c5ac682d7149826@qa3.uvn.psdops.com',
      uat: 'https://debug:Xoong1ee@uat.uvn.psdops.com',
      performance: 'https://cms.performance.uvn.psdops.com',
      production: 'https://debug:eb889b7f1a0195f83c5ac682d7149826@cms.prod.uvn.psdops.com',
    },
  },
  origins: {
    // TODO: looks like we are not using this config on webapp
    'webapp.univision.com': 'https://www.univision.com',
    'prod.webapp.univision.com': 'https://www.univision.com',
    'fe.y.univision.com': 'https://performance.univision.com',
    'dev.webapp.univision.com': 'https://performance.univision.com',
    'uat.webapp.y.univision.com': 'https://www2.univision.com',
    'uat.webapp.univision.com': 'https://www2.univision.com',
  },
  domainAllowed: /((dev|prod)-univision.*|([a-z0-9]+[.])*univision.*|tudn.com|tudn.tv|unicable.tv|bandamax.tv|canal5.com|prende.tv|mulher.com.br|delicioso.com.br|tasaudavel.com.br|zappeando.com.br|lasestrellas.com|elnu9ve.com|televisa.com|distritocomedia.com|losbingers.com|^about:|^null|googleusercontent\.com|google\.com)$/,
  ssoDomainAllowed: /sso(-uat.webapp|-performance.webapp)?\.univision\.com/,
  ignoredRoutes: ['mraid.js', 'amp_preconnect_polyfill', '.css.map', '.js.map'],
  clusterModeEnabled: false,
};

/**
 * Returns the config required for the client side.
 * @returns {{CMS_API_URL: string}}
 */
export function getClientConfig() {
  return {
    deploy: {
      env: process.env.DEPLOY_ENV,
      multiSite: process.env.MULTI_DOMAIN_DISABLED !== 'true',
    },
    dims: {
      baseUrl: process.env.DEPLOY_ENV === 'production' ? 'https://st1.uvnimg.com/dims4/default/' : 'https://uat2.x.univision.com/dims4/default/',
      sharedSecret: process.env.DEPLOY_ENV === 'production' ? 'the2pahSh6ohh7rooGh8looghi7ge7ie' : '2bbd31304d3e4a2a72bd064722797943',
    },
    graphql: process.env.GRAPHQL_API_URL,
    ssoIframeUrl: process.env.SSO_IFRAME_URL,
    syndicator: {
      uri: process.env.CMS_API_URL,
      content: `${process.env.CMS_API_URL}/web-api/content`,
      video: `${process.env.CMS_API_URL}/feed/video-api`,
      search: `${process.env.CMS_API_URL}/web-api/search`,
      widget: `${process.env.CMS_API_URL}/web-api/widget`,
      webAppState: `${appConfig.routes.proxy.cached}/web-app-state`,
      localMarketContent: `${process.env.CMS_API_URL}/web-api/local-market-content`,
    },
    videoHub: {
      env: process.env.VIDEO_HUB_ENV,
      profile: process.env.VIDEO_HUB_PROFILE,
    },
    tracking: {
      spaMonitoring: process.env.SPA_MONITORING_ENABLED === 'true',
    },
  };
}
