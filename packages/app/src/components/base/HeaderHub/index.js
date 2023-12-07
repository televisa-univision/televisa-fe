import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import classnames from 'classnames';
import { useSelector } from 'react-redux';
import { themeSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';

import contentTypes from '@univision/fe-commons/dist/constants/contentTypes';
import getKey from '@univision/fe-utilities/helpers/object/getKey';
import getRenditionUrl from '@univision/fe-commons/dist/utils/images/renditions';
import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import isValidValue from '@univision/fe-utilities/helpers/common/isValidValue';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import { HEADER_HUB_RATIOS } from '@univision/fe-commons/dist/utils/images/ratios/headerHub';
import Button from '@univision/fe-components-base/dist/components/RegistrationForm/Button';
import Follow from '@univision/fe-components-base/dist/components/Follow';
import Link from '@univision/fe-components-base/dist/components/Link';
import Picture from '@univision/fe-components-base/dist/components/Picture';
import RelatedTags from '@univision/fe-components-base/dist/components/RelatedTags';

import BodyChunk from '../BodyChunk';

import Styles from './HeaderHub.styles';

const BioContainer = styled.div`
  ${Styles.bioContainer}
`;
const ButtonWrapper = styled.div`
  ${Styles.buttonWrapper}
`;
const ContentHubWrapper = styled.div`
  ${Styles.contentHubWrapper}
`;
const Description = styled.div`
  ${Styles.description}
`;
const FollowWrapper = styled.div`
  ${Styles.follow}
`;
const PictureStyled = styled(Picture)`
  ${Styles.pictureStyled}
`;
const PictureOverlay = styled.div`
  ${Styles.pictureOverlay}
`;
const PictureWrapper = styled.div`
  ${Styles.pictureWrapper}
`;
const RelatedTagsContainer = styled.div`
  ${Styles.relatedTags}
`;
const Title = styled.div`
  ${Styles.title}
`;
const Wrapper = styled.div`
  ${Styles.wrapper}
`;
const LeftWrapper = styled.div`
  ${Styles.leftWrapper}
`;
const StatsWrapper = styled.div`
  ${Styles.statsWrapper}
`;

/**
 * HeaderHub base component.
 * @param {Object} props React Props for this component
 * @param {bool} [props.alignTop = false] - true if it should align content to top
 * @param {Node} [props.children] - children components to mount
 * @param {string} [props.description] - Description of the page
 * @param {string} [props.device] - Device being used
 * @param {array} [props.fullBio] - Array with bio content
 * @param {boolean} [props.hubTag] - to know if is a Hub Page
 * @param {Object} [props.image] - renditions for person image
 * @param {Object} [props.parent] - parent section related
 * @param {string} [props.personAvatar] - the fallback person avatar picture
 * @param {array} [props.relatedTags] - Tags related to the page
 * @param {bool} [props.showFullBio = false] - true if it should show full bio
 * @param {bool} [props.showFullHeader = false] - true if it should show full header
 * @param {bool} [props.showRelatedTags = false] - true if it should show related tags
 * @param {Object} [props.socialNetworks] - object with networks to share
 * @param {string} [props.type] - Type of the hub page
 * @param {func} [props.trackClick] - the tracking function
 * @param {string} [props.title] - Title of the page
 * @param {string} [props.uri] - the person uri
 * @returns {JSX}
 * @constructor
 */
const HeaderHub = ({
  alignTop,
  children,
  description,
  device,
  fullBio,
  hubTag,
  image,
  parent,
  personAvatar,
  relatedTags,
  showFullHeader,
  showFullBio,
  socialNetworks,
  showRelatedTags,
  title,
  trackClick,
  type,
  uri,
}) => {
  const { isDark } = useSelector(themeSelector);
  const [isOpen, setIsOpen] = useState(true);
  const isPerson = type === contentTypes.PERSON || showFullHeader;
  const showDescription = !showFullHeader && isPerson;
  const isPersonWithParent = !!parent && isPerson;
  const hasFullBio = isValidArray(fullBio);
  const hasPersonAvatar = isValidValue(personAvatar);
  if (!isPersonWithParent && !hubTag && !showFullHeader) {
    return (
      <ContentHubWrapper alignCenter hubTag={hubTag}>
        <Title className="uvs-font-b-bold">{title}</Title>
      </ContentHubWrapper>
    );
  }

  const label = isOpen ? localization.get('readLess') : localization.get('readMore');
  const alignCenter = hubTag && !image && !showFullHeader;
  const hrefUri = !showFullHeader ? uri : null;
  const ratio = device === 'mobile' ? HEADER_HUB_RATIOS.mobile : HEADER_HUB_RATIOS.desktop;

  /**
   * Handles open and close bio
   */
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Wrapper alignCenter={alignCenter} isPerson={isPerson} alignTop={alignTop} className="widget row">
      {!alignCenter && (
        <LeftWrapper className="col-md-4 col-12">
          <PictureWrapper>
            <Link useExplicitNavigation href={hrefUri} onClick={trackClick}>
              <PictureStyled
                alt={title}
                image={image}
                overrideImageUrl={personAvatar || getRenditionUrl(getKey(image, 'renditions.original', {}), ratio)}
                showFallback={hasPersonAvatar}
              />
              {!hasPersonAvatar && <PictureOverlay />}
            </Link>
          </PictureWrapper>
        </LeftWrapper>
      )}
      <ContentHubWrapper
        alignCenter={alignCenter}
        className={classnames({ 'col-md-8 col-12': !alignCenter, 'col-12': alignCenter })}
        alignTop={alignTop}
      >
        <Title className="uvs-font-b-bold" alignTop={alignTop}>{title}</Title>
        {showDescription && (
          <Description className="uvs-font-c-regular">
            {description}
          </Description>
        )}
        {showRelatedTags && isValidArray(relatedTags) && (
          <RelatedTagsContainer alignCenter={alignCenter}>
            <RelatedTags forceColumn={alignCenter} tags={relatedTags} separator=" " />
          </RelatedTagsContainer>
        )}
        <FollowWrapper>
          <Follow socialNetworks={socialNetworks} />
        </FollowWrapper>
        {children && (
          <StatsWrapper hasFullBio={hasFullBio} isRight>
            {children}
          </StatsWrapper>
        )}
        <BioContainer isOpen={isOpen} isHub={hubTag} showFullBio={showFullBio} isDarkTheme={isDark} className="uvs-font-a-light">
          {isPerson
            ? fullBio?.map(bio => <BodyChunk key={getKey(bio, 'objectData.uid', bio?.value)} {...bio} />)
            : description}
        </BioContainer>
        {!showFullBio && fullBio?.length > 1 && (
          <ButtonWrapper alignCenter={alignCenter} isOpen={isOpen}>
            <Button
              backgroundColor="white"
              borderColor="black"
              colorLabel="black"
              icon="arrow"
              label={label}
              iconPositionRight
              onClick={handleClick}
            />
          </ButtonWrapper>
        )}
      </ContentHubWrapper>
    </Wrapper>
  );
};

HeaderHub.propTypes = {
  alignTop: PropTypes.bool,
  children: PropTypes.node,
  description: PropTypes.string,
  device: PropTypes.string,
  showRelatedTags: PropTypes.bool,
  hubTag: PropTypes.bool,
  image: PropTypes.shape({
    type: PropTypes.string,
    title: PropTypes.string,
    caption: PropTypes.string,
    credit: PropTypes.string,
    renditions: PropTypes.object.isRequired,
  }),
  parent: PropTypes.object,
  personAvatar: PropTypes.string,
  fullBio: PropTypes.array,
  relatedTags: PropTypes.array,
  showFullBio: PropTypes.bool,
  showFullHeader: PropTypes.bool,
  socialNetworks: PropTypes.object,
  type: PropTypes.string,
  title: PropTypes.string,
  trackClick: PropTypes.func,
  uri: PropTypes.string,
};

export default HeaderHub;
