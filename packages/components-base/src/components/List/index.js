import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Timeago from 'react-timeago';

import { getTimeAgoFormatter } from '@univision/fe-commons/dist/utils/helpers/timeago';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import { isValidArray } from '@univision/fe-commons/dist/utils/helpers';
import types from '@univision/fe-commons/dist/constants/labelTypes';
import * as AdTypes from '@univision/fe-commons/dist/utils/ads/ad-types';
import WithNativeMarker from '@univision/fe-commons/dist/components/ads/dfp/Native/WithNativeMarker';
import WithNative from '@univision/fe-commons/dist/components/ads/dfp/Native/WithNativeContent';
import { deviceSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';
import CardTracker from '@univision/fe-commons/dist/utils/tracking/tealium/card/CardTracker';

import Title from '../Title';
import Tag from '../Tag';
import Label from '../Label';
import { getType } from './helper';
import Styles from './List.styles';

const ListTitle = styled(Title).attrs({
  className: 'uvs-font-a-bold',
})`${Styles.title}`;
const TitleBar = styled.div`${Styles.titleBar}`;
const ListWrapper = styled.div`${Styles.listWrapper}`;
const DataContainer = styled.div`${Styles.dataContainer}`;
const DataContent = styled(Tag).attrs({
  className: 'uvs-font-a-bold',
})`${Styles.dataContent}`;
const DataTime = styled(Timeago).attrs({
  className: 'uvs-font-c-regular',
})`${Styles.dataTime}`;
const DataTitle = styled(Title).attrs({
  className: 'uvs-font-c-bold',
})`${Styles.dataTitle}`;
const LabelContent = styled(Label)`${Styles.labelContent}`;

/**
 * List component
 * @param {Object} props the propTypes
 * @param {Array} props.contentList  content list that will be displayed in the component.
 * @param {bool} props.hasAdSkin this card is rendered within the ad skin page
 * @param {string} props.title  title of the component.
 * @param {Object} props.widgetContext  widget context.
 * @returns {?JSX} the view
 */
export const List = ({
  contentList,
  hasAdSkin,
  title,
  widgetContext,
}) => {
  const trackArticleLink = useCallback((contentTitle, uid, idx, type) => {
    CardTracker.onClickHandler(
      { title: contentTitle, uid },
      {
        ...widgetContext,
        metaData: {
          ...widgetContext?.metaData,
          cardName: `${type} - List`,
          cardType: idx + 1,
        },
      },
      'content'
    )();
  }, [widgetContext]);
  const device = useSelector(deviceSelector);

  const contentData = useMemo(() => {
    if (!isValidArray(contentList)) return null;

    return contentList.map((currentContent, idx) => {
      let labelOrTitle = null;
      const typeFound = getType(currentContent.cardLabel);
      const DataContainerWithNative = WithNative(DataContainer);

      if (typeFound) {
        const hasLiveIcon = typeFound === types.LIVE;
        labelOrTitle = (
          <LabelContent
            hasLiveIcon={hasLiveIcon}
            label={currentContent.cardLabel}
            type={typeFound}
          />
        );
      } else {
        labelOrTitle = (
          <DataTitle>{currentContent?.primaryTag?.name}</DataTitle>
        );
      }

      const { title: contentTitle, uid, type } = currentContent;

      return (
        <DataContainerWithNative
          {...currentContent}
          actualDevice={device}
          adType={AdTypes.TRIPLELIFT_NATIVE_AD}
          hasAdSkin={hasAdSkin}
          key={currentContent.uid}
          onDevice={device}
          widgetContext={widgetContext}
        >
          {labelOrTitle}
          <DataContent
            hasAdSkin={hasAdSkin}
            link={currentContent?.uri}
            name={contentTitle}
            onClick={() => trackArticleLink(contentTitle, uid, idx, type)}
          />
          {!hasAdSkin && (
            <DataTime
              date={currentContent.publishDate}
              formatter={getTimeAgoFormatter(localization.getCurrentLanguage())}
            />
          )}
        </DataContainerWithNative>
      );
    });
  }, [contentList, device, trackArticleLink, hasAdSkin, widgetContext]);

  return (
    <ListWrapper>
      <ListTitle>{title}</ListTitle>
      <TitleBar hasAdSkin={hasAdSkin} />
      {contentData}
    </ListWrapper>
  );
};

List.propTypes = {
  contentList: PropTypes.array.isRequired,
  hasAdSkin: PropTypes.bool,
  title: PropTypes.string.isRequired,
  widgetContext: PropTypes.object.isRequired,
};

List.defaultProps = {
  hasAdSkin: false,
};

/**
* Defines which content the native ad should replace when loaded
* Lastly, apply Native Ad Marker before export
*/
const nativeAdPosition = 4;

const ListWithNative = WithNativeMarker(List, 'contentList', nativeAdPosition);

export default ListWithNative;
