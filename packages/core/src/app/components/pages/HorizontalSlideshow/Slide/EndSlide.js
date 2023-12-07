import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Icon from '@univision/fe-icons/dist/components/Icon';
import Link from '@univision/fe-components-base/dist/components/Link';
import Picture from '@univision/fe-components-base/dist/components/Picture';
import * as sizes from '@univision/fe-components-base/dist/components/Picture/imageSizes';
import { isValidFunction } from '@univision/fe-commons/dist/utils/helpers';
import Styles from './EndSlide.scss';

/**
 * EndSlide component
 */
class EndSlide extends Component {
  /**
   * EndSlide component constructor
   * @param {Object} props React Props for this component
   */
  constructor(props) {
    super(props);
    this.timeout = null;
  }

  /**
   * Component will unmount method
   */
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  /**
   * Tracks click and then redirect to the new slideshow
   * @param {Object} event DOM event
   * @returns {boolean} Always false
   */
  onClick = (event) => {
    const { url } = this.props;
    if (isValidFunction(event.preventDefault)) {
      event.preventDefault();
    }

    // Wait for the tracking and then redirect
    this.timeout = setTimeout(() => {
      global.window.location = `${url}?related=true`;
    }, 1000);

    return false;
  };

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const { mainImage, slideCount, title } = this.props;
    const deviceSizeOverrides = {
      xl: sizes.LARGE,
      lg: sizes.LARGE,
    };

    const linkProps = {
      className: Styles.link,
      onClick: this.onClick,
    };

    return (
      <div className={Styles.endslide}>
        <Link {...linkProps}>
          <span className={Styles.subtitle}>A continuación:</span>
          <h3>{title}</h3>
          <div className={Styles.imageWrapper}>
            <span className={Styles.numberOfImages}>
              {slideCount} Imágenes <Icon name="slideshow" />
            </span>
            <Picture alt={title} image={mainImage} deviceSizeOverrides={deviceSizeOverrides} />
          </div>
        </Link>
      </div>
    );
  }
}

EndSlide.propTypes = {
  mainImage: PropTypes.object.isRequired,
  slideCount: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  slideshow: PropTypes.object,
};

export default EndSlide;
