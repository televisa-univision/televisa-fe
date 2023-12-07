import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Icon from '@univision/fe-icons/dist/components/Icon';
import Store from '@univision/fe-commons/dist/store/store';
import { shouldRefresh, hideAdByIds } from '@univision/fe-commons/dist/store/actions/ads-actions';
import * as AdTypes from '@univision/fe-commons/dist/utils/ads/ad-types';
import Ad from './Ad';
import Styles from './AdSlide.scss';

/**
 * AdSlide component
 */
export default class AdSlide extends React.Component {
  /**
   * React life cycle
   */
  componentDidUpdate() {
    const { active } = this.props;

    // Hide ads when ad slide is displayed
    if (active) {
      Store.dispatch(shouldRefresh(false));
      Store.dispatch(hideAdByIds([AdTypes.SLIDESHOW_BOT_AD, AdTypes.SLIDESHOW_RIGHT_AD]));
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
  inline: PropTypes.bool,
  renderSimpleStatus: PropTypes.func,
};
