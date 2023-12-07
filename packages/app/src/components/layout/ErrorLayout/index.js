import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Link from '@univision/fe-components-base/dist/components/Link';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';

import Styles from './ErrorLayout.styles';

const ContainerStyled = styled.div`${Styles.container}`;
const WrapperStyled = styled.div`${Styles.wrapper}`;
const TitleStyled = styled.h2`${Styles.title}`;
const SubTitleStyled = styled.p`${Styles.subTitle}`;
const HomeLinkStyled = styled(Link)`${Styles.homeLink}`;

/**
 * Error page layout
 * @param {Object} props - react Props for this component
 * @param {Node} props.children - React element to be render
 * @returns {JSX}
 */
const ErrorLayout = ({ children, statusCode }) => {
  return (
    <div className="uvs-container">
      <ContainerStyled>
        <WrapperStyled className="col-12">
          <TitleStyled className="uvs-font-a-bold">
            {localization.get(`status${statusCode}Title`)}
          </TitleStyled>
          <SubTitleStyled>
            {localization.get(`status${statusCode}TitleSecondary`)}
          </SubTitleStyled>
          <SubTitleStyled>
            {localization.get(`status${statusCode}TitleTertiary`)}
          </SubTitleStyled>
        </WrapperStyled>
        {children}
        <div className="col-12">
          <HomeLinkStyled className="uvs-font-a-bold" href="/">
            {localization.get('backToHome')}
          </HomeLinkStyled>
        </div>
      </ContainerStyled>
    </div>
  );
};

ErrorLayout.propTypes = {
  children: PropTypes.node,
  statusCode: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};

ErrorLayout.defaultProps = {
  statusCode: 404,
};

export default ErrorLayout;
