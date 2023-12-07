import React from 'react';
import { shallow } from 'enzyme';
import Chartbeat from './Chartbeat';

describe('Chartbeat', () => {
  const expected = {
    vars: {
      uid: '38125',
      domain: 'univision.com',
      sections: 'noticias, huracanes, article',
      authors: '',
      canonicalPath: 'https://www.univision.com/noticias/huracanes/fort-myers-beach-huracan-ian-arrasado-panorama-dan-allers',
      title: '"no hay nada a lo que regresar": el desolador panorama en fort myers beach tras el paso del huracan ian',
      contentType: 'article',
    },
  };
  const page = {
    data: {
      tracking: {
        analytics: {
          data: {
            canonical_url: 'https://www.univision.com/noticias/huracanes/fort-myers-beach-huracan-ian-arrasado-panorama-dan-allers',
            content_type: 'article',
            section_full_hierarchy: [
              'noticias',
              'huracanes',
            ],
            section_level1: 'noticias',
            section_level2: 'huracanes',
            title: '"no hay nada a lo que regresar": el desolador panorama en fort myers beach tras el paso del huracan ian',
            content_author: '',
          },
        },
      },
    },
    domain: 'https://www.univision.com',
  };

  it('should render the tracking for chartbeat', () => {
    const wrapper = shallow(<Chartbeat page={page} />);
    // eslint-disable-next-line no-underscore-dangle
    const tracking = JSON.parse(wrapper.children().prop('dangerouslySetInnerHTML').__html);
    expect(tracking).toEqual(expected);
  });

  it('should not crash when skipping page data', () => {
    const wrapper = shallow(<Chartbeat />);
    // eslint-disable-next-line no-underscore-dangle
    const tracking = JSON.parse(wrapper.children().prop('dangerouslySetInnerHTML').__html);
    expect(tracking).toEqual({
      vars: { uid: '38125' },
    });
  });
});
