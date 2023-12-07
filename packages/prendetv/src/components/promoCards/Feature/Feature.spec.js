/**
 * @module PrendeTV Feature with headlines
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import Store from '@univision/fe-commons/dist/store/store';
import * as helpers from '@univision/fe-commons/dist/utils/helpers';

import PrendeTVContext from '../../../context';
import { PRENDE_TV_LANDING } from '../../../constants';
import video from '../../Video/__mocks__/videoMock';
import * as prendeHelpers from '../../../utils';

import data from './__mocks__/featureMock';

import Feature from '.';

const image = {
  type: 'image',
  uid: '00000177-93b2-d143-ab7f-dffac8870000',
  title: 'prendetv-device-mock-epg-copy-2.png',
  caption: null,
  credit: null,
  renditions: {
    original: {
      href: 'https://uvn-brightspot-performance.s3.amazonaws.com/a0/26/638b4f364e41b779bf5ae773c685/prendetv-device-mock-epg-copy-2.png',
      width: 1083,
      height: 583,
    },
  },
};

const contextData = {
  lang: 'en',
  path: PRENDE_TV_LANDING,
  device: 'mobile',
};

helpers.setCookie = jest.fn();
prendeHelpers.setContentTracking = jest.fn();

/**
 * @test {Feature Promo card}
 */
describe('Prende TV Static Feature test', () => {
  beforeEach(() => {
    document.body.innerHTML = '<body><div id="app-root"></div></body>';
  });

  it('should render without crashing', () => {
    const requiredProps = {
      headLine: 'headline',
      flavor: 'DARK',
    };

    const div = document.createElement('div');
    ReactDOM.render(<Feature {...requiredProps} />, div);
  });

  it('should render when lead is video', () => {
    const { Provider } = PrendeTVContext;
    const wrapper = mount(
      <Provider value={contextData} store={Store}>
        <Feature {...data} lead={video} />
      </Provider>
    );
    expect(wrapper.find('Feature__Wrapper')).toBeDefined();
    expect(wrapper.find('Feature__VideoWrapper')).toBeDefined();
  });

  it('should render when lead is image', () => {
    const { Provider } = PrendeTVContext;
    const wrapper = mount(
      <Provider value={contextData}>
        <Feature {...data} lead={image} />
      </Provider>
    );
    expect(wrapper.find('Feature__Wrapper')).toBeDefined();
    expect(wrapper.find('Feature__Image')).toBeDefined();
    expect(wrapper.find('Feature__Image').props().src).toEqual(image.renditions.original.href);
    expect(wrapper.find('Feature__Text')).toBeDefined();
  });

  it('should render when lead is image with full width', () => {
    const { Provider } = PrendeTVContext;
    const wrapper = mount(
      <Provider value={contextData}>
        <Feature {...data} lead={image} bottomHeadline="Bottom Headline" leadFullWidth />
      </Provider>
    );
    expect(wrapper.find('Feature__Wrapper')).toBeDefined();
    expect(wrapper.find('Feature__Image')).toBeDefined();
    expect(wrapper.find('Feature__Image').props().src).toEqual(image.renditions.original.href);
    expect(wrapper.find('Feature__Text')).toBeDefined();
  });

  it('should render when mobile image when the device is a mobile', () => {
    const { Provider } = PrendeTVContext;
    const newContextData = {
      ...contextData,
      device: 'mobile',
    };
    data.mobileImage.renditions = {
      original: {
        href: 'mobile-image-url',
        width: 1083,
        height: 583,
      },
    };
    const wrapper = mount(
      <Provider value={newContextData}>
        <Feature {...data} lead={image} />
      </Provider>
    );
    expect(wrapper.find('Feature__Wrapper')).toBeDefined();
    expect(wrapper.find('Feature__Image')).toBeDefined();
    expect(wrapper.find('Feature__Image').props().src).toEqual('mobile-image-url');
    expect(wrapper.find('Feature__Text')).toBeDefined();
  });

  it('should call content tracking and set cookie when the link is clicked', () => {
    const wrapper = shallow(<Feature {...data} />);

    expect(wrapper).toHaveLength(1);
    wrapper.find('Feature__Link').at(0).simulate('click');
    expect(prendeHelpers.setContentTracking).toHaveBeenCalledTimes(1);
    expect(helpers.setCookie).toHaveBeenCalledTimes(1);
  });

  it('should render store links as expected', () => {
    const wrapper = shallow(<Feature {...data} />);
    expect(wrapper.find('Feature__Link')).toHaveLength(2);
  });

  it('should not render store links if empty', () => {
    delete data.appStoreLinks;
    const wrapper = shallow(<Feature {...data} />);
    expect(wrapper.find('Feature__Link')).toHaveLength(0);
  });
});
