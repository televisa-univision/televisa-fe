import React, { useMemo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import paginateWidget from '@univision/fe-commons/dist/utils/api/widgets/pagination';
import { pageUriSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';
import getKey from '@univision/fe-utilities/helpers/object/getKey';
import localization from '@univision/fe-utilities/localization';
import CardTracker from '@univision/fe-commons/dist/utils/tracking/tealium/card/CardTracker';

import IndexCard from '../../../cards/IndexCard';
import ListButton from '../../List/ListButton';
import Styles from './IndexListContent.styles';
import Loading from '../../../Loading';

const ITEMS_WITH_IMAGE = 5;
const PAGE_LIMIT = 20;

const Item = styled.div`
  ${Styles.item}
`;

/**
 * Content component for IndexList
 * @param {Object} props - props of the component
 * @property {Array} props.content - widget content
 * @property {string} props.device - user device
 * @property {Object} props.theme - widget theme
 * @property {Object} props.widgetContext - widget context
 * @returns {JSX}
 */
const IndexListContent = ({
  content,
  device,
  theme,
  widgetContext,
}) => {
  const currentPageUri = useSelector(pageUriSelector);
  const [isLoading, setIsLoading] = useState(false);
  const [canLoadMore, setCanLoadMore] = useState(true);
  const [loadedContent, setLoadedContent] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { isWorldCupMVP } = widgetContext;
  const renderCards = useMemo(() => {
    if (!isValidArray(content)) {
      return null;
    }

    const elements = [...content, ...loadedContent];

    return elements.map((item, idx) => {
      const hideImage = idx + 1 > ITEMS_WITH_IMAGE;

      return (
        <Item key={item?.uid}>
          <IndexCard
            {...item}
            device={device}
            hideImage={hideImage}
            theme={theme}
            widgetContext={widgetContext}
          />
        </Item>
      );
    });
  }, [
    content,
    device,
    loadedContent,
    theme,
    widgetContext,
  ]);

  // Track when a user clicks the load more button
  const trackMoreClick = CardTracker.onClickHandler(
    { title: '', uid: '' },
    widgetContext,
    'ver_mas',
  );

  useEffect(() => {
    /**
     * Sets new content to be displayed in the widget
     * @param {Array} newContent array containing the new content to be displayed in the widget
     */
    const setNewContent = (newContent) => {
      setIsLoading(false);
      setCurrentPage(currentPage + 1);
      setLoadedContent([
        ...loadedContent,
        ...newContent,
      ]);
    };

    /**
     * Retrieves from API
     */
    const getApiContent = async () => {
      const pagination = await paginateWidget(
        widgetContext,
        {
          pageUri: currentPageUri,
          offset: currentPage * PAGE_LIMIT,
          limit: PAGE_LIMIT,
        }
      );
      const newContent = getKey(pagination, 'contents', []);

      if (isValidArray(newContent)) {
        const currentContentIds = [...content, ...loadedContent].map((c) => {
          return c?.uid;
        });
        setNewContent(
          newContent.filter(c => !currentContentIds.includes(c?.uid))
        );
      } else {
        setIsLoading(false);
        setCanLoadMore(false);
      }
    };

    /**
     * Gets new content
     */
    const getNewContent = async () => {
      if (isLoading && canLoadMore) {
        trackMoreClick();
        await getApiContent();
      }
    };

    getNewContent();
  }, [
    canLoadMore,
    content,
    currentPage,
    currentPageUri,
    isLoading,
    loadedContent,
    trackMoreClick,
    widgetContext,
  ]);

  if (!renderCards) {
    return null;
  }

  return (
    <>
      {renderCards}
      {(!isLoading && canLoadMore) && (
        <div>
          <ListButton
            label={localization.get('loadMore')}
            theme={theme}
            onClick={() => { setIsLoading(true); }}
            isWorldCupMVP={isWorldCupMVP}
          />
        </div>
      )}
      {isLoading && (
        <Loading
          size="medium"
          theme={theme}
        />
      )}
    </>
  );
};

IndexListContent.propTypes = {
  content: PropTypes.array,
  device: PropTypes.oneOf(['mobile', 'tablet', 'desktop']),
  theme: PropTypes.object,
  widgetContext: PropTypes.object,
};

IndexListContent.defaultProps = {
  device: 'mobile',
  theme: {},
  widgetContext: {},
};

export default IndexListContent;
