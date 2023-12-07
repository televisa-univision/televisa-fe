import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import styled from 'styled-components';
import ActionBarWrapper from '@univision/shared-components/dist/components/v3/ActionBarWrapper';
import { Provider } from 'react-redux';
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import {
  setUserState,
} from '@univision/fe-commons/dist/store/slices/user/user-slice';
import localization from '@univision/fe-utilities/localization';
import * as selectors from '@univision/fe-commons/dist/store/selectors/page-selectors';
import features from '@univision/fe-commons/dist/config/features';

import ActionBar from '.';
import initialState from './__mocks__/ActionBarMock';
import Styles, { getRightPositionShareCta, getRightPositionShareIcon } from './ActionBar.styles';

const CtaShareStyled = styled.div`${Styles.ctaShare}`;

const props = {
  sharingOptions: {
    facebook: {
      url: 'http://univision.com/test',
      title: 'The content title',
      imageUrl: 'http://loremflickr.com/320/240',
      isFeedDialog: true,
    },
    twitter: {
      url: 'http://univision.com/test',
      title: 'The content title',
      via: 'Univision',
    },
    mail: {
      url: 'http://univision.com/test',
      title: 'The content title',
      body: 'The content of the email',
      subject: 'The subject of the email',
    },
  },
  device: 'mobile',
  cardSize: 'big',
  hasFavorite: false,
  cancelAutoplay: jest.fn(),
  showCtaShare: true,
  isContentLayout: true,
  isLandscape: false,
};

const store = configureStore();
store.dispatch(setUserState(initialState.user));

describe('ActionBar component tests', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><ActionBar /></Provider>, div);
  });
  it('renders correctly with props ', () => {
    const wrapper = mount(<Provider store={store}><ActionBar {...props} /></Provider>);
    expect(wrapper.find('ActionBarWrapper')).toHaveLength(1);
    expect(wrapper.find('ShareDrawer')).toHaveLength(1);
  });
  it('should change isOpen state on click on action bar wrapper', () => {
    const wrapper = mount(<Provider store={store}><ActionBar {...props} /></Provider>);
    act(() => {
      wrapper.find('TouchableOpacity').first().props().onPress();
    });
    wrapper.update();
    expect(wrapper.find('ShareDrawer')
      .first().prop('isOpen')).toBeTruthy();
    act(() => {
      wrapper.find('ShareDrawer__Close').first().props().onClick();
    });
    wrapper.update();
    expect(wrapper.find('ShareDrawer')
      .first().prop('isOpen')).toBeFalsy();
  });
  it('should change isOpen state on click on action bar wrapper without cancelAutoplay', () => {
    const otherProps = {
      ...props,
      cancelAutoplay: null,
    };
    const wrapper = mount(<Provider store={store}><ActionBar {...otherProps} /></Provider>);
    act(() => {
      wrapper.find('TouchableOpacity').first().props().onPress();
    });
    wrapper.update();
    expect(wrapper.find('ShareDrawer')
      .first().prop('isOpen')).toBeTruthy();
    act(() => {
      wrapper.find('ShareDrawer__Close').first().props().onClick();
    });
    wrapper.update();
    expect(wrapper.find('ShareDrawer')
      .first().prop('isOpen')).toBeFalsy();
  });
  it('renders correctly without cancelAutoplay ', () => {
    const otherProps = {
      ...props,
      cancelAutoplay: null,
    };
    const wrapper = mount(<Provider store={store}><ActionBar {...otherProps} /></Provider>);
    expect(wrapper.find('ActionBarWrapper')).toHaveLength(1);
    expect(wrapper.find('ShareDrawer')).toHaveLength(1);
  });
});

