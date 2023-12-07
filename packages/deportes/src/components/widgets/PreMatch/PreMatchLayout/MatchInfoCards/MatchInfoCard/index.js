import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import tudnTheme from '@univision/fe-commons/dist/themes/tudn';
import Image from '@univision/fe-components-base/dist/components/Image';
import Icon from '@univision/fe-icons/dist/components/Icon';

import localization from '../../../../../../utils/localization';
import Styles from './MatchInfoCard.scss';

/**
 * Button Icon component.
 * @param {Object} props React Props for this component
 * @returns {JSX}
 * @constructor
 */
const MatchInfoCard = (props) => {
  const {
    type, info, extra, logo, className,
  } = props;
  const theme = tudnTheme();
  const hasLogo = logo !== '';
  let titleType;
  switch (type) {
    case 'screen':
      titleType = localization.get('tvChannel');
      break;
    case 'field':
      titleType = localization.get('stadium');
      break;
    case 'fault':
      titleType = localization.get('official');
      break;
    case 'cup':
    default:
      titleType = localization.get('tournament');
      break;
  }
  return (
    <div className={`${Styles.container} ${className}`}>
      <div className={Styles.iconWrapper}>
        {type && <Icon name={type} size="small" fill={theme.primary} />}
      </div>
      <span className={`uvs-font-a-bold ${Styles.cardTitle}`}>{titleType}</span>
      <div
        className={classnames({ [Styles.cardInfoLogo]: hasLogo }, { [Styles.cardInfo]: !hasLogo })}
      >
        {logo && <Image src={logo} className={Styles.logo} />}
        <span className="uvs-font-a-regular">
          {info || localization.get('noInfo')}
        </span>
        {extra && <span className="uvs-font-a-regular">{extra}</span>}
      </div>
    </div>
  );
};

/**
 * propTypes
 * @property {type} component card type
 * @property {string} info for the card
 * @property {className} class name for the Component
 */
MatchInfoCard.propTypes = {
  type: PropTypes.oneOf(['screen', 'field', 'fault', 'cup']),
  info: PropTypes.string,
  extra: PropTypes.string,
  logo: PropTypes.string,
  className: PropTypes.string,
};

/**
 * Default Prop Values
 */
MatchInfoCard.defaultProps = {
  className: '',
  info: '',
  extra: '',
  logo: '',
};

export default MatchInfoCard;
