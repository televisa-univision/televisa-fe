/**
 * @module PrendeTV External Embed Promo Card
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import RawHtmlContainer from '@univision/fe-components-base/dist/components/enhancements/RawHtmlContainer';
import FullWidth from '@univision/fe-components-base/dist/components/FullWidth';

import Styles from './ExternalEmbed.styles';

const Wrapper = styled.section`${Styles.wrapper}`;

/**
 * PrendeTV External Embed Promo Card
 * @param {Object} props - initial props
 * @property {string} props.externalContent - settings for the external embed
 * @returns {JSX.Element}
 */
const ExternalEmbed = ({ externalContent }) => {
  let externalEmbed = (
    <RawHtmlContainer
      html={externalContent.html}
      settingsExternalContent={externalContent}
    />
  );

  if (externalContent.fullWidth) {
    externalEmbed = (
      <FullWidth breakpoints={['xxs', 'xs', 'sm', 'md', 'lg', 'xl']}>
        {externalEmbed}
      </FullWidth>
    );
  }

  return (
    <Wrapper>
      {externalEmbed}
    </Wrapper>
  );
};

ExternalEmbed.propTypes = {
  externalContent: PropTypes.shape({
    fullWidth: PropTypes.bool.isRequired,
    html: PropTypes.string.isRequired,
  }).isRequired,
};

export default ExternalEmbed;
