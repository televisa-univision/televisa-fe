import React from 'react';
import { mount, shallow } from 'enzyme';

import {
  HALF_PORTRAIT,
  LANDSCAPE,
  PORTRAIT,
  SQUARE,
  RECTANGLE,
} from '@univision/fe-commons/dist/constants/cardTypes';

import ShowCard from '.';

/** @test {ShowCard} */
describe('ShowCard', () => {
  it('should render the ShowCard', () => {
    const wrapper = mount(<ShowCard />);
    expect(wrapper.find('div'));
  });

  it('should render the title when portrait type', () => {
    const wrapper = shallow(<ShowCard type={PORTRAIT} />);
    expect(wrapper.find('ShowCard__ShowCardTitle')).toHaveLength(1);
  });

  it('should render the description when square type', () => {
    const wrapper = shallow(<ShowCard type={SQUARE} />);
    expect(wrapper.find('ShowCard__Description')).toHaveLength(1);
  });

  it('should render the label in portrait type', () => {
    const wrapper = shallow(<ShowCard cardLabel={'NUEVO'} />);
    expect(wrapper.find('ShowCard__ShowCardLabel')).toHaveLength(1);
  });

  it('should render the air time if it exists in half portrait type', () => {
    const wrapper = shallow(
      <ShowCard airTime="airTime" type={HALF_PORTRAIT} />
    );
    expect(wrapper.find('ShowCard__AirTime')).toHaveLength(1);
  });

  it('should not render the air time if it exists but wrong type', () => {
    const wrapper = shallow(<ShowCard airTime="airTime" />);
    expect(wrapper.find('ShowCard__AirTime')).toHaveLength(0);
  });

  it('should add correct margin to airTime if type is square', () => {
    const wrapper = mount(<ShowCard airTime="airTime" type={SQUARE} />);
    expect(wrapper.find('ShowCard__AirTime')).toHaveStyleRule(
      'margin-bottom',
      '8px'
    );
  });

  it('should add correct padding to showInfo if type is landscape', () => {
    const wrapper = mount(<ShowCard type={LANDSCAPE} />);

    expect(wrapper.find('ShowCard__ShowInfo')).toHaveStyleRule(
      'padding',
      '0 40px 40px'
    );
  });

  it('should place logo image correclty if type is rectangle', () => {
    const wrapper = mount(<ShowCard type={RECTANGLE} />);

    expect(wrapper.find('ShowCard__LogoImage')).toHaveStyleRule(
      'max-height',
      '133px'
    );
    expect(wrapper.find('ShowCard__LogoImage')).toHaveStyleRule(
      'object-position',
      'left'
    );
  });

  it('should place logo image correclty if type is half portrait', () => {
    const wrapper = mount(<ShowCard type={HALF_PORTRAIT} />);

    expect(wrapper.find('ShowCard__LogoImage')).toHaveStyleRule(
      'max-height',
      '90px'
    );
  });

  it('should place background wrapper correclty if type is rectangle', () => {
    const wrapper = mount(<ShowCard type={RECTANGLE} />);

    expect(wrapper.find('ShowCard__BackgroundWrapper')).toHaveStyleRule(
      'bottom',
      '0'
    );
    expect(wrapper.find('ShowCard__BackgroundWrapper')).toHaveStyleRule(
      'left',
      '0'
    );
    expect(wrapper.find('ShowCard__BackgroundWrapper')).toHaveStyleRule(
      'position',
      'absolute'
    );
    expect(wrapper.find('ShowCard__BackgroundWrapper')).toHaveStyleRule(
      'right',
      '0'
    );
    expect(wrapper.find('ShowCard__BackgroundWrapper')).toHaveStyleRule(
      'top',
      '0'
    );
  });
});
