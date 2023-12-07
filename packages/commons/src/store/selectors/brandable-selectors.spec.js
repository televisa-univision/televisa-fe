import * as brandableSelectors from './brandable-selectors';

describe('brandableSelectors', () => {
  describe('tvStationSelector', () => {
    const state = {
      page: {
        data: {
          tvStation: {
            title: 'test',
          },
        },
      },
    };

    it('should return the appropiate tvStation information', () => {
      const result = brandableSelectors.tvStationSelector(state);
      expect(result).toEqual({
        title: 'test',
      });
    });
  });

  describe('radioStationSelector', () => {
    const state = {
      page: {
        data: {
          radioStation: {
            title: 'test',
          },
        },
      },
    };

    it('should return the appropiate radioStation information', () => {
      const result = brandableSelectors.radioStationSelector(state);
      expect(result).toEqual({
        title: 'test',
      });
    });
  });
});
