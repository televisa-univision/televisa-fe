import sportsModifier from '.';
import configureStore from '../../../../store/configureStore';
import setPageData from '../../../../store/actions/page-actions';

const store = configureStore();

const initialState = {
  pageCategory: 'soccerteam-estadisticas',
  data: {
    type: 'section',
    sectionType: 'radiostation',
    radioStation: {
      image: {
        renditions: {
          original: {
            href: 'test.com',
          },
        },
      },
    },
  },
};

describe('sports seo tags test', () => {
  it('should return radio custom tags', () => {
    const pageData = {
      config: {
        proxy: 'http://www.univision.com',
        syndicator: {
          picture: '/proxy/api/cached/picture',
        },
      }
    };
    store.dispatch(setPageData(pageData));
    const custom = sportsModifier.custom(initialState);

    expect(custom).toEqual({
      'og:image': 'http://www.univision.com/proxy/api/cached/picture?href=test.com&width=0&height=0&ratio_width=500&ratio_height=500',
      'twitter:image': 'http://www.univision.com/proxy/api/cached/picture?href=test.com&width=0&height=0&ratio_width=500&ratio_height=500',
    });
  });
});
