import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import {
  LARGE,
  MEDIUM,
  SMALL,
} from '@univision/fe-commons/dist/constants/cardSizes';
import {
  DEPORTES,
  FUTBOL,
  OTHER_SPORTS,
} from '@univision/fe-commons/dist/constants/commonRootSections';
import isValidValue from '@univision/fe-utilities/helpers/common/isValidValue';
import LabelUni from '@univision/shared-components/dist/components/v3/Label';
import LabelMvp from '../../../../../Label/TudnRebrandLabel';
import Styles from './SquareBadge.styles';
import Link from '../../../../../Link';

const Badge = styled(motion.div)`
  ${Styles.badge}
`;

/**
 * Square Badge
 * @param {!Object} props - Props for this component
 * @param {string} [props.className] - Class name modifier class
 * @param {bool} [props.isInlineVideo = false] - true if is inline video card
 * @param {Object} [props.labelProps] - the props for the label
 * @param {style} [props.style] - Modifier style
 * @param {string} [props.trackClickOther] -the tracking for the badge
 * @param {string} [props.type] -the card type
 * @param {string} [props.mvp] -feature flag isWorldCupMVP
 * @access public
 * @returns {JSX}
 */
const SquareBadge = ({
  className,
  labelProps,
  size,
  style,
  trackClickOther,
  type,
  isWorldCupMVP,
}) => {
  const checkUserLocation = [DEPORTES, OTHER_SPORTS, FUTBOL].includes(labelProps?.type);
  const Label = isWorldCupMVP ? LabelMvp : LabelUni;
  return isValidValue(size) && isValidValue(type) ? (
    <Badge
      className={className}
      size={size}
      type={type}
      style={style}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {trackClickOther ? (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <Link href={labelProps?.href} checkUserLocation={checkUserLocation}>
          <Label {...labelProps} hasLiveIcon />
        </Link>
      ) : (
        <Label {...labelProps} hasLiveIcon />
      )}
    </Badge>
  ) : null;
};

SquareBadge.propTypes = {
  className: PropTypes.string,
  labelProps: PropTypes.object,
  size: PropTypes.oneOf([LARGE, MEDIUM, SMALL]),
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
  trackClickOther: PropTypes.func,
  type: PropTypes.string,
  isWorldCupMVP: PropTypes.bool,
};

export default SquareBadge;
