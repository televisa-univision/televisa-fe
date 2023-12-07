import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';

import mockApiData from 'server/proxy/api/page/__mocks__/mockPageApiData.json';
import GradientBox from './GradientBox';
import Styles from './GradientBox.scss';

let altoImpactoItems = [];

jest.mock('@univision/fe-components-base/dist/components/Picture', () => 'Picture');

beforeAll(() => {
  altoImpactoItems = mockApiData.data.widgets[30].contents;
});

/** @test {GradientBox} */
describe('GradientBox ', () => {
  it('should render the component without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<GradientBox />, div);
  });
  it('should render the image container', () => {
    const wrapper = shallow(<GradientBox {...altoImpactoItems[0]} />);
    expect(wrapper.find(`div.${Styles.imageCont}`).getElement()).toBeDefined();
  });
  it('should render the action wrapper', () => {
    const wrapper = shallow(<GradientBox {...altoImpactoItems[0]} />);
    expect(wrapper.find(`div.${Styles.actionWrapper}`).getElement()).toBeDefined();
  });
  it('should render images for desktop and mobile', () => {
    const wrapper = shallow(<GradientBox {...altoImpactoItems[0]} />);
    expect(wrapper.find('Picture').length).toBe(2);
  });
  it('should render only one image when it\'s not an alto impacto component', () => {
    const boolValue = true;
    const wrapper = shallow(<GradientBox {...altoImpactoItems[0]} useOriginal={boolValue} />);
    expect(wrapper.find('Picture').length).toBe(1);
  });
  it('should render the title label', () => {
    const wrapper = shallow(<GradientBox {...altoImpactoItems[0]} />);
    expect(wrapper.find('Title').length).toBe(2);
  });
  it('should render the call to action', () => {
    const wrapper = shallow(<GradientBox {...altoImpactoItems[0]} />);
    expect(wrapper.find('ButtonIcon').length).toBe(1);
  });
  it('should render the Link', () => {
    const wrapper = shallow(<GradientBox {...altoImpactoItems[0]} />);
    expect(wrapper.find('Link').length).toBe(1);
  });
  it('should render the class prop', () => {
    const wrapper = mount(<GradientBox {...altoImpactoItems[0]} className="promoCard" />);
    expect(wrapper.find('div.promoCard').length).toBe(1);
  });
});
