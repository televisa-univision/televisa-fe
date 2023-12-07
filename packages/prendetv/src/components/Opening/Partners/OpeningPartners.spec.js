/**
 * @module Opening Partners styles
 */
import React from 'react';
import ReactDOM from 'react-dom';

import {
  PRENDE_TV_LANDING,
  PRENDE_TV_PARTNERS,
} from '../../../constants';
import OpeningPartners from '.';

/**
 * @test {Footer}
 */
describe('Prende TV Static Opening Partners test', () => {
  it('should render correctly', () => {
    const div = document.createElement('div');

    ReactDOM.render(<OpeningPartners device="desktop" />, div);
  });

  it('should render correctly if the device is mobile', () => {
    const div = document.createElement('div');

    ReactDOM.render(<OpeningPartners device="mobile" />, div);
  });

  it('should render correctly if the page is a landing page', () => {
    const div = document.createElement('div');

    ReactDOM.render(<OpeningPartners device="mobile" page={PRENDE_TV_LANDING} />, div);
  });

  it('should render correctly if the page is not landing pate', () => {
    const div = document.createElement('div');

    ReactDOM.render(<OpeningPartners device="mobile" page={PRENDE_TV_PARTNERS} />, div);
  });
});
