import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { getKey, hasKey, isValidArray } from '@univision/fe-commons/dist/utils/helpers';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import Store from '@univision/fe-commons/dist/store/store';
import features from '@univision/fe-commons/dist/config/features';
import { isCurrentPage, isUnivisionSite } from '@univision/fe-commons/dist/store/storeHelpers';
import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';

import LongformWrapper from '../../LongformWrapper';
import TopicBar from '../../TopicBar';
import ContentCard from '../../ContentCard';

import Styles from './FourAcrossGrid.scss';
import Clickable from '../../Clickable';

/**
 * Widget: Four Across Grid
 * @param {Object} props React Props for this component
 * @returns {JSX}
 * @constructor
 */
const FourAcrossGrid = (props) => {
  const {
    content, device, settings, theme, widgetContext, alignment, view,
  } = props;

  /**
   * @param {Number} limit Limits the amount of items in the widget.
   * Defaults to length of content.
   */
  const limit = getKey(settings, 'contentLimit', content.length);
  let GridWrapper = 'div';
  let { variant } = props;
  let showViewMore = false;
  let labelViewMore = '';
  const agnosticType = settings.type === 'agnosticepisodeswidget';
  const isShow = features.shows.showsRedesign();
  variant = isShow ? 'dark' : variant;
  if (!isValidArray(content)) return null;
  const elem = content[0];
  if (agnosticType) {
    GridWrapper = LongformWrapper;
    variant = 'dark';
    showViewMore = isUnivisionSite(Store) && !isCurrentPage(Store, ['/shows']);
    labelViewMore = elem.type === 'video' ? localization.get('exploreEpisodes') : localization.get('viewMoreTVShows');
  }

  /**
   * Content Card list
   * @constructor
   */
  const contentCardList = content.filter(
    (cardContent, index) => index < limit
  ).map((card) => {
    const { uid } = card;
    const isVertical = view === 'vertical';

    return (
      <div
        className={classnames(
          { 'col-6': isVertical },
          'col-sm-6 col-md-3',
          Styles.card
        )}
        key={uid}
      >
        <ContentCard
          {...card}
          device={device}
          showDesc={false}
          showTag={!agnosticType}
          theme={theme}
          variant={variant}
          view={view}
          widgetContext={widgetContext}
        />
      </div>
    );
  });

  const separator = !agnosticType ? { separator: 'top' } : {};

  /**
   * CTA click tracker
   */
  const ctaOnClick = () => {
    WidgetTracker.track(WidgetTracker.events.click, {
      widgetContext,
      target: 'ver_mas',
    });
  };

  return (
    <GridWrapper className={classnames('uvs-widget-lead', {
      /**
         * `multi-row` removes bottom margin applied by `uvs-widget` to prevent double margins
         * at the bottom of the widget since each card will now carry it's own margin as a result
         * of there being multiple lines
         */
      [Styles['multi-row']]: content.length > 4,
    }, { [Styles.dark]: isShow })}
    >
      {hasKey(settings, 'title')
        && contentCardList && (
          <TopicBar
            {...separator}
            settings={{
              title: settings.title,
              titleLink: settings.titleLink,
            }}
            theme={theme}
            variant={variant}
            widgetContext={widgetContext}
          />
        )}
      <div
        className={`row ${Styles[alignment]}`}
      >
        {contentCardList}
      </div>
      {showViewMore && (
        <div className={`row ${Styles.center}`}>
          <div className="col-12 col-md-6">
            <Clickable
              type="link"
              appearance="secondary"
              href="/shows"
              label={labelViewMore}
              size="small"
              align="center"
              variant="dark"
              className={Styles.longformViewMore}
              onClick={ctaOnClick}
            />
          </div>
        </div>
      )}
    </GridWrapper>
  );
};

/**
 * @param {Object} alignment Determines horizontal alignment of cards if less than 4
 * @param {Object} content Content returned from the API
 * @param {String} device Device type user is on
 * @param {String} settings Widget settings (title, titleLink & contentLimit)
 * @param {Object} theme Used for applying theme colors
 * @param {String} view Type of contentCard view
 */
FourAcrossGrid.propTypes = {
  alignment: PropTypes.oneOf(['left', 'center', 'right']),
  content: PropTypes.array.isRequired,
  device: PropTypes.oneOf(['mobile', 'tablet', 'desktop']),
  settings: PropTypes.shape({
    title: PropTypes.string,
    titleLink: PropTypes.string,
    contentLimit: PropTypes.number,
    type: PropTypes.string,
  }),
  theme: PropTypes.object,
  variant: PropTypes.oneOf(['light', 'dark']),
  widgetContext: PropTypes.object,
  view: PropTypes.oneOf(['vertical', 'horizontal']),
};

FourAcrossGrid.defaultProps = {
  alignment: 'left',
  settings: {
    title: '',
    titleLink: '',
    contentLimit: 4,
  },
  variant: 'light',
  view: 'vertical',
};

export default FourAcrossGrid;
