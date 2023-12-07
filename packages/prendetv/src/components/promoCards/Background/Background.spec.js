/**
 * @module PrendeTV Background Specs
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import { DESKTOP } from '@univision/fe-commons/dist/constants/devices';

import Background from '.';
import mockData from './__mocks__/background.json';
import PrendeTVContext from '../../../context';

/**
 * @test {Background}
 */
describe('Prende TV Background promo card type', () => {
  it('should render correctly in landing page', () => {
    const div = document.createElement('div');
    const { props } = mockData;

    ReactDOM.render(<Background {...props} />, div);
  });

  it('should render correctly if opening is false', () => {
    const div = document.createElement('div');
    const { props } = mockData;

    ReactDOM.render(<Background {...props} opening={false} />, div);
  });

  it('should render correctly on desktop', () => {
    const { props } = mockData;
    const { Provider } = PrendeTVContext;
    const wrapper = mount(
      <Provider value={{ device: DESKTOP }}>
        <Background {...props} opening={false} />
      </Provider>
    );

    expect(wrapper).toHaveLength(1);
  });

  it('should render correctly with Cta', () => {
    const div = document.createElement('div');
    const { props } = mockData;
    const { cta } = mockData;

    ReactDOM.render(
      <Background {...props} callToAction={cta} />, div
    );
  });
});
