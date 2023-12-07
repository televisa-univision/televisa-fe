import Store from '../../../../store/store';
import setPageData from '../../../../store/actions/page-actions';
import * as subNavTypes from '../../../../constants/subNavTypes';
import * as helpers from '../../../helpers';
import * as headerHelpers from '../../helpers';

import shows from '.';
import conecta from './conecta';
import elDragon from './elDragon';
import miraQuienBaila from './miraQuienBaila';
import latinGrammyCelebraEllas from './latinGrammyCelebraEllas';
import premiosJuventud from './premiosJuventud';
import nuestraBellezaLatina from './nuestraBellezaLatina';
import latinGrammy from './latinGrammy';
import premioLoNuestro from './premioLoNuestro';
import latinAmericanMusicAwards from './latinAmericanMusicAwards';

import showsMockData from './__mocks__/shows.data.json';
import novelasMockData from './__mocks__/novelas.data.json';

describe('shows data object', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return default data', () => {
    const data = shows();
    expect(data.title).toBeDefined();
    expect(data.links).toBeDefined();
    expect(data.links).toEqual(expect.any(Array));
    expect(data.brandableType).toBeUndefined();
  });

  it('should show title `TV Shows` when on Shows home', () => {
    const data = shows(showsMockData);
    expect(data.title.name).toBe('TV Shows');
  });

  it('should show title `TV Shows` when not on Shows home', () => {
    const data = shows(novelasMockData);
    expect(data.title.name).toBe('TV Shows');
  });

  it('should match the correct home for this section (`/shows`)', () => {
    Store.dispatch(setPageData({ data: showsMockData }));

    const data = shows(showsMockData);

    expect(data.title.link).toMatch(/\/shows$/);
  });

  it('should set subNavType to empty if on branded show page', () => {
    helpers.hasKey = jest.fn().mockImplementationOnce(() => true);
    const data = shows(showsMockData);

    expect(data.subNavType).toMatch(subNavTypes.EMPTY_SUBNAV);
  });

  it('should set the brandable data when brandable is show', () => {
    jest.spyOn(headerHelpers, 'getBrandable').mockImplementation(() => ({
      type: 'show',
      title: 'Title',
      uri: '/shows/test',
    }));

    const data = shows(showsMockData);

    expect(data.title).toBeDefined();
    expect(data.title.name).toBe('Title');
    expect(data.title.link).toBe('/shows/test');
    expect(data.brandableType).toBe('show');
  });
});

describe('Conecta data object', () => {
  it('should return default data', () => {
    const data = conecta();
    expect(data.title).toBeDefined();
    expect(data.title.name).toBe('');
    expect(data.title.link).toBe('/conecta');
    expect(data.links).toEqual(expect.any(Array));
  });
});

describe('EL Dragon data object', () => {
  it('should return default data', () => {
    const data = elDragon();
    expect(data.title).toBeDefined();
    expect(data.title.name).toBeNull();
    expect(data.title.logo).toEqual(expect.any(String));
    expect(data.subNavType).toEqual(subNavTypes.SECTION_SUBNAV);
  });
});

describe('Mira quien bail data object', () => {
  it('should return default data for mira quien habla', () => {
    const data = miraQuienBaila();
    expect(data.title).toBeDefined();
    expect(data.title.name).toBeNull();
    expect(data.title.logo).toEqual(expect.any(String));
    expect(data.subNavType).toEqual(subNavTypes.SECTION_SUBNAV);
  });
});

describe('Latin Grammy Celebra Ellas data object', () => {
  it('should return default data for latin grammy celebra ellas', () => {
    const data = latinGrammyCelebraEllas();
    expect(data.title).toBeDefined();
    expect(data.title.name).toBeNull();
    expect(data.title.logo).toEqual(expect.any(String));
    expect(data.subNavType).toEqual(subNavTypes.SECTION_SUBNAV);
  });
});

describe('Premios Juventud data object', () => {
  it('should return default data for premios juventud', () => {
    const data = premiosJuventud();
    expect(data.title).toBeDefined();
    expect(data.title.name).toBeNull();
    expect(data.title.logo).toEqual(expect.any(String));
    expect(data.subNavType).toEqual(subNavTypes.SECTION_SUBNAV);
  });
});

describe('Nuestra Belleza Latina data object', () => {
  it('should return default data for Nuestra Belleza Latina', () => {
    const data = nuestraBellezaLatina();
    expect(data.title).toBeDefined();
    expect(data.title.name).toBeNull();
    expect(data.title.logo).toEqual(expect.any(String));
    expect(data.subNavType).toEqual(subNavTypes.SECTION_SUBNAV);
  });
});

describe('Latin Grammy data object', () => {
  it('should return default data for Latin Grammy', () => {
    const data = latinGrammy();
    expect(data.title).toBeDefined();
    expect(data.title.name).toBeNull();
    expect(data.title.logo).toEqual(expect.any(String));
    expect(data.subNavType).toEqual(subNavTypes.SECTION_SUBNAV);
  });
});

describe('Premio lo nuestro data object', () => {
  it('should return default data for Premio lo nuestro', () => {
    const data = premioLoNuestro();
    expect(data.title).toBeDefined();
    expect(data.title.name).toBeNull();
    expect(data.title.logo).toEqual(expect.any(String));
    expect(data.subNavType).toEqual(subNavTypes.SECTION_SUBNAV);
  });
});
describe('Latin American Music Awards data object', () => {
  it('should return default data for Latin American Music Awards', () => {
    const data = latinAmericanMusicAwards();
    expect(data.title).toBeDefined();
    expect(data.title.name).toBeNull();
    expect(data.title.logo).toEqual(expect.any(String));
    expect(data.subNavType).toEqual(subNavTypes.SECTION_SUBNAV);
  });
});
