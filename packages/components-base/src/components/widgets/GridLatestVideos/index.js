import React from 'react';
import PropTypes from 'prop-types';

import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import {
  hasKey,
  getKey,
  isValidArray,
  locationRedirect,
  toRelativeUrl,
} from '@univision/fe-commons/dist/utils/helpers';
import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';
import Button from '../../Button';
import Image from '../../Image';
import LongformWrapper from '../../LongformWrapper';
import TopicBar from '../../TopicBar';
import ContentCard from '../../ContentCard';
import Clickable from '../../Clickable';

import Styles from './GridLatestVideos.scss';
import bgShowsData from './bgShowsData.json';

/**
 * Grid Latest Videos Component
 * @param {Object} props component properties
 * @returns {JSX}
 */
const GridLatestVideos = (props) => {
  const {
    content,
    settings,
    theme,
    widgetContext,
  } = props;
  if (!isValidArray(content)) return null;
  const elem = content[0];
  const videos = content.filter(item => item.type === 'video');
  const imgData = getKey(bgShowsData, toRelativeUrl(elem.uri), null);

  /**
   * Event when clicking on main image
   */
  const onMainImageClick = () => {
    WidgetTracker.track(WidgetTracker.events.click, { widgetContext, target: 'content' });
    locationRedirect(elem.uri)();
  };

  return (
    <LongformWrapper className={Styles.gridWrapper}>
      {hasKey(settings, 'title') && (
        <TopicBar
          settings={{
            title: settings.title,
            titleLink: settings.titleLink,
          }}
          theme={theme}
          variant="dark"
          widgetContext={widgetContext}
        />
      )}
      <Button onClick={onMainImageClick} plain className={Styles.imgWrapper}>
        <Image src={imgData} alt={elem.title} />
      </Button>
      <div className={`${Styles.cardsWrapper} row`}>
        {
          videos.map((item) => {
            const { uid } = item;
            return (
              <div className={`col-6 col-md-3 ${Styles.cardWrapper}`} key={uid}>
                <ContentCard
                  {...item}
                  primaryTag={item.primaryTag}
                  title={item.title}
                  showTag={false}
                  showDesc={false}
                  theme={theme}
                  variant="dark"
                  widgetContext={widgetContext}
                />
              </div>
            );
          })
        }
      </div>
      <div className={`row ${Styles.center}`}>
        <div className="col-12 col-md-6">
          <Clickable
            type="link"
            appearance="secondary"
            size="medium"
            align="center"
            variant="dark"
            href={elem.uri}
            label={localization.get('viewMoreEpisodes')}
            className={Styles.moreEpisodes}
          />
        </div>
      </div>
    </LongformWrapper>
  );
};

/**
 * @property {Array} content Array of content items to be used by this widget
 * @property {Object} settings Object with this widget's settings
 * @param {Object} theme Used for applying theme colors
 * @param {Object} widgetContext The context widget data
 */

GridLatestVideos.propTypes = {
  content: PropTypes.array.isRequired,
  settings: PropTypes.object.isRequired,
  theme: PropTypes.object,
  widgetContext: PropTypes.object,
};

export default GridLatestVideos;
