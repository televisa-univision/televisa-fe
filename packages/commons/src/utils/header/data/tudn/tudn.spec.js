import tudn from '.';
import generic from './generic';
import entrevistas from './entrevistas';
import futbol from './futbol';
import nflSuperbowl from './nflSuperbowl';
import opinion from './opinion';
import premiosDpts from './premiosDpts';
import soccerMatch from './soccerMatch';
import tudnxtra from './tudnxtra';
import mexico from './mexico';
import qatar from './leagues/qatar2022';
import europa from './europa';
import verizon from './verizon360';
import soccerPerson from './soccerPerson';
import copaUnivision from './copaUnivision';
import mockData from './__mocks__/data.json';

import * as pageSelectors from '../../../../store/selectors/page-selectors';
import features from '../../../../config/features';

const userLocationSpy = jest.spyOn(pageSelectors, 'userLocationSelector');

describe('tudn main data object', () => {
  it('should return default data', () => {
    const data = tudn();
    expect(data.title).toHaveProperty('name');
    expect(data.globalNavTop).toBe(true);
    expect(data.brandedNavLogoName).toBe('tudn');
    expect(data.brandedNavLogoUri).toBe('/');
    expect(data.links).toEqual(expect.any(Array));
  });

  it('should return default data sections', () => {
    const data = tudn(mockData.home);
    expect(data.title).toBeNull();
    expect(data.globalNavTop).toBe(true);
    expect(data.brandedNavLogoName).toBe('tudn');
    expect(data.brandedNavLogoUri).toBe('/');
    expect(data.links).toEqual(expect.any(Array));
  });

  it('should return qatar data for MX', () => {
    userLocationSpy.mockReturnValue('MX');
    const data = qatar(mockData.qatar2022);
    expect(data.title.link).toBe('/futbol/mundial-qatar-2022');
  });

  it('should return qatar data for US', () => {
    userLocationSpy.mockReturnValue('US');
    const data = qatar(mockData.qatar2022);
    expect(data.title.link).toBe('/futbol/mundial-qatar-2022');
  });

  it('should return default data non-sections', () => {
    const data = tudn(mockData.article);
    expect(data.title).toHaveProperty('name', 'National Football League');
    expect(data.globalNavTop).toBe(true);
    expect(data.brandedNavLogoName).toBe('tudn');
    expect(data.brandedNavLogoUri).toBe('/');
    expect(data.links).toEqual(expect.any(Array));
  });

  it('should return generic data', () => {
    const data = generic();
    expect(data.globalNavTop).toBe(true);
    expect(data.brandedNavLogoName).toBe('tudn');
    expect(data.brandedNavLogoUri).toBe('/');
  });

  it('should return title link as the same page uri on sections', () => {
    const data = generic(mockData.futbol);
    expect(data.title.link).toBeDefined();
    expect(data.title.link).toBe(mockData.futbol.uri);
  });

  it('should return default parent title for non-sections', () => {
    const data = generic(mockData.article);
    expect(data.title.link).toBeDefined();
    expect(data.title.link).not.toBe(mockData.article.uri);
    expect(data.title.link).toBe('/nfl');
  });
});

describe('entrevistas data object', () => {
  it('should not throw', () => {
    expect(entrevistas).not.toThrow();
  });

  it('should return correct data', () => {
    const data = entrevistas(mockData.entrevistas);
    expect(data.vertical).toBe('Deportes');
    expect(data.title.name).toBeNull();
    expect(data.title.link).toBe('/entrevistas');
    expect(data.title.logo).toBeDefined();
    expect(data.links).toEqual(expect.any(Array));
  });
});

describe('futbol data object', () => {
  it('should not throw', () => {
    expect(futbol).not.toThrow();
  });

  it('should return correct data', () => {
    features.deportes.useLeagueTheme = jest.fn(() => false);
    const data = futbol(mockData.futbol);
    expect(data.vertical).toBe('Deportes');
    expect(data.title.name).toBe('Fútbol');
    expect(data.title.link).toBe('https://www.tudn.com/futbol');
    expect(data.links).toEqual(expect.any(Array));
  });

  it('should return correct data', () => {
    features.deportes.useLeagueTheme = jest.fn(() => true);
    const data = futbol(mockData.futbol);
    expect(data.vertical).toBe('Deportes');
    expect(data.title.name).toBe('Fútbol');
    expect(data.title.link).toBe('https://www.tudn.com/futbol');
    expect(data.links).toEqual(expect.any(Array));
  });
});

