import matchStatsExtractor from '@univision/shared-components/dist/extractors/matchStatsExtractor';
import matchStatsExtractorOne from './MatchStatsExtractorOne';
import mockData from '../../../utils/mocks/lineup.json';

jest.mock('@univision/shared-components/dist/extractors/matchStatsExtractor', () => jest.fn((data) => {
  const extractor = jest.requireActual('@univision/shared-components/dist/extractors/matchStatsExtractor').default;
  return extractor(data);
}));

describe('matchStatsExtractorOne', () => {
  it('should return the stats data', () => {
    const data = matchStatsExtractorOne(mockData);

    expect(data).toEqual(expect.objectContaining({
      stats: expect.any(Array),
      home: expect.any(Object),
      away: expect.any(Object),
    }));
    expect(data.stats).toHaveLength(4);
  });

  it('should return the available stats data', () => {
    matchStatsExtractor.mockReturnValueOnce({});
    const data = matchStatsExtractorOne(mockData);

    expect(data.stats[0].data).toEqual({});
    expect(data.stats[1].data).toEqual({});
  });
});
