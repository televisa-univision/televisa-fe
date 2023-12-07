/* eslint-disable require-jsdoc */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import useDimensions from 'react-use-dimensions';
import styled from 'styled-components';

import { storiesOf } from '@storybook/react';

import { exists } from '@univision/fe-commons/dist/utils/helpers';
import SwipeHandler from '.';

storiesOf('SwipeHandler', module).add('default', () => {
  return <Container />;
});

const DummyVideo = styled.div`
  background-color: #000;
  cursor: pointer;
  height: 318px;
  width: 512px;

  &:hover {
    background-color: #111;
  }
`;

const DummyPlayer = styled.div`
  bottom: 16px;
  position: fixed;
  right: 16px;
`;

const DummyPlaylist = styled.div`
  background-color: #444;
  border: 3px solid red;
  height: 580px;
  max-height: ${props => props.maxHeight}px;
  width: 512px;
`;

const VERTICAL_PADDING = 16;
function Container() {
  const [isDismissed, setIsDismissed] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [playerRef, { height: playerHeight }] = useDimensions();

  let maxOffset = 0;
  if (exists(global.window)) {
    const availableSpace = window.innerHeight - playerHeight - (VERTICAL_PADDING * 2);

    if (!Number.isNaN(availableSpace)) {
      maxOffset = availableSpace;
    }
  }

  if (isDismissed) {
    return <button onClick={() => setIsDismissed(false)}>Undismiss</button>;
  }

  return (
    <DummyPlayer>
      <PlayerSwipeController
        isExpanded={isExpanded}
        maxOffset={maxOffset}
        onCollapse={() => setIsExpanded(false)}
        onDismiss={() => setIsDismissed(true)}
        onExpand={() => setIsExpanded(true)}
      >
        <DummyVideo key="player" ref={playerRef} />
        <DummyPlaylist key="playlist" maxHeight={maxOffset} />
      </PlayerSwipeController>
    </DummyPlayer>
  );
}

function PlayerSwipeController({
  children, isExpanded, maxOffset, onCollapse, onDismiss, onExpand,
}) {
  const y = useMotionValue(0);
  const invertedY = useTransform(y, value => -value);

  const opacityInput = [-(maxOffset / 5), -maxOffset];
  const opacity = useTransform(y, opacityInput, [0, 1]);

  const heightInput = [0, -maxOffset];
  const height = useTransform(y, heightInput, ['0px', `${maxOffset}px`]);

  const swipeConfig = {
    down: {
      onComplete: onCollapse,
      successTransition: {
        x: 0,
        y: '0',
        transition: { duration: 0.2 },
      },
      failureTransition: {
        x: 0,
        y: `-${maxOffset}px`,
        transition: { duration: 0.2 },
      },
    },
    right: {
      onComplete: onDismiss,
      resetTransition: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: { duration: 0 },
      },
      successTransition: {
        x: '120%',
        y: 0,
        opacity: 0,
        transition: { duration: 0.2 },
      },
      failureTransition: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: { duration: 0.2 },
      },
    },
    up: {
      onComplete: onExpand,
      successTransition: {
        x: 0,
        y: `-${maxOffset}px`,
        transition: { duration: 0.2 },
      },
      failureTransition: {
        x: 0,
        y: 0,
        transition: { duration: 0.2 },
      },
    },
  };

  const getComponent = (key) => {
    return children.find(child => child.key === key);
  };

  const getDisabledState = () => {
    const defaultState = {
      down: true,
      left: true,
      right: false,
      up: false,
    };

    if (isExpanded) {
      defaultState.down = false;
      defaultState.right = true;
      defaultState.up = true;
    }

    return defaultState;
  };

  return (
    <SwipeHandler
      disabled={getDisabledState()}
      interpolatedStyle={{ y, invertedY }}
      maxOffset={maxOffset}
      swipeConfig={swipeConfig}
    >
      {getComponent('player')}
      <motion.div key="playlist" style={{ height, backgroundColor: '#444', overflow: 'hidden' }}>
        <motion.div style={{ opacity }}>
          {getComponent('playlist')}
        </motion.div>
      </motion.div>
    </SwipeHandler>
  );
}