describe('opinion data object', () => {
  it('should not throw', () => {
    expect(opinion).not.toThrow();
  });

  it('should return correct data', () => {
    const data = opinion(mockData.opinion);
    expect(data.vertical).toBe('Deportes');
    expect(data.title.name).toBeNull();
    expect(data.title.link).toBe('/opinion-deportes');
    expect(data.title.logo).toBeDefined();
    expect(data.links).toEqual(expect.any(Array));
  });
});

describe('nflSuperbowl data object', () => {
  it('should not throw', () => {
    expect(nflSuperbowl).not.toThrow();
  });

  it('should return correct data', () => {
    const data = nflSuperbowl(mockData.nflSuperbowl);
    expect(data.vertical).toBe('Deportes');
    expect(data.title.name).toBeNull();
    expect(data.title.link).toBe('/nfl/super-bowl');
    expect(data.title.logo).toBeDefined();
    expect(data.links).toEqual(expect.any(Array));
  });
});

describe('premiosDpts data object', () => {
  it('should not throw', () => {
    expect(premiosDpts).not.toThrow();
  });

  it('should return correct data', () => {
    const data = premiosDpts(mockData.premiosDpts);
    expect(data.vertical).toBe('Deportes');
    expect(data.title.name).toBeNull();
    expect(data.title.link).toBe('/premios-univision-deportes');
    expect(data.title.logo).toBeDefined();
    expect(data.links).toEqual(expect.any(Array));
  });
});

describe('soccerMatch data object', () => {
  it('should not throw', () => {
    expect(soccerMatch).not.toThrow();
  });

  it('should return correct data', () => {
    const data = soccerMatch(mockData.soccerMatch);
    expect(data.vertical).toBe('Deportes');
    expect(data.title.name).toBe('VER vs QRO');
    expect(data.title.link).toBe('/futbol/liga-mx/veracruz-vs-queretaro-liga-mx-apertura-2019-08-27');
    expect(data.title.logo).toBeNull();
    expect(data.title.alignCenter).toBe(true);
    expect(data.links).toEqual(expect.any(Array));
  });
});

describe('tudnxtra data object', () => {
  it('should not throw', () => {
    expect(tudnxtra).not.toThrow();
  });

  it('should return correct data', () => {
    const data = tudnxtra(mockData.tudnxtra);
    expect(data.vertical).toBe('Deportes');
    expect(data.title.name).toBeNull();
    expect(data.title.link).toBe('/tudnxtra');
    expect(data.title.logo).toBeDefined();
    expect(data.links).toEqual(expect.any(Array));
  });
});

describe('europa data object', () => {
  it('should not throw', () => {
    expect(europa).not.toThrow();
  });

  it('should return correct data', () => {
    const data = europa(mockData.europa);
    expect(data.vertical).toBe('Deportes');
    expect(data.title.name).toBe('Fútbol Europa');
    expect(data.title.link).toBe('/futbol/europa');
    expect(data.links).toEqual(expect.any(Array));
  });
});

describe('mexico data object', () => {
  it('should not throw', () => {
    expect(mexico).not.toThrow();
  });

  it('should return correct data', () => {
    const data = mexico(mockData.mexico);
    expect(data.vertical).toBe('Deportes');
    expect(data.title.name).toBe('Selección MX');
    expect(data.title.link).toBe('/futbol/mexico');
    expect(data.links).toEqual(expect.any(Array));
  });
});

describe('verizon data object', () => {
  it('should not throw', () => {
    expect(verizon).not.toThrow();
  });

  it('should return correct data', () => {
    const data = verizon(mockData.verizon);
    expect(data.vertical).toBe('Deportes');
    expect(data.title.name).toBe('Vista 360º - 5G');
    expect(data.title.link).toBe('/verizon-360-tudn');
    expect(data.title.logo).toBeDefined();
    expect(data.links).toEqual(expect.any(Array));
  });
});

describe('soccerPerson data object', () => {
  it('should not throw', () => {
    expect(soccerPerson).not.toThrow();
  });

  it('should return correct data', () => {
    const data = soccerPerson(mockData.soccerPerson);
    expect(data.vertical).toBe('Deportes');
    expect(data.links).toEqual(expect.any(Array));
  });
});

describe('copaUnivision data object', () => {
  it('should not throw', () => {
    expect(copaUnivision).not.toThrow();
  });

  it('should return correct data', () => {
    const data = soccerPerson(mockData.copaUnivision);
    expect(data.vertical).toBe('Deportes');
    expect(data.links).toEqual(expect.any(Array));
  });
});
