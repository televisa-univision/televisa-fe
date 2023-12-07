import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import VisibilitySensor from 'react-visibility-sensor';
import styled from 'styled-components';

import ArticleTracker from '@univision/fe-commons/dist/utils/tracking/tealium/article/ArticleTracker';
import localization from '@univision/fe-utilities/localization';
import { VISIBILITY_SENSOR_SCROLL_THROTTLE } from '@univision/fe-commons/dist/constants/spa';
import toDeburr from '@univision/fe-utilities/helpers/string/toDeburr';
import truncateString from '@univision/fe-utilities/helpers/string/truncateString';
import sanitizeHtml from '@univision/fe-utilities/helpers/html/sanitizeHtml';

import ListCTA from './ListCTA';
import RichText from '../../RichText';
import Separator from '../../Separator';
import ShowMedia from './ShowMedia';
import Sponsor from '../../Sponsor';
import Styles from './ListItem.styles';

export const Container = styled.div`${Styles.container}`;
export const Content = styled.div`${Styles.content}`;
export const ContentLine = styled.div`${Styles.contentLine}`;
export const ContentNumber = styled.div`${Styles.contentNumber}`;
export const ContentSponsor = styled(Sponsor)`${Styles.sponsor}`;
export const Description = styled(RichText)`${Styles.description}`;
export const LineTitle = styled.div`${Styles.lineTitle}`;
export const List = styled.div`${Styles.list}`;
export const Price = styled.p.attrs({ className: 'uvs-font-a-regular' })`${Styles.price}`;
export const Title = styled.h2.attrs({ className: 'uvs-font-b-bold' })`${Styles.title}`;
export const TitleNumber = styled.p`${Styles.titleNumber}`;

/**
 * ListItem Component
 * @param {Object} props - component props
 * @param {string} [props.authorComments] - author comments
 * @param {string} [props.description] - list description
 * @param {string} [props.device] - what platform user is accessing
 * @param {Object} [props.eCommerceCtas] - ecommerce call to actions
 * @param {number} props.listNumber - number of item list
 * @param {Object} [props.media] - media options
 * @param {string} props.price - list price
 * @param {Object} [props.sponsor] - sponsor info
 * @param {string} props.title -  title of the list
 * @returns {JSX}
 */
const ListItem = ({
  authorName,
  authorComments,
  countListItems,
  description,
  device,
  eCommerceCtas,
  listNumber,
  media,
  positionListItem,
  price,
  sponsor,
  title,
  titleListItem,
  uid,
}) => {
  const dataTracking = {
    list_item_name: title,
    list_count: countListItems,
    list_id: uid,
    list_title: toDeburr(truncateString(sanitizeHtml(titleListItem)), { lowercase: true }),
    list_type: media?.type,
    list_sponsor: sponsor?.name,
    list_video_id: media?.mcpid,
    list_position: positionListItem,
    list_depth: 1,
  };

  /**
   * Creates tracking event data for a List Item change in vertical list items
   * @param {boolean} isVisible true or false
   */
  const handleSlideVisibilityChange = useCallback((isVisible) => {
    if (isVisible) {
      ArticleTracker.trackListItemChange(dataTracking);
    }
  }, [dataTracking]);

  /**
   * Tracking Event for Apply Button on LisItem Article
   * @param {string} productName - name product
   * @param {string} ctaText - cta button text
   * @param {string} ctaLink -  cta link button
   */
  const trackingListActionsBtnCTA = useCallback((productName, ctaText, ctaLink) => {
    const dataTrackingButtons = {
      event: 'list_click_shopping',
      ...dataTracking,
      list_cta_link_url: ctaLink,
      list_cta_text: ctaText,
      list_product_name: productName,
      list_depth: 1,
    };
    ArticleTracker.track(ArticleTracker.events.callActionCTAClick, { dataTrackingButtons });
  }, [dataTracking]);

  const descriptionContent = authorName && authorName !== 'El editor opina'
    ? `<strong>${authorName} ${localization.get('thinks')}: </strong>${authorComments}`
    : `<strong>${localization.get('editorThinks')}: </strong>${authorComments}`;

  return (
    <Container>
      <VisibilitySensor
        partialVisibility
        minTopValue={300}
        scrollCheck
        intervalCheck={false}
        scrollThrottle={VISIBILITY_SENSOR_SCROLL_THROTTLE}
        onChange={isVisible => handleSlideVisibilityChange(isVisible)}
      >
        <Content>
          <ContentLine>
            <LineTitle>
              <Separator />
            </LineTitle>
            <ContentNumber>
              <TitleNumber>{listNumber}</TitleNumber>
            </ContentNumber>
            <LineTitle>
              <Separator />
            </LineTitle>
          </ContentLine>
          <Title>{title}</Title>
          <Price>{price}</Price>
          {sponsor && (
          <ContentSponsor
            sponsorBy={localization.get('sponsorBy')}
            logo={sponsor?.image?.renditions?.original?.href}
            link="#"
          />
          )}
          <List>
            {media && (
            <ShowMedia
              media={media}
              device={device}
            />
            )}
            {description && (
            <Description key={description} html={description} />
            )}
            {authorComments && (
            <Description
              key={authorComments}
              html={descriptionContent}
            />
            )}
          </List>
          {eCommerceCtas && (
          <ListCTA
            eCommerceCtas={eCommerceCtas}
            trackingListActionsBtnCTA={trackingListActionsBtnCTA}
          />
          )}
        </Content>
      </VisibilitySensor>
    </Container>
  );
};

ListItem.propTypes = {
  authorName: PropTypes.string,
  authorComments: PropTypes.string,
  countListItems: PropTypes.number,
  description: PropTypes.string,
  device: PropTypes.string,
  eCommerceCtas: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      link: PropTypes.shape({
        href: PropTypes.string,
        target: PropTypes.string,
        text: PropTypes.string,
        uid: PropTypes.string,
      }),
    })
  ),
  listNumber: PropTypes.number,
  media: PropTypes.object,
  positionListItem: PropTypes.number,
  price: PropTypes.string,
  sponsor: PropTypes.object,
  title: PropTypes.string,
  titleListItem: PropTypes.string,
  uid: PropTypes.string,
};

export default ListItem;
