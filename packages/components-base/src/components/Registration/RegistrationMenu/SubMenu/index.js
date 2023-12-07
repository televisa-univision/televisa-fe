import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import isValidFunction from '@univision/fe-utilities/helpers/common/isValidFunction';
import Styles from './SubMenu.styles';

const Container = styled.div`${Styles.container}`;
const Description = styled.div`${Styles.description}`;
const Title = styled.div`${Styles.Title}`;
/**
 * Button base component.
 * @param {Object} props - component props
 * @param {string} description - description on the submenu
 * @param {string} title - title of submenu
 * @returns {JSX}
 * @constructor
 */
const SubMenu = ({ description, onClick, title }) => {
  return (
    <Container onClick={isValidFunction(onClick) ? onClick : undefined}>
      <Title className="uvs-font-a-bold">{title}</Title>
      <Description>{description}</Description>
    </Container>
  );
};

SubMenu.propTypes = {
  description: PropTypes.string,
  onClick: PropTypes.func,
  title: PropTypes.string,
};

export default SubMenu;
