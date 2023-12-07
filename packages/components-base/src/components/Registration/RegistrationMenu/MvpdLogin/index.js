import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Icon from '@univision/fe-icons/dist/components/Icon';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import Styles from './MvpdLogin.styles';

const Container = styled.div`${Styles.container}`;

/**
 * Button base component.
 * @param {Object} props - component props
 * @param {string} iconName - to show
 * @returns {JSX}
 * @constructor
 */
const MvpdLogin = ({ iconName }) => {
  return (
    <Container>
      {iconName ? <Icon name={iconName} size="medium" /> : <Icon name="key" height={21} width={21} />}
      <span className="uvs-font-c-regular">{iconName ? localization.get('mvpdlogout') : localization.get('mvpdlogin')}</span>
    </Container>
  );
};

MvpdLogin.propTypes = {
  iconName: PropTypes.string,
};

export default MvpdLogin;
