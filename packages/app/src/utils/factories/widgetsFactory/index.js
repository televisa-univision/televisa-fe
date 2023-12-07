import React from 'react';
import LazyLoad from 'react-lazyload';

import {
  getWidgetType,
  isValidArray,
  getKey,
} from '@univision/fe-commons/dist/utils/helpers';
import * as widgetTypes from '@univision/fe-commons/dist/constants/widgetTypes';
import features from '@univision/fe-commons/dist/config/features';
import { getThemeFromVertical } from '@univision/fe-commons/dist/components/ThemeProvider/helpers';
import ErrorBoundary from '@univision/fe-commons/dist/components/ErrorBoundary';
import { shouldInjectTopAd } from '@univision/fe-commons/dist/utils/ads/Section/widgetAdInjector';
import skipTopWidgetsList from '@univision/fe-commons/dist/utils/ads/Section/skipTopWidgetsList';
import { getWidgetCardsData } from '@univision/fe-components-base/dist/utils/cardMapper/getWidgetCardsData';
import CardCarouselPlaceholder from '@univision/fe-components-base/dist/components/widgets/Placeholder/CardsCarousel';

import LazyWidget from '../../../components/base/LazyWidget';
import lazyloadConfig from './lazyloadConfig.json';
import widgetMapping from './widgetMapping';
import { appConfig } from '../../../config';

/**
 * How many widgets we eagerly load on mobile
 * @type {number}
 */
const MOBILE_SSR_COUNT = 1;
/**
 * How many widgets we eagerly load on desktop.
 * @type {number}
 */
const DESKTOP_SSR_COUNT = 2;
/**
 * Widget types that should be excluded on lazyload rules
 * @type {string[]}
 */
const WIDGET_TYPES_TO_SKIP = [
  widgetTypes.ADVERTISEMENT_MODULE,
];
/**
 * Number of items to display with placeholder only for SEO purpose
 * @type {number}
 */
const SEO_CONTENT_ITEMS_COUNT = appConfig.features.section.seoContentItemsCount;
/**
 * // Ad treated as widget
 * @type {string[]}
 */
const AD_WIDGET_TYPES = [
  widgetTypes.ADVERTISEMENT,
];

/**
 * Class to encapsulate all methods and variables needed
 * to render list of widgets
 * - CMS will be checked for flag on widget that will lazyload data
 * - Firt and/or second widget will be render based on device
 */
export default class WidgetFactory {
  /**
   * Contructor to collect pageData
   * @param {Object} pageData - Page props
   * @param {string} widgetKeyOverride - In case other than widget is needed
   */
  constructor(pageData, widgetKeyOverride = 'widgets') {
    this.pageData = pageData;
    this.data = getKey(pageData, 'data', {});
    this.theme = getKey(pageData, 'theme', {});
    this.device = getKey(pageData, 'device', 'mobile');
    this.widgetKeyOverride = widgetKeyOverride;
    this.offset = global?.window?.innerHeight ?? 500;
    this.serverRenderCount = 0;
  }

  /**
   * Get the widget placeholder
   * @param {Object} widget current widget to get placeholder
   * @param {Object} lazyloadProps to be used in the current placeholder
   * @returns {JSX}
   */
  getPlaceholder(widget, lazyloadProps) {
    const WidgetPlaceholder = widgetMapping[widget.type]?.placeholder || CardCarouselPlaceholder;

    return (
      <WidgetPlaceholder
        content={widget.contents || []}
        device={this.device}
        lazyloadProps={lazyloadProps}
        theme={this.theme}
        settings={widget.settings}
      />
    );
  }

  /**
   * Determines if a widget should be lazy loaded based on its type and its
   * ordering position on the page.
   * @param {Object} widget the widget object
   * @returns {boolean}
   */
  shouldLazyLoadWidget(widget) {
    const widgetType = getWidgetType(widget);
    const ssrCount = this.device === 'desktop'
      ? DESKTOP_SSR_COUNT
      : MOBILE_SSR_COUNT;

    if (
      this.serverRenderCount < ssrCount
      // verify exclusion list only on initial widgets
      && (skipTopWidgetsList[this.device].includes(widgetType)
        // Ads will include its own lazyload logic
        || AD_WIDGET_TYPES.includes(widgetType))
    ) {
      return false;
    }

    if (this.serverRenderCount < ssrCount) {
      this.serverRenderCount += 1;
      return false;
    }
    return true;
  }

  /**
   * Get lazyloaded widgets with data
   * mainly to be used on SEO list at the end of sections
   * @returns {array}
   */
  getLazyLoadedWidgets() {
    const widgetData = this.data[this.widgetKeyOverride];
    this.serverRenderCount = 0;
    let lazyLoadedWidgets = [];
    if (isValidArray(widgetData)) {
      lazyLoadedWidgets = widgetData.filter(w => (
        isValidArray(w.contents)
        && !w.settings?.lazyLoaded
        && this.shouldLazyLoadWidget(w)
      ));
    }
    return lazyLoadedWidgets;
  }

