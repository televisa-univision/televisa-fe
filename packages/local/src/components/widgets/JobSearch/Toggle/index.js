import React, { useCallback } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Badge from '@univision/fe-components-base/dist/components/Badge';
import Styles from './Toggle.styles';
import StylesScss from './Toggle.scss';

const Label = styled.span.attrs({ className: 'uvs-font-a-light' })`${Styles.label}`;
const ToggleWrapper = styled.div`${Styles.toggleWrapper}`;

/**
 * Toggle
 * @param {Object} props - component props
 * @param {string} props.label - toggle label identifier
 * @param {function} props.options - options to be chosen
 * @param {number} props.onSelect - callback to handle selection
 * @returns {JSX}
 */
const Toggle = ({
  label,
  options,
  onSelect,
  value,
}) => {
  /**
   * Badge Click Handler
   * @param {string|number} valueSelected - identifier of selected item
   */
  const onSelectHandler = useCallback((valueSelected) => {
    onSelect(valueSelected);
  }, [onSelect]);

  return (
    <ToggleWrapper>
      <Label>{label}</Label>
      {
        options.map((opt) => {
          return (
            <Badge
              className={classnames(
                StylesScss.badge,
                value !== opt.value ? StylesScss.unselect : undefined
              )}
              label={opt.name}
              onClick={() => onSelectHandler(opt.value)}
              key={opt.value}
            />
          );
        })
      }
    </ToggleWrapper>
  );
};

Toggle.propTypes = {
  label: PropTypes.string.isRequired,
  onSelect: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.object),
  value: PropTypes.string,
};

export default Toggle;
