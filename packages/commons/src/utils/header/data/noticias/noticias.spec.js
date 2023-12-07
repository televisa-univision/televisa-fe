import * as storeHelpers from '../../../../store/storeHelpers';
import * as subNavTypes from '../../../../constants/subNavTypes';

import autos from './autos';
import contigo from './contigo';
import destino2020VotaConmigo from './destino2020VotaConmigo';
import electiones2020 from './elecciones2020';
import electiones2022 from './elecciones2022';
import healthiNation from './healthiNation';
import politica from './politica';
import fuertesJuntos from './fuertesJuntos';
import inmigracion from './inmigracion';
import miSaludMiDecision from './miSaludMiDecision';
import mockData from '../mock.json';
import noticias from '.';
import planeta from './planeta';
import secondChances from './secondChances';
import segundaOportunidad from './segundaOportunidad';
import siliconValey from './siliconValley';
import reto28 from './reto28';
import teExplicamos from './teExplicamos';
import univisionNews from './univisionNews';
import coronavirus from './coronavirus';
import censo2020 from './censo2020';
import unidosContraCoronavirus from './unidosContraCoronavirus';
import unidosSomosUno from './unidosSomosUno';

describe('noticias data object', () => {
  let isVerticalSpy;

  beforeEach(() => {
    isVerticalSpy = jest.spyOn(storeHelpers, 'isVerticalHome');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return default data', () => {
    const data = noticias();
    expect(data.title).toBeDefined();
    expect(data.links).toBeDefined();
    expect(data.links).toEqual(expect.any(Array));
  });

  it('should have a logo in the title object when on a vertical home', () => {
    isVerticalSpy.mockImplementation(() => true);
    const data = noticias(mockData.noticias);
    expect(data.title.name).toBeNull();
    expect(data.title.logo).toEqual(expect.any(String));
  });

  it('should not have a logo in the title object when not on the vertical home, but still in a Section page', () => {
    isVerticalSpy.mockImplementation(() => false);
    const data = noticias(mockData.noticiasSection);
    expect(data.title.logo).toBeNull();
    expect(data.title.name).toEqual(expect.any(String));
  });

  it('should override data when tagHierarchy matches', () => {
    const dataWithHierarchy = {
      ...mockData.noticias,
      tagHierarchy: [
        { uri: 'https://www.univision.com/noticias' },
        { uri: 'https://www.univision.com/noticias/salud' },
      ],
    };
    const data = noticias(dataWithHierarchy);
    expect(data.title.name).toEqual(expect.any(String));
    expect(data.title.logo).toBeNull();
  });
});

describe('inmigracion data object', () => {
  it('should return default data', () => {
    const data = inmigracion();
    expect(data.title).toBeDefined();
    expect(data.links).toBeDefined();
    expect(data.links).toEqual(expect.any(Array));
  });

  it('should return default data (no content page)', () => {
    const data = inmigracion({ type: 'section' });
    expect(data.title).toBeDefined();
    expect(data.links).toBeDefined();
    expect(data.links).toEqual(expect.any(Array));
  });

  it('should return default data (content page)', () => {
    const data = inmigracion({ type: 'article' });
    expect(data.title).toBeDefined();
    expect(data.links).toBeDefined();
    expect(data.links).toEqual(expect.any(Array));
  });
});

describe('reto28 data object', () => {
  it('should return default data', () => {
    const data = reto28();
    expect(data.title).toBeDefined();
    expect(data.links).toBeDefined();
    expect(data.links).toEqual(expect.any(Array));
  });
});

describe('univision news data object (without breadcrumbs)', () => {
  it('should return default data', () => {
    const data = univisionNews();
    expect(data.title).toBeDefined();
    expect(data.links).toBeDefined();
    expect(data.links).toEqual(expect.any(Array));
  });

  it('should return default data (section page)', () => {
    const data = univisionNews({ type: 'section' });
    expect(data.title).toBeDefined();
    expect(data.links).toBeDefined();
    expect(data.links).toEqual(expect.any(Array));
  });

  it('should return default data (content page)', () => {
    const data = univisionNews({ type: 'article' });
    expect(data.title).toBeDefined();
    expect(data.links).toBeDefined();
    expect(data.links).toEqual(expect.any(Array));
  });
});

describe('univision news data object (with breadcrumbs)', () => {
  it('should return default data', () => {
    const data = univisionNews({
      tagHierarchy: [{
        title: 'title',
        uri: 'http://www.url.com/',
      }],
    });
    expect(data.title).toBeDefined();
    expect(data.links).toBeDefined();
    expect(data.links).toEqual(expect.any(Array));
  });
});

describe('autos data object', () => {
  it('should return default data', () => {
    const data = autos();
    expect(data.title).toBeDefined();
    expect(data.title.name).toBeNull();
    expect(data.title.logo).toEqual(expect.any(String));
    expect(data.links).toBeDefined();
    expect(data.links).toEqual(expect.any(Array));
  });
});

describe('siliconValey data object', () => {
  it('should return default data', () => {
    const data = siliconValey();
    expect(data.title).toBeDefined();
    expect(data.title.name).toBeNull();
    expect(data.title.logo).toEqual(expect.any(String));
    expect(data.subNavType).toEqual(subNavTypes.SECTION_SUBNAV);
  });
});

describe('contigo data object', () => {
  it('should return default data', () => {
    const data = contigo();
    expect(data.title).toBeDefined();
    expect(data.title.name).toBeNull();
    expect(data.title.logo).toEqual(expect.any(String));
    expect(data.subNavType).toEqual(subNavTypes.SECTION_SUBNAV);
  });
});

