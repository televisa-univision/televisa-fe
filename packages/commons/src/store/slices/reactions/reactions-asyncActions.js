/* eslint-disable import/no-extraneous-dependencies */
import { createAsyncThunk } from '@reduxjs/toolkit';

import getReactions from '@univision/fe-graphql-services/dist/requests/queries/getReactions';

// eslint-disable-next-line import/no-cycle
import { fetchAuthGraphQL } from '../../../utils/api/graphql';

// eslint-disable-next-line import/no-cycle
import clientLogging from '../../../utils/logging/clientLogging';

// eslint-disable-next-line import/no-cycle
import features from '../../../config/features';
import { REACTIONS_SERVICE_ERROR } from '../../../constants/messages';

const name = 'reactions';

/**
 * Fetch reactions with provided contentIds and current userReactions for each one
 * @param {Object} default arguments to be used in the request
 * @param {Object} thunkAPI utilities object
 * @returns {Object}
 */
export const fetchReactionsAction = async ({ contentIds }, { getState }) => {
  try {
    const state = getState();

    // Don't do anything if this feature is disabled or contentIds array is empty
    if (!features.actionBar.hasActionBar(state)
      || !contentIds.length) return [];

    // Filter out duplicate requested contentIds
    const existingIds = state?.reactions?.allIds;
    const filteredIds = contentIds
      .filter(Boolean) // This filters out empty items
      .filter(item => !existingIds.includes(item));

    // If there is nothing to request, then return early
    if (filteredIds.length < 1) return [];

    const response = await fetchAuthGraphQL({
      query: getReactions,
      variables: { contentIds: filteredIds },
      token: state?.user?.accessToken,
      serverUri: state?.page?.config?.graphql,
    });
    return response?.getReactions?.reactions;
  } catch (err) {
    err.message = `${REACTIONS_SERVICE_ERROR} fetchReactions rejected: ${err.message}`;
    if (err?.status || err?.payload?.errors) {
      const payloadErrors = err?.payload?.errors ?? '';
      err.message = `${err.message} ${JSON.stringify(payloadErrors)}`;
      clientLogging(err);
    }
    throw err;
  }
};

// Async thunks to be used as dispatch actions. Import from the slice instead from here.
export const fetchReactions = createAsyncThunk(
  `${name}/fetchReactions`,
  fetchReactionsAction
);
