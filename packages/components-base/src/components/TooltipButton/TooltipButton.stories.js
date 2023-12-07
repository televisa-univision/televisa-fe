import React from 'react';
import { storiesOf } from '@storybook/react';
import TooltipButton from '.';

const props = {
  open: true,
  cta: 'Ingredientes',
  align: 'right',
  placement: 'top-right',
  icon: 'ingredients',
  theme: {
    alphaGradient: 'linear-gradient(to top, rgba(35, 88, 191, 0.95) 0%, rgba(35, 88, 191, 0) 50%)',
    horizontalGradient: 'linear-gradient(to right, #2358bf 0%, #23a2ee 100%)',
    primary: '#2358bf',
    secondary: '#23a2ee',
    solidGradient: 'linear-gradient(to bottom, #2358bf 0%, #23a2ee 100%)',
    theme: 'blue',
    variant: 'light',
  },
};

storiesOf('Clickable/TooltipButton', module)
  .add('Default', () => (
    <div>
      <div style={{ height: 200 }} />
      <TooltipButton {...props}>
        <p>Tooltip Content</p>
        <p>Tooltip Content</p>
        <p>Tooltip Content</p>
      </TooltipButton>
    </div>
  )).add('Overlay', () => (
    <div>
      <div style={{ height: 200 }} />
      <TooltipButton {...props} overlay>
        <p>Tooltip Content</p>
        <p>Tooltip Content</p>
        <p>Tooltip Content</p>
      </TooltipButton>
    </div>
  ));
