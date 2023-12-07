import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';
import { HOROSCOPES } from '@univision/fe-commons/dist/constants/personalizationType';
import * as ReactRedux from 'react-redux';
import {
  LOADING,
  SUCCESS,
} from '@univision/fe-commons/dist/constants/status';
import contentTypes from '@univision/fe-commons/dist/constants/contentTypes.json';
import WithPersonalizedWidgetContent, { areStatePropsEqual } from '.';
import * as helpers from '../../cards/helpers';

let favorite;
let cardData;
let state;

const props = {
  type: contentTypes.SLIDESHOW,
  fetchReactions: jest.fn(),
};
const cardIndex = 0;

const WrappedComponent = () => <div />; // eslint-disable-line require-jsdoc

describe('WithPersonalizedWidgetContent', () => {
  beforeEach(() => {
    favorite = {
      status: LOADING,
      enabled: false,
    };
    cardData = { dummyProp: 'test' };
    state = {
      user: {
        horoscopes: {
          favorites: [favorite],
          cardsData: [cardData],
        },
      },
    };
    jest.spyOn(helpers, 'attachCardTypeMetaData').mockImplementationOnce(data => ({ ...data }));
    jest.spyOn(helpers, 'setAsPersonalizedContent').mockImplementationOnce(data => ({ ...data }));
    jest.spyOn(ReactRedux, 'connect')
      .mockImplementation(
        mapStateToProps => Component => compProps => (
          <Component
            {...compProps}
            {...mapStateToProps(state)}
          />
        )
      );
  });
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    const div = document.createElement('div');
    const Component = WithPersonalizedWidgetContent(cardIndex, HOROSCOPES, WrappedComponent);
    ReactDOM.render(<Component {...props} />, div);
  });

  it('should invalid cardData render the default component', () => {
    state.user.horoscopes.cardsData[0] = null;
    const Component = WithPersonalizedWidgetContent(cardIndex, HOROSCOPES, WrappedComponent);
    const wrapper = mount(<Component {...props} />);
    const comp = wrapper.find(WrappedComponent);
    expect(comp.props()).toBeDefined();
  });

  it('should invalid favorite render the default component', () => {
    state.user.horoscopes.favorites[0] = null;
    const Component = WithPersonalizedWidgetContent(cardIndex, HOROSCOPES, WrappedComponent);
    const wrapper = mount(<Component {...props} />);
    const comp = wrapper.find(WrappedComponent);
    expect(comp.props()).toBeDefined();
  });

  it('should render loading when LOADING but not removing', () => {
    favorite.status = LOADING;
    favorite.enabled = true;
    const Component = WithPersonalizedWidgetContent(cardIndex, HOROSCOPES, WrappedComponent);
    const wrapper = shallow(<Component {...props} />).dive();
    expect(wrapper.props().status).toBe('loading');
  });

  it('should inject the property isInlineVideo to the newCardContent when there is a video in the first position', () => {
    favorite.status = SUCCESS;
    favorite.enabled = true;
    cardData.type = contentTypes.VIDEO;
    const Component = WithPersonalizedWidgetContent(cardIndex, HOROSCOPES, WrappedComponent);
    const wrapper = mount(<Component {...props} />);
    const comp = wrapper.find(WrappedComponent);
    expect(comp.props().isInlineVideo).toBe(true);
  });

  it('should invoke fetchReaction for the first cardContent', () => {
    favorite.status = SUCCESS;
    favorite.enabled = true;
    cardData.uid = 'TEST';
    const Component = WithPersonalizedWidgetContent(cardIndex, HOROSCOPES, WrappedComponent);
    mount(<Component {...props} />);
    expect(props.fetchReactions).toHaveBeenCalled();
  });

  it('should call setAsPersonalizedContent', () => {
    favorite.status = SUCCESS;
    favorite.enabled = true;
    const Component = WithPersonalizedWidgetContent(cardIndex, HOROSCOPES, WrappedComponent);
    mount(<Component {...props} />);
    expect(helpers.setAsPersonalizedContent).toHaveBeenCalled();
  });

  describe('areStatePropsEqual', () => {
    it('should determine state props are equals properly', () => {
      expect(areStatePropsEqual({ favorite: {} }, { favorite: {} })).toBeFalsy();
      expect(areStatePropsEqual(
        { favorite, cardData: { uid: '1' } },
        { favorite, cardData: { uid: '2' } }
      )).toBeFalsy();
      expect(areStatePropsEqual(
        { favorite, cardData: { uid: '1' } },
        { favorite, cardData: { uid: '1' } }
      )).toBeTruthy();
    });
  });
});
