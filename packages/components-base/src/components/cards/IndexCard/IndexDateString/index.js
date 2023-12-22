import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Timeago from 'react-timeago';
import is24HoursAgo from '@univision/fe-utilities/helpers/date/is24HoursAgo';
import getTimeAgoFormatter from '@univision/fe-utilities/helpers/date/getTimeAgoFormatter';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import formatDate from '@univision/fe-utilities/helpers/date/formatDate';
import Styles from './IndexDateString.styles';

const Container = styled.div`
  ${Styles.container}
`;
const Text = styled.span`
  ${Styles.text}
`;
/**
 * Index Card Date string component
 * If content update date is 24 hours or older, it will show a formatted date.
 * If newer, it will show a relative time span (e.g 2 hours ago)
 * @param {Object} props - props of the component
 * @property {string} updateDate - content update date in ISO8601 format
 * @property {string} publishDate - content publish date in ISO8601 format
 * @property {string} showUpdateDate - content show update date
 * @property {Object} theme.isDark - dark theme flag
 * @returns {JSX}
 */
const IndexDateString = ({
  updateDate,
  showUpdateDate,
  publishDate,
  theme,
}) => {
  const updatedTime = new Date(updateDate);
  const { isDark } = theme || {};

  let updatedDateString;
  if (showUpdateDate) {
    if (is24HoursAgo(updatedTime)) {
      const updated = updateDate
        ? formatDate(new Date(updateDate), localization.getCurrentLanguage()) : null;
      updatedDateString = updated ? `${localization.get('updatedAbbrv')} ${updated}` : null;
    } else {
      updatedDateString = (
        <>
          <Text>{localization.get('updatedAbbrv')} </Text>
          <Timeago
            date={updateDate}
            formatter={getTimeAgoFormatter(
              localization.getCurrentLanguage()
            )}
          />
        </>
      );
    }
  }

  const publishedtime = new Date(publishDate);
  let publishedDateString;
  if (is24HoursAgo(publishedtime)) {
    const published = publishDate
      ? formatDate(new Date(publishDate), localization.getCurrentLanguage()) : null;
    if (showUpdateDate) {
      publishedDateString = published ? `${localization.get('publishedAbbrv')} ${published}` : null;
    } else {
      publishedDateString = published;
    }
  } else {
    publishedDateString = (
      <Timeago
        date={publishDate}
        formatter={getTimeAgoFormatter(
          localization.getCurrentLanguage()
        )}
      />
    );
  }

  return (
    <Container className="uvs-font-c-regular">
      <div>{publishedDateString}</div>
      {is24HoursAgo(publishedtime) && updatedDateString && (
        <div>{updatedDateString}</div>
      )}
    </Container>
  );
};

IndexDateString.propTypes = {
  updateDate: PropTypes.string,
  showUpdateDate: PropTypes.bool,
  publishDate: PropTypes.string,
  theme: PropTypes.object,
};

export default IndexDateString;
