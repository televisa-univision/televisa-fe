import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styled from 'styled-components';

import { themeSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';
import { isValidFunction, isValidObject } from '@univision/fe-commons/dist/utils/helpers';
import Icon from '@univision/fe-icons/dist/components/Icon';
import features from '@univision/fe-commons/dist/config/features';

import { isExtendedDarkPage } from '../helpers';
import Link from '../../Link';
import Logo from '../../Logo';
import LocalImage from '../../Image';

import Styles from './ShortTitle.styles';

// Styled components
const Wrapper = styled.div`${Styles.wrapper}`;
const ShortTitleRowContainer = styled.div`${Styles.shortTitleRowContainer}`;
const ShortTitleWrapper = styled.div`${Styles.shortTitleWrapper}`;
const Container = styled.div`${Styles.container}`;
const ShortTitleLink = styled(Link)`${Styles.link}`;
const ShortTitleLogo = styled(Logo)`${Styles.logo}`;
const LeftCol = styled.div`${Styles.leftCol}`;
const RightCol = styled.div`${Styles.rightCol}`;
const CustomLogosWrapper = styled.div`${Styles.customLogosWrapper}`;
const IconWrapper = styled.div`${Styles.iconWrapper}`;
const CustomLogo = styled(LocalImage)`${Styles.customLogo}`;
const CustomSubLogo = styled(LocalImage)`${Styles.customSubLogo}`;

/**
  * Renders the content for the Short Title, either text or logo
  * @param {string} title Text of the Short Title
  * @param {string} logo Optional property for a logo instead of a title
  * @returns {JSX}
  */
const ShortTitleContent = ({ title, logo }) => {
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (logo) {
      const imgElement = new Image();

      imgElement.onload = () => {
        setImageDimensions({
          width: imgElement.width,
          height: imgElement.height,
        });
      };

      imgElement.src = logo;
    }
  }, [logo]);

  if (!logo && title) return <Fragment>{title}</Fragment>;

  if (!title && logo && imageDimensions.width && imageDimensions.height) {
    return (
      <ShortTitleLogo
        src={logo}
        alt="Short Title Logo"
        height={imageDimensions.height}
      />
    );
  }

  return null;
};

ShortTitleContent.propTypes = {
  title: PropTypes.string,
  logo: PropTypes.string,
};

/**
 * Renders the weather widget (if requested via componentRight)
 * @param {function} componentRight Optional widget/component to be added to the
 * right column
 * @returns {JSX}
 */
const componentRightContent = (componentRight) => {
  if (isValidFunction(componentRight)) {
    return (
      <RightCol className="col-4">
        {componentRight()}
      </RightCol>
    );
  }

  return null;
};

/**
 * Short-title Navigation styled component
 * @param {Object} props of the component
 * @returns {JSX}
 */
const ShortTitle = ({
  componentRight,
  contentType,
  logo,
  slideshowType,
  site,
  title,
  uri,
  variant,
}) => {
  const theme = useSelector(themeSelector);
  const { isExtended } = isExtendedDarkPage(
    contentType, slideshowType, variant
  );
  const isWorldCupMVP = features.deportes.isWorldCupMVP();

  return (
    <Wrapper data-element-name="ShortTitle" theme={theme}>
      <div className="uvs-container">
        <ShortTitleRowContainer className="row" isWorldCupMVP={isWorldCupMVP}>
          <ShortTitleWrapper
            className={classnames('col-12', {
              'col-md-10 col-lg-8': !isExtended,

            })}
          >
            <Container className="row">
              <LeftCol
                className={isValidFunction(componentRight)
                  ? 'col-8'
                  : 'col-12'}
              >
                <ShortTitleLink
                  href={uri}
                  site={site}
                  className="uvs-font-a-bold"
                  target="_self"
                  checkUserLocation
                  isWorldCupMVP={isWorldCupMVP}
                >
                  {!theme?.useCustomLogos && <ShortTitleContent title={title} logo={logo} />}
                  {theme?.useCustomLogos && (
                    <CustomLogosWrapper>
                      {isValidObject(theme.svgIcon) && (
                        <IconWrapper>
                          <Icon name={theme.svgIcon.name} viewBox={theme.svgIcon.viewBox} />
                        </IconWrapper>
                      )}
                      {theme.logo && <CustomLogo src={theme.logo} />}
                      {theme.sublogo && <CustomSubLogo src={theme.sublogo} />}
                    </CustomLogosWrapper>
                  )}
                </ShortTitleLink>
              </LeftCol>
              {componentRightContent(componentRight)}
            </Container>
          </ShortTitleWrapper>
        </ShortTitleRowContainer>
      </div>
    </Wrapper>
  );
};

/**
 * propTypes
 * @property {function} [componentRight] - Optional widget/component to be added
 * to the right column
 * @property {string} contentType Page content type, from page.data.type
 * @property {string} [logo] - Optional property for a logo instead of a title
 * @property {string} slideshowType Vertical or Horizontal slideshow
 * @property {string} [title] - Text of the Short Title
 * @property {string} [site] - Site that should got the link
 * @property {string} [uri] - URL for the Short title link to go to
 * @property {string} variant Light or dark variant of the content
 */
ShortTitle.propTypes = {
  componentRight: PropTypes.func,
  contentType: PropTypes.string,
  logo: PropTypes.string,
  slideshowType: PropTypes.string,
  title: PropTypes.string,
  site: PropTypes.string,
  uri: PropTypes.string,
  variant: PropTypes.string,
};

ShortTitle.defaultProps = {
  componentRight: null,
  logo: null,
  title: null,
};

export default ShortTitle;
