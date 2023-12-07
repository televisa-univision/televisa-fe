/* eslint-disable require-jsdoc */
import React from 'react';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import getVerticalTheme from '@univision/fe-commons/dist/utils/themes/cards';
import Store from '@univision/fe-commons/dist/store/store';
import { setUserState } from '@univision/fe-commons/dist/store/slices/user/user-actions';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import { GRID_WIDGET } from '@univision/fe-commons/dist/constants/widgetTypes';
import { HOROSCOPES } from '@univision/fe-commons/dist/constants/personalizationType';
import { DAISY_BUSH } from '@univision/fe-commons/dist/utils/styled/constants';
import mockData from './__mock__/mockData.json';
import { getWidgetCardsData } from '../../../utils/cardMapper/getWidgetCardsData';
import FavoriteSelector from '../../FavoriteSelector/FavoriteSelectorConnector';
import { horoscopes } from '../../FavoriteSelector/constants';
import Grid from '../../widgets/Grids/GridEnhancement/GridConnector';
import GridWidget from '../../widgets/Grids/GridEnhancement';
import WithPersonalizedWidgetHOC from '.';

const theme = getVerticalTheme('horoscopos');

const key = 0;
const widget = mockData.widgets[key];
const { settings } = widget;
const widgetContext = {
  id: settings.uid,
  name: 'Grid Widget',
  title: settings.title,
  type: 'Card',
  widgetType: GRID_WIDGET,
  position: key + 1,
};

const cardData = getWidgetCardsData(widgetContext, widget.contents);

const pageData = {
  data: mockData,
  domain: 'https://www.univision.com/horoscopos',
  requestParams: { favoriteHoroscopesExperience: 'true' }, // To enable feature flag
  config: { graphql: 'https://uat-graphql.dev-univision.com' },
};

const userData = {
  accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0MDY1ODVjMy1jNmM0LTQ2ODQtYTdlOC1lNTkwODc4ZjdmZTYiLCJpYXQiOjE1ODcwNDY1NDV9.V-Omu1QgTTt3SarxsZaLr-0IG2-OaCb-sDxIg0QZJCY',
};

storiesOf('Personalization/WithPersonalizedWidget', module)
  .add(
    'Personalized',
    () => {
      Store.dispatch(setPageData(pageData));
      Store.dispatch(setUserState(userData));
      const Component = WithPersonalizedWidgetHOC(GridWidget, 'cardData');
      return (
        <Provider store={Store}>
          <Component
            cardData={cardData}
            settings={settings}
            theme={theme}
            widgetContext={widgetContext}
            fetchFavoriteHoroscopesAction={() => {}}
            insertTopAd={() => {}}
            removeTopAd={() => {}}
          />
        </Provider>
      );
    },
    { viewport: 'default' }
  );

storiesOf('Personalization/PersonalizedWidget POC', module)
  .add(
    'Favorite Selector with PersonalizedWidget',
    () => {
      Store.dispatch(setPageData(pageData));
      Store.dispatch(setUserState(userData));
      return (
        <Provider store={Store}>
          <FavoriteSelector
            borderColor={DAISY_BUSH}
            favoriteIconColor={DAISY_BUSH}
            iconColor={DAISY_BUSH}
            items={horoscopes}
            title="Elige tus Favoritos"
            titleColor={DAISY_BUSH}
            personalizationType={HOROSCOPES}
          />
          <Grid
            cardData={cardData}
            settings={settings}
            theme={theme}
            widgetContext={widgetContext}
            insertTopAd={() => {}}
          />
        </Provider>
      );
    },
    { viewport: 'default' }
  );
