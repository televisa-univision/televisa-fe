import getLeagueLinks from '../links/league';
import mlsLinks from '../links/mls';
import tudnCoverage from '../../../../../constants/tudnCoverage';

import leagues from '.';
import ligaMx from './ligaMx';
import mls from './mls';
import uefa from './uefa';
import uefaEuropa from './uefaEuropa';
import uefaNations from './uefaNations';
import euro from './euro';
import ligaExpansion from './ligaExpansion';
import copaOro from './copaOro';
import copaAmerica from './copaAmerica';
import qatar2022 from './qatar2022';
import qatarMx2022 from './qatarMx2022';

import mockData from '../__mocks__/data.json';

describe('leagues main data object', () => {
  it('should return default league data', () => {
    const data = leagues();
    expect(data.links).toEqual(getLeagueLinks());
    expect(data.subNavType).toBe('sectionSubNav');
    expect(data.globalNavTop).toBe(true);
    expect(data.brandedNavLogoName).toBe('tudn');
  });

  it('should return ligaMX league data from mapping', () => {
    const data = leagues(mockData.ligaMx);
    expect(data.vertical).toBe('Deportes');
    expect(data.title.name).toBeNull();
    expect(data.title.link).toBe('/futbol/liga-mx');
    expect(data.title.logo).toBeDefined();
    expect(data.links).toEqual(getLeagueLinks(mockData.ligaMx, { overwriteCoverage: 'performancePlus' }));
    expect(data.links).toHaveProperty('4.name', 'Descenso');
  });

  it('should return UEFA Champions league data from mapping', () => {
    const data = leagues(mockData.uefa);
    expect(data.vertical).toBe('Deportes');
    expect(data.title.name).toBeNull();
    expect(data.title.link).toBe('/futbol/uefa-champions-league');
    expect(data.title.logo).toBeDefined();
    expect(data.links).toEqual(getLeagueLinks(mockData.uefa));
  });

  it('should return UEFA Europa league data from mapping', () => {
    const data = leagues(mockData.uefaEuropa);
    expect(data.vertical).toBe('Deportes');
    expect(data.title.name).toBeNull();
    expect(data.title.link).toBe('/futbol/uefa-europa-league');
    expect(data.title.logo).toBeDefined();
    expect(data.links).toEqual(getLeagueLinks(mockData.uefaEuropa));
  });

  it('should return UEFA Nations league data from mapping', () => {
    const data = leagues(mockData.uefaNations);
    expect(data.vertical).toBe('Deportes');
    expect(data.title.name).toBeNull();
    expect(data.title.link).toBe('/futbol/uefa-nations-league');
    expect(data.title.logo).toBeDefined();
    expect(data.links).toEqual(getLeagueLinks(mockData.uefaNations));
  });

  it('should return MLS league data from mapping', () => {
    const data = leagues(mockData.mls);
    const mainLinks = getLeagueLinks(mockData.mls, {
      overwriteCoverage: tudnCoverage.PERFORMANCE,
      overwritePath: '/futbol/mls',
    });
    expect(data.vertical).toBe('Deportes');
    expect(data.title.name).toBeNull();
    expect(data.title.link).toBe('/futbol/mls');
    expect(data.title.logo).toBeDefined();
    expect(data.links).toEqual([
      ...mainLinks,
      ...mlsLinks,
    ]);
  });

  it('should return Eurocopa league data from mapping', () => {
    const data = leagues(mockData.eurocopa);
    expect(data.vertical).toBe('Deportes');
    expect(data.title.name).toBeNull();
    expect(data.title.link).toBe('/futbol/uefa-euro-2020');
    expect(data.title.logo).toBeDefined();
    expect(data.links).toEqual(getLeagueLinks(mockData.eurocopa));
    expect(data.links).toHaveProperty('1.name', 'Posiciones');
  });

  it('should return league data with brackets support', () => {
    const data = leagues(mockData.copaMx);
    expect(data.subNavType).toBe('sectionSubNav');
    expect(data.globalNavTop).toBe(true);
    expect(data.brandedNavLogoName).toBe('tudn');
    expect(data.links).toHaveProperty('1.name', 'Llaves');
  });

  it('should return Liga Expansion league data from mapping', () => {
    const data = leagues(mockData.ligaExpansion);
    expect(data.vertical).toBe('Deportes');
    expect(data.title.name).toBe('Liga de Expansión MX');
    expect(data.title.link).toBe('/futbol/liga-de-expansion-mx');
    expect(data.links).toEqual(getLeagueLinks(mockData.ligaExpansion, { overwriteCoverage: 'basicPlus' }));
    expect(data.links).toHaveProperty('1.name', 'Posiciones');
  });

  it('should return Copa Oro league data from mapping', () => {
    const data = leagues(mockData.copaOro);
    expect(data.vertical).toBe('Deportes');
    expect(data.title.name).toBeNull();
    expect(data.title.link).toBe('/futbol/copa-oro');
    expect(data.links).toEqual(getLeagueLinks(mockData.copaOro));
    expect(data.links).toHaveProperty('1.name', 'Posiciones');
  });

  it('should return Copa America league data from mapping', () => {
    const data = leagues(mockData.copaAmerica);
    expect(data.vertical).toBe('Deportes');
    expect(data.title.name).toBeNull();
    expect(data.title.link).toBe('/futbol/copa-america');
    expect(data.links).toEqual(getLeagueLinks(mockData.copaAmerica));
    expect(data.links).toHaveProperty('1.name', 'Posiciones');
  });

  it('should return Qatar 2022 league data from mapping', () => {
    const data = leagues(mockData.qatar2022);
    expect(data.vertical).toBe('Deportes');
    expect(data.title.name).toBeNull();
    expect(data.title.link).toBe('/futbol/mundial-qatar-2022');
    expect(data.links).toHaveProperty('1.name', 'Grupos');
  });

  it('should return Qatar 2022 league data from mapping', () => {
    const mxMockData = { ...mockData.qatar2022, uri: 'https://www.tudn.com/mx/futbol/mundial-qatar-2022' };
    const data = leagues(mxMockData);
    expect(data.vertical).toBe('Deportes');
    expect(data.title.name).toBeNull();
    expect(data.title.link).toBe('/mx/futbol/mundial-qatar-2022');
    expect(data.links).toHaveProperty('1.name', 'Calendario');
  });
});

describe('leagues with empty data object', () => {
  it('should not throw ligaMX league data', () => {
    expect(ligaMx).not.toThrow();
  });

  it('should not throw UEFA Champions league data', () => {
    expect(uefa).not.toThrow();
  });

  it('should not throw UEFA Europa league data', () => {
    expect(uefaEuropa).not.toThrow();
  });

  it('should not throw UEFA Nations league data', () => {
    expect(uefaNations).not.toThrow();
  });

  it('should not throw MLS league data', () => {
    expect(mls).not.toThrow();
  });

  it('should not throw Eurocopa league data', () => {
    expect(euro).not.toThrow();
  });

  it('should not throw Liga Expansion league data', () => {
    expect(ligaExpansion).not.toThrow();
  });

  it('should not throw euro league data', () => {
    expect(euro).not.toThrow();
  });

  it('should not throw copa oro league data', () => {
    expect(copaOro).not.toThrow();
  });

  it('should not throw copa america league data', () => {
    expect(copaAmerica).not.toThrow();
  });

  it('should not throw qatar league data', () => {
    expect(qatar2022).not.toThrow();
  });

  it('should not throw qatar league data', () => {
    expect(qatarMx2022).not.toThrow();
  });
});
