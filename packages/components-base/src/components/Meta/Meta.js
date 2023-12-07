import React from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from '@univision/fe-commons/dist/components/ErrorBoundary';
import MultiAuthorDisplay from '../MultiAuthorDisplay';
import Styles from './Meta.scss';

/**
 * Meta component for author(s) name(s) and avatar and date
 * @returns {JSX}
 */
const Meta = ({
  authors,
  authorClassName,
  date,
  dateClassName,
  hideOnMobile,
  hidePublishDate,
  inlineDate,
  language,
  modifierClass,
  showAvatar,
  showUpdateDate,
  source,
  sponsor,
  tempAuthors,
  theme,
  updateDate,
}) => {
  return (
    <ErrorBoundary>
      <div className={`${Styles.meta} ${hideOnMobile ? Styles.hideMobile : ''} ${modifierClass}`}>
        <MultiAuthorDisplay
          authors={authors}
          authorClassName={authorClassName}
          date={date}
          dateClassName={dateClassName}
          hidePublishDate={hidePublishDate}
          inlineDate={inlineDate}
          language={language}
          showAvatar={showAvatar}
          showUpdateDate={showUpdateDate}
          source={source}
          sponsor={sponsor}
          tempAuthors={tempAuthors}
          theme={theme}
          updateDate={updateDate}
        />
      </div>
    </ErrorBoundary>
  );
};

Meta.propTypes = {
  authorClassName: PropTypes.string,
  authors: PropTypes.array,
  date: PropTypes.string,
  dateClassName: PropTypes.string,
  hidePublishDate: PropTypes.bool,
  hideOnMobile: PropTypes.bool,
  inlineDate: PropTypes.bool,
  modifierClass: PropTypes.string,
  language: PropTypes.string,
  showAvatar: PropTypes.bool,
  showUpdateDate: PropTypes.bool,
  source: PropTypes.string,
  sponsor: PropTypes.object,
  tempAuthors: PropTypes.array,
  theme: PropTypes.object,
  updateDate: PropTypes.object,
};

Meta.defaultProps = {
  hidePublishDate: false,
  hideOnMobile: false,
  inlineDate: false,
  showAvatar: true,
  updateDate: null,
  showUpdateDate: false,
  sponsor: null,
};

export default Meta;
