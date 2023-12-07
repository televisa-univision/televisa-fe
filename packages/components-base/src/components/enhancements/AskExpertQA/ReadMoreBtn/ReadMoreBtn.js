import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import Icon from '@univision/fe-icons/dist/components/Icon';
import { ASTRONAUT } from '@univision/fe-commons/dist/utils/styled/constants';
import Styles from './ReadMoreBtn.styles';

const ArrowIcon = styled(Icon)`${Styles.arrowIcon}`;
const CtaBtn = styled.p`${Styles.ctaBtn}`;

/**
* Read More Button
* @param {function} expandClickHandler - expands text handler
* @param {number} idx - index
* @returns {JSX}
*/
const ReadMoreBtn = ({
  expandClickHandler,
  idx,
}) => {
  return (
    <CtaBtn onClick={expandClickHandler} data-id={idx} className="uvs-font-c-regular">
      {localization.get('readMore')}
      <ArrowIcon name={'arrowDown'} size="xsmall" fill={ASTRONAUT} />
    </CtaBtn>
  );
};

ReadMoreBtn.propTypes = {
  expandClickHandler: PropTypes.func,
  idx: PropTypes.number,
};

export default ReadMoreBtn;
