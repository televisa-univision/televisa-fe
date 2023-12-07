import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Icon from '@univision/fe-icons/dist/components/Icon';
import Link from '@univision/fe-components-base/dist/components/Link';
import localization from '@univision/fe-utilities/localization/tudn';
import { WHITE } from '@univision/fe-utilities/styled/constants';
import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import getUniqKey from '@univision/fe-utilities/helpers/content/getUniqKey';

import Styles from './CalienteCTA.styles';

const BetsWrapper = styled.div`
  ${Styles.betsWrapper}
`;
const IconWrapper = styled.div`
  ${Styles.iconWrapper}
`;
const Label = styled.div`
  ${Styles.label}
`;
const StyledLink = styled(Link)`
  ${Styles.styledButton}
`;
const TextWrapper = styled.div`
  ${Styles.textWrapper}
`;

/**
 * CalienteCTA component
 * @param {Object} props - component props
 * @returns {JSX}
 */
const CalienteCTA = ({
  className,
  eventUrl,
  isBetOpen,
  odds,
  onClick,
  inline,
}) => {
  const renderBets = useMemo(() => {
    if (!isBetOpen || !isValidArray(odds)) {
      return null;
    }

    return odds.map(item => (
      <div key={getUniqKey()}>{item}</div>
    ));
  }, [isBetOpen, odds]);
  const ctaLabel = localization.get(isBetOpen ? 'calienteBetOpen' : 'calienteBetClosed');
  // Doing isBetOpen && eventUrl makes react error out on the link, expecting a string not a boolean
  const href = isBetOpen ? eventUrl : null;

  return (
    <StyledLink onClick={onClick} href={href} target="_blank" className={className} inline={inline} isBetOpen={isBetOpen}>
      <IconWrapper inline={inline}>
        <Icon name="caliente" fill={WHITE} size={[20, 20]} />
      </IconWrapper>
      <TextWrapper inline={inline}>
        <Label>
          {ctaLabel}
        </Label>
        {renderBets && (
          <BetsWrapper inline={inline}>
            {renderBets}
          </BetsWrapper>
        )}
      </TextWrapper>
    </StyledLink>
  );
};

CalienteCTA.propTypes = {
  className: PropTypes.string,
  eventUrl: PropTypes.string,
  isBetOpen: PropTypes.bool,
  odds: PropTypes.array,
  onClick: PropTypes.func,
  inline: PropTypes.bool,
};

export default CalienteCTA;
