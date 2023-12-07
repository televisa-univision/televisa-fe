import React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';
import { createGlobalStyle } from 'styled-components';

import scoreCellsExtractor from '@univision/shared-components/dist/extractors/scoreCellsExtractor';
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import { getDevice } from '@univision/fe-commons/dist/utils/storybook';

import { data } from '../../../utils/mocks/scorecells_v2.json';
import { data as rebrandData } from '../../../utils/mocks/scorecells_v3.json';
import SportApiProvider from '../../utils/SportApiProvider';
import ScoreCellsConnector from './ScoreCellsConnector';
import ScoreCells from '.';

const sponsor = {
  name: 'Walgreens',
  logo: 'http://diylogodesigns.com/blog/wp-content/uploads/2016/04/Coca-Cola-Logo-PNG.png',
  link: '#',
  sponsorBy: 'Presentado por: ',
};

const Store = configureStore();

const widgetContext = {
  isWorldCupMVP: true,
};

storiesOf('Widgets/ScoreCells/Without Sponsor', module)
  .addDecorator((story) => {
    return (
      <div
        style={{
          background: '#FFFFFF',
          height: '100vh',
          width: '100vw',
          position: 'absolute',
        }}
      >
        <div className="uvs-container">{story()}</div>
      </div>
    );
  })
  .add('One Match', () => {
    const props2 = {
      data: data.filter((a, b) => {
        if (b < 1) {
          return a;
        }

        return null;
      }),
      device: getDevice(),
    };
    return <ScoreCells {...props2} />;
  })
  .add('Two Matches', () => {
    const props2 = {
      data: data.filter((a, b) => {
        if (b < 2) {
          return a;
        }

        return null;
      }),
      device: getDevice(),
    };
    return <ScoreCells {...props2} />;
  })
  .add('Three Matches', () => {
    const props2 = {
      data: data.filter((a, b) => {
        if (b < 3) {
          return a;
        }

        return null;
      }),
      device: getDevice(),
    };
    return <ScoreCells {...props2} />;
  })
  .add('Four Matches', () => {
    const props2 = {
      data: data.filter((a, b) => {
        if (b < 4) {
          return a;
        }

        return null;
      }),
      device: getDevice(),
    };
    return <ScoreCells {...props2} />;
  })
  .add('Five Matches', () => {
    const props2 = {
      data: data.filter((a, b) => {
        if (b < 5) {
          if (b > 3) {
            return Object.assign(a, { reminderAction: () => 'hola' });
          }
          return a;
        }

        return null;
      }),
      device: getDevice(),
    };
    return <ScoreCells {...props2} />;
  })
  .add('Six Matches', () => {
    const props2 = {
      data: data.filter((a, b) => {
        if (b < 6) {
          if (b > 3) {
            return Object.assign(a, { reminderAction: () => 'hola' });
          }
          return a;
        }

        return null;
      }),
      device: getDevice(),
    };
    return <ScoreCells {...props2} />;
  })
  .add('Six Matches with white theming', () => {
    const props2 = {
      data: data.filter((a, b) => {
        if (b < 6) {
          if (b > 3) {
            return Object.assign(a, { reminderAction: () => 'hola' });
          }
          return a;
        }

        return null;
      }),
      isHomePage: true,
      device: getDevice(),
    };
    return <ScoreCells {...props2} />;
  })
  .add('Width SportApiProvider', () => {
    let startDate = new Date();
    let endDate = new Date();

    startDate = startDate.setHours(0, 0, 0, 0) && startDate.toISOString();
    endDate = endDate.setHours(23, 59, 59, 999) && endDate.toISOString();
    return (
      <SportApiProvider
        path={`/v1/schedule-results/soccer?startDate=${startDate}&endDate=${endDate}&sort=start-date-time-asc`}
        refreshRate={60}
        render={(dataProvided) => {
          return <ScoreCells data={scoreCellsExtractor(dataProvided)} device="desktop" />;
        }}
      />
    );
  });

storiesOf('Widgets/ScoreCells/With Sponsor', module)
  .addDecorator((story) => {
    return (
      <div
        style={{
          background: '#FFFFFF',
          height: '100vh',
          width: '100vw',
          position: 'absolute',
        }}
      >
        <div className="uvs-container">{story()}</div>
      </div>
    );
  })
  .add('One Match', () => {
    const props2 = {
      data: data.filter((a, b) => {
        if (b < 1) {
          return a;
        }

        return null;
      }),
      device: getDevice(),
    };
    return <ScoreCells {...props2} sponsor={sponsor} />;
  })
  .add('Two Matches', () => {
    const props2 = {
      data: data.filter((a, b) => {
        if (b < 2) {
          return a;
        }

        return null;
      }),
      device: getDevice(),
    };
    return <ScoreCells {...props2} sponsor={sponsor} />;
  })
  .add('Three Matches', () => {
    const props2 = {
      data: data.filter((a, b) => {
        if (b < 3) {
          return a;
        }

        return null;
      }),
      device: getDevice(),
    };
    return <ScoreCells {...props2} sponsor={sponsor} />;
  })
  .add('Four Matches', () => {
    const props2 = {
      data: data.filter((a, b) => {
        if (b < 4) {
          return a;
        }

        return null;
      }),
      device: getDevice(),
    };
    return <ScoreCells {...props2} sponsor={sponsor} />;
  })
  .add('Five Matches', () => {
    const props2 = {
      data: data.filter((a, b) => {
        if (b < 5) {
          if (b > 3) {
            return Object.assign(a, { reminderAction: () => 'hola' });
          }
          return a;
        }

        return null;
      }),
      device: getDevice(),
    };
    return <ScoreCells {...props2} sponsor={sponsor} />;
  })
  .add('Six Matches', () => {
    const props2 = {
      data: data.filter((a, b) => {
        if (b < 6) {
          if (b > 3) {
            return Object.assign(a, { reminderAction: () => 'hola' });
          }
          return a;
        }

        return null;
      }),
      device: getDevice(),
    };
    return <ScoreCells {...props2} sponsor={sponsor} />;
  })
  .add('Width SportApiProvider', () => {
    let startDate = new Date();
    let endDate = new Date();

    startDate = startDate.setHours(0, 0, 0, 0) && startDate.toISOString();
    endDate = endDate.setHours(23, 59, 59, 999) && endDate.toISOString();
    return (
      <SportApiProvider
        path={`/v1/schedule-results/soccer?startDate=${startDate}&endDate=${endDate}&sort=start-date-time-asc`}
        refreshRate={60}
        render={(dataProvided) => {
          return (
            <ScoreCells
              data={scoreCellsExtractor(dataProvided)}
              sponsor={sponsor}
              device={getDevice()}
            />
          );
        }}
      />
    );
  });

