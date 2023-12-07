import React from 'react';
import PropTypes from 'prop-types';

import { exists } from '@univision/fe-commons/dist/utils/helpers';
import Logo from '../../../Logo';
import ButtonShowEvents from '../../../widgets/ButtonShowEvents';
import ShowEvents from '../../../widgets/ButtonShowEvents/ShowEvents.json';

import Styles from './Talent.scss';

/**
 * Talent header component
 * @param {Object} props of the component
 * @returns {JSX}
 */
const Talent = ({
  background,
  backgroundColor,
  logo,
  subtitle,
  uri,
}) => {
  const wrapperStyles = {};
  const isShowEventData = ShowEvents[uri];
  if (exists(backgroundColor)) {
    wrapperStyles.backgroundColor = backgroundColor;
  }

  if (exists(background)) {
    wrapperStyles.backgroundImage = `url(${background})`;
  }

  return (
    <div
      className={Styles.wrapper}
      style={wrapperStyles}
      data-element-name="BrandedSubNav"
    >
      <span className={Styles.gradient} />
      <div className="uvs-container">
        <div className={Styles.container}>
          <div className={Styles.mainContainer}>
            {logo && (
              <div className={Styles.logoContainer}>
                <Logo uri={uri} src={logo} className={Styles.logo} />
              </div>
            )}
            {isShowEventData && isShowEventData.active
              && (<ButtonShowEvents eventData={isShowEventData} />)
            }
          </div>
          {subtitle && <div className={Styles.subtitle}>{subtitle}</div>}
        </div>
      </div>
    </div>
  );
};

/**
       * Component prop types
       */
Talent.propTypes = {
  background: PropTypes.string,
  backgroundColor: PropTypes.string,
  logo: PropTypes.string,
  subtitle: PropTypes.string,
  uri: PropTypes.string,
};

export default Talent;
