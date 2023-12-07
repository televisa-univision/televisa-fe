import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';

import Icon from '@univision/fe-icons/dist/components/Icon';
import themes from '@univision/fe-commons/dist/utils/themes/themes.json';
import { WHITE } from '@univision/fe-commons/dist/utils/styled/constants';

import Button from '../../../Button';
import Styles from './ListButton.styles';

const StyledButton = styled(Button)`
  ${Styles.button}
`;

const Text = styled.span`
  ${Styles.text}
`;

/**
 * List button component
 * @returns {JSX}
 */
const ListButton = ({
  label,
  onClick,
  theme,
  isWorldCupMVP,
}) => (
  <ThemeProvider theme={theme}>
    <StyledButton onClick={onClick} isWorldCupMVP={isWorldCupMVP} className="uvs-font-c-regular">
      <Text>{label}</Text>
      <Icon name="arrowDown" size={[24, 24]} fill={WHITE} />
    </StyledButton>
  </ThemeProvider>
);

ListButton.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  theme: PropTypes.object,
  isWorldCupMVP: PropTypes.bool,
};

ListButton.defaultProps = {
  theme: themes.themes.black,
};

export default ListButton;
