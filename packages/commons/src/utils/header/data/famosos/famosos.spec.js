import famosos from '.';
import estiloDeVida from './estiloDeVida';
import * as utils from '../genericNavData';

describe('famosos data object', () => {
  it('should return default data', () => {
    const data = famosos();
    expect(data.title).toBeDefined();
    expect(data.links).toBeDefined();
    expect(data.links).toEqual(expect.any(Array));
  });

  it('should render correctly when this is a vertical landing page', () => {
    const data = famosos({ uri: '/famosos' });
    expect(data.title).toBeDefined();
    expect(data.links).toBeDefined();
    expect(data.links).toEqual(expect.any(Array));
  });
});

describe('Estilo de vida data object', () => {
  utils.genericNavData = jest.fn();
  it('should return cms title', () => {
    const data = estiloDeVida({ title: 'test' });
    expect(data.title.name).toBe('test');
    expect(data.links).toBeDefined();
    expect(data.links).toEqual(expect.any(Array));
  });

  it('should return default title if not available', () => {
    utils.genericNavData.mockReturnValue({});

    const data = estiloDeVida();
    expect(data.title.name).toBe('Estilo de Vida');
    expect(data.links).toBeDefined();
    expect(data.links).toEqual(expect.any(Array));
  });
});
