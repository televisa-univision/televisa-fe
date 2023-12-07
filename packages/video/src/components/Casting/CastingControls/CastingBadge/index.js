import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import localization from '@univision/fe-utilities/localization';
import isValidValue from '@univision/fe-utilities/helpers/common/isValidValue';
import LabelBadge from '@univision/fe-components-base/dist/components/LabelBadge';

import castingTypes, { castingLabels } from '../CastingControls.config';
import Styles from './CastingBadge.styles';

const Badge = styled.div`
  ${Styles.badge}
`;

/**
 * Casting Badge
 * @param {!Object} props - Props for this component
 * @param {string} [props.className] - Class name modifier class
 * @param {style} [props.style] - Modifier style
 * @param {string} [props.type] -the label type
 * @access public
 * @returns {JSX}
 */
const CastingBadge = ({
  className,
  style,
  type,
}) => {
  if (isValidValue(type) && ![castingTypes.ADVERTISING, castingTypes.LIVESTREAM].includes(type)) {
    return null;
  }
  return (
    <Badge
      className={className}
      style={style}
    >
      <LabelBadge type={type} textLabel={type === castingTypes.LIVESTREAM ? localization.get(castingLabels.LIVESTREAM) : ''} />
    </Badge>
  );
};

CastingBadge.propTypes = {
  className: PropTypes.string,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
  type: PropTypes.string,
};

export default CastingBadge;
