const leagueUrl = '/deportes/futbol/liga-mx';

const teamSelectors = {
  navigation: '[data-element-name="BrandedSubNav"] .row > nav',
  GlobalNav: '[data-element-name="GlobalNav"]',
  BrandedSubNav: '[data-element-name="BrandedSubNav"]',
  Widgets: 'div[data-position="3"]',
  DeportesGridSoccerMatchesResultsandCalendar: '[data-widget-type="DeportesGridSoccerMatchesResultsandCalendar"]',
  DeportesGridSoccerStandings: '[data-widget-type="DeportesGridSoccerStandings"]',
  DeportesGridSoccerTeamsCrests: '[data-widget-type="DeportesGridSoccerTeamsCrests"]',
  DeportesGridExternalScript: '[data-widget-type="DeportesGridExternalScript"]',
};

/**
 * tracking info
 * @param {Object} adTag - ad tag
 * @param {Object} pageTracking - page to track
 * @returns {Object}
 */
const getTrackingInfo = ({ adTag, pageTracking }) => ({
  dataLayer: {
    adtag_value: `section_deportes/futbol${adTag}`,
    permalink: `https://uat.tudn.com${pageTracking}`,
    content_type: 'league',
  },
});

module.exports = baseUrl => (
  {
    inicio: {
      uri: leagueUrl,
      ads: '.uvs-ad-ready',
      tracking: getTrackingInfo({
        baseUrl,
        pageTracking: '/futbol/liga-mx',
        adTag: '/ligamx/inicio',
      }),
      selectors: [
        teamSelectors.GlobalNav,
        teamSelectors.Widgets,
      ],
      navigation: teamSelectors.navigation,
    },
    resultados: {
      uri: `${leagueUrl}/resultados`,
      ads: '.uvs-ad-ready',
      tracking: getTrackingInfo({
        baseUrl,
        pageTracking: '/futbol/liga-mx',
        adTag: '/ligamx/resultados',
      }),
      selectors: [
        teamSelectors.GlobalNav,
        teamSelectors.BrandedSubNav,
        teamSelectors.Widgets,
        teamSelectors.DeportesGridSoccerMatchesResultsandCalendar,
      ],
      navigation: teamSelectors.navigation,
    },
    posiciones: {
      uri: `${leagueUrl}/posiciones`,
      ads: '.uvs-ad-ready',
      tracking: getTrackingInfo({
        baseUrl,
        pageTracking: '/futbol/liga-mx',
        adTag: '/ligamx/posiciones',
      }),
      selectors: [
        teamSelectors.GlobalNav,
        teamSelectors.BrandedSubNav,
        teamSelectors.Widgets,
        teamSelectors.DeportesGridSoccerStandings,
      ],
      navigation: teamSelectors.navigation,
    },
    equipos: {
      uri: `${leagueUrl}/equipos`,
      ads: '.uvs-ad-ready',
      tracking: getTrackingInfo({
        baseUrl,
        pageTracking: '/futbol/liga-mx',
        adTag: '/ligamx/equipos',
      }),
      selectors: [
        teamSelectors.GlobalNav,
        teamSelectors.BrandedSubNav,
        teamSelectors.Widgets,
        teamSelectors.DeportesGridSoccerTeamsCrests,
      ],
      navigation: teamSelectors.navigation,
    },
    estadisticas: {
      uri: `${leagueUrl}/estadisticas`,
      ads: '.uvs-ad-ready',
      tracking: getTrackingInfo({
        baseUrl,
        pageTracking: '/futbol/liga-mx',
        adTag: '/ligamx/estadisticas',
      }),
      selectors: [
        teamSelectors.GlobalNav,
        teamSelectors.BrandedSubNav,
        teamSelectors.Widgets,
        teamSelectors.DeportesGridExternalScript,
      ],
      navigation: teamSelectors.navigation,
    },
    descenso: {
      uri: `${leagueUrl}/descenso`,
      ads: '.uvs-ad-ready',
      tracking: getTrackingInfo({
        baseUrl,
        pageTracking: '/futbol/liga-mx',
        adTag: '/ligamx/descenso',
      }),
      selectors: [
        teamSelectors.GlobalNav,
        teamSelectors.BrandedSubNav,
        teamSelectors.Widgets,
        teamSelectors.DeportesGridSoccerStandings,
      ],
      navigation: teamSelectors.navigation,
    },
  }
);
