import React from 'react';
import { mount } from 'enzyme';

import Tracker from '@univision/fe-commons/dist/utils/tracking/tealium/Tracker';
import PrendeCTA from '.';

describe('PrendeCTA tests', () => {
  it('should renders as expected', () => {
    const wrapper = mount(
      <PrendeCTA />
    );
    expect(wrapper.find('PrendeCTA__Divider')).toHaveLength(1);
    expect(wrapper.find('PrendeCTA__FooterTitle')).toHaveLength(1);
    expect(wrapper.find('PrendeCTA__TitleContainer')).toHaveLength(1);
  });

  it('should renders as expected with subtitle', () => {
    const wrapper = mount(
      <PrendeCTA subTitle="Click here!" />
    );

    expect(wrapper.find('PrendeCTA__SubTitle')).toHaveLength(1);
  });

  it('should renders as expected in mobile', () => {
    const wrapper = mount(
      <PrendeCTA
        device="mobile"
        shortTitle="short"
        subTitle="sub title"
      />
    );
    const icon = wrapper.find('Icon');
    expect(icon).toHaveLength(1);
    expect(icon.prop('viewBox')).toBe('0 50 256 165');
    expect(wrapper.find('PrendeCTA__SubTitle').last().text()).toBe('short');
  });

  it('should track click on PrendeCTA', () => {
    const trackSpy = jest.spyOn(Tracker, 'fireEvent');
    const link = 'https://prende.tv/';

    const expectedCall = {
      event: 'prendetv_cta_external_click',
      card_title: undefined,
      card_id: undefined,
      card_type: 'PrendeCard',
      widget_pos: 0,
      widget_title: 'haz Click aqui para ver gratis por prende',
      widget_type: 'prende cta0',
      destination_url: link,
    };

    const wrapper = mount(<PrendeCTA link={link} />);

    expect(wrapper.find('Icon')).toHaveLength(1);
    wrapper.find('Icon').simulate('click');

    expect(trackSpy).toHaveBeenLastCalledWith(expectedCall);
  });

  it('should render vix icon with flag enabled', () => {
    const wrapper = mount(<PrendeCTA isVixEnabled />);
    expect(wrapper.find('Icon').prop('name')).toBe('vix');
  });

  it('should track click with flag enabled', () => {
    const trackSpy = jest.spyOn(Tracker, 'fireEvent');
    const link = 'https://vix.com/';

    const wrapper = mount(<PrendeCTA link={link} isVixEnabled />);
    wrapper.find('Icon').simulate('click');

    expect(trackSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        widget_title: 'haz Click aqui para ver gratis por vix',
        destination_url: link,
      })
    );
  });
});
