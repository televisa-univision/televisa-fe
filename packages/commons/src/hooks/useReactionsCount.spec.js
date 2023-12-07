import { renderHook } from '@testing-library/react-hooks';
import * as hooks from 'react-redux';

import useReactionsCount from './useReactionsCount';

const mockState = {
  user: {
    reactions: {
      byId: {
        test: {
          reaction: 'HAPPY',
        },
      },
    },
  },
  reactions: {
    byId: {
      test: {
        counts: [
          { count: 30 },
          { count: 40 },
        ],
      },
    },
  },
};

describe('useReactionsCount hook', () => {
  let mockUseSelector;

  beforeEach(() => {
    mockUseSelector = jest.spyOn(hooks, 'useSelector');
  });

  it('should retrieve the reaction count', () => {
    mockUseSelector.mockImplementation(callback => callback(mockState));
    const { result } = renderHook(() => useReactionsCount({ uid: 'test', hasActionBar: true }));
    expect(result.current).toBe(70);
    expect(mockUseSelector).toHaveBeenCalled();
  });
  it('should return 0 when state is empty', () => {
    mockUseSelector.mockImplementation(callback => callback({}));
    const { result } = renderHook(() => useReactionsCount({ uid: 'test' }));
    expect(result.current).toBe(0);
  });
  it('should call the string formatter when provided', () => {
    mockUseSelector.mockImplementation(callback => callback(mockState));
    const formatter = jest.fn(count => count.totalReactions);
    const { result } = renderHook(() => useReactionsCount({ uid: 'test', hasActionBar: true, formatter }));
    expect(result.current).toBe(70);
    expect(formatter).toHaveBeenCalled();
    expect(mockUseSelector).toHaveBeenCalled();
  });
});
