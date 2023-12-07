import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import Image from '../../Image';
import Styles from './PreLoader.scss';

/**
 * Pre loader content placeholder
 * @param {Object} props - props that component will receive
 * @returns {JSX}
 */
const PreLoader = ({ className }) => (
  <div className={classnames(className, Styles.box)}>
    <Image
      src="https://cdn4.uvnimg.com/3b/c4/957ccbda454b8cffc4dfc263ebae/preloader-transparent.gif"
      alt="preloader"
      className={Styles.logo}
    />
    <div className={classnames('uvs-font-a-bold', Styles.copy)}>
      {localization.get('personalizationCopy')}
    </div>
  </div>
);

PreLoader.propTypes = {
  className: PropTypes.string,
};

PreLoader.defaultProps = {
  className: '',
};

export default PreLoader;
