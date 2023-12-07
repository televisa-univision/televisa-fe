import { useEffect } from 'react';

import thirdPartyFeatures from '../config/features/thirdParties';
import permutiveIndexScript from '../utils/ads/vendors/permutiveLoader';

/**
 * hook to initialize permutive script if feature flag is enabled
 */
function usePermutiveTracker() {
  useEffect(() => {
    if (thirdPartyFeatures.isPermutiveEnabled()) {
      permutiveIndexScript();
    }
  }, []);
}

export default usePermutiveTracker;
