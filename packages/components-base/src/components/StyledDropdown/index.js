import React, {
  useCallback,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Icon from '@univision/fe-icons';
import {
  BLACK,
  WHITE,
} from '@univision/fe-utilities/styled/constants';

import Styles from './StyledDropdown.styles';

const ArrowDown = styled.button`${Styles.arrowDown}`;
const ArrowMobile = styled(Icon)`${Styles.arrowMobile}`;
const ArrowUp = styled.button`${Styles.arrowUp}`;
const Container = styled.div`${Styles.container}`;
const Gradient = styled.div`${Styles.gradient}`;
const Item = styled.li.attrs({
  className: 'uvs-font-c-bold',
})`${Styles.item}`;
const Menu = styled.ul`${Styles.menu}`;

/**
 * StyledDropdown (drop down on mobile, expanded on desktop)
 * Scroll by dragging only, no scrollbar
 * @param {Object} props - Component props
 * @param {boolean} props.className - Custom class
 * @param {boolean} props.isDark - Component has a dark theme
 * @param {Array} props.items - Options for this dropdown
 * @returns {JSX}
 */
const StyledDropdown = ({
  className,
  isDark,
  items,
}) => {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState(0);
  const [selected, setSelected] = useState(0);
  const offset = 30;
  const moveBy = 50;

  const scroll = useCallback(
    (e) => {
      const arrow = e?.target?.getAttribute('data-arrow');
      const newPos = pos + (
        moveBy * (
          arrow === 'up' ? 1 : -1
        )
      );
      let correctedPos = newPos;

      if (newPos < items.length * -offset) {
        correctedPos = items.length * -offset;
      } else if (newPos > 0) {
        correctedPos = 0;
      }

      setPos(correctedPos);
    },
    [
      items.length,
      pos,
    ],
  );

  const selectItem = useCallback(
    (e) => {
      const itemTarget = e?.target;
      const idx = parseInt(itemTarget?.getAttribute('data-index'), 10);

      if (selected !== idx) {
        setPos(-itemTarget?.offsetTop + (
          offset * 2
        ));
        setSelected(idx);
      }

      setOpen(!open);
    }, [
      open,
      selected,
    ],
  );

  return (
    <Container isDark={isDark}>
      <Menu
        className={className}
        isOpen={open}
        items={items.length}
        pos={pos}
      >
        {items.map((item, i) => (
          <Item
            data-index={i}
            isDark={isDark}
            isOpen={open}
            isSelected={i === selected}
            key={`dropDownItem${item.label}}`}
            onClick={selectItem}
          >
            {item.label}
          </Item>
        ))}
      </Menu>

      <Gradient isDark={isDark} isTop />
      <Gradient isDark={isDark} />
      <ArrowDown data-arrow="down" onClick={scroll}>
        <Icon
          fill={isDark ? WHITE : BLACK}
          name="arrowDown"
          size="small"
        />
      </ArrowDown>
      <ArrowMobile
        fill={isDark ? WHITE : BLACK}
        name={open ? 'arrowUp' : 'arrowDown'}
        size="small"
      />
      <ArrowUp data-arrow="up" onClick={scroll}>
        <Icon
          fill={isDark ? WHITE : BLACK}
          name="arrowUp"
          size="small"
        />
      </ArrowUp>
    </Container>
  );
};

StyledDropdown.propTypes = {
  className: PropTypes.string,
  isDark: PropTypes.bool,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
    }),
  ),
};

StyledDropdown.defaultProps = {
  isDark: false,
  items: [],
};

export default StyledDropdown;
