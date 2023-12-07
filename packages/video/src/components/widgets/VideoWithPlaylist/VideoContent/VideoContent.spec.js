import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';

import {
  DARK_VARIANT,
  LIGHT_VARIANT,
} from '@univision/fe-utilities/styled/constants';
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import features from '@univision/fe-commons/dist/config/features';
import videoPlaylistMock from '../__mocks__/videoPlaylist.json';

import VideoContent from '.';

const store = configureStore();
let props;

jest.mock('@univision/shared-components/dist/components/v3/Label', () => {
  return () => (<div />);
});

describe('VideoContent test', () => {
  beforeEach(() => {
    props = {
      contentItem: videoPlaylistMock.contents[0],
      device: 'mobile',
      variant: LIGHT_VARIANT,
    };
  });

  it('should renders as expected', () => {
    const wrapper = mount(
      <Provider store={store}>
        <VideoContent {...props} />
      </Provider>
    );

    expect(wrapper.find('VideoContent__WrapperStyled')).toHaveLength(1);
    expect(wrapper.find('VideoContent__LabelBadgeStyled')).toHaveLength(1);
    expect(wrapper.find('VideoContent__TitleStyled')).toHaveStyleRule('color', '#000000');
  });

  it('should renders dark variant', () => {
    const wrapper = mount(
      <Provider store={store}>
        <VideoContent {...props} variant={DARK_VARIANT} />
      </Provider>
    );

    expect(wrapper.find('VideoContent__TitleStyled')).toHaveStyleRule('color', '#ffffff');
  });

  it('should renders empty if not have content data', () => {
    props.contentItem = {};
    const wrapper = shallow(
      <VideoContent {...props} />
    );

    expect(wrapper.find('VideoContent__WrapperStyled')).toHaveLength(0);
    expect(wrapper.html()).toBeNull();
  });

  it('should renders desktop version', () => {
    props.device = 'desktop';
    const wrapper = mount(
      <Provider store={store}>
        <VideoContent {...props} variant={DARK_VARIANT} />
      </Provider>
    );
    const LabelWrapper = wrapper.find('VideoContent__LabelWrapperStyled').children();
    expect(LabelWrapper).toHaveLength(1);
  });

  it('should renders as expected with score data for score badge on soccer match', () => {
    const wrapper = mount(
      <Provider store={store}>
        <VideoContent
          {...props}
          pageData={{ soccerMatchStatus: 'live', hasLiveStream: true, uid: '0001' }}
        />
      </Provider>
    );

    expect(wrapper.find('VideoContent__WrapperStyled')).toHaveLength(1);
    expect(wrapper.find('VideoContent__ScoreBadgeStyled')).toHaveLength(1);
  });
  it('should add correct content id for action bar if no uid on content item', () => {
    const contentItem = videoPlaylistMock.contents[0];
    contentItem.uid = null;
    const wrapper = mount(
      <Provider store={store}>
        <VideoContent
          {...props}
          contentItem={contentItem}
          pageData={{ soccerMatchStatus: 'live', hasLiveStream: true, uid: '0001' }}
        />
      </Provider>
    );

    expect(wrapper.find('VideoContent__WrapperStyled')).toHaveLength(1);
  });
  it('should render custom logo if present', () => {
    const contentItem = videoPlaylistMock.contents[0];
    contentItem.uid = null;
    const wrapper = mount(
      <Provider store={store}>
        <VideoContent
          {...props}
          contentItem={contentItem}
          pageData={{ soccerMatchStatus: 'live', hasLiveStream: true, uid: '0001' }}
          brandTitle={'SPECIAL TITLE'}
        />
      </Provider>
    );
    expect(wrapper.find('VideoContent__WrapperStyled')).toHaveLength(1);
    expect(wrapper.find('VideoContent__SpecialBranding')).toHaveLength(1);
    expect(wrapper.find('VideoContent__SpecialBranding').text()).toBe('SPECIAL TITLE');
  });

  it('should render TudnRebrandLabel__LabelWrapper with background-color #00ffb0', () => {
    features.deportes.isWorldCupMVP = jest.fn(() => true);

    const wrapper = mount(
      <Provider store={store}>
        <VideoContent {...props} />
      </Provider>
    );

    expect(wrapper.find('VideoContent')).toHaveLength(1);
    expect(wrapper.find('VideoContent__LabelWrapperStyled')).toHaveLength(1);
    expect(wrapper.find('VideoContent__LabelBadgeStyled')).toHaveLength(1);
    expect(wrapper.find('LabelBadge')).toHaveLength(1);
    expect(wrapper.find('TudnRebrandLabel__LabelWrapper')).toHaveLength(1);
    expect(wrapper.find('TudnRebrandLabel__LabelWrapper')).toHaveStyleRule('background-color', '#00ffb0');
  });
  it('should render correct font if isWorldCupMVP is true', () => {
    features.deportes.isWorldCupMVP = jest.fn(() => true);

    props.device = 'desktop';
    const wrapper = mount(
      <Provider store={store}>
        <VideoContent
          {...props}
        />
      </Provider>
    );
    const LabelWrapper = wrapper.find('VideoContent__LabelBadgeStyled');
    expect(LabelWrapper.prop('isWorldCupMVP')).toBe(true);
  });
  it('should have isWorldCupMVP false', () => {
    features.deportes.isWorldCupMVP = jest.fn(() => false);

    props.device = 'desktop';
    const wrapper = mount(
      <Provider store={store}>
        <VideoContent
          {...props}
          variant={DARK_VARIANT}
        />
      </Provider>
    );
    const LabelWrapper = wrapper.find('VideoContent__LabelBadgeStyled');

    expect(LabelWrapper.prop('isWorldCupMVP')).toBe(false);
  });
});
