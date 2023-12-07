import React from 'react';
import LazyLoad from 'react-lazyload';
import Loadable from 'react-loadable';

import Store from '@univision/fe-commons/dist/store/store';
import * as AdActions from '@univision/fe-commons/dist/store/actions/ads-actions';
import ErrorBoundary from '@univision/fe-commons/dist/components/ErrorBoundary';
import {
  getTheme,
  getDevice,
  getPageData,
  getPageCategory,
  isTopAdInserted,
  isDesktop,
} from '@univision/fe-commons/dist/store/storeHelpers';
import {
  hasKey,
  exists,
  getWidgetType,
  isValidArray,
  getKey,
} from '@univision/fe-commons/dist/utils/helpers';
import adHelper from '@univision/fe-commons/dist/utils/ads/adHelper';
import ServerSideLazyLoad from '@univision/fe-commons/dist/components/LazyLoad';
import { shouldInjectTopAd } from '@univision/fe-commons/dist/utils/ads/Section/widgetAdInjector';
import * as AdTypes from '@univision/fe-commons/dist/utils/ads/ad-types';
import skipTopWidgetsList from '@univision/fe-commons/dist/utils/ads/Section/skipTopWidgetsList';
import getWidgetsConfig from '@univision/fe-components-base/dist/components/widgets/WithWidgets/config';
import * as WidgetTypes from '@univision/fe-commons/dist/constants/widgetTypes';
import { getWidgetCardsData } from '@univision/fe-components-base/dist/utils/cardMapper/getWidgetCardsData';
import features from '@univision/fe-commons/dist/config/features';
import { getThemeFromVertical } from '@univision/fe-commons/dist/components/ThemeProvider/helpers';

import lazyloadConfig from './lazyloadConfig.json';
import appConfig from '../../config';
import getWidgetPlaceholder, {
  PlaceholderProvider,
} from './placeholderProvider';
import widgetMapping from './widgetMapping';
import typesWithTopAd from './typesWithTopAd.json';

const WIDGET_TYPES_TO_SKIP = [
  WidgetTypes.MOVING_BANNER,
  WidgetTypes.ADVERTISEMENT_MODULE,
];
// We eagerly load the first two widgtes on mobile, and the first three widgets
// on desktop.
const MOBILE_LAZY_LOAD_POSITION = 2;
const DESKTOP_LAZY_LOAD_POSITION = 3;

/**
 * Gets the necessary props for widgets. Creates it from the original widget
 * and from the mapped widget.
 * @param {Object} widget data object received from Feed API response.
 * @param {Object} mappedWidget loadable widget obtained from the widget mapping
 * file.
 * @param {number} key for the actual React component.
 * @returns {Object}
 */
const getWidgetProps = (widget, mappedWidget, key) => ({
  key,
  commonRootSection: widget.commonRootSection,
  content: widget.contents,
  settings: widget.settings,
  secondaryContent: widget.secondaryContent,
  theme: getTheme(Store),
  device: getDevice(Store),
  shouldInjectTopAd: shouldInjectTopAd(getPageData(Store), null, widget),
  widgetContext: {
    id: getKey(widget, 'settings.uid'),
    name: mappedWidget.name,
    title: getKey(widget, 'settings.title'),
    type: mappedWidget.type,
    widgetType: widget.type,
    position: key + 1,
    isActionBarEnabled: features.actionBar.hasActionBar(Store.getState()),
  },
});

/**
 * Get widget specific theme
 * @param {Object} widgetProps props from the widget
 * @returns {Object}
 */
const getWidgetTheme = (widgetProps) => {
  return {
    ...getKey(widgetProps, 'theme', {}),
    ...getThemeFromVertical(getKey(widgetProps, 'commonRootSection.uri')),
  };
};

/**
 * Enhances original widget props with extra properties based on widget type.
 * @param {Object} widget data object received from Feed API response
 * @param {Object} widgetProps the original widget props
 * @param {Object} data from API
 * getWidgetProps.
 * @returns {Object}
 */
const enhanceWidgetProps = (widget, widgetProps, data) => {
  const enhancedProps = { ...widgetProps };
  const { widgetContext, content } = enhancedProps;

  switch (widget.type) {
    case WidgetTypes.RADIO_GRID_STATIONS_BY_GENRE_FILTER:
    case WidgetTypes.STATION_BY_GENRE_LIST:
      enhancedProps.allowedGenresForFiltering = widget.settings.tags || [];
      break;

    case WidgetTypes.RADIO_SHOW_CARD_WIDGET:
      enhancedProps.title = data.title;
      break;

    case WidgetTypes.RADIO_STATION_SCHEDULE_WIDGET:
    case WidgetTypes.RADIO_BANNER_STATION_SCHEDULE:
      enhancedProps.title = widget.settings.title;
      enhancedProps.schedule = widget.settings.radioSchedule;
      break;

    case WidgetTypes.CAROUSEL_WIDGET:
    case WidgetTypes.SHOWS_LF_GRID_FEATURED_EPISODES:
    case WidgetTypes.HERO_WIDGET:
    case WidgetTypes.GRID_WIDGET:
    case WidgetTypes.LOCAL_OPENING: {
      enhancedProps.cardData = getWidgetCardsData(widgetContext, content);
      enhancedProps.theme = getWidgetTheme(widgetProps);
      break;
    }

    default:
      break;
  }

  return enhancedProps;
};

