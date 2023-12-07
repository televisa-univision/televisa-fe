import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  toAbsoluteUrl,
  isValidArray,
  alphabeticallyByName,
  sortById,
} from '@univision/fe-commons/dist/utils/helpers';
import Store from '@univision/fe-commons/dist/store/store';
import { getSites } from '@univision/fe-commons/dist/store/storeHelpers';

import Styles from './LinksWithHeader.styles';
import Link from '../Link';

const Container = styled.div`
  ${Styles.container}
`;
const Header = styled.div`
  ${Styles.header}
`;
const LinkContainer = styled.div`
  ${Styles.linkContainer}
`;
const LinkWrapper = styled.div`
  ${Styles.linkWrapper}
`;
const Row = styled.div.attrs({
  className: 'row',
})`${Styles.row}`;
const StyledLink = styled(Link)`
  ${Styles.link}
`;

/**
 * Renders the two link columns
 * @param {Array} links a list of links
 * @param {string} sortType type of sort to apply
 * @param {bool} isPopularTopics true if its a popular topic
 * @returns {JSX}
 */
const renderLinks = (links, sortType, isPopularTopics) => {
  if (!isValidArray(links)) return null;

  const sortFunction = sortType === 'byId' ? sortById : alphabeticallyByName;
  return (
    <Row isPopularTopics={isPopularTopics}>
      {links.sort(sortFunction).map(link => (
        <LinkWrapper className="col-6" key={link.name}>
          <StyledLink
            checkUserLocation
            href={toAbsoluteUrl(link.href, getSites(Store)[link.site])}
            itemProp={link.href ? 'url' : undefined}
            onClick={link.onClick}
            site={link.site}
            target={link.target}
          >
            {link.name}
          </StyledLink>
        </LinkWrapper>
      ))}
    </Row>
  );
};

/**
 * Renders a component with a header and two columns of links
 * @returns {JSX}
 */
const LinksWithHeader = ({
  className, links, title, sortType, isPopularTopics, isWorldCupMVP,
}) => (
  <Container className={className}>
    <Header isWorldCupMVP={isWorldCupMVP}>{title}</Header>
    <LinkContainer>
      {renderLinks(links, sortType, isPopularTopics)}
    </LinkContainer>
  </Container>
);

LinksWithHeader.propTypes = {
  className: PropTypes.string,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string,
      name: PropTypes.string,
      onClick: PropTypes.func,
      site: PropTypes.string,
      target: PropTypes.string,
    })
  ),
  isPopularTopics: PropTypes.bool,
  isWorldCupMVP: PropTypes.bool,
  title: PropTypes.string.isRequired,
  sortType: PropTypes.oneOf(['alphabetically', 'byId']),
};

LinksWithHeader.defaultProps = {
  links: [],
};

export default LinksWithHeader;
