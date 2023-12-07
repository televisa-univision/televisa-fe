import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Styles from './Badge.styles';

const BadgeWrapper = styled.div`${Styles.badgeWrapper}`;
const Label = styled.span.attrs({ className: 'uvs-font-a-medium' })`
  ${Styles.label}
`;

/**
 * Badge
 * @param {Object} props - component props
 * @param {string} props.className custom className
 * @param {number} props.label - badge label
 * @param {function} props.onClick - click handler
 * @returns {JSX}
 */
const Badge = ({ className, label, onClick }) => {
  if (!label) return null;

  return (
    <BadgeWrapper onClick={onClick} className={className}>
      <Label>{label}</Label>
    </BadgeWrapper>
  );
};

Badge.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  label: PropTypes.string.isRequired,
};

export default Badge;
