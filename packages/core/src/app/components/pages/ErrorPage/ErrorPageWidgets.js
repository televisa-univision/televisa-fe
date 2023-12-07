import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { accessTokenSelector } from '@univision/fe-commons/dist/store/selectors/user-selectors';

import { isValidArray } from '@univision/fe-commons/dist/utils/helpers';
import fetch from '@univision/fe-commons/dist/utils/api/content/fetch';
import clientLogging from '@univision/fe-commons/dist/utils/logging/clientLogging';
import extractContentIds from '@univision/fe-commons/dist/utils/helpers/extractContentIds';
import { fetchReactions } from '@univision/fe-commons/dist/store/slices/reactions/reactions-slice';

import { parseWidgets } from '../../../utils/factories/widgetFactory';
import Styles from './ErrorPageWidgets.scss';

const STATUS_ERROR_404_URL = '/status-404-error';

/**
 * ErrorPageWidgets component
 * @returns {JSX}
 */
const ErrorPageWidgets = () => {
  const [widgets, setWidgets] = useState([]);
  const accessToken = useSelector(accessTokenSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    /**
     * Fetches widgets data related to 404 page
     */
    const fetchData = async () => {
      try {
        if (accessToken) {
          // Fetch errors will be catched and logged
          const data = await fetch(STATUS_ERROR_404_URL);

          // Fetches reactions, if they fail, the error will be catched and logged
          dispatch(
            fetchReactions({
              contentIds: extractContentIds({ data }),
            })
          );
          // Renders widgets
          setWidgets(
            parseWidgets(data)
          );
        }
      } catch (e) {
        // Unable to load widgets or reactions
        e.message = `Unable to load widgets or reactions: ${e.message}`;
        clientLogging(e);
      }
    };

    // Done this way to avoid race conditions
    fetchData();
  }, [accessToken, dispatch]);

  if (!isValidArray(widgets)) return null;

  return (
    <div className={`${Styles.container} col-12`}>
      {widgets}
    </div>
  );
};

export default ErrorPageWidgets;