describe('ActionBar with share component', () => {
  let currentLanguageSpy;

  beforeEach(() => {
    currentLanguageSpy = jest.spyOn(localization, 'getCurrentLanguage').mockReturnValue('es');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('renders correctly with props ', () => {
    const wrapper = mount(<Provider store={store}><ActionBar {...props} /></Provider>);
    expect(wrapper.find('ActionBarWrapper')).toHaveLength(1);
    expect(wrapper.find('ShareDrawer')).toHaveLength(1);
  });
  it('must have width 100% when reaction is opened', () => {
    const ActionBarStyled = styled(ActionBarWrapper)`${Styles.actionStyled}`;
    const wrapper = mount(
      <Provider store={store}>
        <ActionBarStyled hasReaction isActive />
      </Provider>
    );
    expect(wrapper).toHaveStyleRule('width', '100%');
  });
  it('must have width 100% when reaction is opened', () => {
    const ActionBarStyled = styled(ActionBarWrapper)`${Styles.actionStyled}`;
    const wrapper = mount(
      <Provider store={store}>
        <ActionBarStyled hasReaction isActive isContentLayout isMobile />
      </Provider>
    );
    expect(wrapper).toHaveStyleRule('width', '100%');
  });
  it('renders correctly in Dark mode ', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ActionBar {...props} variant="dark" />
      </Provider>
    );
    expect(wrapper.find('ActionBarWrapper')).toHaveLength(1);
    expect(wrapper.find('ShareDrawer').prop('isDark')).toBeTruthy();
  });
  it('renders correctly with soccer props ', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ActionBar {...props} type="Soccer" />
      </Provider>
    );
    expect(wrapper.find('ActionBarWrapper')).toHaveLength(1);
    expect(wrapper.find('ShareDrawer').prop('type')).toBe('Soccer');
  });
  it('renders correctly with soccer props in dark mode', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ActionBar {...props} type="Soccer" variant="dark" />
      </Provider>
    );
    expect(wrapper.find('ActionBarWrapper')).toHaveLength(1);
    expect(wrapper.find('ShareDrawer').prop('isDark')).toBeTruthy();
  });
  it('should not render share drawer if no sharing options available', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ActionBar {...props} sharingOptions={{}} />
      </Provider>
    );
    expect(wrapper.find('ActionBarWrapper')).toHaveLength(1);
    expect(wrapper.find('ShareDrawer')).toHaveLength(0);
    expect(wrapper.find('ActionBarWrapper').prop('hasShare')).toBeFalsy();
  });
  it('should get correct right and z-index when hasFavorite and is active', () => {
    const wrapper = mount(<CtaShareStyled hasFavorite isActive />);
    expect(wrapper).toHaveStyleRule('right', '0');
    expect(wrapper).toHaveStyleRule('z-index', '-1');
  });
  it('renders correctly with props in isContentLayout', () => {
    const wrapper = mount(<Provider store={store}><ActionBar {...props} /></Provider>);
    expect(wrapper.find('ActionBarWrapper')).toHaveLength(1);
    expect(wrapper.find('ActionBar__CtaShareStyled'))
      .toHaveStyleRule('right', '0');
  });
  it('should change isOpen state on click on action bar wrapper when CTA clicked', () => {
    const wrapper = mount(<Provider store={store}><ActionBar {...props} /></Provider>);
    wrapper.find('ActionBar__CtaShareStyled').simulate('click');
    expect(wrapper.find('ShareDrawer')
      .first().prop('isOpen')).toBeTruthy();
  });
  it('get right position depending of state in cta share', () => {
    let right = getRightPositionShareCta({ isLandscape: false, isMobile: true });
    expect(right).toBe('22px');
    right = getRightPositionShareCta({ isLandscape: true, isMobile: false });
    expect(right).toBe('35px');
    right = getRightPositionShareCta({ isLandscape: false, isMobile: false });
    expect(right).toBe('0');
  });
  it('renders correctly with props in isListCard', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ActionBar {...props} isListCard isContentLayout={false} />
      </Provider>
    );
    expect(wrapper.find('ActionBarWrapper')).toHaveLength(1);
    expect(wrapper.find('ShareDrawer')).toHaveLength(1);
    expect(wrapper.find('ShareDrawer').prop('isListCard')).toBeTruthy();
  });
  it('renders correctly with props in isLandscape', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ActionBar {...props} isLandscape isContentLayout={false} showCtaShare />
      </Provider>
    );
    expect(wrapper.find('ActionBarWrapper')).toHaveLength(1);
    expect(wrapper.find('ShareDrawer')).toHaveLength(1);
    expect(wrapper.find('ShareDrawer').prop('isLandscape')).toBeTruthy();
  });
  it('should have width 100% on share isOpen state on list card', () => {
    const otherProps = {
      ...props,
      cancelAutoplay: null,
    };
    const wrapper = mount(
      <Provider store={store}>
        <ActionBar {...otherProps} isListCard />
      </Provider>
    );
    expect(wrapper).toHaveStyleRule('width', '50%');
    act(() => {
      wrapper.find('TouchableOpacity').first().props().onPress();
    });
    wrapper.update();
    expect(wrapper.find('ShareDrawer')
      .first().prop('isOpen')).toBeTruthy();
    expect(wrapper).toHaveStyleRule('width', '100%');
  });
  it('should have long share label on with content layout', () => {
    currentLanguageSpy.mockReturnValue('pt');
    jest.spyOn(selectors, 'deviceSelector').mockReturnValue('mobile');
    const wrapper = mount(
      <Provider store={store}>
        <ActionBar {...props} isContentLayout />
      </Provider>
    );
    expect(wrapper.find('ActionBar__ActionBarStyled').prop('hasLongShareLabel')).toBe(true);
  });
  it('should have long share label on with content layout on desktop', () => {
    currentLanguageSpy.mockReturnValue('pt');
    jest.spyOn(selectors, 'deviceSelector').mockReturnValue('desktop');
    const wrapper = mount(
      <Provider store={store}>
        <ActionBar {...props} isContentLayout />
      </Provider>
    );
    expect(wrapper.find('ActionBar__ActionBarStyled').prop('hasLongShareLabel')).toBe(true);
  });
  it('should have isWorldCupMVP', () => {
    jest.spyOn(selectors, 'deviceSelector').mockReturnValue('desktop');
    features.deportes.isWorldCupMVP = jest.fn(() => true);
    const wrapper = mount(
      <Provider store={store}>
        <ActionBar {...props} isContentLayout />
      </Provider>
    );
    expect(wrapper.find('ActionBar__CtaShareStyled').prop('isWorldCupMVP')).toBeTruthy();
  });
  it('should have the correct right if isWorldCupMVP', () => {
    features.deportes.isWorldCupMVP = jest.fn(() => true);
    let right = getRightPositionShareIcon({
      isContentLayout: true, isMobile: true, isWorldCupMVP: true, hasLongShareLabel: false,
    });
    expect([...right]).toEqual(['right:', '100px', ';']);
    right = getRightPositionShareIcon({
      isContentLayout: true, isMobile: false, isWorldCupMVP: true, hasLongShareLabel: false,
    });
    expect([...right]).toEqual(['right:', '80px', ';']);
  });
});
