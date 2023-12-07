import React from 'react';
import { HOROSCOPES } from '@univision/fe-commons/dist/constants/personalizationType';
import ReactDOM from 'react-dom';
import {
  SUCCESS,
} from '@univision/fe-commons/dist/constants/status';
import { mount } from 'enzyme';

import FavoriteSelector from '.';

describe('FavoriteSelector', () => {
  const props = {
    updateFavoriteAction: jest.fn(),
    borderColor: 'red',
    className: '',
    favorites: ['1', '2'],
    favoritedIconColor: 'red',
    fetchFavoritesAction: jest.fn(),
    iconColor: 'red',
    personalizationType: HOROSCOPES,
    items: [
      {
        iconName: 'aries',
        title: 'aries',
        id: '1',
      },
      {
        iconName: 'taurus',
        title: 'tauro',
        id: '2',
      },
      {
        iconName: 'cancer',
        title: 'cáncer',
        id: '3',
      },
    ],
    fetchFavoritesStatus: SUCCESS,
    title: 'Elige tus Favoritos',
    titleColor: 'red',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    const div = document.createElement('div');
    const component = <FavoriteSelector {...props} />;
    ReactDOM.render(component, div);
  });

  it('should not render anything if items are invalid', () => {
    const wrapper = mount(<FavoriteSelector {...props} items={null} />);

    expect(wrapper.find('FavoriteSelector__Container').length).toBe(0);
  });

  it('should invoke fetchFavoritesAction', () => {
    mount(<FavoriteSelector {...props} items={null} accessToken="test" />);
    expect(props.fetchFavoritesAction).toHaveBeenCalledWith(props.personalizationType);
  });

  it('should render each item with the correct favorite icon', () => {
    const wrapper = mount(<FavoriteSelector {...props} />);
    const items = wrapper.find('FavoriteSelector__Item');

    expect(items.at(0).props().favorited).toBe(true);
    expect(items.at(1).props().favorited).toBe(true);
    expect(items.at(2).props().favorited).toBe(false);
  });

  it('should default to black border and title', () => {
    const wrapper = mount(
      <FavoriteSelector {...props} borderColor={null} titleColor={null} />
    );
    const topBorder = wrapper.find('FavoriteSelector__TopBorder');
    const title = wrapper.find('FavoriteSelector__Title');

    expect(topBorder).toHaveStyleRule('background-color', '#000000');
    expect(title).toHaveStyleRule('color', '#000000');
  });

  it('should invoke action with proper parameters when is invoked', () => {
    const wrapper = mount(<FavoriteSelector {...props} />);
    const items = wrapper.find('FavoriteSelector__Item');

    items.at(0).props().action('12345');
    expect(props.updateFavoriteAction).toBeCalledWith(HOROSCOPES, '12345');
  });
});
