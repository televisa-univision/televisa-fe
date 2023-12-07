import programas from '.';
import mockData from '../__mocks__/page.json';

const { data: pageData } = mockData;

/** @test {Header/data/programas} */
describe('Header/data/programas spec', () => {
  it('should return valid config without crashing', () => {
    const config = programas(pageData);
    expect(config).toHaveProperty('variant', 'dark');
    expect(config).toHaveProperty('logoUrl', '/');
  });

  it('should return config without crashing when have invalid pageData', () => {
    const config = programas(null);
    expect(config).toHaveProperty('variant', 'dark');
    expect(config).toHaveProperty('logoUrl', '/');
  });
});
