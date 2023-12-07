import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import getKey from '@univision/fe-utilities/helpers/object/getKey';
import truncateString from '@univision/fe-utilities/helpers/string/truncateString';
import {
  LARGE,
  MEDIUM,
  SMALL,
} from '@univision/fe-commons/dist/constants/cardSizes';
import getRenditionUrl from '@univision/fe-commons/dist/utils/images/renditions';
import { PERSONA_CARD_RATIOS } from '@univision/fe-commons/dist/utils/images/ratios/personaCard';

import Title from '../../../../Title';
import Link from '../../../../Link';
import Picture from '../../../../Picture';
import SquarePersonFooter from './SquarePersonFooter';
import Styles from './SquarePerson.styles';

const TITLE_TRUNCATE_LENGTH = 30;
const OCCUPATION_TRUNCATE_LENGTH = 60;

const PersonCardContainer = styled.div`
  ${Styles.personCardContainer}
`;
const PersonCardMedia = styled.div`
  ${Styles.personCardMedia}
`;
const PersonCardPictureOverlay = styled.div`
  ${Styles.personCardPictureOverlay}
`;
const PersonCardPicture = styled(Picture)`
  ${Styles.personCardPicture}
`;
const PersonCardOccupation = styled.div`
  ${Styles.personCardOccupation}
`;
const PersonCardBody = styled.div`
  ${Styles.personCardBody}
`;
const PersonCardContent = styled.div`
  ${Styles.personCardContent}
`;
const PersonCardTitle = styled(Title)`
  ${Styles.personCardTitle}
`;
const Wrapper = styled.div`
  ${Styles.wrapper}
`;

/**
 * Square Person
 * @param {Object} props component props
 * @param {string} [props.description] - Person text description
 * @param {Object} [props.image] - renditions for person image
 * @param {bool} [props.isDark] - if card is dark
 * @param {string} [props.size] - size of the card
 * @param {Object} [props.socialNetworks] - object with social networks fro the person
 * @param {string} [props.title] - song/radio station main title
 * @param {string} [props.trackClick] - the tracking function
 * @param {Object} [props.uri] - the person uri
 * @returns {JSX}
 */
const SquarePerson = (props) => {
  const {
    description,
    image,
    isDark,
    size,
    socialNetworks,
    title,
    trackClick,
    uri,
  } = props;

  return (
    <Wrapper size={size}>
      <PersonCardContainer isDark={isDark} size={size}>
        <PersonCardMedia size={size}>
          <Link useExplicitNavigation href={uri} onClick={trackClick}>
            <PersonCardPicture
              alt={title}
              image={image}
              overrideImageUrl={getRenditionUrl(
                getKey(image, 'renditions.original', {}),
                PERSONA_CARD_RATIOS.square
              )}
              overrideImageBounds={PERSONA_CARD_RATIOS.square}
            />
            <PersonCardPictureOverlay />
          </Link>
        </PersonCardMedia>
        <PersonCardBody size={size}>
          <PersonCardContent size={size}>
            <PersonCardTitle size={size} isDark={isDark}>
              <Link
                useExplicitNavigation
                className="uvs-font-b-bold"
                href={uri}
                onClick={trackClick}
              >
                {truncateString(
                  title,
                  {
                    maxChars: TITLE_TRUNCATE_LENGTH,
                    append: '...',
                    onlyFullWords: true,
                  }
                )}
              </Link>
            </PersonCardTitle>
            <PersonCardOccupation className="uvs-font-c-bold" size={size} isDark={isDark}>
              {truncateString(
                description,
                {
                  maxChars: OCCUPATION_TRUNCATE_LENGTH,
                  append: '...',
                  onlyFullWords: true,
                }
              )}
            </PersonCardOccupation>
          </PersonCardContent>
          <SquarePersonFooter
            size={size}
            options={{
              uri,
              social: socialNetworks || {},
              trackClick,
              isDark,
            }}
          />
        </PersonCardBody>
      </PersonCardContainer>
    </Wrapper>
  );
};

SquarePerson.propTypes = {
  description: PropTypes.string.isRequired,
  image: PropTypes.shape({
    type: PropTypes.string,
    title: PropTypes.string,
    caption: PropTypes.string,
    credit: PropTypes.string,
    renditions: PropTypes.object.isRequired,
  }),
  isDark: PropTypes.bool,
  label: PropTypes.shape({
    name: PropTypes.string,
    link: PropTypes.string,
  }),
  size: PropTypes.oneOf([LARGE, MEDIUM, SMALL]),
  socialNetworks: PropTypes.shape({
    facebook: PropTypes.object,
    twitter: PropTypes.object,
    instagram: PropTypes.object,
  }),
  title: PropTypes.string,
  trackClick: PropTypes.func,
  uri: PropTypes.string.isRequired,
};

export default SquarePerson;