/**
 * Get a generic widget module by type
 * @param {Object} widget data object received from Feed API response
 * @param {number} key for React Widget component
 * @returns {JSX}
 */
export function getGenericWidget(widget, key) {
  const type = getKey(widget, 'settings.genericWidget.type', 'default');
  const mappedWidget = widgetMapping[type] || widgetMapping.ContentCarousel;
  const LoadableWidget = Loadable({
    loader: mappedWidget.loader,
    loading: PlaceholderProvider(widget),
    modules: mappedWidget.modules,
  });

  return <LoadableWidget {...getWidgetProps(widget, mappedWidget, key)} />;
}

/**
 * Determines if widget type should not generate an actual widget to be
 * rendered.
 * @param {string} widgetType the type of the widget
 * @returns {boolean}
 */
const shouldSkipWidget = widgetType => WIDGET_TYPES_TO_SKIP.includes(widgetType);

/**
 * Determines if a widget is generic.
 * @param {string} widgetType the type of the widget
 * @returns {boolean}
 */
const isGenericWidget = widgetType => widgetType === WidgetTypes.GENERIC_WIDGET_MODULE;

/**
 * Factory for building a widget
 * @param {Object} widget data object as received from Feed API response
 * @param {number} key for React Widget component
 * @param {Object} data from API
 * @returns {JSX}
 */
export function getWidget(widget, key, data) {
  if (shouldSkipWidget(widget.type)) return null;

  if (isGenericWidget(widget.type)) return getGenericWidget(widget, key);
  const mappedWidget = widgetMapping[widget.type]
    || widgetMapping.ContentCarousel;
  const LoadableWidget = Loadable({
    loader: mappedWidget.loader,
    loading: PlaceholderProvider(widget),
    modules: mappedWidget.modules,
  });
  const widgetProps = {
    ...getWidgetProps(widget, mappedWidget, key),
    variant: getKey(data, 'theme.variant', 'light'),
  };

  return <LoadableWidget {...enhanceWidgetProps(widget, widgetProps, data)} />;
}

/**
 * Determines if a widget should be lazy loaded based on its type and its
 * ordering position on the page.
 * @param {Object} widget the widget object
 * @param {Object} widgetPosition the widget position index on the page
 * @returns {boolean}
 */
export function shouldLazyLoadWidget({ widget, widgetPosition }) {
  const widgetType = getWidgetType(widget);

  if (lazyloadConfig.widgetsAlreadyLazyLoaded.includes(widgetType)) {
    return false;
  }

  return isDesktop(Store)
    ? widgetPosition >= DESKTOP_LAZY_LOAD_POSITION
    : widgetPosition >= MOBILE_LAZY_LOAD_POSITION;
}

/**
 * Render a widget
 * @param {Object} widget Widget to render
 * @param {Object} data Page Data
 * @param {number} idx Widget index in the array
 * @returns {JSX}
 */
export function renderWidget(widget, data, idx) {
  // eslint-disable-next-line camelcase
  const index = widget.analyticsData?.widget?.widget_pos ?? idx;
  return (
    <div
      className="widget"
      data-position={index}
      data-widget-type={getWidgetType(widget)}
    >
      {getWidget(widget, index, data)}
    </div>
  );
}

/**
 * Return a server-side lazy loaded widget
 * @param {Object} widget Widget to lazy load
 * @param {Object} data Page Data
 * @param {number} idx Widget index in the array
 * @param {string} device users device type
 * @returns {JSX}
 */
export function serverSideLazyLoad(widget, data, idx, device) {
  const lazyloadProps = getKey(lazyloadConfig, `${widget.type}.${device}`, lazyloadConfig.default);
  const widgetSettings = getKey(widget, 'settings', {});
  // Preserve local branding if we're on a local page.
  const requestingUrl = data.tvStation?.uri || data.uri;

  return (
    <ServerSideLazyLoad
      uri={`${requestingUrl}?wid=${widgetSettings.uid}&mrpts=${widgetSettings.uid
        + data.feedGeneratedAt}`}
      apiType="widget"
      offset={getKey(global, 'window.innerHeight', 500)}
      placeholder={<div style={{ height: lazyloadProps.height }} />}
    >
      {widgetData => renderWidget(
        {
          ...widget,
          contents: widgetData?.widget?.contents,
          commonRootSection: widgetData?.widget?.commonRootSection,
          analyticsData: {
            widget: {
              ...widgetData?.widget?.analyticsData?.widget,
            },
          },
        },
        data,
        idx
      )
      }
    </ServerSideLazyLoad>
  );
}