  /**
   * Get widget specific theme
   * @param {Object} widgetProps props from the widget
   * @returns {Object}
   */
  getWidgetTheme(widgetProps) {
    return {
      ...this.theme,
      ...getThemeFromVertical(getKey(widgetProps, 'commonRootSection.uri')),
    };
  }

  /**
   * Determines if widget type should not generate an actual widget to be
   * rendered.
   * @param {string} widgetType the type of the widget
   * @returns {boolean}
   */
  shouldSkipWidget = widgetType => WIDGET_TYPES_TO_SKIP.includes(widgetType);

  /**
   * Determines if a widget is generic.
   * @param {string} widgetType the type of the widget
   * @returns {boolean}
   */
  isGenericWidget = widgetType => widgetType === widgetTypes.GENERIC_WIDGET_MODULE;

  /**
   * Gets the necessary props for widgets. Creates it from the original widget
   * and from the mapped widget.
   * @param {Object} widget data object received from Feed API response.
   * @param {Object} mappedWidget loadable widget obtained from the widget mapping
   * file.
   * @param {number} key for the actual React component.
   * @returns {Object}
   */
  getWidgetProps(widget, mappedWidget, key) {
    return {
      key,
      commonRootSection: widget.commonRootSection,
      content: widget.contents,
      settings: widget.settings,
      secondaryContent: widget.secondaryContent,
      theme: this.theme,
      device: this.device,
      shouldInjectTopAd: shouldInjectTopAd(this.pageData, key, widget),
      widgetContext: {
        id: getKey(widget, 'settings.uid'),
        name: mappedWidget.name,
        title: getKey(widget, 'settings.title'),
        type: mappedWidget.type,
        widgetType: widget.type,
        position: key,
        isActionBarEnabled: true, // forcing action bar on legacy cards
        isWorldCupMVP: features.deportes.isWorldCupMVP(),
      },
      ...widget.extraSettings,
    };
  }

  /**
   * Enhances original widget props with extra properties based on widget type.
   * @param {Object} widget data object received from Feed API response
   * @param {Object} widgetProps the original widget props
   * getWidgetProps.
   * @returns {Object}
   */
  enhanceWidgetProps(widget, widgetProps) {
    const enhancedProps = { ...widgetProps };
    const { widgetContext, content } = enhancedProps;

    switch (widget.type) {
      case widgetTypes.RADIO_GRID_STATIONS_BY_GENRE_FILTER:
      case widgetTypes.STATION_BY_GENRE_LIST:
        enhancedProps.allowedGenresForFiltering = widget.settings.tags || [];
        break;

      case widgetTypes.RADIO_SHOW_CARD_WIDGET:
        enhancedProps.title = this.data.title;
        break;

      case widgetTypes.RADIO_STATION_SCHEDULE_WIDGET:
      case widgetTypes.RADIO_BANNER_STATION_SCHEDULE:
        enhancedProps.title = widget.settings.title;
        enhancedProps.schedule = widget.settings.radioSchedule;
        break;

      case widgetTypes.SINGLE_WIDGET: {
        enhancedProps.cardData = getWidgetCardsData(widgetContext, content);
        enhancedProps.theme = this.getWidgetTheme(widgetProps);
        break;
      }

      case widgetTypes.CAROUSEL_WIDGET:
      case widgetTypes.LOCAL_OPENING:
      case widgetTypes.SHOWS_LF_GRID_FEATURED_EPISODES:
      case widgetTypes.HERO_WIDGET: {
        enhancedProps.cardData = getWidgetCardsData(widgetContext, content);
        enhancedProps.theme = this.getWidgetTheme(widgetProps);
        break;
      }

      case widgetTypes.GRID_WIDGET: {
        enhancedProps.cardData = getWidgetCardsData(widgetContext, content);
        enhancedProps.theme = this.getWidgetTheme(widgetProps);
        break;
      }

      case widgetTypes.LIST_WIDGET: {
        const listContentLimit = features.widgets.listWidget.contentLimit();
        enhancedProps.cardData = getWidgetCardsData(widgetContext, content);
        enhancedProps.contentLimit = listContentLimit;
        enhancedProps.theme = this.getWidgetTheme(widgetProps);
        break;
      }

      default:
        break;
    }

    return enhancedProps;
  }

  /**
   * Render a widget
   * @param {Object} widget Widget to render
   * @param {number} idx Widget index in the array
   * @returns {JSX}
   */
  renderWidget(widget, idx) {
    const index = idx + 1;
    return (
      <div
        className="widget"
        data-position={index}
        data-widget-type={getWidgetType(widget)}
        key={idx}
      >
        {this.getWidget(widget, index)}
      </div>
    );
  }

