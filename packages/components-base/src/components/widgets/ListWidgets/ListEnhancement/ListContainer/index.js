import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import classnames from 'classnames';

import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import getKey from '@univision/fe-utilities/helpers/object/getKey';
import localization from '@univision/fe-utilities/localization';
import paginateWidget from '@univision/fe-commons/dist/utils/api/widgets/pagination';
import CardTracker from '@univision/fe-commons/dist/utils/tracking/tealium/card/CardTracker';
import Button from '@univision/shared-components/dist/components/v3/Button';
import features from '@univision/fe-commons/dist/config/features';

import Loading from '../../../../Loading';
import ListCards from '../ListCards';
import Styles from './ListContainer.styles';

const LoadingWrapper = styled(Loading)`
  ${Styles.loadingWrapper}
`;
const ButtonWrapperStyled = styled.div`
  ${Styles.buttonWrapper}
`;
const ButtonStyled = styled(Button)`
  ${Styles.buttonStyled}
`;

/**
 * Sets new cards to be displayed in the widget
 * @param {Array} newContent - array containing the new content to be displayed in the widget
 * @param {Array} loadedCards - currently loaded cards on widget
 * @param {number} currentPage - current page of cards content
 * @param {function} setIsLoading - set if widget is loading
 * @param {function} setCurrentPage - function to set current page
 * @param {function} setLoadedCards - function to set loaded cards
 */
const setNewContent = ({
  newContent, loadedCards, currentPage, setIsLoading, setCurrentPage, setLoadedCards,
}) => {
  setIsLoading(false);
  setCurrentPage(currentPage + 1);
  setLoadedCards([
    ...loadedCards,
    ...newContent,
  ]);
};

/**
 * Populates widget with content queried from API
 * @param {Object} widgetContext - the widgetContext
 * @param {string} currentPageUri - the current page uri
 * @param {number} currentPage - current page of cards content
 * @param {number} pageLimit - the current page limit for content
 * @param {array} cardData - the formatted card data
 * @param {Array} loadedCards - currently loaded cards on widget
 * @param {function} setIsLoading - set if widget is loading
 * @param {function} setCanLoadMore - set if widget can load more content
 * @param {function} setCurrentPage - function to set current page
 * @param {function} setLoadedCards - function to set loaded cards
 */
const getApiContent = async ({
  widgetContext,
  currentPageUri,
  currentPage,
  pageLimit,
  cardData,
  loadedCards,
  setIsLoading,
  setCanLoadMore,
  setCurrentPage,
  setLoadedCards,
}) => {
  const pagination = await paginateWidget(
    widgetContext,
    {
      pageUri: currentPageUri,
      offset: currentPage * pageLimit,
      limit: pageLimit,
    }
  );
  const newContent = getKey(pagination, 'contents', []);
  if (isValidArray(newContent)) {
    // merging both cards from props and the already loaded cards
    const currentContentIds = [...cardData, ...loadedCards].map((c) => {
      return getKey(c, 'uid');
    });
    setNewContent(
      {
        newContent: newContent.filter(c => !currentContentIds.includes(c.uid)),
        loadedCards,
        currentPage,
        setIsLoading,
        setCurrentPage,
        setLoadedCards,
      }
    );
  } else {
    // No more content, then we should disable the load more button
    setIsLoading(false);
    setCanLoadMore(false);
  }
};

/**
 * Loads new content from local array, if no more items are available then retrieve from web API
 * @param {bool} isLoading - true if widget is loading content
 * @param {number} localPages - total of local pages content
 * @param {Object} widgetContext - the widgetContext
 * @param {string} currentPageUri - the current page uri
 * @param {number} currentPage - current page of cards content
 * @param {number} pageLimit - the current page limit for content
 * @param {array} cardData - the formatted card data
 * @param {Array} loadedCards - currently loaded cards on widget
 * @param {function} setIsLoading - set if widget is loading
 * @param {function} setCanLoadMore - set if widget can load more content
 * @param {function} setCurrentPage - function to set current page
 * @param {function} setLoadedCards - function to set loaded cards
 * @param {function} trackClick - the tracking function
 * @param {function} getLocalContent - function to load the local content
 */
