import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import fetchContent from '@univision/fe-commons/dist/utils/api/content/fetch';
import { fetchReactions } from '@univision/fe-commons/dist/store/slices/reactions/reactions-slice';
import extractContentIds from '@univision/fe-commons/dist/utils/helpers/extractContentIds';

import LazyWrapper from '../LazyWrapper';

let count = 0;

/**
 * getReactions for the current widget
 * @param {Object} data widgetData
 * @param {func} dispatch from redux context
 */
function getReactions(data, dispatch) {
  // Fetch reactions
  const contentIds = extractContentIds({
    data: [data],
    isWidget: true,
  });
  // TODO: refactor to move this to data collector on SSR
  dispatch(
    fetchReactions({ contentIds }),
  );
}

/**
 * getContent for the current widget
 * @param {string} uri widgetData uri
 * @param {func} callback func to dispatch when data resolved
 */
function getWidgetContent(uri, callback) {
  fetchContent(uri, 'widget').then((response) => {
    const data = response?.widget || {};
    callback(data);
  });
}

/**
 * Lazy load widget fetching data from web-api
 * @param {Object} props components props
 * @param {func} props.children children function
 * @param {string} props.uri content uri
 * @param {JSX} props.placeholder loading component
 * @param {number} props.offset of the current widget
 * @returns {JSX}
 */
const LazyWidget = ({
  children,
  uri,
  placeholder,
  offset,
}) => {
  const [isVisible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const [widgetData, setWidgetData] = useState(null);

  // onShow get called once the component is visible
  const onShow = useCallback(() => {
    setVisible(true);
  }, [setVisible]);

  const preloadContent = useCallback((e) => {
    // remove listener inmediately once first event is dispatched
    e.currentTarget.removeEventListener(e.type, preloadContent);

    // delay between fetches, to avoid blocking time in the mean thread
    const delay = count * 500;
    count += 1;
    // setWidgetData get called when the promise inside getWidgetContent is resolved
    setTimeout(() => getWidgetContent(uri, setWidgetData), delay);
  }, [uri]);

  useEffect(() => {
    // preloadContent on the first scroll, we make this to avoid fetches in the
    // initial load of the page
    global.window.addEventListener('scroll', preloadContent);

    return () => global.window.removeEventListener('scroll', preloadContent);
  }, [preloadContent]);

  useEffect(() => {
    // getReactions will be executed only if the component gets visible (the
    // intersection has dispatched onShow callback) and when the promise of getContent is
    // resolved, so we make sure widgetData is ready to avoid race conditions
    if (isVisible && widgetData) {
      getReactions(widgetData, dispatch);
    }

  // we don't need to put dispatch as dep
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, widgetData]);

  return (
    <LazyWrapper onShow={onShow} offset={`${offset}px`} once>
      { isVisible && widgetData ? children(widgetData) : placeholder }
    </LazyWrapper>
  );
};

LazyWidget.propTypes = {
  children: PropTypes.func.isRequired,
  uri: PropTypes.string.isRequired,
  placeholder: PropTypes.node.isRequired,
  offset: PropTypes.number,
};

export default LazyWidget;
