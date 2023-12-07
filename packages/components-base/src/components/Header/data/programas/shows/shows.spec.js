import shows from '.';
import mockData from '../../__mocks__/page.json';

const { data: pageData } = mockData;

/** @test {Header/data/programas/shows} */
describe('Header/data/programas/shows spec', () => {
  it('should return valid config without crashing', () => {
    const config = shows(pageData);
    expect(config).toHaveProperty('variant', 'dark');
  });

  it('should return config without crashing when have invalid pageData', () => {
    const config = shows(null);
    expect(config).toHaveProperty('variant', 'dark');
  });
});
