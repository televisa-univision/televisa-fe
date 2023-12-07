import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import features from '@univision/fe-commons/dist/config/features';
import ElTiempoHeader from './ElTiempo';

features.localMarkets.shouldUseVigilantesDelTiempo = jest.fn();
features.localMarkets.shouldUsePrimeraAlerta = jest.fn();
features.localMarkets.shouldUseGuardianesDelTiempo = jest.fn();

const rightComponent = (
  <div className="rightComp">New York</div>
);

/** @test {Local Header Compund} */
describe('Header Local Compound / ElTiempo', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should render without crashing', () => {
    const div = document.createElement('div');
    const el = (
      <ElTiempoHeader />
    );
    ReactDOM.render(el, div);
  });

  it('should render correctly', () => {
    const wrapper = mount(<ElTiempoHeader />);
    expect(wrapper.find('ElTiempo__Container')).toHaveLength(1);
  });

  it('should render correct icon', () => {
    features.localMarkets.shouldUseVigilantesDelTiempo.mockReturnValueOnce(true);
    const wrapper = mount(<ElTiempoHeader />);
    const iconProps = wrapper.find('ElTiempo__ElTiempoIcon').props();
    expect(iconProps).toEqual({ name: 'vigilantesDelTiempo', size: [120, 32] });
  });

  it('should render correct icon', () => {
    features.localMarkets.shouldUseGuardianesDelTiempo.mockReturnValueOnce(true);
    const wrapper = mount(<ElTiempoHeader isOpeningWeatherForecast />);
    const iconProps = wrapper.find('ElTiempo__ElTiempoIcon').props();
    expect(iconProps).toEqual({ name: 'guardianesDelTiempo', size: [120, 32] });
  });

  it('should render correct icon', () => {
    features.localMarkets.shouldUsePrimeraAlerta.mockReturnValueOnce(true);
    const wrapper = mount(<ElTiempoHeader />);
    const iconProps = wrapper.find('ElTiempo__ElTiempoIcon').props();
    expect(iconProps).toEqual({ name: 'primeraAlerta', size: [70, 28] });
  });

  it('should render correct icon', () => {
    features.localMarkets.shouldUseVigilantesDelTiempo.mockReturnValueOnce(false);
    const wrapper = mount(<ElTiempoHeader />);
    const iconProps = wrapper.find('ElTiempo__ElTiempoIcon').props();
    expect(iconProps).toEqual({ name: 'elTiempoLogo', size: [70, 28] });
  });

  it('should render correct icon', () => {
    features.localMarkets.shouldUseVigilantesDelTiempo.mockReturnValueOnce(false);
    const wrapper = mount(<ElTiempoHeader isOpeningWeatherForecast />);
    const iconProps = wrapper.find('ElTiempo__ElTiempoIcon').props();
    expect(iconProps).toEqual({ name: 'elTiempoLogo', size: [82, 32] });
  });

  it('should render the right Component if it is indicated', () => {
    const wrapper = mount(<ElTiempoHeader rightComponent={rightComponent} />);
    expect(wrapper.find('ElTiempo__Container div.rightComp')).toHaveLength(1);
  });
});
