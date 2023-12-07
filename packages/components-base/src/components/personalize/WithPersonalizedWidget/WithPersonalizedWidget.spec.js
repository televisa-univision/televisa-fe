import React from 'react';
import { shallow } from 'enzyme';
import { HOROSCOPES } from '@univision/fe-commons/dist/constants/personalizationType';
import {
  ERROR,
} from '@univision/fe-commons/dist/constants/status';
import WithPersonalizedWidget from '.';
import WithPersonalizedWidgetContainer from './WithPersonalizedWidgetContainer';

jest.mock('@univision/fe-commons/dist/store/slices/user/user-actions',
  () => ({ fetchFavoriteHoroscopes: widgetKey => widgetKey }));

const WidgetWrappedComponent = wProp => (<div {...wProp} />); // eslint-disable-line require-jsdoc

const props = {
  settings: { personalizationType: HOROSCOPES },
  fetchFavoritesAction: jest.fn(),
  fetchFavoritesStatus: ERROR,
  widgetContext: { position: 2 },
  propCardsPath: 'cardData',
  cardData: [[() => <div />, {}]],
  WidgetWrappedComponent,
};

describe('WithPersonalizedWidget', () => {
  describe('WithPersonalizedWidget HOC', () => {
    it('should render default component if invalid cardsPathData', () => {
      const ResultComponent = WithPersonalizedWidget(WidgetWrappedComponent, 'invalid');
      const wrapper = shallow(<ResultComponent {...props} />);
      expect(wrapper.props()).toBeDefined();
    });
    it('should render default component if invalid personalizationType', () => {
      const ResultComponent = WithPersonalizedWidget(WidgetWrappedComponent, 'cardData');
      const wrapper = shallow(<ResultComponent {...props} settings={undefined} />);
      expect(wrapper.props()).toBeDefined();
    });

    it('should render custom component when valid parameters provided', () => {
      const ResultComponent = WithPersonalizedWidget(WidgetWrappedComponent, 'cardData');
      const wrapper = shallow(<ResultComponent {...props} />);
      const comp = wrapper.find(WithPersonalizedWidgetContainer);
      expect(comp.props().propCardsPath).toEqual('cardData');
      expect(comp.props().WidgetWrappedComponent).toEqual(WidgetWrappedComponent);
    });

    it('should render custom component when invalid parameters provided', () => {
      const ResultComponent = WithPersonalizedWidget(WidgetWrappedComponent, null);
      const wrapper = shallow(<ResultComponent {...props} />);
      const compProps = wrapper.props();
      expect(compProps.WidgetWrappedComponent).toEqual(WidgetWrappedComponent);
    });
  });
});
