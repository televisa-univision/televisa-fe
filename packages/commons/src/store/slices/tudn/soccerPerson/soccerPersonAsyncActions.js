/* eslint-disable import/no-extraneous-dependencies */
import { createAsyncThunk } from '@reduxjs/toolkit';

import getPlayerProfile from '@univision/fe-graphql-services/dist/requests/queries/sports/getPlayerProfile';

import { fetchGraphQL } from '../../../../utils/api/graphql';
import clientLogging from '../../../../utils/logging/clientLogging';
import { SOCCER_PERSON_ERROR } from '../../../../constants/messages';

const name = 'soccerPerson';

/**
 * Fetch soccer person with provided personId
 * @param {Object} default arguments to be used in the request
 * @param {Object} thunkAPI utilities object
 * @returns {Object}
 */
export const fetchSoccerPersonAction = async ({ data }, { getState }) => {
  try {
    const state = getState();
    const { teamSeason, personnelId } = data || {};

    // Don't do anything if this feature is disabled or contentIds array is empty
    if (!teamSeason || !personnelId) return {};

    const { teamId, soccerCompetitionSeason } = teamSeason;

    const response = await fetchGraphQL({
      query: getPlayerProfile,
      variables: { playerId: `${personnelId}`, seasonId: soccerCompetitionSeason?.seasonId, teamId: `${teamId}` },
      serverUri: state?.page?.config?.graphql,
    });

    return response?.getPlayerProfile;
  } catch (err) {
    err.message = `${SOCCER_PERSON_ERROR} fetchSoccerPerson rejected: ${err.message}`;
    clientLogging(err);
    throw err;
  }
};

// Async thunks to be used as dispatch actions. Import from the slice instead from here.
export const fetchSoccerPerson = createAsyncThunk(
  `${name}/fetchSoccerPerson`,
  fetchSoccerPersonAction
);
