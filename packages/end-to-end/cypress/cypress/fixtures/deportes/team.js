const teamName = 'necaxa';
const teamUrl = `/deportes/futbol/${teamName}`;

const teamSelectors = {
  SubNav: '[data-element-name="Subnav"] nav a:nth-child(4)',
  DeportesGridSoccerMatchesResultsandCalendar: '[data-widget-type="DeportesGridSoccerMatchesResultsandCalendar"] > div > div > div',
  DeportesGridStats: '[data-widget-type="DeportesGridExternalScript"][data-position="1"]',
  DeportesGridRanking: '[data-widget-type="DeportesGridExternalScript"][data-position="4"]',
  DeportesGridTeamSquad: '[data-widget-type="DeportesSoccerTeamSquad"] > div > div > div',
  Widgets: 'div[data-position="3"]',
};

/**
 * tracking info
 * @returns {Object}
 */
const getTrackingInfo = () => ({
  dataLayer: {
    adtag_value: 'section_deportes/futbol',
    permalink: `https://uat.tudn.com/futbol/${teamName}`,
    content_type: 'soccerteam',
  },
});

module.exports = baseUrl => (
  {
    inicio: {
      uri: teamUrl,
      ads: {
        desktop: {
          top: 'client=desktop&pos=TOP',
          mid: 'client=desktop&pos=MID',
        },
        mobile: {
          top: 'client=mobile&pos=TOP',
          mid: 'client=mobile&pos=MID',
        },
      },
      tracking: getTrackingInfo(baseUrl),
      selectors: [
        teamSelectors.SubNav,
        teamSelectors.Widgets,
      ],
    },
    resultados: {
      uri: `${teamUrl}/resultados`,
      ads: {
        desktop: {
          top: 'client=desktop&pos=TOP',
          mid: 'client=desktop&pos=MID',
        },
        mobile: {
          top: 'client=mobile&pos=TOP',
          mid: 'client=mobile&pos=MID',
        },
      },
      tracking: getTrackingInfo(baseUrl),
      selectors: [
        teamSelectors.DeportesGridSoccerMatchesResultsandCalendar,
        teamSelectors.Widgets,
      ],
    },
    plantel: {
      uri: `${teamUrl}/plantel`,
      ads: {
        desktop: {
          mid1: 'client=desktop&pos=MID&seq=D-F300-1',
          top: 'client=desktop&pos=TOP&seq=D-F728-2',
          mid2: 'client=desktop&pos=MID&seq=D-F300-3',
        },
        mobile: {
          top: 'client=mobile&pos=TOP&seq=M-320-1',
          top1: 'client=mobile&pos=TOP&seq=M-320-2',
          mid: 'client=mobile&pos=MID&seq=M-320-3',
          bottom: 'client=mobile&pos=BOT',
        },
      },
      tracking: getTrackingInfo(baseUrl),
      selectors: [
        teamSelectors.DeportesGridTeamSquad,
        teamSelectors.Widgets,
      ],
    },
    estadisticas: {
      uri: `${teamUrl}/estadisticas`,
      ads: {
        desktop: {
          top: 'client=desktop&pos=TOP&seq=D-F728-2',
          mid1: 'client=desktop&pos=MID&seq=D-F300-1',
          mid2: 'client=desktop&pos=MID&seq=D-F300-3',
          mid3: 'client=desktop&pos=MID&seq=D-F300-4',
        },
        mobile: {
          top: 'client=mobile&pos=TOP&seq=M-320-1',
          mid1: 'client=mobile&pos=TOP&seq=M-320-2',
          mid2: 'client=mobile&pos=TOP&seq=M-320-3',
          mid3: 'client=mobile&pos=MID&seq=M-320-4',
        },
      },
      tracking: getTrackingInfo(baseUrl),
      selectors: [
        teamSelectors.DeportesGridStats,
        teamSelectors.DeportesGridRanking,
        teamSelectors.Widgets,
      ],
    },
  }
);
