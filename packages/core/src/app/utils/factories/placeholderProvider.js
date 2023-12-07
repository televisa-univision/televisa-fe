import React from 'react';

import { hasKey } from '@univision/fe-commons/dist/utils/helpers';
import * as WidgetTypes from '@univision/fe-commons/dist/constants/widgetTypes';

import Placeholder from '@univision/fe-components-base/dist/components/widgets/Placeholder/Default';
import { ContentPlaceholder } from '@univision/fe-components-base/dist/components/Placeholder';
import horoscopeConfig from '@univision/fe-components-base/dist/components/widgets/Horoscope/configs';
import loveCalculatorConfig from '@univision/fe-components-base/dist/components/widgets/LoveCalculator/configs';

/**
 * get the placeholder based on the widget type
 * @param   {string} type the widget type
 * @returns {JSX} the placeholder
 */
const getPlaceholderByWidgetType = (type) => {
  let CurrentPlaceholder;
  let extraProps = {};

  switch (type) {
    case WidgetTypes.SINGLE_WIDGET:
      CurrentPlaceholder = ContentPlaceholder;
      extraProps = { hideInDesktop: false, hasWidth: true };
      break;

    default:
      CurrentPlaceholder = Placeholder;
      break;
  }

  return [CurrentPlaceholder, extraProps];
};

/**
 * get the appropriate LazyLoad placeholder for the given widget
 * @param   {Object} settings the widget config/props
 * @returns {JSX} the placeholder
 */
export default function placeholderFactory (settings) {
  const { widget = {}, theme } = settings;
  const [CurrentPlaceholder, extraProps] = getPlaceholderByWidgetType(
    widget.type
  );
  const type = hasKey(widget, 'type') ? widget.type : 'default';

  switch (type) {
    case 'HoroscoposInteractiveChineseHoroscopes': {
      widget.settings.title = horoscopeConfig.settings.title;
      widget.contents = horoscopeConfig.animals.map(a => ({
        title: a.name,
        uri: a.path,
      }));
      break;
    }
    case 'HoroscoposInteractiveLoveCalculator': {
      widget.settings.title = loveCalculatorConfig.settings.title;
      widget.contents = [{ title: loveCalculatorConfig.settings.description }];
      break;
    }
    default:
  }

  return (
    <CurrentPlaceholder
      content={widget.contents}
      theme={theme}
      settings={widget.settings}
      {...extraProps}
    />
  );
}

/**
 * Returns the placeholderFactory as a function to be able to be used with
 * ReactLoadable
 * @param   {Object} settings the widget config/props
 * @returns {function}
 * @constructor
 */
export function PlaceholderProvider (settings) {
  return () => placeholderFactory(settings);
}
