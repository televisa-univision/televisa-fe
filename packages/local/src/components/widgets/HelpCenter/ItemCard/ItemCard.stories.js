import React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';

import { HORIZONTAL, VERTICAL } from '@univision/fe-commons/dist/constants/layoutTypes';
import configureStore from '@univision/fe-commons/dist/store/configureStore';

import ItemCard from '.';

const store = configureStore();

/**
 * Create Matches widget with API wrapper
 * @param {Object} props - additional props
 * @param {string} layout - Item card layout
 * @param {size} size - cards size
 * @returns {JSX}
 */
function makeItemCard(props, layout = HORIZONTAL, size = 120) {
  const itemCard = <ItemCard {...props} layout={layout} />;
  const cardWrapper = layout === VERTICAL
    ? <div style={{ width: size }}>{itemCard}</div> : itemCard;

  return (
    <Provider store={store}>
      {cardWrapper}
    </Provider>
  );
}

const data = [{
  title: 'Test Help Center Item',
  logo: {
    type: 'image',
    uid: '0000016e-e8d7-d673-a1fe-ffd7ccfc0001',
    title: 'Cheslie Kryst, Miss Estados Unidos 2019',
    caption: 'Miss USA Cheslie Kryst walks on stage during the 2019 Miss Universe pageant at the Tyler Perry Studios in Atlanta, Georgia on December 8, 2019. (Photo by VALERIE MACON / AFP) (Photo by VALERIE MACON/AFP via Getty Images)',
    credit: 'VALERIE MACON/AFP via Getty Images',
    renditions: {
      original: {
        href: 'https://uvn-brightspot.s3.amazonaws.com/30/3a/35adac164535833bd7cb6962eb36/cheslie-kryst.jpg',
        width: 1024,
        height: 649,
      },
    },
  },
  uri: {
    href: 'https://uat.x.univision.com/temas/pedro-valdemar-vasconcelos-pinto-da-cunha-teixeira',
    target: '_self',
    text: 'Test Text',
    uid: '0000017f-08a5-da6a-afff-28f514850001',
  },
  market: {
    title: 'Atlanta',
    zipCodes: [
      '30326',
    ],
  },
  category: {
    title: 'Finantial',
  },
  subCategory: {
    title: 'SubFinantial',
  },
},
];

storiesOf('Widgets/HelpCenter', module)
  .add('Horizontal', () => {
    return makeItemCard(data[0]);
  })
  .add('Horizontal dark', () => {
    return makeItemCard({ ...data[0], isDark: true });
  })
  .add('Horizontal text only', () => {
    return makeItemCard({ ...data[0], isTextOnly: true });
  })
  .add('Horizontal text only dark', () => {
    return makeItemCard({ ...data[0], isDark: true, isTextOnly: true });
  });
