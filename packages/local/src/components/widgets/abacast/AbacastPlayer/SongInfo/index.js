import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Styles from './SongInfo.scss';

/**
 * Component for song artist and title
 */
class SongInfo extends Component {
  /**
   * Constructor
   */
  constructor() {
    super();

    this.shouldMarqueeAnimate = this.shouldMarqueeAnimate.bind(this);

    this.marqueeContainer = React.createRef();
  }

  /**
   * Determine if the marquee is overflowing and should animate
   * @returns {boolean}
   */
  shouldMarqueeAnimate() {
    if (this.marqueeContainer.current) {
      const marqueeContainer = this.marqueeContainer.current;
      return marqueeContainer.offsetWidth < marqueeContainer.scrollWidth;
    }

    return false;
  }

  /**
   * Render
   * @returns {JSX}
   */
  render() {
    const { artist, collapsed, title } = this.props;
    const shouldMarqueeAnimate = this.shouldMarqueeAnimate();

    return (
      <div className={Styles.wrapper}>
        <div
          className={classnames(Styles.songInfo, Styles.hidden, { [Styles.small]: collapsed })}
          ref={this.marqueeContainer}
        >
          <div
            className={classnames(Styles.marquee, {
              [Styles.small]: collapsed,
            })}
          >
            {title} - {artist}
          </div>
        </div>
        <div className={classnames(Styles.songInfo, { [Styles.small]: collapsed })}>
          <div
            className={classnames(Styles.marquee, {
              [Styles.animate]: shouldMarqueeAnimate,
              [Styles.small]: collapsed,
            })}
          >
            <div
              className={classnames(Styles.marqueeInner, {
                [Styles.animating]: shouldMarqueeAnimate,
              })}
            >
              <span>
                {title} - {artist}
              </span>
              {shouldMarqueeAnimate && (
                <span>
                  {title} - {artist}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SongInfo.propTypes = {
  artist: PropTypes.string,
  collapsed: PropTypes.bool,
  title: PropTypes.string,
};

export default SongInfo;
