import * as types from '@univision/fe-commons/dist/constants/personalizationType';
import favoritesMapper from '@univision/fe-commons/dist/store/slices/user/favoritesMapper';
import {
  SUCCESS,
} from '@univision/fe-commons/dist/constants/status';
import {
  mapStateToProps,
  mapDispatchToProps,
} from './FavoriteSelectorConnector';

// Mock favoritesMapper
favoritesMapper[types.HOROSCOPES] = {
  ...favoritesMapper[types.HOROSCOPES],
  updateFavoriteAction: jest.fn(signId => signId),
  fetchFavoritesAction: jest.fn(),
};

let mockDispatch;

describe('FavoriteSelectorConnector', () => {
  beforeEach(() => {
    mockDispatch = jest.fn();
  });

  it('should mapStateToProps returns the expected properties', () => {
    const state = {
      user: {
        horoscopes: {
          favorites: [{ id: '1', enabled: true }],
          status: SUCCESS,
        },
      },
    };
    expect(mapStateToProps(
      state,
      { personalizationType: types.HOROSCOPES }
    )).toEqual(expect.objectContaining({
      favorites: ['1'],
      fetchFavoritesStatus: SUCCESS,
    }));

    expect(mapStateToProps(
      state,
      {}
    )).toEqual(expect.objectContaining({ favorites: [] }));
  });

  it('should created action by mapDispatchToProps, dispatch properly', () => {
    const actions = mapDispatchToProps(mockDispatch);
    expect(actions.updateFavoriteAction).toBeDefined();

    actions.updateFavoriteAction(types.HOROSCOPES, '12345');
    expect(mockDispatch).toBeCalledWith('12345');
    mockDispatch.mockClear();

    actions.updateFavoriteAction('InvalidPersonalizationType', '12345');
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('should created action by mapDispatchToProps, dispatch properly', () => {
    const actions = mapDispatchToProps(mockDispatch);
    expect(actions.fetchFavoritesAction).toBeDefined();

    actions.fetchFavoritesAction(types.HOROSCOPES);
    expect(mockDispatch).toBeCalled();
    mockDispatch.mockClear();

    actions.fetchFavoritesAction('InvalidPersonalizationType', '12345');
    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
