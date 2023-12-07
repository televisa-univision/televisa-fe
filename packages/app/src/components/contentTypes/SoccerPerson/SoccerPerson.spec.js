import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import preloadAll from 'jest-next-dynamic';
import { Provider } from 'react-redux';

import features from '@univision/fe-commons/dist/config/features';
import { SOCCER_PERSON } from '@univision/fe-commons/dist/constants/contentTypes.json';
import configureStore from '@univision/fe-commons/dist/store/configureStore';

import Section from '../Section';
import SoccerPersonMicrodata from './SoccerPersonMicrodata';
import SoccerPerson, { extendWidgets } from '.';

const playerProfileMock = {
  age: 28,
  dateOfBirth: '1992-09-10',
  name: 'Matt Bersano',
  height: 185,
  id: '173614',
  nationality: 'USA',
  positionRegular: 'goalkeeper',
  team: {
    id: '1131',
    name: 'SJ Earthquakes',
    abbreviation: 'SJ',
    logo: 'https://uvn-brightspot.s3.amazonaws.com/e2/58/64dd8fdf48a19edb8803899ce44f/san-jose-earthquakes-2014-2x.png',
    url: 'https://uat.tudn.com/futbol/mls/sj-earthquakes',
  },
  uniformNumber: 12,
  weight: 84,
};
const pageData = {
  data: {
    description: 'Leo Messi',
    type: SOCCER_PERSON,
    fullBio: [
      {
        type: 'text',
        value:
              '<p>Lionel Andrés Messi Cuccittini, conocido como Leo Messi, ​ es un futbolista argentino que juega como delantero o centrocampista.​​ Ha desarrollado toda su carrera en el F. C. Barcelona de la Primera División de España y en la selección de Argentina, equipos de los que es capitán.​​</p>',
      },
    ],
    teamSeason: {
      teamName: 'America',
      teamLogo: {},
      teamId: 2345,
      soccerCompetitionSeason: {
        seasonId: '2021',
      },
    },
  },
};
const store = configureStore({
  sports: {
    playerProfile: playerProfileMock,
  },
});

/** @test {SoccerPerson} */
describe('SoccerPerson content type', () => {
  beforeAll(async () => {
    await preloadAll();
    features.content.hasTagPages = jest.fn(() => false);
  });

  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <SoccerPerson pageData={{}} />
      </Provider>,
      div,
    );
  });

  it('should render section component', () => {
    const wrapper = mount(
      <Provider store={store}>
        <SoccerPerson pageData={pageData} />
      </Provider>,
    );
    expect(wrapper.find(Section)).toHaveLength(1);
  });

  it('should render soccer person metadata', () => {
    const wrapper = mount(
      <Provider store={store}>
        <SoccerPerson pageData={pageData} />
      </Provider>,
    );
    expect(wrapper.find(SoccerPersonMicrodata)).toHaveLength(1);
    expect(wrapper.find(SoccerPersonMicrodata).props()).toHaveProperty('profile', playerProfileMock);
  });
});

describe('extendWidgets', () => {
  it('should return HeaderHub with horizontal soccer person stats', () => {
    const data = {
      data: {
        ...pageData.data,
        parent: {
          uuid: '123',
        },
        role: 'test',
        fullBio: [],
      },
    };
    const HeaderHub = extendWidgets(playerProfileMock)(data, [])[0];
    const wrapper = shallow(<div>{HeaderHub}</div>);
    expect(wrapper.find(HeaderHub)).toBeDefined();
    expect(wrapper.find('SoccerPersonStats').first().props()).toEqual(expect.objectContaining({
      layout: 'horizontal',
      ...playerProfileMock,
    }));
  });

  it('should return same array if data is null', () => {
    const SoccerPersonWidgets = extendWidgets(undefined)(undefined, []);
    expect(SoccerPersonWidgets).toEqual(expect.any(Array));
  });

  it('should return HeaderHub with null person avatar if it has valid image', () => {
    const data = {
      data: {
        ...pageData.data,
        image: {
          title: 'image',
          renditions: {
            oridinal: 'image.png',
          },
        },
        parent: {
          uuid: '123',
        },
        role: 'test',
        fullBio: [],
      },
    };
    const HeaderHub = extendWidgets(playerProfileMock)(data, [])[0];
    const wrapper = shallow(<div>{HeaderHub}</div>);
    expect(wrapper.find('HeaderHub').props().personAvatar).toBe(null);
  });
});
