// eslint-disable-next-line import/no-cycle
import genericTheme from '..';
import { getFromMapPattern, toRelativeUrl } from '../../../utils/helpers';
// eslint-disable-next-line import/no-cycle
import leaguesMapping from './mapping';

export default (data = {}, options = {}) => {
  const themeDataFn = getFromMapPattern(
    toRelativeUrl(data.uri),
    leaguesMapping,
    options.onlyLeagueData ? () => {} : genericTheme
  );

  return themeDataFn(data, options);
};
