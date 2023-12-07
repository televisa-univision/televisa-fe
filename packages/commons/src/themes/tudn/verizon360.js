import { BLACK } from '../../utils/styled/constants';
import logos from './logos';
import tudn from '.';

export default (data = {}, options = {}) => {
  return {
    ...tudn(data, options),
    subNavBackgroundColor: BLACK,
    exposedNavGradient: BLACK,
    videoLogo: logos.verizonSuperview,
    brandTitle: 'TUDN VISION',
  };
};
