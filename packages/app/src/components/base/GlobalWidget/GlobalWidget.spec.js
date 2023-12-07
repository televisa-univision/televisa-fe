import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import preloadAll from 'jest-next-dynamic';

import configureStore from '@univision/fe-commons/dist/store/configureStore';
import { BLACK } from '@univision/fe-commons/dist/utils/styled/constants';

import mockData from './__mocks__/pageData.json';

import ConnectedGlobalWidget, { GlobalWidget } from '.';

const store = configureStore();

describe('GlobalWidget suite', () => {
  let props;

  beforeAll(async () => {
    await preloadAll();
  });

  beforeEach(() => {
    props = {
      widgetsData: mockData.data.globalWidgets,
    };
  });

  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ConnectedGlobalWidget {...props} store={store} />, div);
  });

  it('should render the GlobalWidget component by default', () => {
    const wrapper = mount(<GlobalWidget {...props} />);
    expect(wrapper.find('GlobalWidget__GlobalWidgetContainer')).toHaveLength(1);
    expect(wrapper.find('GlobalWidget__GlobalWidgetContainer')).not.toHaveStyleRule('background-color', BLACK);
  });

  it('should render the GlobalWidget component with black background', () => {
    const wrapper = mount(<GlobalWidget {...props} isDark />);
    expect(wrapper.find('GlobalWidget__GlobalWidgetContainer')).toHaveStyleRule('background-color', BLACK);
  });

  it('should not render the GlobalWidget component', () => {
    const wrapper = mount(<GlobalWidget globalWidgets={[]} />);
    expect(wrapper.find('NotificationBanner__notificationBanner')).toHaveLength(0);
  });

  it('should not render the GlobalWidget component', () => {
    const wrapper = mount(<GlobalWidget />);
    expect(wrapper.find('GlobalWidget__GlobalWidgetContainer')).toHaveLength(0);
  });
});
