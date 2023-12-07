const leagueUrl = '/deportes/futbol/bundesliga';

const teamSelectors = {
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
        pageTracking: '/futbol/bundesliga',
        adTag: '/bundesliga/inicio',
      }),
      selectors: [
        teamSelectors.GlobalNav,
        teamSelectors.SectionTitle,
        teamSelectors.Widgets,
      ],
    },
    resultados: {
      uri: `${leagueUrl}/resultados`,
      ads: '.uvs-ad-ready',
      tracking: getTrackingInfo({
        baseUrl,
        pageTracking: '/futbol/bundesliga',
        adTag: '/bundesliga/resultados',
      }),
      selectors: [
        teamSelectors.GlobalNav,
        teamSelectors.SectionTitle,
        teamSelectors.Widgets,
        teamSelectors.DeportesGridSoccerMatchesResultsandCalendar,
      ],
    },
    posiciones: {
      uri: `${leagueUrl}/posiciones`,
      ads: '.uvs-ad-ready',
      tracking: getTrackingInfo({
        baseUrl,
        pageTracking: '/futbol/bundesliga',
        adTag: '/bundesliga/posiciones',
      }),
      selectors: [
        teamSelectors.GlobalNav,
        teamSelectors.SectionTitle,
        teamSelectors.Widgets,
        teamSelectors.DeportesGridSoccerStandings,
      ],
    },
  }
);
