import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { isValidArray } from '@univision/fe-commons/dist/utils/helpers';
import fetchGraphQL from '@univision/fe-commons/dist/utils/api/graphql';
import { jobSearchJobsQuery as jobQuery } from '@univision/fe-graphql-services/dist/requests/queries/jobSearch';
import { JOB_RESULT_ERROR } from '@univision/fe-commons/dist/constants/messages';
import clientLogging from '@univision/fe-commons/dist/utils/logging/clientLogging';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';

import Styles from './PersonJobs.styles';
import { utmSource } from '../JobSearch/constants';
import JobsWidget from '../JobSearch/JobsWidget';

const Wrapper = styled.div``;
const Title = styled.span.attrs({ className: 'uvs-font-a-bold' })`${Styles.title}`;

/**
 * Render the PersonJobs component
 * @param {string} device - if is mobile, desktop or tablet
 * @param {string} sponsorTeamId - apploi sponsor team id
 * @param {string} serverUri - url graphql endpoint
 * @returns {JSX}
 */
const PersonJobs = ({
  device,
  sponsorTeamId,
  serverUri,
}) => {
  const language = localization.getCurrentLanguage();

  const [loading, setLoading] = useState(true);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [pagination, setPagination] = useState(1);
  const [jobs, setJobs] = useState([]);

  /**
   * Handle the load more click
   */
  const handleLoadMore = useCallback(() => {
    setPagination(previousPagination => previousPagination + 1);
  }, []);

  /**
   * Fetch jobs from Apploi
   * @type {(function(): Promise<void>)|*}
   */
  const fetchJobs = useCallback(async () => {
    const variables = {
      language,
      page: pagination,
      utmSource: utmSource[device],
      teams: sponsorTeamId,
      size: 25,
    };
    setShowLoadMore(false);
    setLoading(true);
    try {
      const { getApploiJobs } = await fetchGraphQL({ query: jobQuery, variables, serverUri });
      if (isValidArray(getApploiJobs)) {
        setJobs(previousJobs => [...previousJobs, ...getApploiJobs]);
        setShowLoadMore(true);
      }
    } catch (err) {
      err.message = `${JOB_RESULT_ERROR} fetch jobs rejected: ${err.message}`;
      clientLogging(err);
    }
    setLoading(false);
  }, [setShowLoadMore, setLoading, pagination]);

  useEffect(() => {
    fetchJobs();
  }, [
    pagination, fetchJobs,
  ]);

  return (
    <Wrapper>
      <Title>{localization.get('teamJobTitle')}</Title>
      <JobsWidget
        device={device}
        handleLoadMore={handleLoadMore}
        jobs={jobs}
        language={language}
        loading={loading}
        showLoadMore={showLoadMore}
      />
    </Wrapper>
  );
};

PersonJobs.propTypes = {
  device: PropTypes.oneOf(['desktop', 'mobile', 'tablet']),
  sponsorTeamId: PropTypes.string.isRequired,
  serverUri: PropTypes.string.isRequired,
};

PersonJobs.defaultProps = {
  device: 'mobile',
};

export default PersonJobs;
