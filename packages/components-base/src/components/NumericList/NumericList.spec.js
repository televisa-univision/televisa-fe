import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';

import Styles from './NumericList.scss';
import NumericList from '.';

const title = 'Artículos Relacionados';
const contents = [
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
];

/** @test {NumericList} */
describe('NumericList', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<NumericList contents={contents} title={title} />, div);
  });
  it('should render a TopicBar', () => {
    const wrapper = mount(<NumericList contents={contents} title={title} />);
    expect(wrapper.find('TopicBar').length).toBe(1);
  });
  it('should not render a TopicBar if title is empty', () => {
    const wrapper = shallow(<NumericList contents={contents} />);
    expect(wrapper.find('TopicBar').length).toBe(0);
  });
  it('should render an ordered list', () => {
    const wrapper = shallow(<NumericList contents={contents} title={title} />);
    expect(wrapper.find(`ol.${Styles.list}`).length).toBe(1);
  });
  it('should render an ordered list with items', () => {
    const wrapper = shallow(<NumericList contents={contents} title={title} />);
    expect(wrapper.find(`li.${Styles.listItem}`).length).toBe(2);
  });
  it('should not render an ordered list if no contents is provided', () => {
    const wrapper = shallow(<NumericList title={title} />);
    expect(wrapper.find(`ol.${Styles.list}`).length).toBe(0);
  });
  it('renders content.link.href', () => {
    contents[1].link.href = 'mylink.com';
    const wrapper = shallow(<NumericList contents={contents} title={title} />);
    expect(wrapper.find('Link').at(1).prop('href')).toBe(contents[1].link.href);
  });
});
