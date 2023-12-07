import React from 'react';
import PropTypes from 'prop-types';
import Timeago from 'react-timeago';

import is24HoursAgo from '@univision/fe-utilities/helpers/date/is24HoursAgo';
import getTimeAgoFormatter from '@univision/fe-utilities/helpers/date/getTimeAgoFormatter';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import { localTimeFormat } from '@univision/fe-commons/dist/utils/helpers/dateTimeUtils';
import Icon from '@univision/fe-icons/dist/components/Icon';
import {
  DARKER_GREY,
  WHITE,
} from '@univision/fe-utilities/styled/constants';

import styled from 'styled-components';
import Styles from './SquarePublishedAgo.styles';

const IconDotStyled = styled(Icon).attrs({ name: 'dot', size: 6 })`
  ${Styles.dotIcon}
`;
/**
 * Square Published Ago
 * @param {!Object} props - Props for this component
 * @param {bool} [props.isDark] - true is is dark
 * @param {bool} [props.isListCard] - if in list card
 * @param {string} [props.updateDate] - update date for article
 * @access public
 * @returns {JSX}
 */
const SquarePublishedAgo = ({
  isDark,
  isListCard,
  updateDate,
}) => {
  if (!updateDate) {
    return null;
  }
  const updateDateTime = new Date(updateDate);
  const today = localTimeFormat({ date: updateDate });
  return is24HoursAgo(updateDateTime) ? (
    <>
      {`${today.month.month} ${today.day} ${!isListCard ? today.year : ''}`}
      {isListCard && <IconDotStyled fill={isDark ? WHITE : DARKER_GREY} />}
      {isListCard && `${today.year}`}
    </>
  ) : (
    <Timeago
      date={updateDate}
      formatter={getTimeAgoFormatter(
        localization.getCurrentLanguage()
      )}
    />
  );
};

SquarePublishedAgo.propTypes = {
  isDark: PropTypes.bool,
  isListCard: PropTypes.bool,
  updateDate: PropTypes.string,
};

SquarePublishedAgo.defaultProps = {
  isDark: false,
  isListCard: false,
};

export default SquarePublishedAgo;
