import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { exists, hasKey, getKey } from '@univision/fe-commons/dist/utils/helpers';
import { SHOW } from '@univision/fe-commons/dist/constants/contentTypes';
import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';
import styled from 'styled-components';
import Link from '../Link';
import RichText from '../RichText';
import Styles from './ProfileCard.styles';
import ProfileImage from '../BioElements/ProfileImage';
import Follow from '../BioElements/Follow';
import DescriptionAuthor from '../BioElements/Description';
import StrippedBackground from '../BioElements/StrippedBackground';

const ProfileWrapper = styled.div`${Styles.profileWrapper}`;
const Description = styled.div`${Styles.description}`;
const Title = styled.h3`${Styles.title}`;
const RichDescription = styled(RichText)`${Styles.description}`;
const HoverLink = styled(({
  title, image, ...restProps
}) => <Link {...restProps} />)`${Styles.hoverLink}`;
const FollowComponent = styled(Follow)`${Styles.followComponent}`;
const SeparatorBackground = styled(StrippedBackground)`${Styles.separatorBackground}`;

/**
 * Profile Card Component
 * @example <ProfileCard image={Image} title="Jorge Ramos" />
 * @param {string} type - card type
 * @param {className} [className] - modifier class
 * @param {!Object} image - Profile image
 * @param {string} [miniBio] - Profile description
 * @param {string} [uri] - Profile URI href
 * @param {!string} title - Profile name
 * @param {string} [description] - Profile description
 * @param {Object} [socialNetworks] - Profile's social networks
 * @param {Object} [primaryTag] - Profile tag data
 * @param {string} [isTalent] - if it's set to true, it will render the talent layout
 * @param {string} [variant] - variant color
 * @param {string} [uid] - conten id profile
 * @param {Object} widgetContext - widget context
 * @returns {JSX}
 */
const ProfileCard = ({
  type,
  className,
  image,
  miniBio,
  uri,
  title,
  description,
  socialNetworks,
  primaryTag,
  isTalent,
  variant,
  uid,
  widgetContext,
}) => {
  /**
   * Track the click on the content
   */
  const onClickContent = () => {
    WidgetTracker.track(WidgetTracker.events.click, {
      widgetContext,
      target: 'content',
      contentTitle: title,
      contentUid: uid,
    });
  };
  const shareData = {
    uid, type, title,
  };

  if (!exists(image) || !exists(title) || (exists(image) && !hasKey(image, 'renditions'))) {
    return null;
  }

  return (
    <ProfileWrapper className={className} data-name="ProfileCard">
      <HoverLink
        href={uri || getKey(primaryTag, 'link')}
        title={Title}
        image={ProfileImage}
        onClick={onClickContent}
      >
        <ProfileImage title={title} image={image} />
        <Title variant={variant}>{title}</Title>
        {type !== SHOW && (
          <Fragment>
            {isTalent && description && <DescriptionAuthor>{description}</DescriptionAuthor>}
            {exists(miniBio) && !isTalent ? (
              <Description
                dangerouslySetInnerHTML={{ __html: miniBio }} // eslint-disable-line react/no-danger
              />
            ) : (exists(description) && !isTalent && (
              <RichDescription fontSize={14} html={description} />
            ))}
          </Fragment>
        )}
      </HoverLink>
      <FollowComponent
        socialNetworks={socialNetworks}
        isTalent={isTalent}
        shareData={shareData}
      />
      {isTalent && <SeparatorBackground />}
    </ProfileWrapper>
  );
};

ProfileCard.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  image: PropTypes.shape({
    type: PropTypes.string,
    title: PropTypes.string,
    caption: PropTypes.string,
    credit: PropTypes.string,
    renditions: PropTypes.object.isRequired,
  }).isRequired,
  miniBio: PropTypes.string,
  uri: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  socialNetworks: PropTypes.object,
  primaryTag: PropTypes.shape({
    name: PropTypes.string,
    link: PropTypes.string,
  }),
  isTalent: PropTypes.bool,
  variant: PropTypes.oneOf(['light', 'dark']),
  uid: PropTypes.string,
  widgetContext: PropTypes.object,
};

export default ProfileCard;