/**
 * Return a client-side lazy loaded widget
 * @param {Object} widget Widget to lazy load
 * @param {Object} data Page Data
 * @param {number} idx Widget index in the array
 * @param {boolean} usePlaceholder True if we should render a placeholder
 * @param {string} device users device type
 * @returns {JSX}
 */
export function clientSideLazyLoad(widget, data, idx, usePlaceholder, device) {
  const theme = getTheme(Store);
  const lazyloadProps = getKey(lazyloadConfig, `${widget.type}.${device}`, lazyloadConfig.default);
  const id = `${widget.id}-${idx}`;
  let placeholder = null;

  if (usePlaceholder) {
    placeholder = getWidgetPlaceholder({ widget, theme });
  }

  return (
    <LazyLoad key={id} {...lazyloadProps} once placeholder={placeholder}>
      {renderWidget(widget, data, idx)}
    </LazyLoad>
  );
}

/**
 * Helper to get widgets from API
 * @param {Object} data from API
 * @param {boolean} lazyLoadFirstWidget Whether to lazy load the first widget,
 * defaults to false
 * @param {string} widgetKeyOverride key to look for widgets instead of the
 * default one
 * @param {string} device users device
 * @returns {Array}
 */
export function parseWidgets(
  data,
  lazyLoadFirstWidget = false,
  widgetKeyOverride = '',
  device = 'mobile',
) {
  let widgets = [<div key="0" />];
  let shouldLazyLoad = lazyLoadFirstWidget;
  const widgetListKey = widgetKeyOverride || 'widgets';

  if (hasKey(data, widgetListKey) && isValidArray(data[widgetListKey])) {
    let contentItemCount = 0;
    let usePlaceholder = true;
    widgets = data[widgetListKey]
      .filter(widget => widget)
      .map((widget, idx) => {
        let widgetComponent;
        const serverSideLoaded = getKey(widget, 'settings.lazyLoaded', false);

        if (serverSideLoaded) {
          widgetComponent = serverSideLazyLoad(widget, data, idx, device);
        } else if (shouldLazyLoad) {
          widgetComponent = clientSideLazyLoad(
            widget,
            data,
            idx,
            usePlaceholder,
            device
          );
        } else {
          widgetComponent = renderWidget(widget, data, idx);
        }

        // Determine if next widget should be lazy loaded
        shouldLazyLoad = shouldLazyLoadWidget({
          widget: data[widgetListKey][idx + 1],
          widgetPosition: idx + 1,
        });

        // Accumulate the content count and use that to determine how many
        // widgets to use a placeholder for in order to have enough links
        // generated for SEO
        if (exists(widget.contents)) {
          contentItemCount += widget.contents.length;
          // Use a placeholder on the next widget if the content count already
          // exceeded the value configured for how many content items to load
          // (for SEO purposes)
          usePlaceholder = contentItemCount < appConfig.features.section.seoContentItemsCount;
        }

        /* istanbul ignore next */
        return <ErrorBoundary>{widgetComponent}</ErrorBoundary>;
      });
  }

  return widgets;
}

/**
 * Helper to inject ads at data level
 * @param {Object} data of the section
 * @returns {Array}
 */
export function parseWidgetsWithAds(data) {
  const device = getDevice(Store);
  const types = typesWithTopAd[device];
  const skipList = skipTopWidgetsList[device];
  const url = getKey(data, 'uri', '');
  const widgets = getKey(data, 'widgets', []);
  const pageCategory = getPageCategory(Store);
  // Check if there are any ads prior to parsing our widgets
  const widgetsConfig = getWidgetsConfig({ data });
  let widgetsAbove = widgetsConfig.any;

  // Page category specific widgets
  if (pageCategory && hasKey(widgetsConfig, pageCategory)) {
    widgetsAbove = widgetsAbove.concat(widgetsConfig[pageCategory]);
  }

  // If any of these widgets will carry a top ad dispatch an action to do so
  const shouldInsertTopAd = widgetsAbove.filter(
    w => w.insertTopAd || (w.advertisement && w.advertisement === AdTypes.TOP_AD)
  ).length > 0;

  if (shouldInsertTopAd) {
    Store.dispatch(AdActions.insertTopAd());
  }

  const widgetsWithAds = adHelper.getWidgetDataWithAds({
    widgets,
    typesWithTopAd: types,
    url,
    topAdInserted: isTopAdInserted(Store),
    skipList,
    device,
  });
  const pageData = {
    ...data,
    widgets: widgetsWithAds,
  };

  return parseWidgets(pageData, false, '', device);
}

/**
 * Helper to inject static widgets
 * @param {Object} data of the section
 * @returns {Array}
 */
export function parseStaticWidgets(data) {
  return parseWidgets(data, false, 'staticWidgets');
}
