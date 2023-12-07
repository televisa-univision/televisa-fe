import scoreCellsExtractor from '@univision/shared-components/dist/extractors/scoreCellsExtractor';

import data from '../__mocks__/schedule.json';
import groupMatchesByDate from './groupMatchesByDate';

const matches = scoreCellsExtractor(data).slice(0, 5);

describe('groupMatchesByDate', () => {
  it('should return an empty object by default', () => {
    expect(groupMatchesByDate()).toEqual({});
  });
  it('should return the grouped data', () => {
    const groupedMatches = groupMatchesByDate(matches);
    expect(groupedMatches.sections).toBeDefined();
    expect(Object.keys(groupedMatches.sections)).toHaveLength(3);
    expect(groupedMatches.dates).toHaveLength(3);
  });
});
