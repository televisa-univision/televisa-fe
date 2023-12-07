import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import FavoriteButtonTracker from '@univision/fe-commons/dist/utils/tracking/tealium/personalization/FavoriteButtonTracker';
import CardTracker from '@univision/fe-commons/dist/utils/tracking/tealium/card/CardTracker';

import FavoriteButton from '.';

describe('FavoriteButton', () => {
  const props = {
    action: jest.fn(),
    className: '',
    favorited: false,
    favoritedIconColor: 'red',
    iconColor: 'red',
    iconName: 'taurus',
    id: '123',
    personalizationCategory: 'horoscopos',
    title: 'tauro',
  };

  it('should render without crashing', () => {
    const div = document.createElement('div');
    const component = <FavoriteButton {...props} />;
    ReactDOM.render(component, div);
  });

  it('should show correct icon when not favorited', () => {
    const wrapper = mount(<FavoriteButton {...props} />);
    const iconProps = wrapper.find('FavoriteButton__FavoriteIcon').props();

    expect(iconProps.name).toBe('heartWithBorders');
  });

  it('should show correct icon when favorited', () => {
    const wrapper = mount(<FavoriteButton {...props} favorited />);
    const iconProps = wrapper.find('FavoriteButton__FavoriteIcon').props();

    expect(iconProps.name).toBe('heartWithFill');
  });

  it('should call action with item ID when favorite icon is clicked', () => {
    const trackerSpy = jest.spyOn(FavoriteButtonTracker, 'track');
    const wrapper = mount(<FavoriteButton {...props} />);
    const favoriteButton = wrapper.find('FavoriteButton__IconButton');
    favoriteButton.simulate('click');

    expect(props.action).toHaveBeenCalledWith(props.id);
    expect(props.action).toHaveBeenCalledTimes(1);
    expect(trackerSpy).toHaveBeenCalledWith(expect.any(Function), expect.any(Object));
  });

  it('should call the tracking event when the main element is clicked', () => {
    const trackerSpy = jest.spyOn(CardTracker, 'track');
    const wrapper = mount(<FavoriteButton {...props} />);
    const mainButton = wrapper.find('FavoriteButton__Main');
    mainButton.simulate('click');

    expect(trackerSpy).toHaveBeenCalled();
  });
});