const getNewContent = async ({
  isLoading,
  localPages,
  widgetContext,
  currentPageUri,
  currentPage,
  pageLimit,
  cardData,
  loadedCards,
  setIsLoading,
  setCanLoadMore,
  setCurrentPage,
  setLoadedCards,
  trackClick,
  getLocalContent,
}) => {
  if (isLoading) {
    trackClick();
    if (currentPage < localPages) {
      getLocalContent();
    } else {
      await getApiContent({
        widgetContext,
        currentPageUri,
        currentPage,
        pageLimit,
        cardData,
        loadedCards,
        setIsLoading,
        setCanLoadMore,
        setCurrentPage,
        setLoadedCards,
      });
    }
  }
};

/**
 * List Enhancement component
 * @param {Object} props of the component
 * @param {array} [props.content] - the widgets content
 * @param {string} [props.currentPageUri] -  the current page uri
 * @param {string} [props.device] - the device currently on
 * @param {string} [props.flavor] - widget flavor
 * @param {number} [props.pageLimit] - the page limit
 * @param {Object} [props.theme] - the widget theme
 * @param {Object} [props.widgetContext] - the widgets context object
 * @returns {JSX}
 */
const ListContainer = ({
  content,
  currentPageUri,
  device,
  flavor,
  pageLimit,
  theme,
  widgetContext,
}) => {
  const localPages = Math.floor(getKey(content, 'length', 0) / pageLimit);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedCards, setLoadedCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [canLoadMore, setCanLoadMore] = useState(true);
  const buttonType = theme?.isDark ? 'containedTextIcon' : 'containedText';
  const cardData = content.slice(0, pageLimit);
  const isWorldCupMVP = features.deportes.isWorldCupMVP();
  const renderCard = (
    <ListCards
      cardElements={[...cardData, ...loadedCards]}
      device={device}
      enhancedWidgetContext={widgetContext}
      flavor={flavor}
      theme={theme}
    />
  );

  const trackClick = useCallback(CardTracker.onClickHandler(
    { title: '', uid: '' },
    widgetContext,
    'ver_mas'
  ), []);

  // New content retrieval
  useEffect(() => {
    /**
     * Populates widget with content available in the contents node
     */
    const getLocalContent = () => {
      // Check if we still have local content
      const newContent = content.slice(
        currentPage * pageLimit,
        (currentPage + 1) * pageLimit
      );
      setNewContent({
        newContent,
        loadedCards,
        currentPage,
        setIsLoading,
        setCurrentPage,
        setLoadedCards,
      });
    };

    getNewContent({
      isLoading,
      localPages,
      widgetContext,
      currentPageUri,
      currentPage,
      pageLimit,
      cardData,
      loadedCards,
      setIsLoading,
      setCanLoadMore,
      setCurrentPage,
      setLoadedCards,
      trackClick,
      getLocalContent,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    cardData,
    content,
    currentPage,
    isLoading,
    loadedCards,
  ]);
  /**
   * set is loading callback
   */
  const setLoadingCallback = () => {
    setIsLoading(true);
  };

  /**
   * Checks if a value for the gradient comes in the theme object
   * @returns {Object}
   */
  const formatGradient = () => {
    if (!theme?.gradient?.start || !theme?.gradient?.end) {
      return {
        gradient: {
          start: theme.primary,
          end: theme.secondary,
        },
      };
    }

    return {};
  };

  return (
    <div className="row">
      {renderCard}
      <div className={classnames({
        'col-12': true,
        'col-md-3': isWorldCupMVP,
      })}
      >
        {(!isLoading && canLoadMore && content.length > pageLimit) && (
          <ButtonWrapperStyled
            isWorldCupMvp={isWorldCupMVP}
            theme={theme}
            device={device}
          >
            <ButtonStyled
              onPress={setLoadingCallback}
              type={buttonType}
              isOutlined={theme?.isDark}
              useIcon={!isWorldCupMVP}
              icon={isWorldCupMVP ? null : 'arrowDown'}
              isWorldCupMvp={isWorldCupMVP}
              theme={{ ...theme, ...formatGradient() }}
            >
              {localization.get('loadMore')}
            </ButtonStyled>
          </ButtonWrapperStyled>
        )}
        {isLoading && (
          <LoadingWrapper
            size="medium"
            theme={theme}
          />
        )}
      </div>
    </div>
  );
};

ListContainer.propTypes = {
  content: PropTypes.array,
  currentPageUri: PropTypes.string,
  device: PropTypes.oneOf(['desktop', 'mobile', 'tablet']),
  flavor: PropTypes.string,
  pageLimit: PropTypes.number,
  theme: PropTypes.object,
  widgetContext: PropTypes.object,
};

export default ListContainer;
