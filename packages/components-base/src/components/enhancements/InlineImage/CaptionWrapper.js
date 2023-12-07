import React from 'react';
import styled from 'styled-components';

import Styles from './CaptionWrapper.styles';
import Caption from '../../Caption';

const OuterCaption = styled.div`${Styles.outerCaption}`;
const InlineCaption = styled(Caption)`${Styles.inlineCaption}`;
const FullWidthWrapper = styled.div`${Styles.fullWidthWrapper}`;

/**
 * Caption Wrapper component
 * @param {string} caption the image description
 * @returns {JSX}
 */
const CaptionWrapper = ({
  caption,
  credit,
  isLead,
  fullWidth,
}) => {
  if (!caption) return null;

  const CaptionEl = (
    <OuterCaption>
      <InlineCaption
        content={caption}
        credit={credit}
        type="article"
        isLead={isLead}
      />
    </OuterCaption>
  );

  if (isLead && fullWidth) {
    return (
      <FullWidthWrapper className={Styles.fullWidthWrapper}>
        {CaptionEl}
      </FullWidthWrapper>
    );
  }

  return CaptionEl;
};

export default CaptionWrapper;
