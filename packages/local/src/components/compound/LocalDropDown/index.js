import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Icon from '@univision/fe-icons/dist/components/Icon';
import Link from '@univision/fe-components-base/dist/components/Link';
import { isValidArray } from '@univision/fe-commons/dist/utils/helpers';
import { WHITE } from '@univision/fe-commons/dist/utils/styled/constants';
import features from '@univision/fe-commons/dist/config/features';
import trackClickEvent from '@univision/fe-components-base/dist/components/Navigation/helpers';

import Styles from './LocalDropDown.styles';

const Arrow = styled(Icon)`${Styles.arrow}`;
const ArrowUp = styled.div`${Styles.arrowUp}`;
const HoverSquare = styled.div`${Styles.hoverSquare}`;
const OptionLink = styled(Link).attrs({ className: 'uvs-font-c-regular' })`${Styles.optionLink}`;
const OptionsList = styled.div`${Styles.optionsList}`;
const OptionsWrapper = styled.div`${Styles.optionsWrapper}`;
const Title = styled.div.attrs({ className: 'uvs-font-c-bold' })`${Styles.title}`;
const Wrapper = styled.div`${Styles.wrapper}`;

/**
 * LocalDropDown component
 * @param {Object} props - component props
 * @param {string} props.className - modifier class
 * @param {string} props.name - drop down title
 * @param {Array} props.options - drop down items list
 * @returns {JSX}
 */
const LocalDropDown = ({
  className,
  name,
  options,
}) => {
  const [open, setOpen] = useState(false);
  /**
   * Open dropdown Tracking function
   */
  const dropTracking = useCallback(() => {
    trackClickEvent('subnav', 'masdropdown');
    setOpen(!open);
  }, [open]);
  /**
   * Link Tracking function
   */
  const linkTracking = useCallback((event) => {
    trackClickEvent('subnav', event.target.getAttribute('data-name'));
    setOpen(false);
  }, []);
  /**
   * Close dropdown function
   */
  const closeDropdown = useCallback(() => {
    trackClickEvent('subnav', 'closemasdropdown');
    setOpen(false);
  }, []);

  const optionLinks = useMemo(() => isValidArray(options) && options.map((option) => {
    const { name: optionName, link: optionLink, target: optionTarget } = option || {};

    return (optionName && optionLink) ? (
      <OptionLink
        checkUserLocation
        href={optionLink}
        key={`optionLink${optionName}`}
        onClick={linkTracking}
        data-name={optionName}
        target={optionTarget}
      >
        {optionName}
      </OptionLink>
    ) : null;
  }).filter(option => option), [options, linkTracking]);

  if (!isValidArray(optionLinks)) return null;

  return (
    <Wrapper className={className}>
      <Title onClick={dropTracking}>
        {name}
        <Arrow name={open ? 'arrowUp' : 'arrowDown'} fill={WHITE} size={23} />
      </Title>
      <OptionsWrapper isVisible={open}>
        <ArrowUp />
        <OptionsList>
          {optionLinks}
        </OptionsList>
      </OptionsWrapper>
      <HoverSquare
        isVisible={open}
        onClick={closeDropdown}
        isWorldCupMVP={features.deportes.isWorldCupMVP()}
      />
    </Wrapper>
  );
};

LocalDropDown.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.array,
};

export default LocalDropDown;
