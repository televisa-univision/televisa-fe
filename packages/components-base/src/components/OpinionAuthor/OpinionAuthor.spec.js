import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import OpinionAuthor from '.';

const author = {
  uri: 'https://performance.univision.com/temas/daniel-morcate',
  title: 'Daniel Morcate',
  image: {
    renditions: {
      original: {
        href:
          'https://cdn4.performance.univision.com/dims4/default/39a0801/2147483647/crop/400x224%2B0%2B85/resize/246x138/quality/75/?url=https%3A%2F%2Fcdn4.uvnimg.com%2Fac%2F94%2Fe6dccfa8405c9ba1b25bf43d9906%2Fmorcate.jpg',
        width: 246,
        height: 138,
      },
      '16x9-sm': {
        href:
          'https://cdn4.performance.univision.com/dims4/default/39a0801/2147483647/crop/400x224%2B0%2B85/resize/246x138/quality/75/?url=https%3A%2F%2Fcdn4.uvnimg.com%2Fac%2F94%2Fe6dccfa8405c9ba1b25bf43d9906%2Fmorcate.jpg',
        width: 246,
        height: 138,
      },
    },
  },
  firstName: 'Daniel',
  lastName: 'Morcate',
  socialNetworks: {
    twitterUrl: {
      text: 'Daniel Morcate',
      url: 'https://twitter.com/dmorca',
      target: '_blank',
      hashTags: [],
    },
  },
};

/** @test {OpinionAuthor} */
describe('OpinionAuthor', () => {
  it('should return null if there is not author', () => {
    expect(shallow(<OpinionAuthor author={null} />).type()).toBe(null);
    expect(shallow(<OpinionAuthor author={undefined} />).type()).toBe(null);
    expect(shallow(<OpinionAuthor />).type()).toBe(null);
  });

  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<OpinionAuthor author={author} theme={{ primary: 'red' }} />, div);
  });

  it('should not render Avatar if no author image', () => {
    author.image = {};
    const wrapper = shallow(<OpinionAuthor author={author} />);
    expect(wrapper.find('div.avatar')).toHaveLength(0);
  });

  it('should not render twitter follow if no url', () => {
    author.socialNetworks = {};
    const wrapper = shallow(<OpinionAuthor author={author} />);
    expect(wrapper.find('TwitterFollow')).toHaveLength(0);
  });

  it('should render `opinionText` if available', () => {
    const opinionText = 'Ruben Jimenez is secretly El Niño Prodigio';
    const wrapper = shallow(<OpinionAuthor author={author} opinionText={opinionText} />);
    expect(wrapper.find('div.opinionText')).toHaveLength(1);
    expect(wrapper.find('div.opinionText').text()).toEqual(opinionText);
  });

  it('should NOT render `opinionText` if unavailable', () => {
    const opinionText = '';
    const wrapper = shallow(<OpinionAuthor author={author} opinionText={opinionText} />);
    expect(wrapper.find('div.opinionText')).toHaveLength(0);
  });

  it('should render Opinion with accents if NOT English', () => {
    const wrapper = shallow(<OpinionAuthor author={author} />);
    expect(wrapper.find('Link').children().text()).toEqual('Opinión');
  });

  it('should render Opinion without accents if English', () => {
    const wrapper = shallow(<OpinionAuthor author={author} language="en" />);
    expect(wrapper.find('Link').children().text()).toEqual('Opinion');
  });
});
