import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { isValidArray } from '@univision/fe-commons/dist/utils/helpers';
import squadHeaderConfig from '../../../../../config/WidgetHeaderConfig/widgetHeader.config';

import Styles from './SquadStatsHeader.scss';

/**
 * A Squad row header
 * @param {Object} props The scoping label and competition scope
 * @returns {JSX}
 */
const SquadStatsHeader = (props) => {
  const { scopingLabel } = props;
  let headers = squadHeaderConfig(scopingLabel);
  if (isValidArray(headers)) {
    headers = headers.map((content, idx) => (
      <th
        key={`header-${content[0]}`}
        className={classnames(
          {
            [Styles.number]: idx === 0,
            [Styles.nameSizeTop]: idx === 1,
            [Styles.stat]: idx > 1,
            [Styles.hideMobile]: idx === 4 || idx === 5 || idx === 6,
          },
        )}
        scope="col"
      >
        {content[0]}
      </th>
    ));
    return <tr className={Styles.squadTop}>{headers}</tr>;
  }
  return <div />;
};

/**
 * @property {string} scopingLabel - Type of header scope
 */
SquadStatsHeader.propTypes = {
  scopingLabel: PropTypes.string,
};

SquadStatsHeader.defaultProps = {
  scopingLabel: '',
};

export default SquadStatsHeader;
