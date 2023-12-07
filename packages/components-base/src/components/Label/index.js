import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import types from '@univision/fe-commons/dist/constants/labelTypes';
import { BREAKING, STANDARD } from '@univision/fe-commons/dist/constants/contentPriorities';
import { deburrToLowerCase, exists } from '@univision/fe-commons/dist/utils/helpers';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';

import LiveIcon from '../LiveIcon';
import Styles from './Label.styles';

const LabelWrapper = styled.div`${Styles.labelWrapper}`;
const LabelText = styled.span`${Styles.labelText}`;
const LabelLiveIcon = styled(LiveIcon)`${Styles.liveIcon}`;

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
  label,
  smallSize,
  type,
  contentPriority,
}) => {
  const currentLabel = useMemo(
    () => {
      const isBreakingNews = exists(contentPriority)
          && deburrToLowerCase(contentPriority) === deburrToLowerCase(BREAKING);

      if (isBreakingNews || deburrToLowerCase(label) === deburrToLowerCase(localization.get('breakingNews'))) {
        return {
          hasLiveIcon: false,
          label: localization.get('breakingNews'),
          type: types.BREAKING_NEWS,
        };
      }
      return {
        hasLiveIcon,
        label,
        type,
      };
    },
    [contentPriority, hasLiveIcon, label, type]
  );

  return (
    <LabelWrapper className={className} smallSize={smallSize} type={currentLabel.type}>
      {currentLabel.hasLiveIcon && <LabelLiveIcon name="dot" size="xsmall" smallWrapper={smallSize} blink />}
      <LabelText className="uvs-font-c-regular" smallSize={smallSize} type={currentLabel.type}>
        {currentLabel.label}
      </LabelText>
    </LabelWrapper>
  );
};

Label.propTypes = {
  className: PropTypes.string,
  hasLiveIcon: PropTypes.bool,
  label: PropTypes.string,
  smallSize: PropTypes.bool,
  type: PropTypes.oneOf([
    types.ADVERTISING,
    types.BREAKING_NEWS,
    types.DEFAULT,
    types.LIVE,
    types.LONGFORM,
    types.DEFAULT,
    types.PODCAST,
    types.STORYTELLING,
  ]),
  contentPriority: PropTypes.string,
};

Label.defaultProps = {
  type: types.DEFAULT,
  contentPriority: STANDARD,
};

export default Label;
