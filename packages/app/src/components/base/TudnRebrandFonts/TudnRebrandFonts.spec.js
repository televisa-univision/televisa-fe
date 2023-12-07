import React from 'react';
import { mount } from 'enzyme';

import configureStore from '@univision/fe-commons/dist/store/configureStore'; // eslint-disable-line
import features from '@univision/fe-commons/dist/config/features';
import TudnRebrandFonts from '.';

const store = configureStore();

describe('TudnRebrandFonts component', () => {
  let isWorldCupMVPSpy;
  beforeEach(() => {
    isWorldCupMVPSpy = jest
      .spyOn(features.deportes, 'isWorldCupMVP')
      .mockReturnValue(false);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
  it('should render head if isWorldCupMVP true', () => {
    jest.spyOn(features.deportes, 'isWorldCupMVP').mockReturnValue(true);
    const wrapper = mount(<TudnRebrandFonts store={store}><body /></TudnRebrandFonts>);
    expect(wrapper.find('Head')).toHaveLength(1);
    expect(isWorldCupMVPSpy).toHaveBeenCalled();
  });

  it('should render null', () => {
    const wrapper = mount(<TudnRebrandFonts store={store} />);
    expect(isWorldCupMVPSpy).toHaveBeenCalled();
    expect(wrapper.isEmptyRender()).toBe(true);
  });
});
