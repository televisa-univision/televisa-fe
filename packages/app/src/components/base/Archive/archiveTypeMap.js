import archiveTypes from '@univision/fe-commons/dist/constants/archiveTypes';

import ArchiveList from '@univision/fe-components-base/dist/components/ArchivedSiteMap/ArchiveList';
import MonthContent from '@univision/fe-components-base/dist/components/ArchivedSiteMap/MonthContent';
import YearContent from '@univision/fe-components-base/dist/components/ArchivedSiteMap/YearContent';

/**
 * Map for all components depending on the archive type
*/
const archiveContentTypes = {
  [archiveTypes.MAIN]: YearContent,
  [archiveTypes.MONTH]: ArchiveList,
  [archiveTypes.YEAR]: MonthContent,
};

export default archiveContentTypes;
