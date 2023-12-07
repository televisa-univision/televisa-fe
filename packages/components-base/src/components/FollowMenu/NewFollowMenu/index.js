/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import LocalizationManager from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import { isValidArray, getKey } from '@univision/fe-commons/dist/utils/helpers';

import SocialNetworkLink from '../SocialNetworkLink';

import Styles from './NewFollowMenu.styles';

const FollowUsContainer = styled.div`
  ${Styles.followUsContainer}
`;
const FollowUsLabelContainer = styled.span`
  ${Styles.followUsLabel}
`;
const NetworksContainer = styled.div`
  ${Styles.networksContainer}
`;

/**
 * Renders a group of social network icon links that link to the current page's social network
 * page.
 * @param {Array} networks a list of available social networks for the current page
 * @param {boolean} isVertical determines the layout of the follow menu
 * @returns {JSX}
 */
const renderFollowButtons = (networks, isVertical) => (
  <NetworksContainer isVertical={isVertical}>
    {networks.map((network, indx) => (
      <SocialNetworkLink key={getKey(network, 'name', `social_${indx}`)} {...network} />
    ))}
  </NetworksContainer>
);

/**
 * Renders the new follow menu component which has circled and colored social network icons
 * @param {Object} props component props
 * @param {bool} props.isVertical whether to show the vertically stacked follow menu or the
 * horizontally aligned one
 * @returns {JSX}
 */
const NewFollowMenu = ({ className, isVertical = false, networks = [] }) => {
  if (!isValidArray(networks)) return null;

  return (
    <FollowUsContainer className={className} isVertical={isVertical}>
      <FollowUsLabelContainer isVertical={isVertical}>
        {LocalizationManager.get('followUsOnOurNetworks')}
      </FollowUsLabelContainer>
      {renderFollowButtons(networks, isVertical)}
    </FollowUsContainer>
  );
};

NewFollowMenu.propTypes = {
  className: PropTypes.string,
  isVertical: PropTypes.bool,
  networks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      onClick: PropTypes.func,
      target: PropTypes.string,
      text: PropTypes.string,
      url: PropTypes.string,
    })
  ),
};

export default NewFollowMenu;