describe('Fuertes Juntos data object', () => {
  it('should return default data', () => {
    const data = fuertesJuntos();
    expect(data.title).toBeDefined();
    expect(data.title.name).toBeNull();
    expect(data.title.logo).toEqual(expect.any(String));
    expect(data.subNavType).toEqual(subNavTypes.SECTION_SUBNAV);
  });
});

describe('Elecciones 2020 data object', () => {
  it('should return default data', () => {
    const data = electiones2020();
    expect(data.title).toBeDefined();
    expect(data.title.name).toBeNull();
    expect(data.title.logo).toEqual(expect.any(String));
    expect(data.subNavType).toEqual(subNavTypes.CONTENT_SUBNAV);
  });
});

describe('Elecciones 2022 data object', () => {
  it('should return default data', () => {
    const data = electiones2022();
    expect(data.title).toBeDefined();
    expect(data.title.name).toBeNull();
    expect(data.title.logo).toEqual(expect.any(String));
    expect(data.subNavType).toEqual(subNavTypes.CONTENT_SUBNAV);
  });
});

describe('Politica data object', () => {
  it('should return default data', () => {
    const data = politica();
    expect(data.subNavType).toEqual(subNavTypes.CONTENT_SUBNAV);
  });
});

describe('Te Explicamos data object', () => {
  it('should return default data', () => {
    const data = teExplicamos();
    expect(data.title).toBeDefined();
    expect(data.title.name).toBeNull();
    expect(data.title.logo).toEqual(expect.any(String));
    expect(data.links).toBeDefined();
    expect(data.subNavType).toEqual(subNavTypes.SECTION_SUBNAV);
  });
});

describe('Mi Salud Mi Decision data object', () => {
  it('should return default data', () => {
    const data = miSaludMiDecision();
    expect(data.title).toBeDefined();
    expect(data.title.name).toBeNull();
    expect(data.title.logo).toEqual(expect.any(String));
    expect(data.subNavType).toEqual(subNavTypes.SECTION_SUBNAV);
  });
});

describe('Planeta data object', () => {
  it('should return default data', () => {
    const data = planeta();
    expect(data.title.logo).toBeNull();
    expect(data.title.name).toEqual(expect.any(String));
    expect(data.links).toEqual(expect.any(Array));
  });
});

describe('Segunda Oportunidad data object', () => {
  it('should return default data', () => {
    const data = segundaOportunidad();
    expect(data.title).toBeDefined();
    expect(data.title.name).toBeNull();
    expect(data.title.logo).toEqual(expect.any(String));
    expect(data.subNavType).toEqual(subNavTypes.SECTION_SUBNAV);
  });
});

describe('Second Chances data object', () => {
  it('should return default data', () => {
    const data = secondChances();
    expect(data.title).toBeDefined();
    expect(data.title.name).toBeNull();
    expect(data.title.logo).toEqual(expect.any(String));
    expect(data.subNavType).toEqual(subNavTypes.SECTION_SUBNAV);
  });
});

describe('Coronavirus data object', () => {
  it('should return default data', () => {
    const data = coronavirus();
    expect(data.title).toBeDefined();
    expect(data.subNavType).toEqual(subNavTypes.CONTENT_SUBNAV);
    expect(data.title.subtitle).toBeNull();
  });
  it('should return default data and timestamp subtitle', () => {
    const input = {
      widgets: [
        {
          contents: [
            {
              updateDate: '2020-03-25T18:17:07-04:00',
            },
            {
              updateDate: '2020-03-25T18:17:07-04:00',
            },
          ],
        },
      ],
    };
    const data = coronavirus(input);
    expect(data.title).toBeDefined();
    expect(data.subNavType).toEqual(subNavTypes.CONTENT_SUBNAV);
    expect(data.title.subtitle).toBeDefined();
  });
});

describe('Censo 2020 data object', () => {
  it('should return default data', () => {
    const data = censo2020();
    expect(data.title).toBeDefined();
    expect(data.title.name).toBeNull();
    expect(data.title.logo).toEqual(expect.any(String));
  });
});

describe('Unidos Contra el Coronavirus data object', () => {
  it('should return default data', () => {
    const data = unidosContraCoronavirus();
    expect(data.title).toBeDefined();
    expect(data.title.name).toBeNull();
    expect(data.title.logo).toEqual(expect.any(String));
  });
});

describe('Healthi Nation data object', () => {
  it('should return default data', () => {
    const data = healthiNation();
    expect(data.title).toBeDefined();
    expect(data.title.name).toBeNull();
    expect(data.title.logo).toEqual('https://st1.uvnimg.com/19/da/e142b82f4a2c9472248c630d2bb4/hn-color-logo.svg');
  });
});

describe('Destino 2020 Vota conmigo data object', () => {
  it('should return default data', () => {
    const data = destino2020VotaConmigo();
    expect(data.title).toBeDefined();
    expect(data.title.name).toBeNull();
    expect(data.title.logo).toEqual('https://st1.uvnimg.com/ea/aa/6deb500c4c76b31de5f6861b6d18/logo-votaconmigo.svg');
  });
});

describe('Unidos Somos Uno data object', () => {
  it('should return default data', () => {
    const data = unidosSomosUno();
    expect(data.title).toBeDefined();
    expect(data.title.logo).toEqual('https://st1.uvnimg.com/4f/70/13f794e34d74a16afe4c4493f506/unidos-somos-uno.svg');
  });
});
