import React from 'react';
import styled from 'styled-components';
import Icon from '@univision/fe-icons/dist/components/Icon';
import PropTypes from 'prop-types';
import isValidFunction from '@univision/fe-utilities/helpers/common/isValidFunction';
import {
  GREY_BLACK,
  BLACK,
} from '@univision/fe-commons/dist/utils/styled/constants';
import Styles from './TitleBack.styles';

const Container = styled.div`${Styles.container}`;
const Title = styled.div`${Styles.title}`;
/**
 * RegistrationMenu base component.
 * @returns {JSX}
 * @constructor
 */
const TitleBack = ({ color, label, onClick }) => {
  return (
    <Container onClick={isValidFunction(onClick) ? onClick : undefined}>
      <Title color={color} className="uvs-font-a-bold">
        <Icon name="arrowLeft" size="small" fill={GREY_BLACK} />
        <span>{label}</span>
      </Title>
    </Container>
  );
};

TitleBack.defaultProps = {
  color: BLACK,
};

TitleBack.propTypes = {
  color: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
};

export default TitleBack;
