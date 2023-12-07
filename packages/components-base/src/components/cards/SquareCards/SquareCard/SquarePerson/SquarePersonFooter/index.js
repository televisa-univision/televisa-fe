import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import getKey from '@univision/fe-utilities/helpers/object/getKey';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import {
  LARGE,
  MEDIUM,
  SMALL,
} from '@univision/fe-commons/dist/constants/cardSizes';

import SocialLink from '../../../../../SocialLink';
import Styles from './SquarePersonFooter.styles';

const PersonCardFooter = styled.div`
  ${Styles.personCardFooter}
`;
const PersonCardSocial = styled.div`
  ${Styles.personCardSocial}
`;
const PersonCardFollow = styled.span`
  ${Styles.personCardFollow}
`;
const PersonCardSocialLink = styled(SocialLink)`
  ${Styles.personCardSocialLink}
`;
const SocialWrapper = styled(motion.div).attrs({
  whileHover: { scale: 1.1 },
  whileTap: { scale: 0.95 },
})`
  ${Styles.socialWrapper}
`;

/**
 * Render the footer of the person card
 * @param {string} className the modifier class
 * @param {string} size props size
 * @param {Object} options extra opts
 * @returns {JSX}
 */
const SquarePersonFooter = ({ className, size, options }) => {
  const {
    social,
    isDark,
  } = options;
  const {
    facebookUrl, twitterUrl, instagramUrl,
  } = social;
  const facebookUri = getKey(facebookUrl, 'url', '');
  const twitterUri = getKey(twitterUrl, 'url', '');
  const instagramUri = getKey(instagramUrl, 'url', '');
  const hasSocialNetworks = facebookUri
    || twitterUri || instagramUri;

  return (
    <PersonCardFooter size={size} className={className}>
      {hasSocialNetworks && (
        <PersonCardSocial size={size}>
          <PersonCardFollow className="uvs-font-c-bold" size={size} isDark={isDark}>
            {localization.get('follow')}
          </PersonCardFollow>
          {facebookUrl && (
            <SocialWrapper size={size}>
              <PersonCardSocialLink
                link={{ url: facebookUri }}
                type="facebook"
                iconOnly
                iconSize={20}
                size={size}
              />
            </SocialWrapper>
          )}
          {twitterUrl && (
            <SocialWrapper size={size}>
              <PersonCardSocialLink
                link={{ url: twitterUri }}
                cardType="square"
                type="twitter"
                iconOnly
                iconSize={20}
                size={size}
              />
            </SocialWrapper>
          )}
          {instagramUrl && (
            <SocialWrapper size={size}>
              <PersonCardSocialLink
                link={{ url: instagramUri }}
                cardType="square"
                type="instagram"
                iconOnly
                iconSize={20}
                size={size}
              />
            </SocialWrapper>
          )}
        </PersonCardSocial>
      )}
    </PersonCardFooter>
  );
};

SquarePersonFooter.propTypes = {
  className: PropTypes.string,
  options: PropTypes.shape({
    social: PropTypes.object,
    isDark: PropTypes.bool,
  }),
  size: PropTypes.oneOf([LARGE, MEDIUM, SMALL]),
};

SquarePersonFooter.defaultProps = {
  options: {
    social: {},
    isDark: false,
  },
};

export default SquarePersonFooter;
