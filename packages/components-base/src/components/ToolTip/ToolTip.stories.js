/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
import { storiesOf } from '@storybook/react';
import React from 'react';
import ToolTip from '.';

const stylesNormal = {
  border: '1px solid black', height: 35, padding: 5, position: 'relative', width: 'fit-content',
};
const stylesUp = {
  ...stylesNormal,
  marginTop: 100,
};
const Wrapper = ({ children, text, styles }) => {
  // eslint-disable-next-line react/prop-types
  return (
    <div style={styles}>
      <p>{text}</p>
      {children}
    </div>
  );
};

storiesOf('Clickable/Tooltip', module)
  .add('Default', () => (
    <Wrapper
      text="Default tooltip"
      styles={stylesNormal}
    >
      <ToolTip
        content="Text tooltip"
      />
    </Wrapper>
  ))
  .add('With mix bold and normal label ', () => (
    <Wrapper
      text="Mix labels"
      styles={stylesNormal}
    >
      <ToolTip
        content={<><b>Bold label</b><p>Normal label</p></>}
      />
    </Wrapper>
  ))
  .add('With Arrow at right', () => (
    <Wrapper
      text="Arrow at right"
      styles={stylesNormal}
    >
      <ToolTip
        content=" With Arrow at right"
        showArrowRight
      />
    </Wrapper>
  ))
  .add('With Arrow diferent position', () => (
    <Wrapper
      text="Arrow in the middle of the container"
      styles={stylesNormal}
    >
      <ToolTip
        content=" Arrow in the middle of the container"
        arrowPosition={50}
      />
    </Wrapper>
  ))
  .add('Show tooltip up', () => (
    <Wrapper
      text="Show tooltip up"
      styles={stylesUp}
    >
      <ToolTip
        content="Show tooltip up"
        showToolTipUp
      />
    </Wrapper>
  ))
  .add('Delay showing up 3 seconds', () => (
    <Wrapper
      text="Delay showing up 3 seconds"
      styles={stylesNormal}
    >
      <ToolTip
        content="Delay showing up 3 seconds"
        visibilityDelay={3}
      />
    </Wrapper>
  ))
  .add('Show tooltip once by user', () => (
    <Wrapper
      text="Show tooltip once by user"
      styles={stylesNormal}
    >
      <ToolTip
        content="Show tooltip once by user"
        toolTipId="TestTooltip"
        showOnce
      />
    </Wrapper>
  ))
  .add('Move tooltip with left position', () => (
    <Wrapper
      text="Move tooltip with left position"
      styles={stylesNormal}
    >
      <ToolTip
        content="Move tooltip with left position"
        leftToolTipPosition={180}
      />
    </Wrapper>
  ))
  .add('Move tooltip with top position', () => (
    <Wrapper
      text="Move tooltip with top position"
      styles={stylesNormal}
    >
      <ToolTip
        content="Move tooltip with top position"
        topToolTipPosition={20}
      />
    </Wrapper>
  ));