storiesOf('Widgets/ScoreCells/With ScoreCells connector', module)
  .add('default', () => {
    const settings = {
      uid: '666',
      type: 'DeportesCardSoccerMatchScorecells',
      profile: 'uefa',
    };
    Store.dispatch(setPageData({
      data: {
        widgets: [{
          extraData: {
            data: '',
          },
          settings: {
            uid: '333',
            type: 'DeportesCardSoccerMatchScorecells',
          },
          type: 'DeportesCardSoccerMatchScorecells',
        }],
      },
      device: global.innerWidth > 768 ? 'desktop' : 'mobile',
    }));

    const props = {
      settings,
      device: getDevice(),
    };

    return (
      <Provider store={Store} key="scoreCell-connector">
        <ScoreCellsConnector {...props} />
      </Provider>
    );
  });
storiesOf('Widgets/ScoreCells/With profile enabled', module)
  .add('uefa profile', () => {
    return <ScoreCells data={data} profile="uefa" device="desktop" />;
  });

storiesOf('Widgets/ScoreCells/With sorting highlighted Competitions', module)
  .addDecorator((story) => {
    Store.dispatch(setPageData({ device: getDevice() }));
    return (
      <div
        style={{
          background: '#FFFFFF',
          height: '100vh',
          width: '100vw',
          position: 'absolute',
        }}
      >
        <div className="uvs-container">{story()}</div>
      </div>
    );
  })
  .add('Sorting Six Matches', () => {
    const props2 = {
      data: data.filter((a, b) => {
        if (b < 6) {
          if (b > 3) {
            return Object.assign(a, { reminderAction: () => 'hola' });
          }
          return a;
        }

        return null;
      }),
      settings: {
        highlightedCompetitionSeasons: [
          {
            seasonId: '2018',
            soccerCompetition: {
              name: 'World Cup',
              id: '98',
            },
          },
        ],
      },
      device: 'desktop',
    };
    return (
      <ScoreCells {...props2} />
    );
  })
  .add('No Sorting Six Matches', () => {
    const props2 = {
      data: data.filter((a, b) => {
        if (b < 6) {
          if (b > 3) {
            return Object.assign(a, { reminderAction: () => 'hola' });
          }
          return a;
        }

        return null;
      }),
      device: 'desktop',
    };
    return <ScoreCells {...props2} />;
  });

const RebrandStyle = createGlobalStyle`
  body {
    font-family: 'Roboto Flex', sans-serif;
    letter-spacing: 0.5%;
    line-height: 120%;
    font-size: rem(16) ;
  }

  .uvs-font-a-regular,
  .uvs-font-b-regular,
  .uvs-font-c-regular {
    font-family: 'Roboto Flex', sans-serif;
    font-weight: 400;
  }

  .uvs-font-a-bold,
  .uvs-font-b-bold,
  .uvs-font-c-bold {
    font-family: 'Roboto Flex', sans-serif;
    font-weight: 700;
  }
`;

storiesOf('Widgets/ScoreCells/Rebrand 2022', module)
  .addDecorator((story) => {
    return (
      <div
        style={{
          background: '#FFFFFF',
          height: '100vh',
          width: '100vw',
          position: 'absolute',
        }}
      >
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,400;8..144,700&display=swap" rel="stylesheet" />
        <RebrandStyle />
        <div className="uvs-container">{story()}</div>
      </div>
    );
  })
  .add('Default', () => {
    const props2 = {
      data: rebrandData,
      device: getDevice(),
      widgetContext,
    };
    return <ScoreCells {...props2} />;
  })
  .add('/w Caliente CTA', () => {
    const calienteData = rebrandData.map(item => ({
      ...item,
      calienteMetadata: {
        odds: ['+210', '+220', '+150'],
        eventUrl: 'https://online.caliente.mx/page?member=televisadep&campaign=DEFAULT&channel=DEFAULT&zone=54300998&lp=57943263&ev_id=16676875',
        isBetOpen: true,
      },
    }));
    const props2 = {
      data: calienteData,
      device: getDevice(),
      widgetContext,
      userLocation: 'MX',
    };
    return <ScoreCells {...props2} />;
  });
