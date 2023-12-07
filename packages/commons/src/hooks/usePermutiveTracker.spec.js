import { renderHook } from '@testing-library/react-hooks';

import usePermutiveTracker from './usePermutiveTracker';

import thirdPartyFeatures from '../config/features/thirdParties';

describe('usePermutiveTracker hook', () => {
  it('should not initialize permutive if feature flag is not passed', () => {
    thirdPartyFeatures.isPermutiveEnabled = jest.fn(() => false);
    renderHook(() => usePermutiveTracker());
    expect(window.permutive).not.toBeDefined();
  });
  it('should initialize permutive if feature flag is passed', () => {
    thirdPartyFeatures.isPermutiveEnabled = jest.fn(() => true);
    renderHook(() => usePermutiveTracker());
    expect(window.permutive).toBeDefined();
  });
});
