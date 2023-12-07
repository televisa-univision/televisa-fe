import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import LoadMore from '@univision/fe-components-base/dist/components/widgets/List/ListButton';
import Loading from '@univision/fe-components-base/dist/components/Loading';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import { isValidArray } from '@univision/fe-commons/dist/utils/helpers';

import Styles from './JobsWidget.styles';
import ResultItem from '../ResultItem';
import { theme, utmSource } from '../constants';

const ButtonWrapper = styled.div`${Styles.buttonWrapper}`;
const Container = styled.div`${Styles.container}`;
const LoadingSpinner = styled(Loading)`${Styles.loading}`;
const NoResults = styled.span.attrs({ className: 'uvs-font-a-bold' })``;

/**
 * Render the PersonJobs component
 * @param {string} className - custom style
 * @param {string} device - what platform user is accessing
 * @param {function} handleLoadMore - handleLoadMore load more jobs
 * @param {array} jobs - jobs data
 * @param {string} language - language
 * @param {boolean} loading - loading if component is loading
 * @param {string} noResultsMessage - noResultsMessage
 * @param {boolean} showLoadMore - showLoadMore show load more button
 * @returns {JSX}
 */
const JobsWidget = ({
  className,
  device,
  handleLoadMore,
  jobs,
  language,
  loading,
  noResultsMessage,
  showLoadMore,
}) => {
  /**
   * Returns No Results component
   * @returns {JSX.Element|null}
   */
  const renderNoResults = () => {
    if (loading) return null;

    if (noResultsMessage) {
      return <NoResults>{noResultsMessage}</NoResults>;
    }

    if (!isValidArray(jobs)) {
      return <NoResults>{localization.get('searchNoResults', { language })}</NoResults>;
    }

    return null;
  };

  return (
    <Container className={className}>
      {jobs.map(job => (
        <ResultItem
          key={job.id}
          utmSource={utmSource[device]}
          language={language}
          {...job}
        />
      ))}
      {renderNoResults()}
      <ButtonWrapper>
        {loading && <LoadingSpinner theme={theme} size="medium" />}
        {showLoadMore && <LoadMore theme={theme} onClick={handleLoadMore} label={localization.get('loadMore', { language })} />}
      </ButtonWrapper>
    </Container>
  );
};

JobsWidget.propTypes = {
  className: PropTypes.string,
  device: PropTypes.oneOf(['desktop', 'mobile', 'tablet']),
  handleLoadMore: PropTypes.func,
  jobs: PropTypes.array,
  language: PropTypes.string,
  loading: PropTypes.bool,
  noResultsMessage: PropTypes.string,
  showLoadMore: PropTypes.bool,
};

JobsWidget.defaultProps = {
  device: 'mobile',
  jobs: [],
  language: 'en',
};

export default React.memo(JobsWidget);
