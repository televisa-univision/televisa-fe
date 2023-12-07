import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import getFirstLetter from '@univision/fe-utilities/helpers/string/getFirstLetter';
import useRegistrationTheme from '@univision/fe-commons/dist/hooks/useRegistrationTheme';

import Styles from './UserBadge.styles';

const Circle = styled.div`
  ${Styles.circle}
`;
const Letter = styled.div`
  ${Styles.letter}
`;

/**
 * UserBadge component
 * @param {Object} props of the component
 * @property {int} props.fontSize - font size of the letter
 * @property {string} props.name - name to have its first letter extracted
 * @property {int} props.size - size of the badge in px
 * @returns {JSX}
 */
const UserBadge = ({
  fontSize,
  name,
  size,
}) => {
  const firstLetter = getFirstLetter(name) || '?';
  const { badgeColor } = useRegistrationTheme();

  return (
    <Circle size={size}>
      <Letter color={badgeColor} fontSize={fontSize}>
        {firstLetter}
      </Letter>
    </Circle>
  );
};

UserBadge.propTypes = {
  fontSize: PropTypes.number,
  name: PropTypes.string,
  size: PropTypes.number,
};

UserBadge.defaultProps = {
  fontSize: 70,
  name: '?',
  size: 106,
};

export default UserBadge;
