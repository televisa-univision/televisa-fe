import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';

import RelatedTags from '.';

const contents = [
  {
    name: 'Carla Medrano',
    link: 'http://performance.univision.com/temas/carla-medran'
  },
  {
    name: 'Raúl Molinar "El Pelón"',
    link: 'http://performance.univision.com/temas/raul-molinar-el-pelon'
  },
  {
    name: 'El Feo',
    link: 'http://performance.univision.com/temas/el-feo'
  },
  {
    name: 'Zona MX 101.9 FM',
    link: 'http://performance.univision.com/los-angeles/ksca'
  },
  {
    name: 'Regional Mexicano',
    link: 'http://performance.univision.com/temas/regional-mexicano'
  },
  {
    name: 'Local',
    link: 'http://performance.univision.com/temas/local'
  },
  {
    name: 'La Jefa 101.3 FM',
    link: 'http://performance.univision.com/albuquerque/kjfa'
  }
];

/** @test {Related Tags} */
describe('Related Tags', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<RelatedTags contents={contents} />, div);
  });
  it('should render related tags as Links', () => {
    const wrapper = mount(<RelatedTags contents={contents} />);
    expect(wrapper.find('Link').length).toBe(5);
  });
  it('should not render the tags if no content is provided', () => {
    const wrapper = shallow(<RelatedTags />);
    expect(wrapper.find('Link').length).toBe(0);
  });
});
