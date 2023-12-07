import React, { Component } from 'react';
import { getKey } from '@univision/fe-commons/dist/utils/helpers';
import PropTypes from 'prop-types';

import Styles from './Schedule.scss';

/**
 * Schedule widget
 */
class Schedule extends Component {
  /**
   * Constructor
   */
  constructor() {
    super();

    if (getKey(global, 'window.innerWidth', 0) >= 768) {
      this.state = { isMobile: false };
    } else {
      this.state = { isMobile: true };
    }
  }

  /**
   * Makes sure the components checks the dimmensions of the device
   */
  componentDidMount() {
    this.updateComponentVersion();
    window.addEventListener('resize', this.updateComponentVersion);
  }

  /**
   * Remove event listeners.
   */
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateComponentVersion);
  }

  /**
   * Finds out if it's running in desktop or mobile,
   * requests CoreSlider component dynamically only when in desktop.
   * @returns {promise}
   */
  updateComponentVersion = () => {
    if (window.innerWidth >= 768) {
      return import(/* webpackChunkName: "scheduleCarousel" */ '../Carousel').then((module) => {
        this.setState({ isMobile: false, carousel: module.default });
      });
    }
    this.setState({ isMobile: true });
    return Promise.resolve();
  };

  /**
   * render function
   * @returns {jsx}
   */
  render() {
    const { content } = this.props;

    const { carousel: Carousel, isMobile } = this.state;
    const itemsToBeDisplayed = {
      xs: 1,
      sm: 3,
      md: 4,
      lg: 4,
      xl: 4,
    };

    return (
      <div className={Styles.container}>
        {!isMobile
          && isMobile !== undefined && (
            <div className={Styles.desktop}>
              {Array.isArray(content)
                && content.length > 0
                && Carousel && (
                  <Carousel itemsToBeDisplayed={itemsToBeDisplayed} arrowTheme="light">
                    {content.map((card, idx) => (
                      <div
                        key={`card-${idx}`} // eslint-disable-line
                      >
                        <div className={Styles.card}>
                          <p className={`${Styles.time} uvs-font-a-regular`}>{card['time-slot']}</p>
                          <h3 className={Styles.title}>{card.program}</h3>
                        </div>
                      </div>
                    ))}
                  </Carousel>
              )}
            </div>
        )}
        {isMobile && (
          <div className={Styles.mobile}>
            {Array.isArray(content)
              && content.length > 0
              && content.map((info, index) => (
                <div
                  key={`card-${index}`} // eslint-disable-line
                >
                  <div key={info.program} className={Styles.card}>
                    <p className={`${Styles.time} uvs-font-a-regular`}>{info['time-slot']}</p>
                    <h3 className={Styles.title}>{info.program}</h3>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    );
  }
}

Schedule.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      program: PropTypes.string,
      'time-slot': PropTypes.string,
    })
  ),
};

export default Schedule;
