import React from 'react';
import { storiesOf } from '@storybook/react';

import getTheme from '@univision/fe-commons/dist/utils/themes/themes';

import mockSettings from './__mocks__/settings.json';
import Countdown from './Countdown';

const theme = getTheme('/entretenimiento');
const now = new Date();
const tomorrow = new Date(Date.now() + 86400 * 1000 * 1);
const mockSettingsBase = {
  ...mockSettings,
  ...{
    soccerMatch: null,
    background: null,
    date: tomorrow.toString(),
  },
};
const mockSettingsFull = {
  ...mockSettings,
  ...{
    date: tomorrow.toString(),
  },
};

storiesOf('Widgets/Countdown', module)
  .addDecorator((story) => {
    return <div className="uvs-container">{story()}</div>;
  })
  .add('default', () => {
    return (
      <Countdown theme={theme} settings={mockSettingsBase} />
    );
  })
  .add('without calReply', () => {
    const settings = { ...mockSettingsBase, externalWidgets: null };
    return (
      <Countdown theme={theme} settings={settings} />
    );
  })
  .add('finished', () => {
    const settings = { ...mockSettingsBase, background: null, date: now };
    return (
      <Countdown theme={theme} settings={settings} />
    );
  })
  .add('with background', () => {
    const settings = {
      ...mockSettingsFull,
      soccerMatch: null,
      logo: {
        renditions: {
          original: {
            href: 'https://st1.uvnimg.com/e6/58/80a1e901417993a7bd6740fabe55/logo-white.svg',
          },
        },
      },
    };
    return (
      <Countdown theme={theme} settings={settings} />
    );
  })
  .add('with soccer match', () => {
    const settings = { ...mockSettingsFull, background: null };

    return (
      <Countdown theme={theme} settings={settings} />
    );
  })
  .add('with soccer match without calReply', () => {
    const settings = { ...mockSettingsFull, externalWidgets: null, background: null };
    return (
      <Countdown theme={theme} settings={settings} />
    );
  })
  .add('with soccer match, background and calReply', () => {
    const settings = {
      ...mockSettingsFull,
      logo: {
        renditions: {
          original: {
            href: 'https://st1.uvnimg.com/e6/58/80a1e901417993a7bd6740fabe55/logo-white.svg',
          },
        },
      },
    };
    return (
      <Countdown theme={theme} settings={settings} />
    );
  });
