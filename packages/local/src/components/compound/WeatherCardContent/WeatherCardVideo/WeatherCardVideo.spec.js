import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

import configureStore from '@univision/fe-commons/dist/store/configureStore';
import VideoPlayer from '@univision/fe-video/dist/components/VideoPlayer';

import props from './__mocks__/weatherCardVideo';
import WeatherCardVideo from '.';

const store = configureStore();

describe('WeatherCardVideo', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <WeatherCardVideo {...props} />
      </Provider>, div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should have an inline player component', () => {
    const wrapper = mount(
      <Provider store={store}>
        <WeatherCardVideo {...props} />
      </Provider>
    );
    expect(wrapper.find(VideoPlayer)).toHaveLength(1);
  });
});
