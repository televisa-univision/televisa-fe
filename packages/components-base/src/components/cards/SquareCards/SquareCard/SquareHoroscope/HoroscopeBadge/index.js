import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import getKey from '@univision/fe-utilities/helpers/object/getKey';
import { LARGE, MEDIUM, SMALL } from '@univision/fe-commons/dist/constants/cardSizes';
import getRenditionUrl from '@univision/fe-commons/dist/utils/images/renditions';
import { HOROSCOPE_CARD_AVATAR_RATIOS } from '@univision/fe-commons/dist/utils/images/ratios/horoscopeCard';
import toDeburr from '@univision/fe-utilities/helpers/string/toDeburr';
import localization from '@univision/fe-utilities/localization';

import ZODIACAL_SIGNS from './assets';
import getSignDate from '../helpers';

import Link from '../../../../../Link';
import Picture from '../../../../../Picture';
import Image from '../../../../../Image';
import Styles from './HoroscopeBadge.styles';

const Container = styled.div`
  ${Styles.container}
`;
const SignContainer = styled.div`
  ${Styles.signContainer}
`;
const SignImage = styled(Image)`
  ${Styles.signImage};
`;
const SignImageContainer = styled(Link)`
  ${Styles.signImageContainer}
`;
const DateString = styled(Link)`
  ${Styles.dateString}
`;
const AvatarContainer = styled(Link)`
  ${Styles.avatarContainer}
`;
const Avatar = styled.div`
  ${Styles.avatar}
`;
const AvatarPicture = styled(Picture)`
  ${Styles.avatarPicture}
`;

/**
 * HoroscopeBadge component
 * @param {Object} props - props of the component
 * @property {array} props.authors - content authors
 * @property {Object} props.signData - horoscope sign data
 * @property {string} props.size - card size
 * @property {string} props.title - content title
 * @property {string} props.uri - content uri
 * @returns {JSX}
 */
const HoroscopeBadge = ({
  authors,
  signData,
  size,
  title,
  uri,
}) => {
  const author = getKey(authors, '0', {});
  const horoscopeSign = toDeburr(signData?.title, { lowercase: true });
  const horoscopeIcon = ZODIACAL_SIGNS.rectangle[horoscopeSign];
  const horoscopeDate = getSignDate(horoscopeSign);
  const avatarRatio = HOROSCOPE_CARD_AVATAR_RATIOS[size];

  return (
    <Container size={size}>
      <SignContainer>
        <SignImageContainer size={size}>
          <SignImage size={size} src={horoscopeIcon} width={81} height={60} />
        </SignImageContainer>
        <DateString
          href={uri}
          className="uvs-font-c-regular"
          useExplicitNavigation
        >
          {localization.get('horoscopeDate', { locals: { horoscopeDate } })}
        </DateString>
      </SignContainer>
      <AvatarContainer
        useExplicitNavigation
        href={author?.uri}
        onClick={null}
        size={size}
      >
        <Avatar size={size}>
          <AvatarPicture
            alt={title}
            image={author?.image}
            overrideImageUrl={getRenditionUrl(
              getKey(author, 'image.renditions.original', {}),
              avatarRatio
            )}
            overrideImageBounds={avatarRatio}
          />
        </Avatar>
      </AvatarContainer>
    </Container>
  );
};

HoroscopeBadge.propTypes = {
  authors: PropTypes.array,
  signData: PropTypes.object,
  size: PropTypes.oneOf([LARGE, MEDIUM, SMALL]),
  title: PropTypes.string,
  uri: PropTypes.string,
};

export default HoroscopeBadge;
