import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import MostViewed from './MostViewed';

/**
 * Mocked content items for test
 * @type {Object}
 */
const contentItems = {
  title: 'the Title',
  contents: [
    {
      uid: '0000015b-4618-d660-adff-e7dc22f60000',
      uri: 'http://www.univision.com',
      type: 'promo',
      versionCreated: null,
      title: 'Hadasha y Daniela',
      description: 'La capitana y su pequeña.',
      image: {},
      isFeatured: false
    },
    {
      uid: '0000015b-4618-d660-adff-e7dcewexe000',
      uri: null,
      type: 'promo',
      versionCreated: null,
      title: 'Hadasha y Daniela Luján estuvieron espectaculares',
      description: 'La capitana y su pequeña gigante sorprendieron en la gran final con un número muy romántico que dejó a todos enamorados.',
      image: {},
      isFeatured: false,
      link: {
        uid: '0000015b-4618-d660-adff-e7dc22fe0000',
        uri: null,
        type: 'internallink',
        versionCreated: null,
        text: 'Hadasha y Daniela Luján estuvieron espectaculares',
        target: null
      }
    }
  ]
};

/** @test {MostViewed} */
describe('MostViewed Spec', () => {
  it('should renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MostViewed content={contentItems} />, div);
  });
  it('should render a NumericList', () => {
    const wrapper = shallow(<MostViewed content={contentItems} />);
    expect(wrapper.find('NumericList').length).toBe(1);
  });
  it('should render empty div if content is empty', () => {
    const obj = {};
    const wrapper = shallow(<MostViewed content={obj} />);
    expect(wrapper.find('div').exists()).toBe(true);
  });
});
