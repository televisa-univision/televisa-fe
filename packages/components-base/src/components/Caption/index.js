import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { exists } from '@univision/fe-commons/dist/utils/helpers';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';

import Styles from './Caption.scss';

/**
 * Caption component
 * @returns {JSX}
 */
const Caption = ({
  title, content, credit, type, className, isWorldCupMVP,
}) => (
  <div
    className={classnames(
      Styles[type],
      {
        [Styles.vertical]: type === 'slideshowVertical',
      },
      className
    )}
  >
    {exists(title) && <span className={Styles.title}>{`${title} `}</span>}
    {content && (
      <span
        className={classnames({ [Styles.isWorldCupMVP]: isWorldCupMVP }, Styles.caption)}
        dangerouslySetInnerHTML={{ __html: content }} // eslint-disable-line
      />
    )}
    {exists(credit) && (
      <span
        className={Styles.credit}
        dangerouslySetInnerHTML={{ __html: ` ${localization.get('credit')}: ${credit}` }} // eslint-disable-line
      />
    )}
  </div>
);

Caption.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  credit: PropTypes.string,
  type: PropTypes.oneOf(['slideshow', 'slideshowVertical', 'article']),
  className: PropTypes.string,
  isWorldCupMVP: PropTypes.bool,
};

Caption.defaultProps = {
  type: 'slideshow',
  className: '',
};

export default Caption;
