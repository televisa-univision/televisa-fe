import genericNavData from '../genericNavData';
import { getKey } from '../../../helpers';
import { formatDate, getMostRecentDate } from '../../../helpers/dateTimeUtils';
import localization from '../../../localization/LocalizationManager';

// Coronavirus header data
export default (data = {}) => {
  const lastUpdate = localization.get('lastUpdate');
  const defaultNav = genericNavData(data);
  const widgets = getKey(data, 'widgets', []);
  const timestamp = widgets
    .map(widget => widget.contents
      .map(content => new Date(content.updateDate))
      .reduce(getMostRecentDate, null))
    .reduce(getMostRecentDate, null);
  const title = {
    ...defaultNav.title,
    link: '/coronavirus',
    subtitle: timestamp ? `${lastUpdate}: ${formatDate(timestamp, 'en')}` : null,
  };
  return {
    ...defaultNav,
    title,
  };
};
