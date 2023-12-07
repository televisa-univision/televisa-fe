import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Icon from '@univision/fe-icons/dist/components/Icon';
import * as AdTypes from '@univision/fe-commons/dist/utils/ads/ad-types';
import Ad from './Ad';
import Styles from './AdSlide.scss';

/**
 * AdSlide component
 */
export default class AdSlide extends React.PureComponent {
  /**
   * React life cycle
   */
  componentDidUpdate() {
    const { active, shouldRefresh, hideAdByIds } = this.props;

    // Hide ads when ad slide is displayed
    if (active) {
      shouldRefresh(false);
      hideAdByIds([AdTypes.SLIDESHOW_BOT_AD, AdTypes.SLIDESHOW_RIGHT_AD]);
    }
  }

  /**
   * Render component
   * @returns {JSX}
   */
  render() {
    const {
      active, advertisement, inline, renderSimpleStatus,
    } = this.props;

    return (
      <div
        className={classnames(Styles.container, {
          [Styles.adSlideInline]: inline,
        })}
      >
        <Ad active={active} advertisement={advertisement} />
        <div className={Styles.adSlideHelper}>
          <div className={Styles.simpleStatusContainer}>
            {renderSimpleStatus && renderSimpleStatus()}
          </div>
          <div>
            <Icon name="hand" size="small" fill="#fff" />
            <span className={Styles.message}>Desliza aquí para continuar con la galería</span>
          </div>
          <div className={Styles.simpleStatusPlaceholder} />
        </div>
      </div>
    );
  }
}

AdSlide.propTypes = {
  active: PropTypes.bool,
  advertisement: PropTypes.object,
  hideAdByIds: PropTypes.func,
  inline: PropTypes.bool,
  renderSimpleStatus: PropTypes.func,
  shouldRefresh: PropTypes.func,
};