  /**
   * Provides widget loader
   * @param {Object} widget data object as received from Feed API response
   * @param {number} key for React Widget component
   * @returns {JSX}
   */
  getWidget(widget, key) {
    if (this.shouldSkipWidget(widget.type)) return null;
    let { type } = widget;
    if (this.isGenericWidget(widget.type)) {
      type = getKey(widget, 'settings.genericWidget.type', 'default');
    }
    // TODO: We need to find a way to default any possible option
    //  to display any widget not mapped or supported
    const mappedWidget = widgetMapping[type] ?? widgetMapping.ContentCarousel;
    const LoadableWidget = mappedWidget.loader;
    const widgetProps = {
      ...this.getWidgetProps(widget, mappedWidget, key),
      variant: getKey(this.theme, 'variant', 'light'),
    };
    return (
      <LoadableWidget offset={this.offset} {...this.enhanceWidgetProps(widget, widgetProps)} />
    );
  }

  /**
   * Get widget component based on page data
   * @param {string} type - Filter to get widgets of a specific type
   * @returns {Object}
   */
  getWidgetComponent(type) {
    if (isValidArray(this.data[this.widgetKeyOverride])) {
      const widget = this.data[this.widgetKeyOverride]
        .find(elem => elem?.type === type);

      if (widget) {
        return <ErrorBoundary>{this.renderWidget(widget, 0)}</ErrorBoundary>;
      }
    }

    return null;
  }

  /**
   * Get widget component based on page data
   * @param {boolean} lazyLoadAll - Forze all lazyload for cases like article recirculation
   * @returns {Array}
   */
  parseWidgets(lazyLoadAll = false) {
    let widgets = [<div key="0" />];
    const widgetData = this.data[this.widgetKeyOverride];
    if (isValidArray(widgetData)) {
      let contentItemCount = 0;
      let usePlaceholder = true;
      widgets = widgetData
        .filter(widget => widget)
        .map((widget, idx) => {
          let widgetComponent;
          const serverSideLoaded = getKey(widget, 'settings.lazyLoaded', false);
          const lazyLoadClient = getKey(widget, 'settings.lazyLoadClient', true);
          // Validate id widget should be lazyloaded based on device and position
          const shouldLazyLoad = lazyLoadClient && (lazyLoadAll
            || this.shouldLazyLoadWidget(widget)
          );
          if (serverSideLoaded) {
            widgetComponent = this.serverSideLazyLoad(widget, idx);
          } else if (shouldLazyLoad) {
            widgetComponent = this.clientSideLazyLoad(
              widget,
              idx,
              usePlaceholder,
            );
          } else {
            widgetComponent = this.renderWidget(widget, idx);
          }

          // Accumulate the content count and use that to determine how many
          // widgets to use a placeholder for in order to have enough links
          // generated for SEO
          if (isValidArray(widget.contents)) {
            contentItemCount += widget.contents.length;
            // Use a placeholder on the next widget if the content count already
            // exceeded the value configured for how many content items to load
            // (for SEO purposes)
            usePlaceholder = contentItemCount < SEO_CONTENT_ITEMS_COUNT;
          }
          /* istanbul ignore next */
          return <ErrorBoundary key={widget.id || idx}>{widgetComponent}</ErrorBoundary>;
        });
    }

    return widgets;
  }

  /**
   * Helper to collect widget props
   * @param {Object} widget to be lazyloaded
   * @returns {*}
   */
  getWidgetLazyProps = widget => getKey(lazyloadConfig, `${widget.type}.${this.device}`, lazyloadConfig.default);

  /**
   * Return a client-side lazy loaded widget
   * @param {Object} widget Widget to lazy load
   * @param {number} idx Widget index in the array
   * @param {boolean} usePlaceholder True if we should render a placeholder
   * @param {string} device users device type
   * @returns {JSX}
   */
  clientSideLazyLoad(
    widget,
    idx,
    usePlaceholder,
  ) {
    const lazyloadProps = this.getWidgetLazyProps(widget);
    const id = `${widget.id}-${idx}`;
    let placeholder = null;

    if (usePlaceholder) {
      placeholder = this.getPlaceholder(widget, lazyloadProps);
    }

    return (
      <LazyLoad key={id} {...lazyloadProps} once placeholder={placeholder}>
        {this.renderWidget(widget, idx)}
      </LazyLoad>
    );
  }

  /**
   * Return a server-side lazy loaded widget
   * @param {Object} widget Widget to lazy load
   * @param {number} idx Widget index in the array
   * @param {string} device users device type
   * @returns {JSX}
   */
  serverSideLazyLoad(
    widget,
    idx,
  ) {
    const lazyloadProps = this.getWidgetLazyProps(widget);
    const widgetSettings = getKey(widget, 'settings', {});
    const uri = `${this.data.uri}?wid=${widgetSettings.uid}&mrpts=${widgetSettings.uid + this.data.feedGeneratedAt}`;
    const placeholder = this.getPlaceholder(widget, lazyloadProps);

    return (
      <LazyWidget
        uri={uri}
        offset={this.offset}
        placeholder={placeholder}
      >
        {widgetData => this.renderWidget(
          {
            ...widget,
            contents: getKey(widgetData, 'contents', []),
            commonRootSection: getKey(widgetData, 'commonRootSection'),
          },
          idx,
        )
        }
      </LazyWidget>
    );
  }
}
