import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from '@univision/fe-icons/dist/components/Icon';
import DateTime from '@univision/shared-components/dist/components/v2/DateTime';
import Styles from './CardWrapper.scss';

/**
 * A wrapper for card
 * @param {Object} props wrapper props
 * @returns {JSX}
 */
const CardWrapper = (props) => {
  const {
    children, className, date, onDigital, onTV, progress, isLive,
  } = props;
  return (
    <div className={classnames(Styles.container, className, { [Styles.isLive]: isLive })}>
      <div className={Styles.innerWrapper}>
        <div className={classnames(Styles.innerContent)}>
          <DateTime
            date={date}
            format="hh:mm a"
            isBold
            className={Styles.date}
          />
        </div>
        <div className={classnames(Styles.innerContent, Styles.center)}>
          {children}
        </div>
        <div className={classnames(Styles.innerContent, Styles.noBorder)}>
          {onTV
          && <Icon name="tv" size={[25, 24]} viewBox="0 0 25 14" fill="#808080" />
        }
          {onDigital
          && <Icon name="digital" size={[20, 24]} viewBox="0 0 20 14" fill="#808080" />
        }
        </div>
      </div>
      {isLive
      && (
        <div className={Styles.progressWrapper}>
          <div className={Styles.progress} style={{ width: `${progress}%` }} />
        </div>
      )
      }
    </div>

  );
};

/**
 * @property {Node} children - components to mount
 * @property {string} className - the class modifier
 * @property {string} date - the date of the show
 * @property {boolean} onDigital - if show ois only digital
 * @property {boolean} onTV - if show on tv
 * @property {boolean} isLive - if the show is live
 * @property {number} progress - show progress
 */
CardWrapper.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  date: PropTypes.string,
  onDigital: PropTypes.bool,
  onTV: PropTypes.bool,
  isLive: PropTypes.bool,
  progress: PropTypes.number,
};

CardWrapper.defaultProps = {
  className: '',
  onDigital: false,
  onTV: false,
  isLive: false,
};

export default CardWrapper;
