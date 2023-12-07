import Store from '../../store/store';
import {
  hasFeatureFlag,
} from '../../store/storeHelpers';
import {
  DISABLE_DFP,
  DISABLE_COMSCORE,
  DISABLE_GTM,
  DISABLE_NIELSEN,
  DISABLE_THIRD_PARTY,
} from '../../constants/thirdParties';

// Keep in mind this feature flag should only be used in client
export default {
  isDFPDisabled: () => (
    hasFeatureFlag(Store, DISABLE_THIRD_PARTY)
    || hasFeatureFlag(Store, DISABLE_DFP)
  ),
  isGTMDisabled: () => (
    hasFeatureFlag(Store, DISABLE_THIRD_PARTY)
    || hasFeatureFlag(Store, DISABLE_GTM)
  ),
  isNielsenDisabled: () => (
    hasFeatureFlag(Store, DISABLE_THIRD_PARTY)
    || hasFeatureFlag(Store, DISABLE_NIELSEN)
  ),
  isComscoreDisabled: () => (
    hasFeatureFlag(Store, DISABLE_THIRD_PARTY)
    || hasFeatureFlag(Store, DISABLE_COMSCORE)
  ),
  isPermutiveEnabled: () => true,
};
