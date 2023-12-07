import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';

import Styles from './Follow.styles';
import SocialLink from '../SocialLink';

export const FollowWrapper = styled.div`
  ${Styles.followWrapper}
`;
export const FollowTitle = styled('span')`
  ${Styles.followTitle}
`;
export const SocialLinkStyled = styled(SocialLink)`
  ${Styles.socialLink}
`;

/**
 * Render the footer of the persona card
 * @param {Object} socialNetworks - Object which content options of links to share
 * @returns {JSX}
 */
const Follow = ({ socialNetworks }) => {
  const socialShare = socialNetworks
  && Object.entries(socialNetworks)?.reduce((socials, [, share]) => {
    const url = share?.url;
    if (url) {
      socials.push(<SocialLinkStyled
        key={url}
        link={{ url }}
        type={share?.name.toLowerCase()}
        iconOnly
        iconSize={13}
      />);
    }
    return socials;
  }, []);
  if (socialShare?.length < 1) return null;
  return (
    <FollowWrapper>
      <FollowTitle className="uvs-font-c-regular">
        {localization.get('follow')}
      </FollowTitle>
      {socialShare}
    </FollowWrapper>
  );
};

Follow.defaultProps = {
  socialNetworks: {},
};

Follow.propTypes = {
  socialNetworks: PropTypes.shape({
    options: PropTypes.object,
  }),
};

export default Follow;
