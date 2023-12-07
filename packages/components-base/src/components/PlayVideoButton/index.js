import React from 'react';
import PropTypes from 'prop-types';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import Icon from '@univision/fe-icons/dist/components/Icon';
import { WHITE } from '@univision/fe-commons/dist/utils/styled/constants';
import Button from '../Button';

import Styles from './PlayVideoButton.scss';

/**
 * Button overlaying video title card
 * @param {Object} props component props
 * @returns {JSX}
 */
const PlayVideoButton = ({ onClick, label, duration }) => {
  return (
    <Button className={Styles.playBtn} onClick={onClick}>
      <Icon name="playnocircle" size="xsmall" fill={WHITE} />
      {label}
      {duration && <span> | {duration}</span>}
    </Button>
  );
};

PlayVideoButton.propTypes = {
  duration: PropTypes.string,
  onClick: PropTypes.func,
  label: PropTypes.string,
};

PlayVideoButton.defaultProps = {
  label: localization.get('watchVideo'),
};

export default PlayVideoButton;
