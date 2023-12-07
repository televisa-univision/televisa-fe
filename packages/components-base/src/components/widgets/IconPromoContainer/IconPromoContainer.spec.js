import React from 'react';
import { mount } from 'enzyme';
import ReactDOM from 'react-dom';
import { HOROSCOPES } from '@univision/fe-commons/dist/constants/personalizationType';
import IconPromoCarousel from '../IconPromoCarousel';
import {
  IconPromoContainer,
  mapStateToProps,
} from '.';

jest.mock('../../FavoriteSelector/FavoriteSelectorConnector', () => () => (<div />));

const props = {
  sectionId: null,
  isFavHoroscopesEnabled: false,
  settings: {
    title: 'Widget title',
    titleLink: 'http://univision.com',
  },
  content: [],
  itemWidth: 110,
};

describe('IconPromoContainer', () => {
  describe('mapStateToProps', () => {
    it('should return the expected properties', () => {
      const state = {
        page: {
          data: {
            hierarchy: { uri: 'http://www.univision.com/horoscopos' },
            widgets: [
              { settings: { uid: 'testKey', personalizationType: HOROSCOPES } },
            ],
          },
          requestParams: {
            favoriteHoroscopesExperience: 'true',
          },
        },
        user: {
          accessToken: 'TestToken',
        },
      };
      expect(mapStateToProps(state)).toEqual({
        isFavHoroscopesEnabled: true,
      });
    });
  });

  describe('IconPromoContainer', () => {
    it('should component render without crashing', () => {
      const div = document.createElement('div');
      const component = <IconPromoContainer {...props} />;
      ReactDOM.render(component, div);
    });

    it('should render IconPromoCarousel when not HOROSCOPE', () => {
      const wrapper = mount(<IconPromoContainer {...props} />);
      expect(wrapper.find(IconPromoCarousel).length).toEqual(1);
    });
    it('should render IconPromoCarousel when isFavHoroscopesEnabled = false', () => {
      const wrapper = mount(<IconPromoContainer {...props} />);
      expect(wrapper.find(IconPromoCarousel).length).toEqual(1);
    });

    it('should render FavoriteSelectorConnector when isFavHoroscopesEnabled = true', () => {
      const wrapper = mount(<IconPromoContainer
        {...props}
        isFavHoroscopesEnabled
      />);
      expect(wrapper.find('div').length).toEqual(1);
    });
  });
});
