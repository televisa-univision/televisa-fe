import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import { ASTRONAUT } from '@univision/fe-commons/dist/utils/styled/constants';
import Icon from '@univision/fe-icons/dist/components/Icon';

import Link from '../Link';
import Styles from './AskExpertCtaBtn.styles';

const CtaContainer = styled.div.attrs({
  className: 'uvs-font-c-regular',
})`${Styles.ctaContainer}`;

const ArrowRight = styled(Icon).attrs({
  fill: ASTRONAUT,
  name: 'arrowRight',
  size: 12,
})`${Styles.arrowRight}`;

/**
 * Ask Expert CTA Btn component
 * @param {Object} props - component props
 * @param {Object} props.askExpertCtaBtntracking - for Tracking the Click Event
 * @param {Object} props.className - for Custom Styling
 * @param {Object} props.uri - url at the button
 * @returns {JSX}
 */
const AskExpertCtaBtn = ({
  askExpertCtaBtntracking,
  className,
  uri,
}) => {
  return (
    <Link
      href={uri}
      onClick={askExpertCtaBtntracking}
    >
      <CtaContainer className={className}>
        {localization.get('seeMore')}
        <ArrowRight />
      </CtaContainer>
    </Link>
  );
};

AskExpertCtaBtn.propTypes = {
  askExpertCtaBtntracking: PropTypes.func,
  className: PropTypes.string,
  uri: PropTypes.string,
};

export default AskExpertCtaBtn;
