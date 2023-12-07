import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { isValidArray, isValidObject, getKey } from '@univision/fe-commons/dist/utils/helpers';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import SocialTracker from '@univision/fe-commons/dist/utils/tracking/tealium/social/SocialTracker';
import Icon from '@univision/fe-icons/dist/components/Icon';
import Link from '../../Link';

import allowedNetworks from './allowedNetworks';
import Styles from './Follow.styles';

const FollowWrapper = styled.div`${Styles.followWrapper}`;
const FollowText = styled.p`${Styles.followText}`;
const ShareLinkWrapper = styled(Link)`${Styles.shareLinkWrapper}`;
/**
 * Follow component for bios
 * @param {string} className - modifier class
 * @param {bool} isBioCard - true if the follow components its from a Bio Card
 * @param {Object} shareData - an Object with uid, title & type for track event
 * @param {Object} socialNetworks - an object with social networks
 * @returns {?JSX}
 */
const Follow = ({
  className,
  isBioCard,
  shareData,
  socialNetworks,
}) => {
  let hasSocialNetworks = isValidObject(socialNetworks)
    && allowedNetworks.filter(
      network => getKey(socialNetworks, `${network}Url.url`)
    );

  if (!isValidArray(hasSocialNetworks) && isValidArray(socialNetworks)) {
    hasSocialNetworks = socialNetworks;
  }

  if (!isValidArray(hasSocialNetworks)) return false;

  return (
    <FollowWrapper className={className}>
      <FollowText>{localization.get('follow')}</FollowText>
      {
        hasSocialNetworks.map((network) => {
          const isObjectNetwork = isValidObject(network);
          const url = isObjectNetwork ? network.url : socialNetworks[`${network}Url`].url;
          const name = isObjectNetwork ? network.name.toLowerCase() : network;
          return (
            <ShareLinkWrapper
              key={name}
              href={url}
              target="_blank"
              onClick={
                isBioCard
                  ? undefined
                  : () => SocialTracker.track(
                    SocialTracker.events.share,
                    {
                      name, ...shareData,
                    }
                  )
              }
            >
              <Icon name={name} size={40} />
            </ShareLinkWrapper>
          );
        })
      }
    </FollowWrapper>
  );
};

Follow.propTypes = {
  className: PropTypes.string,
  isBioCard: PropTypes.bool,
  shareData: PropTypes.object,
  socialNetworks: PropTypes.object.isRequired,
};

export default Follow;
