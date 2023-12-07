import especiales from '.';
import mockData from '../../__mocks__/page.json';

const { data: pageData } = mockData;

/** @test {Header/data/programas/especiales} */
describe('Header/data/programas/especiales spec', () => {
  it('should return valid config without crashing', () => {
    const config = especiales(pageData);
    expect(config).toHaveProperty('sectionUrl');
    expect(config).toHaveProperty('links');
  });

  it('should return config without crashing when have invalid pageData', () => {
    const config = especiales(null);
    expect(config).toHaveProperty('sectionUrl');
    expect(config).toHaveProperty('links');
  });
});
