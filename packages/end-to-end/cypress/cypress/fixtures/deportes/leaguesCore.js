const leagueUrl = '/deportes/futbol/chile-primera';

const teamSelectors = {
  navigation: '[data-element-name="Subnav"] nav > div',
  GlobalNav: '[data-element-name="GlobalNav"]',
  SectionTitle: '[data-element-name="SectionTitle"]',
  Widgets: 'div[data-position="3"]',
  DeportesGridSoccerMatchesResultsandCalendar: '[data-widget-type="DeportesGridSoccerMatchesResultsandCalendar"]',
  DeportesGridSoccerStandings: '[data-widget-type="DeportesGridSoccerStandings"]',
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
        pageTracking: '/futbol/chile-primera',
        adTag: '/chileprimera/inicio',
      }),
      selectors: [
        teamSelectors.GlobalNav,
        teamSelectors.SectionTitle,
        teamSelectors.Widgets,
      ],
      navigation: teamSelectors.navigation,
    },
    resultados: {
      uri: `${leagueUrl}/resultados`,
      ads: '.uvs-ad-ready',
      tracking: getTrackingInfo({
        baseUrl,
        pageTracking: '/futbol/chile-primera',
        adTag: '/chileprimera/resultados',
      }),
      selectors: [
        teamSelectors.GlobalNav,
        teamSelectors.SectionTitle,
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
        pageTracking: '/futbol/chile-primera',
        adTag: '/chileprimera/posiciones',
      }),
      selectors: [
        teamSelectors.GlobalNav,
        teamSelectors.SectionTitle,
        teamSelectors.Widgets,
        teamSelectors.DeportesGridSoccerStandings,
      ],
      navigation: teamSelectors.navigation,
    },
  }
);
