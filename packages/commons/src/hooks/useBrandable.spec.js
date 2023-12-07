import { renderHook } from '@testing-library/react-hooks';
import * as redux from 'react-redux';
import * as selectors from '../store/selectors/brandable-selectors';
import useBrandable, { brandableComparison } from './useBrandable';

describe('useBrandable hook', () => {
  const tvStationSpy = jest.spyOn(selectors, 'tvStationSelector');
  const radioStationSpy = jest.spyOn(selectors, 'radioStationSelector');
  jest.spyOn(redux, 'useSelector').mockImplementation(fn => fn());

  beforeEach(() => {
    tvStationSpy.mockReturnValue(null);
    radioStationSpy.mockReturnValue(null);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return an empty object', () => {
    const {
      result: {
        current: brandable,
      },
    } = renderHook(() => useBrandable());

    expect(brandable).toEqual({});
  });

  it('should return the tvStation object', () => {
    const tvStation = { test: 'test' };
    tvStationSpy.mockReturnValue(tvStation);

    const {
      result: {
        current: brandable,
      },
    } = renderHook(() => useBrandable());
    expect(brandable).toEqual(tvStation);
  });

  it('should return the radioStation object', () => {
    const radioStation = { test: 'test' };
    radioStationSpy.mockReturnValue(radioStation);

    const {
      result: {
        current: brandable,
      },
    } = renderHook(() => useBrandable());
    expect(brandable).toEqual(radioStation);
  });

  describe('brandableComparison', () => {
    it('should return true with same objects', () => {
      const prev = { test: 'test' };
      const next = { test: 'test' };

      expect(brandableComparison(prev, next)).toBe(true);
    });

    it('should return false with different objects', () => {
      const prev = { test: 'test' };
      const next = { test2: 'test-2' };

      expect(brandableComparison(prev, next)).toBe(false);
    });
  });
});
