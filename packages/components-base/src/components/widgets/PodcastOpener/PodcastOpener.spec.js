import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from '@univision/fe-commons/dist/store/configureStore';

import PodcastOpener from '.';

const store = configureStore();
let props;

describe('Podcast Opener', () => {
  beforeEach(() => {
    props = {
      settings: {
        title: 'title',
        description: 'description',
        image: {
          renditions: {
            original: {
              href: 'image.png',
            },
          },
        },
      },
    };
  });

  it('should render without crashing', () => {
    const container = document.createElement('div');
    const component = (
      <Provider store={store}>
        <PodcastOpener />
      </Provider>
    );
    ReactDOM.render(component, container);
  });

  it('should contain valid title', () => {
    const wrapper = mount(
      <Provider store={store}>
        <PodcastOpener {...props} />
      </Provider>
    );
    expect(wrapper.find('PodcastOpener__Title').first().text()).toBe('title');
  });

  it('should contain valid description', () => {
    const wrapper = mount(
      <Provider store={store}>
        <PodcastOpener {...props} />
      </Provider>
    );
    expect(wrapper.find('PodcastOpener__Description').text()).toBe('description');
  });

  it('should contain valid picture', () => {
    const wrapper = mount(
      <Provider store={store}>
        <PodcastOpener {...props} />
      </Provider>
    );
    const pictureProps = wrapper.find('PodcastOpener__PictureImage').props();
    expect(pictureProps.image.renditions.original.href).toBe('image.png');
  });

  it('should have action bar', () => {
    const wrapper = mount(
      <Provider store={store}>
        <PodcastOpener {...props} />
      </Provider>
    );
    expect(wrapper.find('PodcastOpener__ActionBarWrapper')).toHaveLength(1);
  });
});
