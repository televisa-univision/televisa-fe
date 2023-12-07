import React, { useState, useRef } from 'react';
import { storiesOf } from '@storybook/react';
import usePosition from '.';

/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
const Spacer = () => {
  const style = {
    background: 'gray',
    width: 350,
    height: 300,
  };
  return (
    <div style={style} />
  );
};

/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
const LazyCmp = () => {
  const [show, setVisible] = useState(false);

  setTimeout(() => setVisible(true), 5000);
  return (
    <div>
      { show && <Spacer /> }
    </div>
  );
};

const PositionedCpm = () => {
  const placeholderRef = useRef(null);
  const position = usePosition(placeholderRef);

  const style = {
    background: 'green',
    width: '80%',
    height: 150,
  };

  return (
    <div ref={placeholderRef} style={style}>
      <p>width: { position.width }</p>
      <p>height: { position.height }</p>
      <p>top: { position.top }</p>
      <p>left: { position.left }</p>
    </div>
  );
};

storiesOf('Hooks/usePosition', module)
  .add('Flexible width', () => (
    <>
      <p>Resisze the window.... and check the width</p>
      <PositionedCpm />
    </>
  ))
  .add('With DOM change', () => (
    <>
      <p>wait 5 secs... and check the position top.</p>
      <LazyCmp />
      <PositionedCpm />
    </>
  ));
