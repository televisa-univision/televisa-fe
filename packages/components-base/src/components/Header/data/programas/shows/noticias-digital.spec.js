import noticiasDigital from './noticias-digital';
import mockData from '../../__mocks__/page.json';

const { data: pageData } = mockData;

/** @test {Header/data/programas/noticias-digital} */
describe('Header/data/programas/noticias-digital spec', () => {
  it('should return valid config without crashing', () => {
    const config = noticiasDigital(pageData);
    expect(config).toHaveProperty('logoUrl', '/shows');
    expect(config).toHaveProperty('sectionUrl', '/noticias/shows');
    expect(config).toHaveProperty('sectionTitle', 'Show');
  });

  it('should return config without crashing when have invalid pageData', () => {
    const config = noticiasDigital(null);
    expect(config).toHaveProperty('logoUrl', '/shows');
    expect(config).toHaveProperty('sectionUrl', '/noticias/univision-noticias-digital-en-vivo');
    expect(config).toHaveProperty('sectionTitle', 'Edicion Digital');
  });
});
