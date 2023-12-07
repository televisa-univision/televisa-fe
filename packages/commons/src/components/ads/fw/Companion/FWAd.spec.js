import React from 'react';
import ReactDOM from 'react-dom';
import FWAd from './FWAd';

describe('FWAd ', () => {
  it('Should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<FWAd adsetting="w=300&h=250&tpcl=DISPLAY&ptgt=s&cd=300,250" />, div);
  });
});
