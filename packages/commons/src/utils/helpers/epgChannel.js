import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import isValidObject from '@univision/fe-utilities/helpers/common/isValidObject';

import {
  DIGITAL_CHANNEL_EPG,
  GRID_WIDGET,
  SINGLE_WIDGET,
} from '../../constants/widgetTypes';

/**
 * Helper that adds EPG breaking news card to the grid widget
 * first position when the it has the required criteria,
 * SingleWidget followed by an DigitalChannelEPG and a GridWidget
 * @param {Array} widgets - section widgets
 * @returns {Array}
 */
export default function addEPGBreakingNews(widgets) {
  if (!isValidArray(widgets)) return widgets;

  let foundIndex;
  let digitalChannelData;

  const fastReturn = widgets.filter(
    widget => widget?.breakingNewsMode
    && widget?.type === SINGLE_WIDGET
  );

  if (!isValidArray(fastReturn)) return widgets;

  return widgets.reduce((acc, widget, index) => {
    if (widget?.type === SINGLE_WIDGET
      && widget?.breakingNewsMode
      && widgets[index + 1]?.type === DIGITAL_CHANNEL_EPG
      && widgets[index + 2]?.type === GRID_WIDGET
    ) {
      foundIndex = index;
    }

    if (foundIndex >= 0 && foundIndex + 1 === index) {
      [digitalChannelData] = widget?.contents || [];
      return [...acc];
    }
    if (foundIndex >= 0
      && foundIndex + 2 === index
      && isValidObject(digitalChannelData)
    ) {
      const { contents: oldContent } = widget;
      const originalContent = oldContent?.slice(0, oldContent.length - 1);
      const contents = [
        { ...digitalChannelData },
        ...originalContent,
      ];

      return [
        ...acc,
        {
          ...widget,
          contents,
        },
      ];
    }

    return [...acc, widget];
  }, []);
}
