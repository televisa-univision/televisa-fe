import React from 'react';
import styled from 'styled-components';

import Picture from '../../../Picture';
import CaptionWrapper from '../CaptionWrapper';
import Styles from './InlineImagePlaceholder.styles';

const Container = styled.div`${Styles.container}`;

/**
 * InlineImagePlaceholder to be rendered before actual
 * inline image is loaded
 * @returns {JSX}
 */
const InlineImagePlaceholder = () => {
  return (
    <Container>
      <Picture showBackground />
      <CaptionWrapper caption=" " />
    </Container>
  );
};

export default InlineImagePlaceholder;
