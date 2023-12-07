import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';

import { setWeatherForecastByLocal, setIsCelsiusDisabled } from '@univision/fe-commons/dist/store/actions/local/local-actions';
import Store from '@univision/fe-commons/dist/store/store';
import themes from '@univision/fe-commons/dist/utils/themes/themes.json';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import WeatherMock from '../../../../__mocks__/weatherApiMock';
import DesktopSlider from './ForecastSlider/DesktopSlider';
import WeatherForecast from '.';

const props = {
  settings: {
    title: 'Pronóstico',
  },
  theme: {
    theme: themes.themes['local/chicago-wgbo'],
  },
  device: 'mobile',
};

const pageData = {
  data: {
    tvStation: {
      call: 'KMEX',
    },
  },
};

/** @test {WeatherForecast} */
describe('WeatherForecast', () => {
  beforeAll(() => {
    Store.dispatch(setPageData(pageData));
    Store.dispatch(setWeatherForecastByLocal('KMEX', WeatherMock()));
    Store.dispatch(setIsCelsiusDisabled());
  });
  it('should render without crashing', () => {
    const div = document.createElement('div');
    const el = (
      <Provider store={Store}>
        <WeatherForecast />
      </Provider>
    );
    ReactDOM.render(el, div);
  });

  it('should render component', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <WeatherForecast {...props} />
      </Provider>
    );

    expect(wrapper.find('WeatherForecast__Wrapper')).toHaveLength(1);
  });
  it('should switch between 5 and 10 entries when day is clicked', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <WeatherForecast {...props} />
      </Provider>
    );

    const FiveDays = wrapper.find('WeatherForecast__Day').first();
    const TenDays = wrapper.find('WeatherForecast__Day').last();
    act(() => {
      TenDays.simulate('click');
    });

    wrapper.update();
    expect(wrapper.find('ForecastRow')).toHaveLength(10);

    act(() => {
      FiveDays.simulate('click');
    });

    wrapper.update();
    expect(wrapper.find('ForecastRow')).toHaveLength(5);
  });

  it('should load desktop settings', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <WeatherForecast {...props} device="desktop" isCelsius />
      </Provider>
    );

    expect(wrapper.find('ForecastSlider__DesktopLoader')).toHaveLength(1);
  });

  it('should not load daily if the data it\'s not formatted correctly', () => {
    const mockData = WeatherMock({ disableDaily: true });
    const wrapper = mount(
      <Provider store={Store}>
        <WeatherForecast {...props} device="desktop" daily={mockData.forecasts.daily} />
      </Provider>
    );
    wrapper.update();
    expect(wrapper.find('ForecastRow')).toHaveLength(1);
  });

  it('should render the slides correctly in desktop', () => {
    const pagePosition = [];
    const wrapper = mount(
      <DesktopSlider pagePosition={pagePosition}><p>test</p></DesktopSlider>
    );

    const arrows = wrapper.find('DesktopSlider__ArrowWrapper');
    const arrowRight = arrows.first();
    const arrowLeft = arrows.last();

    expect(arrows).toHaveLength(2);
    expect(arrowLeft).toHaveLength(1);
    expect(arrowRight).toHaveLength(1);
  });

  it('should move the slides correctly in desktop', () => {
    const pagePosition = [0, -414, -860, -1300, -1742, -2180, -2624, -3050];
    const wrapper = shallow(
      <DesktopSlider pagePosition={pagePosition}><p>test</p></DesktopSlider>
    );

    const arrowRight = wrapper.find('DesktopSlider__ArrowWrapper').first();
    const arrowLeft = wrapper.find('DesktopSlider__ArrowWrapper').last();
    act(() => {
      arrowRight.simulate('click');
      arrowLeft.simulate('click');
      arrowRight.simulate('click');
      arrowRight.simulate('click');
      arrowRight.simulate('click');
      arrowRight.simulate('click');
      arrowRight.simulate('click');
      arrowRight.simulate('click');
      arrowRight.simulate('click');
      arrowRight.simulate('click');
    });

    wrapper.update();
    expect(wrapper.find('DesktopSlider__Slider').props().animate).toEqual({
      x: -3050,
    });

    act(() => {
      wrapper.setProps({
        pagePosition: [0, -414, -860],
      });
    });
    wrapper.update();

    expect(wrapper.find('DesktopSlider__Slider').props().animate).toEqual({
      x: -860,
    });
  });
});
