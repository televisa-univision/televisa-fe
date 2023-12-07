import genericNavData from './genericNavData';
import mockData from './mock.json';
import Features from '../../../config/features';

beforeEach(() => {
  Features.header.hideHeaderFooter = () => true;
});

describe('genericNavData suite', () => {
  it('should return default values when no data is provided', () => {
    const header = genericNavData();
    expect(header.title).toBeDefined();
    expect(header.links).toBeDefined();
    expect(header.links).toHaveLength(0);
  });

  it('should return default values when invalid data is provided', () => {
    const header = genericNavData(0);
    expect(header.title).toBeDefined();
    expect(header.title).toBeDefined();
    expect(header.links).toBeDefined();
    expect(header.links).toHaveLength(0);
  });

  it('should return the proper values when correct data is input', () => {
    const header = genericNavData(mockData.univision);
    expect(header.title.name).toBe(mockData.univision.title);
    expect(header.title.link).toBe(mockData.univision.uri);
  });
});
