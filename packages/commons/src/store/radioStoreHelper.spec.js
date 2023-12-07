import { getFetchInterval, STATION_INTERVAL, PLAYER_INTERVAL } from './radioStoreHelper';

const sampleState = {
  player: {
    anchorPlayer: {
      stationTitle: 'sad',
    },
  },
};

describe('getFetchInterval', () => {
  it('should return PLAYER_INTERVAL if not anchor player', () => {
    expect(getFetchInterval(sampleState)).toBe(PLAYER_INTERVAL);
  });
  it('should return STATION_INTERVAL if not anchor player', () => {
    expect(getFetchInterval({})).toBe(STATION_INTERVAL);
  });
});
