import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import * as adsSelector from '@univision/fe-commons/dist/store/selectors/ads-selectors';

import Sponsored from '.';

adsSelector.timeBannerSelector = jest.fn(() => [{ sizes: '1.8' }]);

const store = configureStore();
/**
 * WrapperComponent
 * @prop {children} component children
 * @returns {JSX}
 */
const WrapperComponent = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

WrapperComponent.propTypes = {
  children: PropTypes.node,
};

describe('Sponsored component', () => {
  it('should render the component without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <WrapperComponent>
        <Sponsored />
      </WrapperComponent>,
      div
    );
  });

  it('when sponsored label is active', () => {
    const wrapper = shallow(
      <WrapperComponent>
        <Sponsored />
      </WrapperComponent>
    );
    expect(wrapper.find('SponsoredBy').props().message).toBe('Patrocinado por:');
  });

  it('when sponsored label is not active', () => {
    adsSelector.timeBannerSelector = jest.fn(() => []);

    const wrapper = mount(
      <WrapperComponent>
        <Sponsored />
      </WrapperComponent>
    );
    const event = {
      isEmpty: true,
    };

    act(() => {
      wrapper.find('_class').first().props().callback(event);
    });

    wrapper.update();
    expect(wrapper.find('Sponsored__SponsoredByMessage')).toHaveLength(0);
  });

  it('sponsored label should not display on WeatherCard Square version at screensize less than 375px', () => {
    const wrapper = mount(
      <WrapperComponent>
        <Sponsored isWeatherCard type="square" />
      </WrapperComponent>
    );
    const event = {
      isEmpty: false,
    };
    act(() => {
      wrapper.find('_class').first().props().callback(event);
    });
    wrapper.update();
    expect(wrapper.find('Sponsored__SponsoredByMessage')).toHaveStyleRule(
      'display',
      'none',
      {
        media: 'only screen and (max-width: 375px) and (min-width: 0px)',
      }
    );
  });

  it('should render isOpeningWeatherForecast', () => {
    const wrapper = mount(
      <WrapperComponent>
        <Sponsored isOpeningWeatherForecast />
      </WrapperComponent>
    );
    const event = {
      isEmpty: false,
    };
    act(() => {
      wrapper.find('_class').first().props().callback(event);
    });
    wrapper.update();
    expect(wrapper.find('Sponsored__SponsoredByMessage')).toHaveStyleRule(
      'align-items',
      'center',
    );
  });
});
