import React from 'react';
import LazyLoad from 'react-lazyload';
import Loadable from 'react-loadable';
import { hasKey } from '@univision/fe-commons/dist/utils/helpers';

import { ContentPlaceholder } from '@univision/fe-components-base/dist/components/Placeholder';

export const widgetMapping = {
  ContentCarouselWidget: () => import(/* webpackChunkName: "articleWidgets/ContentCarousel" */ '@univision/fe-components-base/dist/components/widgets/ContentCarousel'),
  ImageItems: () => import(/* webpackChunkName: "articleWidgets/ImageItems" */ 'components/widgets/ImageItems/ImageItems'),
};

/**
 * Widgets/promos to be displayed below primary content
 * basically a paired down version of widgetFactory.js
 * @param {Object} props with widgets from api
 * @param {boolean} lazyLoading Flag to wrap components in a LazyLoad
 * @returns {Array|null} - the array of widgets to display, or null if non found.
 */
export default function parseContentWidgets ({ widgets }, lazyLoading = true) {
  if (!Array.isArray(widgets)) return null;

  return widgets.map((_widget, i) => {
    if (!hasKey(_widget, 'settings.genericWidget.type')) return null;

    const { settings, contents } = _widget;

    const LoadableComponent = Loadable({
      loader: widgetMapping[settings.genericWidget.type] || widgetMapping.ImageItems,
      loading: ContentPlaceholder,
    });

    const widget = {
      settings,
      content: contents,
    };

    let widgetComponent = null;

    if (!lazyLoading) {
      widgetComponent = <div><LoadableComponent {...widget} /></div>;
    } else {
      widgetComponent = (
        /* eslint-disable react/no-array-index-key */
        <LazyLoad key={i} height={200} offset={100} once>
          <LoadableComponent {...widget} />
        </LazyLoad>
      );
    }

    return widgetComponent;
  });
}
