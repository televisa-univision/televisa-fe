/* eslint-disable require-jsdoc */
import React from 'react';

import { storiesOf } from '@storybook/react';

import ApiProvider from '@univision/fe-commons/dist/components/ApiProvider';

import FourAcrossGrid from '.';
import Styles from './FourAcrossGrid.stories.scss';

const DarkWrapper = props => (
  <div className={Styles.darkContainer}>
    <FourAcrossGrid {...props} />
  </div>
);
storiesOf('Widgets/FourAcrossGrid', module)

  .add('Default', () => (
    <ApiProvider
      url="https://univision.com/los-angeles/klve"
      render={(data) => {
        const settings = {
          ...data.widgets[1].settings,
          contentLimit: 4,
        };

        return (
          <FourAcrossGrid
            content={data.widgets[1].contents}
            settings={settings}
          />
        );
      }}
    />
  ))
  .add('Default w/ Author', () => (
    <ApiProvider
      url="https://univision.com/los-angeles/klve"
      render={(data) => {
        const content = data.widgets[1].contents.map(moddedContent => (
          {
            ...moddedContent,
            authors: [{
              title: 'Author Name',
            }],
          }
        ));

        const settings = {
          ...data.widgets[1].settings,
          contentLimit: 4,
        };

        return (
          <FourAcrossGrid
            content={content}
            settings={settings}
          />
        );
      }}
    />
  ))
  .add('Default w/ 8 items', () => (
    <ApiProvider
      url="https://univision.com/los-angeles/klve"
      render={(data) => {
        const settings = {
          ...data.widgets[1].settings,
          contentLimit: 8,
        };

        return (
          <FourAcrossGrid
            content={data.widgets[1].contents}
            settings={settings}
          />
        );
      }}
    />
  ))
  .add('Default w/ Themeing', () => (
    <ApiProvider
      url="https://univision.com/los-angeles/klve"
      render={(data) => {
        const settings = {
          ...data.widgets[1].settings,
          contentLimit: 4,
        };

        return (
          <FourAcrossGrid
            content={data.widgets[1].contents}
            settings={settings}
            theme={{ primary: 'red' }}
          />
        );
      }}
    />
  ))
  .add('Default w/o Title', () => (
    <ApiProvider
      url="https://univision.com/los-angeles/klve"
      render={(data) => {
        const settings = {
          ...data.widgets[0].settings,
          contentLimit: 4,
        };

        return (
          <FourAcrossGrid
            content={data.widgets[1].contents}
            settings={settings}
            theme={{ primary: 'red' }}
          />
        );
      }}
    />
  ))
  .add('w/ alignment (left)', () => (
    <ApiProvider
      url="https://univision.com/los-angeles/klve"
      render={(data) => {
        const settings = {
          ...data.widgets[1].settings,
          contentLimit: 2,
        };

        return (
          <FourAcrossGrid
            alignment="left"
            content={data.widgets[1].contents}
            settings={settings}
          />
        );
      }}
    />
  ))
  .add('w/ alignment (center)', () => (
    <ApiProvider
      url="https://univision.com/los-angeles/klve"
      render={(data) => {
        const settings = {
          ...data.widgets[1].settings,
          contentLimit: 2,
        };

        return (
          <FourAcrossGrid
            alignment="center"
            content={data.widgets[1].contents}
            settings={settings}
          />
        );
      }}
    />
  ))
  .add('w/ alignment (right)', () => (
    <ApiProvider
      url="https://univision.com/los-angeles/klve"
      render={(data) => {
        const settings = {
          ...data.widgets[1].settings,
          contentLimit: 2,
        };

        return (
          <FourAcrossGrid
            alignment="right"
            content={data.widgets[1].contents}
            settings={settings}
          />
        );
      }}
    />
  ))
  .add('Mobile device', () => (
    <ApiProvider
      url="https://univision.com/los-angeles/klve"
      render={(data) => {
        const settings = {
          ...data.widgets[1].settings,
          contentLimit: 4,
        };

        return (
          <FourAcrossGrid
            content={data.widgets[1].contents}
            device="mobile"
            settings={settings}
          />
        );
      }}
    />
  ))
  .add('Mobile device / View = Horizontal', () => (
    <ApiProvider
      url="https://univision.com/los-angeles/klve"
      render={(data) => {
        const settings = {
          ...data.widgets[1].settings,
          contentLimit: 4,
        };

        return (
          <FourAcrossGrid
            content={data.widgets[1].contents}
            device="mobile"
            view="horizontal"
            settings={settings}
          />
        );
      }}
    />
  ))
  .add('Dark variant', () => (
    <ApiProvider
      url="https://univision.com/los-angeles/klve"
      render={(data) => {
        const settings = {
          ...data.widgets[1].settings,
          contentLimit: 4,
        };

        return (
          <DarkWrapper
            content={data.widgets[1].contents}
            settings={settings}
            variant="dark"
          />
        );
      }}
    />
  ))
  .add('Agnostic Episodes Widget', () => (
    <ApiProvider
      url="https://univision.com/shows/amar-a-muerte"
      render={(data) => {
        const settings = {
          ...data.widgets[1].settings,
          contentLimit: 4,
          type: 'agnosticepisodeswidget',
        };

        return (
          <FourAcrossGrid
            content={data.widgets[1].contents}
            settings={settings}
          />
        );
      }}
    />
  ));
