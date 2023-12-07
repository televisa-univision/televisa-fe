import React from 'react';
import favoritesMapper from '@univision/fe-commons/dist/store/slices/user/favoritesMapper';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { HOROSCOPES } from '@univision/fe-commons/dist/constants/personalizationType';
import {
  ERROR,
  SUCCESS,
} from '@univision/fe-commons/dist/constants/status';
import features from '@univision/fe-commons/dist/config/features';
import {
  mapStateToProps,
  mapDispatchToProps,
  WithPersonalizedWidgetComponent,
} from './WithPersonalizedWidgetContainer';
import * as WithPersonalizedWidgetContent from '../WithPersonalizedWidgetContent/WithPersonalizedWidgetContentLegacy';

// Mock favoritesMapper
const fetchFavoritesActionMock = jest.fn();
favoritesMapper[HOROSCOPES] = {
  ...favoritesMapper[HOROSCOPES],
  fetchFavoritesAction: fetchFavoritesActionMock,
};

const WidgetWrappedComponent = wProp => (<div {...wProp} />); // eslint-disable-line require-jsdoc

const props = {
  settings: {
    personalizationType: HOROSCOPES,
  },
  accessToken: '123',
  fetchFavoritesAction: jest.fn(),
  fetchFavoritesStatus: ERROR,
  widgetContext: { position: 2, id: 'testUid' },
  propCardsPath: 'cardData',
  cardData: [[() => <div />, {}]],
  personalizedWidgetKey: 'testUid',
  WidgetWrappedComponent,
};

let personalizedWidgetContentMock;
const widgetContentComp = () => {}; // eslint-disable-line require-jsdoc

features.content.hasEnhancement = jest.fn(() => true);

describe('WithPersonalizedWidgetContainer', () => {
  beforeEach(() => {
    personalizedWidgetContentMock = jest.spyOn(WithPersonalizedWidgetContent, 'default')
      .mockImplementation(() => widgetContentComp);
  });
  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('mapStateToProps and mapDispatchToProps', () => {
    it('should mapStateToProps returns personalizationStatus for personalizationType', () => {
      const state = { user: { horoscopes: { status: '' } } };
      let result = mapStateToProps(state,
        { settings: props.settings, user: { accessToken: props.accessToken } });
      expect(result).toEqual({ fetchFavoritesStatus: '', accessToken: null });

      result = mapStateToProps(state,
        { settings: { personalizationType: 'invalid' }, user: { accessToken: props.accessToken } });
      expect(result).toEqual({ fetchFavoritesStatus: undefined, accessToken: null });
    });

    it('should mapDispatchToProps returns a generic action that resolved to the personalizationType', () => {
      const dispatch = jest.fn();
      const { fetchFavoritesAction } = mapDispatchToProps(dispatch);

      fetchFavoritesAction(HOROSCOPES);
      expect(dispatch).toHaveBeenCalled();
      dispatch.mockClear();

      expect(fetchFavoritesActionMock).toHaveBeenCalled();

      fetchFavoritesAction(1, 'Invalid');
      expect(dispatch).not.toHaveBeenCalled();
    });
  });

  describe('WithPersonalizedWidgetComponent', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should render without crashing', () => {
      const div = document.createElement('div');
      const component = <WithPersonalizedWidgetComponent {...props} />;
      ReactDOM.render(component, div);
    });

    it('should fetch favorites when component get mount', () => {
      mount(<WithPersonalizedWidgetComponent {...props} />);
      expect(props.fetchFavoritesAction).toHaveBeenCalledWith(props.settings.personalizationType);
    });

    it('should not fetch favorites when there is not access token', () => {
      mount(<WithPersonalizedWidgetComponent {...props} accessToken={null} />);
      expect(props.fetchFavoritesAction).not.toHaveBeenCalled();
    });

    it('should empty cards data render properly', () => {
      const wrapper = mount(<WithPersonalizedWidgetComponent {...props} cardData={null} />);
      const item = wrapper.find('WidgetWrappedComponent');
      expect(item.props().cardData).toEqual([]);
    });

    it('should render default card data if fetchFavoritesStatus is not valid', () => {
      let wrapper = mount(<WithPersonalizedWidgetComponent {...props} />);
      let item = wrapper.find('div');
      expect(item.props().cardData).toEqual(props.cardData);

      wrapper = mount(<WithPersonalizedWidgetComponent
        {...props}
        fetchFavoritesStatus={undefined}
      />);
      item = wrapper.find('div');
      expect(item.props().cardData).toEqual(props.cardData);
    });

    it('should replace cards components with WithPersonalizedWidgetContent if fetchFavoritesStatus = SUCCESS', () => {
      features.content.hasEnhancement.mockReturnValueOnce(false);
      const wrapper = mount(<WithPersonalizedWidgetComponent
        {...props}
        fetchFavoritesStatus={SUCCESS}
      />);
      const item = wrapper.find('div');
      const index = 0;
      expect(personalizedWidgetContentMock).toHaveBeenCalledWith(
        index,
        props.widgetContext,
        props.settings.personalizationType,
        props.cardData[index][0]
      );
      expect(item.props().cardData[0][0]).toEqual(widgetContentComp);
    });

    it('should add personalization type to cards data when propCardsPath === "content" ', () => {
      const wrapper = mount(<WithPersonalizedWidgetComponent
        {...props}
        fetchFavoritesStatus={SUCCESS}
        content={[{ type: 'video' }]}
        propCardsPath={'content'}
      />);
      const item = wrapper.find('div');
      expect(item.props().content[0].personalizationType).toEqual(HOROSCOPES);
    });
  });
});
