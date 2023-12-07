import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ActionLink from '@univision/fe-components-base/dist/components/ActionLink';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import Icon from '@univision/fe-icons/dist/components/Icon';

import Styles from './PostJob.styles';

const ApplyButton = styled(ActionLink).attrs({ className: 'uvs-font-c-bold' })`${Styles.applyButton}`;
const Title = styled.p.attrs({ className: 'uvs-font-a-bold' })`${Styles.title}`;
const SubTitle = styled.p.attrs({ className: 'uvs-font-a-light' })`${Styles.subTitle}`;
const Wrapper = styled.div`${Styles.wrapper}`;

/**
 * PostJob component
 * @param {style} className - class name modifier
 * @param {string} language - label language
 * @param {string} link - redirect link
 * @param {string} target - event target
 * @returns {JSX}
 */
const PostJob = ({
  className,
  language,
  link,
  target,
}) => {
  return (
    <Wrapper className={className}>
      <Title>{localization.get('postJobTitle', { language })}</Title>
      <SubTitle>{localization.get('postJobSubTitle', { language })}</SubTitle>
      <ApplyButton href={link} target={target}>
        <Icon name="write" size="small" />{localization.get('postJob', { language })}
      </ApplyButton>
    </Wrapper>
  );
};

PostJob.propTypes = {
  className: PropTypes.string,
  language: PropTypes.string,
  link: PropTypes.string,
  target: PropTypes.string,
};

export default React.memo(PostJob);
