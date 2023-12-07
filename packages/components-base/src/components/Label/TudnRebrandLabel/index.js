import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  BREAKING,
  STANDARD,
} from '@univision/fe-commons/dist/constants/contentPriorities';
import toDeburr from '@univision/fe-utilities/helpers/string/toDeburr';
import isValidValue from '@univision/fe-utilities/helpers/common/isValidValue';
import localization from '@univision/fe-utilities/localization';

import LiveIcon from '../../LiveIcon';
import Link from '../../Link';
import {
  BREAKING_NEWS,
  LIVESTREAM,
  LIVECONTENT,
  LIVEBLOG,
  DEFAULT,
} from './constants';
import Styles from './TudnRebrandLabel.styles';

const LabelWrapper = styled(Link)`${Styles.labelWrapper}`;

const LabelText = styled.span`
  ${Styles.labelText}
`;
const LabelLiveIcon = styled(LiveIcon)`
  ${Styles.liveIcon}
`;

/**
 * Label component
 * @param {!Object} props - components props
 * @param {function} props.className - Class to be added to the component
 * @param {boolean} props.hasLiveIcon - Should the label show the live icon
 * @param {string} props.label - Label copy
 * @param {string} props.type - Type of label
 * @param {string} props.contentPriority - Type of content that contains this label
 * @returns {JSX}
 */
const Label = ({
  className,
  hasLiveIcon,
  text,
  smallSize,
  type,
  contentPriority,
  ...props
}) => {
  const listDots = [LIVESTREAM, LIVECONTENT, LIVEBLOG];
  const currentLabel = useMemo(
    () => {
      const lowerCase = true; // to deburr with lowercase
      const isBreakingNews = isValidValue(contentPriority)
          && toDeburr(contentPriority, { lowerCase }) === toDeburr(BREAKING, { lowerCase });

      if (
        isBreakingNews
        || toDeburr(text, { lowerCase }) === toDeburr(localization.get('breakingNews'), { lowerCase })
      ) {
        return {
          hasLiveIcon: false,
          label: `${localization.get('breakingNews')}`,
          type: BREAKING_NEWS,
        };
      }

      return {
        hasLiveIcon: hasLiveIcon && listDots.includes(type),
        label: text,
        type,
      };
    },
    [contentPriority, hasLiveIcon, text, type]
  );
  if (!text) return null;
  return (
    <LabelWrapper
      className={className}
      smallSize={smallSize}
      type={currentLabel.type}
      checkUserLocation
      {...props}
    >
      {currentLabel.hasLiveIcon && (
        <LabelLiveIcon
          name="dot"
          size="xsmall"
          smallWrapper={smallSize}
          blink
        />
      )}
      <LabelText
        className="uvs-font-c-regular"
        smallSize={smallSize}
        type={currentLabel?.type}
      >
        {currentLabel.label}
      </LabelText>
    </LabelWrapper>
  );
};

Label.propTypes = {
  className: PropTypes.string,
  hasLiveIcon: PropTypes.bool,
  text: PropTypes.string,
  href: PropTypes.string,
  smallSize: PropTypes.bool,
  type: PropTypes.string,
  contentPriority: PropTypes.string,
};

Label.defaultProps = {
  type: DEFAULT,
  contentPriority: STANDARD,
};

export default Label;
