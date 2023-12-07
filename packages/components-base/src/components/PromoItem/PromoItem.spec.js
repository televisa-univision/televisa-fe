import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';

import PromoItem from '.';

/**
 * Mocked content items for test
 * @type {Array}
 */
let contentItems = [];

jest.mock('../Picture', () => 'Picture');

beforeEach(() => {
  contentItems = [{
    uid: '00000158-fa34-dc94-a979-fbfeab7f0000',
    uri: 'http://poc.dev.y.univision.com/shows/la-banda/asi-estuvo-el-detras-de-camaras-del-final-de-la-banda-2016-video',
    type: 'video',
    language: 'es',
    versionCreated: '2016-12-13T19:03:46-05:00',
    title: 'Así estuvo el detrás de cámaras del final de La Banda 2016',
    shortTitle: 'Así estuvo el detrás de cámaras del final de La Banda 2016',
    description: 'Así se preparó la final más esperada de la segunda temporada de La Banda. Los ensayos, los nervios y cómo se armó este espectacular show.',
    shortDescription: 'Así se preparó la final más esperada de la segunda temporada de La Banda. Los ensayos, los nervios y cómo se armó este espectacular show.',
    image: {
      renditions: {
        original: {
          href: 'http://univision-bs.s3.amazonaws.com/78/b9/a1b4dbb04bf08851a23d523306eb/47218d2d5ad84fe583915a1bc5dbabfe',
          width: 1920,
          height: 1080
        },
        '16x9': {
          href: 'http://poc.dev.univision.psdops.com/dims4/default/50341be/2147483647/thumbnail/1240x698/quality/75/?url=http%3A%2F%2Funivision-bs.s3.amazonaws.com%2F78%2Fb9%2Fa1b4dbb04bf08851a23d523306eb%2F47218d2d5ad84fe583915a1bc5dbabfe',
          width: 1240,
          height: 698
        },
        '16x9-extended': {
          href: 'http://poc.dev.univision.psdops.com/dims4/default/f6def6d/2147483647/thumbnail/1440x810/quality/75/?url=http%3A%2F%2Funivision-bs.s3.amazonaws.com%2F78%2Fb9%2Fa1b4dbb04bf08851a23d523306eb%2F47218d2d5ad84fe583915a1bc5dbabfe',
          width: 1440,
          height: 810
        },
        '16x9-med': {
          href: 'http://poc.dev.univision.psdops.com/dims4/default/5bfe5be/2147483647/thumbnail/400x225/quality/75/?url=http%3A%2F%2Funivision-bs.s3.amazonaws.com%2F78%2Fb9%2Fa1b4dbb04bf08851a23d523306eb%2F47218d2d5ad84fe583915a1bc5dbabfe',
          width: 400,
          height: 225
        },
        '16x9-mobile': {
          href: 'http://poc.dev.univision.psdops.com/dims4/default/b2c42c7/2147483647/thumbnail/480x270/quality/75/?url=http%3A%2F%2Funivision-bs.s3.amazonaws.com%2F78%2Fb9%2Fa1b4dbb04bf08851a23d523306eb%2F47218d2d5ad84fe583915a1bc5dbabfe',
          width: 480,
          height: 270
        },
        '16x9-sm': {
          href: 'http://poc.dev.univision.psdops.com/dims4/default/012c2f8/2147483647/thumbnail/246x138/quality/75/?url=http%3A%2F%2Funivision-bs.s3.amazonaws.com%2F78%2Fb9%2Fa1b4dbb04bf08851a23d523306eb%2F47218d2d5ad84fe583915a1bc5dbabfe',
          width: 246,
          height: 138
        }
      },
    },
    primaryTag: {
      name: 'Programas',
      link: 'http://qa.x.univision.com/temas/programas'
    },
    primaryTopic: 'Programas'
  }];
});

/** @test {PromoItem} */
describe('PromoItem Spec', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PromoItem {...contentItems[0]} />, div);
  });
  it('should render the description', () => {
    const wrapper = shallow(<PromoItem {...contentItems[0]} />);
    expect(wrapper.find('Title')).toBeDefined();
  });
  it('should render image', () => {
    const wrapper = shallow(<PromoItem {...contentItems[0]} />);
    expect(wrapper.find('Picture').length).toBe(1);
    contentItems[0].image = undefined;
    wrapper.setProps(contentItems[0]);
    expect(wrapper.find('Picture').length).toBe(1);
  });
  it('should render title, and image Links', () => {
    const wrapper = shallow(<PromoItem {...contentItems[0]} />);
    expect(wrapper.find('Link').length).toBe(2);
  });
  it('should render taglabel', () => {
    const wrapper = shallow(<PromoItem {...contentItems[0]} />);
    expect(wrapper.find('TagLabel').length).toBe(1);
  });

  it('should get each type of icon', () => {
    contentItems[0].type = 'video';
    const wrapper = shallow(<PromoItem {...contentItems[0]} />);
    expect(wrapper.find('Icon').prop('name')).toEqual('playnocircle');
    contentItems[0].type = 'reactionslideshow';
    wrapper.setProps(contentItems[0]);
    expect(wrapper.find('Icon').prop('name')).toEqual('slideshow');
  });

  describe('Boolean props', () => {
    it('should render tag if showTag prop is true', () => {
      const wrapper = mount(<PromoItem {...contentItems[0]} />);
      expect(wrapper.find('TagLabel').getElement()).toBeDefined();
    });
    it('should not render tag if showTag prop is false', () => {
      const wrapper = mount(<PromoItem showTag={false} {...contentItems[0]} />);
      expect(wrapper.find('TagLabel').length).toBe(0);
    });
    it('should render text if showText prop is true', () => {
      const wrapper = shallow(<PromoItem {...contentItems[0]} />);
      expect(wrapper.find('Title')).toBeDefined();
    });
    it('should not render text if showText prop is false', () => {
      const wrapper = shallow(<PromoItem showText={false} {...contentItems[0]} />);
      expect(wrapper.find('Title').length).toBe(0);
    });
    it('should render icon if showIcon prop is true', () => {
      contentItems[0].type = 'video';
      const wrapper = mount(<PromoItem {...contentItems[0]} />);
      expect(wrapper.find('Icon').length).toBe(1);
    });
    it('should not render icon if showIcon prop is false', () => {
      const wrapper = mount(<PromoItem showIcon={false} {...contentItems[0]} />);
      expect(wrapper.find('Icon').length).toBe(0);
    });
    it('should not render icon if contentType is invalid on content item', () => {
      contentItems[0].type = 'dummy';
      const wrapper = mount(<PromoItem {...contentItems[0]} />);
      expect(wrapper.find('Icon').length).toBe(0);
    });
    it('should render even if there are no images on the api response', () => {
      delete contentItems[0].promoImages;
      const wrapper = mount(<PromoItem {...contentItems[0]} />);
      expect(wrapper.find('Title').getElement()).toBeDefined();
    });
    it('should render div promoitem-text-cont', () => {
      const wrapper = shallow(<PromoItem {...contentItems[0]} />);
      expect(wrapper.find('.promotitem-text-cont').length).toBeDefined();
    });
    it('should not render sponsor', () => {
      const theSponsor = {
        name: 'Wallgreen',
        link: 'https://www.walgreens.com/',
        logo: 'https://www.brandsoftheworld.com/sites/default/files/styles/logo-thumbnail/public/122012/walgreens_type-logo_red_4c.png'
      };
      const wrapper = mount(<PromoItem
        sponsor={theSponsor}
        showIcon={false}
        {...contentItems[0]}
      />);
      expect(wrapper.find('Icon').length).toBe(0);
    });
  });
});
