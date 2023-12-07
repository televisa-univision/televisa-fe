import { renderHook } from '@testing-library/react-hooks';
import * as hooks from 'react-redux';

import useRegistrationTheme, { defaultTheme, registrationThemeComparison } from './useRegistrationTheme';

const mockTheme = {
  page: {
    theme: {
      registration: {
        primary: '#000',
      },
    },
  },
};

describe('useRegistrationTheme hook', () => {
  let mockUseSelector;

  beforeEach(() => {
    mockUseSelector = jest.spyOn(hooks, 'useSelector');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the default theme', () => {
    mockUseSelector.mockImplementation(callback => callback({}));
    const { result } = renderHook(() => useRegistrationTheme());
    expect(result.current).toEqual(
      expect.objectContaining(defaultTheme)
    );
  });

  it('should return theme override', () => {
    mockUseSelector.mockImplementation(callback => callback(mockTheme));
    const { result } = renderHook(() => useRegistrationTheme());
    expect(result.current).toEqual(
      expect.objectContaining({ ...mockTheme.page.theme.registration })
    );
  });

  describe('registrationThemeComparison', () => {
    const prev = {
      registration: {},
    };

    it('should return true', () => {
      const next = {
        ...prev,
      };

      expect(registrationThemeComparison(prev, next)).toBe(true);
    });
    it('should return false', () => {
      const next = {
        registration: {
          primary: '#000',
        },
      };
      expect(registrationThemeComparison(prev, next)).toBe(false);
    });
  });
});
