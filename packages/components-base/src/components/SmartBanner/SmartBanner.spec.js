import React from 'react';
import { mount } from 'enzyme';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { act } from '@testing-library/react';

import configureStore from '@univision/fe-commons/dist/store/configureStore';
import localStorage from '@univision/fe-commons/dist/utils/helpers/LocalStorage';
import * as pageSelectors from '@univision/fe-commons/dist/store/selectors/page-selectors';
import {
  FAMOSOS,
  ENTERTAINMENT,
  ESTILO_DE_VIDA,
} from '@univision/fe-commons/dist/constants/pageCategories';
import * as helpers from '../Navigation/MegaMenu/helpers';

import SmartBanner from '.';

/**
 * WrapperComponent
 * @prop {children} component children
 * @returns {JSX}
 */
const WrapperComponent = ({ children }) => {
  return (
    <Provider store={configureStore()}>
      {children}
    </Provider>
  );
};

WrapperComponent.propTypes = {
  children: PropTypes.node,
};

let wrapper;
const mockDeviceSelector = jest.spyOn(pageSelectors, 'deviceSelector');
const mockCategorySelector = jest.spyOn(pageSelectors, 'pageCategorySelector');

describe('SmartBanner Component: on mobile and /shows path', () => {
  beforeEach(() => {
    // Using fake timers to establish dates for a better dev experience.
    jest.useFakeTimers('modern');
    mockDeviceSelector.mockReturnValue('mobile');
    mockCategorySelector
      .mockReturnValue(FAMOSOS)
      .mockReturnValue(ESTILO_DE_VIDA)
      .mockReturnValue(ENTERTAINMENT);
    wrapper = mount(<WrapperComponent><SmartBanner /></WrapperComponent>);
    localStorage.clear();
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.useRealTimers();
  });

  it('first render should be done properly since nothing exists in the localStorage yet', () => {
    expect(wrapper.find(SmartBanner).children()).toHaveLength(1);
  });

  it('should call tracksVIXLink with true for the third parameter when called with true argument', () => {
    const spyTracksVIXLink = jest.spyOn(helpers, 'tracksVIXLink');
    wrapper = mount(<WrapperComponent><SmartBanner /></WrapperComponent>);
    const closeButton = wrapper.find('SmartBannerstyles__CloseButton').at(0);

    act(() => {
    // Simulate click event on close button
      closeButton.prop('onClick')();
    });

    wrapper.update();
    expect(spyTracksVIXLink).toHaveBeenCalledWith(false, true, true);
  });

  it('should call tracksVIXLink with true for the third parameter when called with false argument', () => {
    const spyTracksVIXLink = jest.spyOn(helpers, 'tracksVIXLink');
    wrapper = mount(<WrapperComponent><SmartBanner /></WrapperComponent>);
    const viewAnchor = wrapper.find('SmartBannerstyles__CTAButton');

    act(() => {
    // Simulate click event on view button
      viewAnchor.prop('onClick')();
    });

    wrapper.update();
    expect(spyTracksVIXLink).toHaveBeenCalledWith(false, true, false);
  });
});

describe('SmartBanner Component: on desktop and not on /shows path', () => {
  beforeEach(() => {
    localStorage.clear();
    mockDeviceSelector.mockReturnValue('desktop');
    mockCategorySelector.mockReturnValue('otherCategory');
    wrapper = mount(<WrapperComponent><SmartBanner /></WrapperComponent>);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('hides because on desktop and not in /shows', () => {
    expect(wrapper.find(SmartBanner).children()).toHaveLength(0);
  });
});
