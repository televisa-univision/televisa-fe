import contentTypes from '../../../../../constants/contentTypes.json';
import teamLinks from '../links/team';

import teams from '.';

describe('teams main data object', () => {
  it('should return default team data', () => {
    const data = teams();
    expect(data.links).toEqual(teamLinks());
    expect(data.subNavType).toBe('contentSubNav');
    expect(data.globalNavTop).toBe(true);
    expect(data.brandedNavLogoName).toBe('tudn');
  });

  it('should return correctly team data', () => {
    const data = teams({ type: contentTypes.SOCCER_TEAM });
    expect(data.links).toEqual(teamLinks());
    expect(data.subNavType).toBe('sectionSubNav');
    expect(data.globalNavTop).toBe(true);
    expect(data.brandedNavLogoName).toBe('tudn');
  });

  it('should return correct data for non-teams/section page type', () => {
    const data = teams({ type: contentTypes.ARTICLE });
    expect(data.subNavType).toBe('contentSubNav');
    expect(data.globalNavTop).toBe(true);
  });
});
