import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';
import { HOROSCOPES } from '@univision/fe-commons/dist/constants/personalizationType';
import { SQUARE } from '@univision/fe-commons/dist/constants/cardTypes';
import * as ReactRedux from 'react-redux';
import {
  LOADING,
  SUCCESS,
} from '@univision/fe-commons/dist/constants/status';
import WithPersonalizedWidgetContent, { areStatePropsEqual } from './WithPersonalizedWidgetContentLegacy';

jest.mock('../../../utils/cardMapper/getWidgetCardsData',
  () => ({ getSingleCardData: (_, cardsData) => [bProps => <b {...bProps} />, cardsData[0]] }));
jest.mock('../../cards/helpers', () => ({
  attachCardTypeMetaData: () => ({ content: 'newContent' }),
  setAsPersonalizedContent: () => ({ content: 'newContent' }),
}));

let favorite;
let cardData;
let state;

const props = {
  type: SQUARE,
  fetchReactions: jest.fn(),
};
const cardIndex = 0;

const DefaultComponent = () => <div />; // eslint-disable-line require-jsdoc

describe('WithPersonalizedWidget', () => {
  beforeEach(() => {
    favorite = {
      status: LOADING,
      enabled: false,
    };
    cardData = {};
    state = {
      user: {
        horoscopes: {
          favorites: [favorite],
          cardsData: [cardData],
        },
      },
    };
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
    const Component = WithPersonalizedWidgetContent(cardIndex, {}, HOROSCOPES, DefaultComponent);
    ReactDOM.render(<Component {...props} />, div);
  });

  it('should invalid cardData render the default component', () => {
    state.user.horoscopes.cardsData[0] = null;
    const Component = WithPersonalizedWidgetContent(cardIndex, {}, HOROSCOPES, DefaultComponent);
    const wrapper = mount(<Component {...props} />);
    const comp = wrapper.find(DefaultComponent);
    expect(comp.props()).toBeDefined();
  });

  it('should render loading when LOADING but not removing', () => {
    favorite.status = LOADING;
    favorite.enabled = true;
    const Component = WithPersonalizedWidgetContent(cardIndex, {}, HOROSCOPES, DefaultComponent);
    const wrapper = shallow(<Component {...props} />).dive();
    const comp = wrapper.find('LoadingCard');
    expect(comp.props().type).toEqual(props.type);
  });

  it('should proper cardData render a component for that cardData', () => {
    favorite.status = SUCCESS;
    favorite.enabled = true;
    const Component = WithPersonalizedWidgetContent(cardIndex, {}, HOROSCOPES, DefaultComponent);
    const wrapper = mount(<Component {...props} />);
    const comp = wrapper.find('b');
    expect(comp.props()).toEqual({
      type: props.type,
      content: 'newContent',
    });
  });

  it('should invoke fetchReaction for the first cardContent', () => {
    favorite.status = SUCCESS;
    favorite.enabled = true;
    cardData.uid = 'TEST';
    const Component = WithPersonalizedWidgetContent(cardIndex, {}, HOROSCOPES, DefaultComponent);
    mount(<Component {...props} />);
    expect(props.fetchReactions).toHaveBeenCalled();
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
