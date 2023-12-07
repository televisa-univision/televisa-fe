import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { themeSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';
import Link from '@univision/fe-components-base/dist/components/Link';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import Icon from '@univision/fe-icons/dist/components/Icon';

import Styles from './TelevisaErrorLayout.styles';

const ContainerStyled = styled.div`${Styles.container}`;
const ButtonContainerStyled = styled.div`${Styles.buttonContainer}`;
const WrapperStyled = styled.div`${Styles.wrapper}`;
const TitleStyled = styled.h2`${Styles.title}`;
const SubTitleStyled = styled.p`${Styles.subTitle}`;
const TextStyled = styled.p`${Styles.text}`;
const ButtonTextStyled = styled.p`${Styles.buttonText}`;
const HomeLinkStyled = styled(Link)`${Styles.homeLink}`;

/**
 * Error page layout
 * @param {Object} props - react Props for this component
 * @param {Node} props.children - React element to be render
 * @returns {JSX}
 */
const TelevisaErrorLayout = ({ children, statusCode }) => {
  const theme = useSelector(themeSelector);
  return (
    <div className="uvs-container">
      <ContainerStyled>
        <WrapperStyled className="col-12">
          <TitleStyled className="uvs-font-a-bold">
            {localization.get(`status${statusCode}TitleTelevisa`)}
          </TitleStyled>
          <SubTitleStyled>
            {localization.get(`status${statusCode}TitleSecondaryTelevisa`)}
          </SubTitleStyled>
          <ButtonContainerStyled>
            <HomeLinkStyled className="uvs-font-a-bold" href="/" theme={theme?.primary}>
              <Icon name="arrowLeft" fill="#FFFFFF" size="small" />
              <ButtonTextStyled>
                {`${localization.get('goTo')} ${localization.get('home')}`}
              </ButtonTextStyled>
            </HomeLinkStyled>
          </ButtonContainerStyled>
          <TextStyled>
            {`Error ${statusCode}`}
          </TextStyled>
        </WrapperStyled>
        {children}
      </ContainerStyled>
    </div>
  );
};

TelevisaErrorLayout.propTypes = {
  children: PropTypes.node,
  statusCode: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};

TelevisaErrorLayout.defaultProps = {
  statusCode: 404,
};

export default TelevisaErrorLayout;
