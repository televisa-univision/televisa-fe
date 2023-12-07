import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { toAbsoluteUrl, isValidArray } from '@univision/fe-commons/dist/utils/helpers';
import Store from '@univision/fe-commons/dist/store/store';
import { getSites } from '@univision/fe-commons/dist/store/storeHelpers';
import features from '@univision/fe-commons/dist/config/features';

import Styles from './ImageLinksWithHeader.styles';
import Link from '../Link';
import TopicBar from '../TopicBar';

const Container = styled.div`${Styles.container}`;
const ImageLinksContainer = styled.div`${Styles.imageLinksContainer}`;
const ImageLinkWrapper = styled.div`${Styles.imageLinkWrapper}`;
const StyledTopicBar = styled(TopicBar)`${Styles.topicBar}`;
const Image = styled.div`${Styles.image}`;

/**
 * Renders the list of link images
 * @param {Array} linkImages the list of link images
 * @returns {JSX}
 */
const renderLinkImages = (linkImages) => {
  return (
    <ImageLinksContainer className="row">
      {isValidArray(linkImages)
        && linkImages.map((linkImage, index) => (
          <ImageLinkWrapper index={index} key={linkImage.name} className="col-6">
            <Link
              href={toAbsoluteUrl(linkImage.href, getSites(Store)[linkImage.site])}
              itemProp={linkImage.href ? 'url' : undefined}
              onClick={linkImage.onClick}
              target={linkImage.target}
            >
              <Image renditions={linkImage.renditions} />
            </Link>
          </ImageLinkWrapper>
        ))}
    </ImageLinksContainer>
  );
};

/**
 * Renders a list of link images along with a header link
 * @param {Object} props the component props
 * @param {string} props.className the class name to override any styles of this component
 * @param {Object} props.content the data for the header and the link images
 * @param {Array} props.content.children a list of image links
 * @param {Object} props.content.cta an optional object with the data for the CTA that goes on the
 * right part of the header
 * @param {string} props.content.href the link where the header redirects to
 * @param {string} props.content.name the text that will go on the header
 * @param {string} props.content.site the specific domain for the header link, defaults to univision
 * @param {string} props.content.target the target of the link, defaults to _self
 * @param {string} props.onHeaderClick the click handler for the header
 * @param {boolean} props.withSeparator to determine whether to show or hide a bottom separator
 * @returns {JSX}
 */
const ImageLinksWithHeader = ({
  className, content = {}, onHeaderClick, withSeparator,
}) => {
  return (
    <Container className={className}>
      <StyledTopicBar
        cta={content.cta}
        isWorldCupMVP={features.deportes.isWorldCupMVP()}
        onClick={onHeaderClick}
        separator={withSeparator ? 'bottom' : undefined}
        separatorSpace={withSeparator ? 6 : 0}
        settings={{
          title: content.name,
          titleLink: { href: content.href, site: content.site, target: content.target },
        }}
        size="large"
      />
      {renderLinkImages(content.children)}
    </Container>
  );
};

ImageLinksWithHeader.propTypes = {
  className: PropTypes.string,
  content: PropTypes.shape({
    children: PropTypes.arrayOf(
      PropTypes.shape({
        href: PropTypes.string,
        name: PropTypes.string,
        onClick: PropTypes.func,
        site: PropTypes.string,
        renditions: PropTypes.shape({
          xxs: PropTypes.string,
          md: PropTypes.string,
          xl: PropTypes.string,
        }),
        target: PropTypes.string,
      })
    ),
    cta: PropTypes.shape({
      href: PropTypes.string,
      onClick: PropTypes.func,
      site: PropTypes.string,
      target: PropTypes.string,
      text: PropTypes.string,
    }),
    href: PropTypes.string,
    name: PropTypes.string,
    site: PropTypes.string,
    target: PropTypes.string,
  }),
  onHeaderClick: PropTypes.func,
  withSeparator: PropTypes.bool,
};

export default ImageLinksWithHeader;
