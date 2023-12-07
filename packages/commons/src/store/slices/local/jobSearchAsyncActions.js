/* eslint-disable import/no-extraneous-dependencies */
import { createAsyncThunk } from '@reduxjs/toolkit';

import { jobSearchJobsQuery } from '@univision/fe-graphql-services/dist/requests/queries/jobSearch';

import marketCoordinates from '../../../constants/marketCoordinates.json';
import { configSelector } from '../../selectors/page-selectors';
import { fetchGraphQL } from '../../../utils/api/graphql';
import { clientLevelLogging } from '../../../utils/logging/clientLogging';
import { JOB_RESULT_ERROR } from '../../../constants/messages';

/**
 * Fetch the local jobs
 * @param {Object} _ arguments to be used in the request
 * @param {Object} thunkAPI utilities object
 * @returns {Object}
 */
export const fetchJobsData = async (_, { getState }) => {
  const state = getState();
  const selectedMarket = state?.page?.data?.tvStation?.call || Object.keys(marketCoordinates)[10];
  const market = marketCoordinates[selectedMarket];
  const { graphql } = configSelector(state);
  const { lat, long, radius } = market;
  const location = { latitude: lat, longitude: long, radius };
  const variables = {
    location,
    language: 'es',
    city: null,
    cityCenter: market?.name,
    size: 25,
    state: null,
    searchTerm: null,
    industry: null,
    page: 1,
    utmSource: 'univision_web',
  };

  try {
    const { getApploiJobs } = await fetchGraphQL({
      query: jobSearchJobsQuery,
      variables,
      serverUri: graphql,
    });
    return getApploiJobs;
  } catch (err) {
    clientLevelLogging(err, `${JOB_RESULT_ERROR} fetch jobs search rejected`);
    throw err;
  }
};

export const fetchJobs = createAsyncThunk(
  'jobs/fetchJobs',
  fetchJobsData,
);
