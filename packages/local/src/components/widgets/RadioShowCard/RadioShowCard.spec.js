import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import RadioShowCard from './RadioShowCard';

jest.mock('../../connected/PlayStationButton/PlayStationButton', () => 'PlayStationButton');
jest.mock('@univision/fe-components-base/dist/components/Picture', () => 'Picture');

let props;
beforeEach(() => {
  props = {
    device: 'mobile',
    content: [{
      image: {
        type: 'image',
        uid: '0000014d-bc69-d282-a74d-fffba5ae0000',
        title: 'Omar y Argelia',
        caption: 'Omar y Argelia',
        credit: 'Univision',
        renditions: {
          original: {
            href: 'http://univision-bs.s3.amazonaws.com/39/79/fb02fd564ecfad92f36e42b2acea/screen-shot-2017-02-14-at-14.53.22.png',
            width: 1240,
            height: 800,
          },
          '16x9': {
            href: 'http://foundation.dev.univision.psdops.com/dims4/default/61d3e84/2147483647/crop/1240x698%2B0%2B46/resize/1240x698/quality/75/?url=http%3A%2F%2Funivision-bs.s3.amazonaws.com%2F39%2F79%2Ffb02fd564ecfad92f36e42b2acea%2Fscreen-shot-2017-02-14-at-14.53.22.png',
            width: 1240,
            height: 698,
          },
          '16x9-mobile': {
            href: 'http://foundation.dev.univision.psdops.com/dims4/default/dec7567/2147483647/crop/1240x698%2B0%2B46/resize/480x270/quality/75/?url=http%3A%2F%2Funivision-bs.s3.amazonaws.com%2F39%2F79%2Ffb02fd564ecfad92f36e42b2acea%2Fscreen-shot-2017-02-14-at-14.53.22.png',
            width: 480,
            height: 270,
          },
          '16x9-tablet': {
            href: 'http://foundation.dev.univision.psdops.com/dims4/default/298a44f/2147483647/crop/1240x698%2B0%2B46/resize/1024x576/quality/75/?url=http%3A%2F%2Funivision-bs.s3.amazonaws.com%2F39%2F79%2Ffb02fd564ecfad92f36e42b2acea%2Fscreen-shot-2017-02-14-at-14.53.22.png',
            width: 1024,
            height: 576,
          },
          '16x9-med': {
            href: 'http://foundation.dev.univision.psdops.com/dims4/default/db1fd08/2147483647/crop/1240x698%2B0%2B46/resize/400x225/quality/75/?url=http%3A%2F%2Funivision-bs.s3.amazonaws.com%2F39%2F79%2Ffb02fd564ecfad92f36e42b2acea%2Fscreen-shot-2017-02-14-at-14.53.22.png',
            width: 400,
            height: 225,
          },
          '16x9-extended': {
            href: 'http://foundation.dev.univision.psdops.com/dims4/default/9080128/2147483647/crop/1240x698%2B0%2B46/resize/1440x810/quality/75/?url=http%3A%2F%2Funivision-bs.s3.amazonaws.com%2F39%2F79%2Ffb02fd564ecfad92f36e42b2acea%2Fscreen-shot-2017-02-14-at-14.53.22.png',
            width: 1440,
            height: 810,
          },
          '16x9-sm': {
            href: 'http://foundation.dev.univision.psdops.com/dims4/default/2be10a8/2147483647/crop/1240x696%2B0%2B47/resize/246x138/quality/75/?url=http%3A%2F%2Funivision-bs.s3.amazonaws.com%2F39%2F79%2Ffb02fd564ecfad92f36e42b2acea%2Fscreen-shot-2017-02-14-at-14.53.22.png',
            width: 246,
            height: 138,
          },
        },
      },
      title: 'Escuchar El Omar y Argelia Show',
      radioStation: {
        abacast: {
          id: '2017',
          demoId: null,
          AACStreamiOS: 'http://stream.abacast.net/playlist/univision-oandaaac-ibc2.m3u?source=UforiaiOS',
          AACStreamAndroid: 'http://stream.abacast.net/playlist/univision-oandaaac-ibc2.m3u?source=UforiaAndroid',
          MP3Stream: 'http://stream.abacast.net/playlist/univision-oandamp3-ibc2.m3u',
        },
      },
    }],
  };
});
/** @test {RadioShowCard} */
describe('RadioShowCard ', () => {
  it('should render the component without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<RadioShowCard {...props} />, div);
  });
  it('should render image', () => {
    const wrapper = shallow(<RadioShowCard {...props} />);
    expect(wrapper.find('Picture').length).toBe(1);
  });
  it('should handle empty bg image', () => {
    props.content[0].image = { renditions: {} };
    const wrapper = mount(<RadioShowCard {...props} />);
    expect(wrapper.find('.fill').prop('style')).toEqual({});
  });
  it('should handle empty radiostation and not crash', () => {
    props.content[0] = [];
    const wrapper = mount(<RadioShowCard {...props} />);
    expect(wrapper.find('.fill').prop('style')).toEqual({});
  });
  it('handles titleLink setting', () => {
    const settings = { titleLink: { href: '#link' } };
    const wrapper = mount(<RadioShowCard {...props} settings={settings} />);
    expect(wrapper.find('Link').at(0).prop('href')).toEqual(settings.titleLink.href);
  });

  it('handles data in bex', () => {
    const settings = { titleLink: { href: '#link' }, radioStation: {} };
    const wrapper = mount(<RadioShowCard {...props} settings={settings} content={{}} />);
    expect(wrapper.find('Link').at(0).prop('href')).toEqual(settings.titleLink.href);
  });
});
