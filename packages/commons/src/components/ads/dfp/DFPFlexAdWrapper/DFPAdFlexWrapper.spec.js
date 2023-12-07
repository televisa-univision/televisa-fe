import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import DFPAdFlexWrapper from '.';
import * as AdTypes from '../../../../utils/ads/ad-types';

const DFPAdFlexWrapperCmpDefault = (
  <DFPAdFlexWrapper adType={AdTypes.TOP_AD}>
    <div>Hello World</div>
  </DFPAdFlexWrapper>
);

/** @test {DFPAdFlexWrapper} */
describe('DFPAdFlexWrapper', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(DFPAdFlexWrapperCmpDefault, div);
  });

  it('should render children if not adType provided', () => {
    const wrapper = shallow(<DFPAdFlexWrapper><div>Hello World</div></DFPAdFlexWrapper>);
    expect(wrapper.getElement()).toEqual(<div>Hello World</div>);
  });

  it('should render children if wrong adType provided', () => {
    const wrapper = shallow(<DFPAdFlexWrapper adType="TEST_AD"><div>Hello World</div></DFPAdFlexWrapper>);
    expect(wrapper.getElement()).toEqual(<div>Hello World</div>);
  });
});

describe('afterAdRenders function', () => {
  it('should set state.displayChildren true if right event.size', () => {
    const wrapper = shallow(DFPAdFlexWrapperCmpDefault);
    wrapper.instance().afterAdRenders({ size: [300, 250] });
    expect(wrapper.instance().state.displayChildren).toBe(true);
  });

  it('should keep state.displayChildren false if not event.size', () => {
    const wrapper = shallow(DFPAdFlexWrapperCmpDefault);
    wrapper.instance().afterAdRenders();
    expect(wrapper.instance().state.displayChildren).toBe(false);
  });
});
