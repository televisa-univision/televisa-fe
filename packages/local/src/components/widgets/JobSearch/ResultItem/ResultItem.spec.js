import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import features from '@univision/fe-commons/dist/config/features';

import ResultItem from './index';
import mock from './mock.json';

const store = configureStore();

features.content.isQuickApplyActive = jest.fn(() => false);

describe('ResultItem Component', () => {
  beforeEach(() => {
    store.dispatch(setPageData({
      config: { graphql: '' },
    }));
  });

  it('should render basic component with spanish language', () => {
    const props = mock.jobs[0];
    const wrapper = mount(
      <Provider store={store}>
        <ResultItem {...props} language="es" applyMethod="QUICK" />
      </Provider>
    );
    expect(wrapper.find('ResultItem__Title')).toHaveLength(1);
    expect(wrapper.find('ResultItem__LastDetails')).toHaveLength(1);
    expect(wrapper.find('ActionLink')).toHaveLength(2);
    expect(wrapper.find('ActionLink').at(0).text()).toBe('Aplicar');
  });

  it('should render basic component with english language', () => {
    const props = mock.jobs[0];
    const wrapper = mount(
      <Provider store={store}>
        <ResultItem {...props} language="en" applyMethod="FULL" />
      </Provider>
    );
    expect(wrapper.find('ResultItem__Title')).toHaveLength(1);
    expect(wrapper.find('ResultItem__LastDetails')).toHaveLength(1);
    expect(wrapper.find('ActionLink')).toHaveLength(2);
    expect(wrapper.find('ActionLink').at(0).text()).toBe('Apply');
  });

  it('should render basic component with quick apply method and english', () => {
    features.content.isQuickApplyActive = jest.fn(() => true);
    const props = mock.jobs[0];
    const wrapper = mount(
      <Provider store={store}>
        <ResultItem {...props} language="en" applyMethod="QUICK" />
      </Provider>
    );
    expect(wrapper.find('ResultItem__Title')).toHaveLength(1);
    expect(wrapper.find('ResultItem__LastDetails')).toHaveLength(1);
    expect(wrapper.find('ActionLink')).toHaveLength(2);
    expect(wrapper.find('ActionLink').at(0).text()).toBe('quick Apply');
  });

  it('should collapse component', () => {
    const fireEventSpy = jest.spyOn(WidgetTracker, 'track');
    const props = mock.jobs[0];
    const wrapper = mount(
      <Provider store={store}>
        <ResultItem {...props} language="es" />
      </Provider>
    );

    wrapper.find('.toggle').simulate('click');

    wrapper.find('.toggle').simulate('click');

    expect(fireEventSpy).toHaveBeenCalledTimes(1);
  });

  it('should test apply', () => {
    const fireEventSpy = jest.spyOn(WidgetTracker, 'track');
    const props = mock.jobs[0];
    Element.prototype.scrollIntoView = jest.fn();
    const wrapper = mount(
      <Provider store={store}>
        <ResultItem {...props} language="es" />
      </Provider>
    );

    wrapper.find('ActionLink').at(0).simulate('click');
    wrapper.find('ActionLink').at(1).simulate('click');

    expect(fireEventSpy).toHaveBeenCalled();
  });

  it('should test apply with QUICK method', () => {
    features.content.isQuickApplyActive = jest.fn(() => true);
    const fireEventSpy = jest.spyOn(WidgetTracker, 'track');
    const props = mock.jobs[0];
    const wrapper = mount(
      <Provider store={store}>
        <ResultItem {...props} language="es" applyMethod="QUICK" />
      </Provider>
    );

    wrapper.find('ActionLink').at(0).simulate('click');
    wrapper.find('ActionLink').at(1).simulate('click');

    expect(fireEventSpy).toHaveBeenCalled();
    expect('QuickApply').toBeDefined();
  });

  it('should scroll on apply with QUICK method', () => {
    const fireEventSpy = jest.spyOn(WidgetTracker, 'track');
    const scrollIntoView = jest.fn();
    Element.prototype.scrollIntoView = scrollIntoView;
    const props = mock.jobs[0];
    const wrapper = mount(
      <Provider store={store}>
        <ResultItem {...props} language="es" applyMethod="QUICK" />
      </Provider>
    );

    wrapper.find('ActionLink').at(0).simulate('click');
    wrapper.find('ActionLink').at(1).simulate('click');

    expect(fireEventSpy).toHaveBeenCalled();
    expect(scrollIntoView).toHaveBeenCalled();
  });

  it('should render company profile', () => {
    const props = {
      id: '1',
      redirectApplyUrl: 'www.google.com',
      brandName: 'C&S Wholesale Grocers',
      city: 'miami',
      publishedDate: '2020-03-30',
      jobType: 'Tempo Completo',
      name: {
        en: 'Regional Nurse Consultant *North Manhattan*',
        es: 'Regional Nurse Consultant *North Manhattan*',
      },
      description: {
        en: "The primary responsibility of the Qualified Medication Aide (QMA) is to provide care for the residents under the direction of the nursing and medical staff.            ESSENTIAL DUTIES AND RESPONSIBILITIES: Obtains and records patient's vital signs and weight, Administers and documents medications given by following specifically written physicians orders, including oral, topical, and suppository medications, as well as eye and ear drops.",
        es: "The primary responsibility of the Qualified Medication Aide (QMA) is to provide care for the residents under the direction of the nursing and medical staff.            ESSENTIAL DUTIES AND RESPONSIBILITIES: Obtains and records patient's vital signs and weight, Administers and documents medications given by following specifically written physicians orders, including oral, topical, and suppository medications, as well as eye and ear drops.",
      },
    };
    const wrapper = mount(
      <Provider store={store}>
        <ResultItem {...props} language="en" applyMethod="FULL" />
      </Provider>
    );
    expect(wrapper.find('ResultItem__CompanyInfo')).toHaveLength(1);
    wrapper.find('ResultItem__Buttons').at(1).find('ResultItem__ApplyButton').simulate('click');
  });

  it('should render company profile with QUICK button clock', () => {
    const props = {
      id: '1',
      redirectApplyUrl: 'www.google.com',
      brandName: 'C&S Wholesale Grocers',
      city: 'miami',
      publishedDate: '2020-03-30',
      jobType: 'Tempo Completo',
      name: {
        en: 'Regional Nurse Consultant *North Manhattan*',
        es: 'Regional Nurse Consultant *North Manhattan*',
      },
      description: {
        en: "The primary responsibility of the Qualified Medication Aide (QMA) is to provide care for the residents under the direction of the nursing and medical staff.            ESSENTIAL DUTIES AND RESPONSIBILITIES: Obtains and records patient's vital signs and weight, Administers and documents medications given by following specifically written physicians orders, including oral, topical, and suppository medications, as well as eye and ear drops.",
        es: "The primary responsibility of the Qualified Medication Aide (QMA) is to provide care for the residents under the direction of the nursing and medical staff.            ESSENTIAL DUTIES AND RESPONSIBILITIES: Obtains and records patient's vital signs and weight, Administers and documents medications given by following specifically written physicians orders, including oral, topical, and suppository medications, as well as eye and ear drops.",
      },
    };
    const wrapper = mount(
      <Provider store={store}>
        <ResultItem {...props} language="en" applyMethod="QUICK" />
      </Provider>
    );
    expect(wrapper.find('ResultItem__CompanyInfo')).toHaveLength(1);
    wrapper.find('ResultItem__Buttons').at(1).find('ResultItem__ApplyButton').simulate('click');
  });
});
