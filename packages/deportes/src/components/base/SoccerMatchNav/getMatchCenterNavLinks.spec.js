import getMatchCenterNavLinks from './getMatchCenterNavLinks';
import soccerHelper from '../../../utils/helpers/soccerHelper';

const data = {
  soccerCompetitionSeason: {
    soccerCompetition: {
      league: {
        coverage: 'Performance',
      },
    },
  },
};

soccerHelper.getCoverage = jest.fn(() => 'Performance');

describe('getMatchCenterNavLinks', () => {
  it('should return the right links if pre game', () => {
    expect(getMatchCenterNavLinks(data, 'pre', false)[0].name).toBe('Previa');
  });
  it('should return the right links if postponed game', () => {
    expect(getMatchCenterNavLinks(data, 'postponed', false)[0].name).toBe('Previa');
  });
  it('should return the right links if mid game', () => {
    expect(getMatchCenterNavLinks(data, 'live', false)[0].name).toBe('En Juego');
    expect(getMatchCenterNavLinks(data, 'live', true)[0].name).toBe('En Vivo');
  });
  it('should return the right links if post game', () => {
    expect(getMatchCenterNavLinks(data, 'post', false)[0].name).toBe('Resumen');
  });
  it('should return the right links if post game and coreleague', () => {
    soccerHelper.getCoverage.mockReturnValue('Core');
    expect(getMatchCenterNavLinks(data, 'post', false)[0].name).toBe('Alineación');
  });
  it('should return the right links for special league', () => {
    soccerHelper.getCoverage.mockReturnValue('Special');
    expect(getMatchCenterNavLinks(data, 'pre', false)[0].name).toBe('Alineación');
    expect(getMatchCenterNavLinks(data, 'live', false)[0].name).toBe('Resumen');
    expect(getMatchCenterNavLinks(data, 'post', false)[0].name).toBe('Resumen');
  });
  it('should return null for invalid pageData', () => {
    const test = undefined;
    expect(getMatchCenterNavLinks(test, 'pre', false)).toEqual(null);
  });
  it('should return the right links for basic league', () => {
    soccerHelper.getCoverage.mockReturnValue('Basic');
    expect(getMatchCenterNavLinks(data, 'pre', false)[0].name).toBe('Previa');
    expect(getMatchCenterNavLinks(data, 'live', false)[0].name).toBe('Posiciones');
    expect(getMatchCenterNavLinks(data, 'post', false)[0].name).toBe('Posiciones');
  });
});
