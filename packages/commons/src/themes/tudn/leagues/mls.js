import { FREE_SPEECH_RED, FREE_SPEECH_RED_DARK } from '../../../utils/styled/constants';
import { getHorizontalThemeGradient } from '../../../utils/styled/mixins';

// eslint-disable-next-line import/no-cycle
import tudn from '..';

export default (data = {}, options = {}) => {
  const exposedNavGradient = getHorizontalThemeGradient({
    end: FREE_SPEECH_RED_DARK, start: FREE_SPEECH_RED,
  });
  return {
    ...tudn(data, options),
    exposedNavGradient,
    shortTitleGradient: exposedNavGradient,
  };
};
