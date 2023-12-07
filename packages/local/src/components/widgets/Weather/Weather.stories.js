import React from 'react';

import { storiesOf } from '@storybook/react';

import ApiProvider from '@univision/fe-commons/dist/components/ApiProvider';
import Image from '@univision/fe-components-base/dist/components/Image';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';

import themes from '@univision/fe-commons/dist/utils/themes/themes.json';
import weatherImages from './mapping/weatherImages.json';
import Styles from './Weather.stories.scss';
import {
  NoticiasCardWeatherGraphics,
  NoticiasCardWeatherMaps,
  NoticiasCardWeatherConditions,
  NoticiasCardTropicalWeatherConditions,
} from './data';

import Weather from '.';

const sponsor = {
  name: 'Honda',
  link: '#',
  logo: 'https://cdn2.uvnimg.com/2b/36/ed77ba9d4399a153eb9b637c3fe9/image1.jpeg',
};

storiesOf('Widgets/Weather/Maps', module)
  .add('w/ LayerNav', () => (
    <ApiProvider
      url="https://www.univision.com/dallas/kuvn/tiempo"
      render={(data) => {
        Store.dispatch(setPageData({ pageCategory: null, data }));
        return (
          <Weather
            type={NoticiasCardWeatherMaps}
            theme={themes.themes.blue}
            withLayerNav
          />
        );
      }}
    />
  ))
  .add('w/o LayerNav', () => (
    <ApiProvider
      url="https://www.univision.com/dallas/kuvn/tiempo"
      render={(data) => {
        Store.dispatch(setPageData({ pageCategory: null, data }));
        return (
          <Weather
            type={NoticiasCardWeatherMaps}
            sponsor={sponsor}
            theme={themes.themes.blue}
          />
        );
      }}
    />
  ));

storiesOf('Widgets/Weather/Graphics', module)
  .add('w/ LayerNav', () => (
    <ApiProvider
      url="https://www.univision.com/san-antonio/kwex/tiempo"
      render={(data) => {
        Store.dispatch(setPageData({ pageCategory: null, data }));
        return (
          <Weather
            type={NoticiasCardWeatherGraphics}
            sponsor={sponsor}
            theme={themes.themes.blue}
            withLayerNav
          />
        );
      }}
    />
  ))
  .add('w/o LayerNav', () => (
    <ApiProvider
      url="https://www.univision.com/san-antonio/kwex/tiempo"
      render={(data) => {
        Store.dispatch(setPageData({ pageCategory: null, data }));
        return (
          <Weather
            type={NoticiasCardWeatherGraphics}
            sponsor={sponsor}
            theme={themes.themes.blue}
          />
        );
      }}
    />
  ));

storiesOf('Widgets/Weather/Weather Conditions', module)
  .add('w/ LayerNav', () => (
    <ApiProvider
      url="https://www.univision.com/nueva-york/wxtv/tiempo"
      render={(data) => {
        Store.dispatch(setPageData({ pageCategory: null, data }));
        return (
          <Weather
            type={NoticiasCardWeatherConditions}
            sponsor={sponsor}
            theme={themes.themes.blue}
            withLayerNav
          />
        );
      }}
    />
  ))
  .add('w/o LayerNav', () => (
    <ApiProvider
      url="https://www.univision.com/nueva-york/wxtv/tiempo"
      render={(data) => {
        Store.dispatch(setPageData({ pageCategory: null, data }));
        return (
          <Weather
            type={NoticiasCardWeatherConditions}
            sponsor={sponsor}
            theme={themes.themes.blue}
          />
        );
      }}
    />
  ));

storiesOf('Widgets/Weather/Tropical Weather Conditions', module)
  .add('w/ LayerNav', () => (
    <ApiProvider
      url="https://www.univision.com/miami/wltv/tiempo"
      render={(data) => {
        Store.dispatch(setPageData({ pageCategory: null, data }));
        return (
          <Weather
            type={NoticiasCardTropicalWeatherConditions}
            sponsor={sponsor}
            theme={themes.themes.blue}
            withLayerNav
          />
        );
      }}
    />
  ))
  .add('w/o LayerNav', () => (
    <ApiProvider
      url="https://www.univision.com/miami/wltv/tiempo"
      render={(data) => {
        Store.dispatch(setPageData({ pageCategory: null, data }));
        return (
          <Weather
            type={NoticiasCardTropicalWeatherConditions}
            sponsor={sponsor}
            theme={themes.themes.blue}
          />
        );
      }}
    />
  ));

/**
 * Capitalize first letter of each word
 * @param {string} text to capitalize
 * @returns {string}
 */
function capitalizeFirstLetter(text) {
  return text.split(' ')
    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
}

const storyImages = storiesOf('Widgets/Weather/Weather Images', module);
storyImages.addDecorator(story => (
  <table className={Styles.table}>
    <tr>
      <th image>Image</th>
      <th code>Url</th>
    </tr>
    {story()}
  </table>
));
Object.keys(weatherImages).forEach((key) => {
  const categoryName = capitalizeFirstLetter(key.replace(/_/g, ' '));
  storyImages.add(categoryName, () => (
    weatherImages[key].map(url => (
      <tr>
        <td><Image src={url} /></td>
        <td>{url}</td>
      </tr>
    ))
  ));
});
