import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import {
  MEDIUM,
  LARGE, SMALL,
} from '@univision/fe-commons/dist/constants/cardSizes';
import LocalizationManager from '@univision/fe-commons/dist/utils/localization/LocalizationManager';

import data from '../__mocks__/squareCard.json';
import SquareGeneric from '.';

describe('SquareGeneric', () => {
  it('should render without crashing', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const div = document.createElement('div');
    ReactDOM.render(
      <SquareGeneric />,
      div
    );
  });
  it('should render correctly for card size large with no label or title', () => {
    const wrapper = mount(
      <SquareGeneric
        isConectaFeed
        size={LARGE}
        {...data[16]}
        title={null}
      />
    );
    expect(wrapper.find('SquareGeneric__SquarePromoContainer').length).toBe(1);
    expect(wrapper.find('SquareGeneric__PromoLink').length).toBe(1);
    expect(wrapper.find('SquareGeneric__PromoBackgroundPicture').length).toBe(1);
    expect(wrapper.find('SquareGeneric__PromoInfo').length).toBe(1);
    expect(wrapper.find('SquareGeneric__PromoTitle').length).toBe(0);
    expect(wrapper.find('Label').length).toBe(0);
    expect(wrapper.find('Link').length).toBe(1);
    expect(wrapper.find('SquareGeneric__SquarePromoContainer').prop('type')).toBe('section');
  });
  it('should render correctly for card size medium with label and title', () => {
    const props = {
      labelProps: {
        text: 'EN VIVO',
        type: 'liveblog',
        href: 'url',
      },
    };
    const wrapper = mount(
      <SquareGeneric
        size={MEDIUM}
        {...data[16]}
        {...props}
      />
    );
    expect(wrapper.find('SquareGeneric__SquarePromoContainer').length).toBe(1);
    expect(wrapper.find('SquareGeneric__PromoLink').length).toBe(1);
    expect(wrapper.find('SquareGeneric__PromoBackgroundPicture').length).toBe(1);
    expect(wrapper.find('SquareGeneric__PromoInfo').length).toBe(1);
    expect(wrapper.find('SquareGeneric__PromoTitle').length).toBe(1);
    expect(wrapper.find('SquareGeneric__PromoLabelWrapper').length).toBe(1);
    expect(wrapper.find('Label').length).toBe(1);
    expect(wrapper.find('Label').text()).toBe('EN VIVO');
    expect(wrapper.find('SquareGeneric__SquarePromoContainer').prop('type')).toBe('section');
    expect(wrapper.find('SquareGeneric__PromoTitle').text()).toBe('Deportes');
  });
  it('should render correctly for conecta feed', () => {
    const props = {
      ...data[22],
      size: SMALL,
      labelProps: {
        href: '',
        type: 'opinion',
        text: LocalizationManager.get('vote'),
      },
      trackClickOther: jest.fn(),
    };
    const wrapper = mount(
      <SquareGeneric
        size={MEDIUM}
        {...props}
      />
    );
    expect(wrapper.find('SquareGeneric__SquarePromoContainer').length).toBe(1);
    expect(wrapper.find('SquareGeneric__PromoLink').length).toBe(1);
    expect(wrapper.find('SquareGeneric__PromoBackgroundPicture').length).toBe(1);
    expect(wrapper.find('SquareGeneric__PromoInfo').length).toBe(1);
    expect(wrapper.find('SquareGeneric__PromoTitle').length).toBe(1);
    expect(wrapper.find('SquareGeneric__PromoLabelWrapper').length).toBe(1);
    expect(wrapper.find('Label').length).toBe(1);
    expect(wrapper.find('Label').text()).toBe(LocalizationManager.get('vote').toUpperCase());
    expect(wrapper.find('SquareGeneric__SquarePromoContainer').prop('type')).toBe('section');
    expect(wrapper.find('SquareGeneric__PromoTitle').text()).toBe('Las mejores jugadas de Liga MX y Champions');
  });
  it('should render correctly for card size medium with promo schedules', () => {
    const props = {
      ...data[22],
      size: SMALL,
      isConectaFeed: false,
      schedule: {
        feedConsumer: null,
        image: {},
        schedules: [],
      },
    };
    const wrapper = mount(
      <SquareGeneric
        size={MEDIUM}
        {...props}
      />
    );
    expect(wrapper.find('SquareGeneric__SquarePromoContainer').length).toBe(0);
    expect(wrapper.find('SquareGeneric__PromoSchedule').length).toBe(1);
    expect(wrapper.find('SquareGeneric__PromoSchedule').prop('type')).toBe('section');
  });
});
