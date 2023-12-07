import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Styles from './TeamItem.styles';

// Replace with actual link when extractor is fixed
const StyledLink = styled.div`
  ${Styles.link}
`;

const StyledImg = styled.img`
  ${Styles.img}
`;

const TeamName = styled.span`
  ${Styles.teamName}
`;

/**
 * Team Item component
 * @param {Object} props - team props
 * @returns {JSX}
 */
const TeamItem = ({
  className,
  fullName,
  imageURI,
  url,
}) => (
  <StyledLink
    className={className}
    href={url}
    checkUserLocation
  >
    <StyledImg src={imageURI} alt={fullName} />
    <TeamName>{fullName}</TeamName>
  </StyledLink>
);

TeamItem.propTypes = {
  className: PropTypes.string,
  fullName: PropTypes.string,
  imageURI: PropTypes.string,
  url: PropTypes.string,
};

export default TeamItem;
